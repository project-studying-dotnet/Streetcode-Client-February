import { FC, useEffect, useRef, useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import { UploadFile } from 'antd/lib/upload/interface';
import './InterestingFactsAdminItem.styles.scss';

import FileUploader from '@/app/common/components/FileUploader/FileUploader.component';
import PreviewFileModal from '@/app/common/components/PreviewFileModal/PreviewFileModal.component';
import Image from '@/models/media/image.model';
import Audio from '@/models/media/audio.model';
import useMobx from '@/app/stores/root-store';
import ImagesApi from '@/app/api/media/images.api';
import { Fact, FactCreate } from '@/models/streetcode/text-contents.model';

interface InterestingFactsAdminItemProps {
    title: string;
    description: string;
    imageUrl?: string;
    imageAlt?: string;
    onClose: () => void;
}

const MAX_TITLE_LENGTH = 68;
const MAX_DESCRIPTION_LENGTH = 600;
const MAX_ALT_LENGTH = 200;

const InterestingFactsAdminItem: FC<InterestingFactsAdminItemProps> = ({
    title,
    description,
    imageUrl,
    imageAlt,
    onClose,
}) => {
    const [form] = Form.useForm();
    const [previewOpen, setPreviewOpen] = useState(false);
    const [filePreview, setFilePreview] = useState<UploadFile | null>(null);
    const imageId = useRef<number>(0);
    const { factsStore } = useMobx();

    const handlePreview = (file: UploadFile) => {
        setFilePreview(file);
        setPreviewOpen(true);
    };

    useEffect(() => {
        form.resetFields();
        form.setFieldsValue({
            title,
            description,
            imageAlt,
            logo: imageUrl ? [{
                name: '',
                thumbUrl: imageUrl,
                uid: imageId.current.toString(),
                status: 'done',
            }] : [],
        });
    }, [title, description, imageUrl, imageAlt, form]);

    const handleSubmit = async () => {
        try {
            const values = await form.validateFields();
            const fact: FactCreate = {
                id: 0,
                title: values.title.trim(),
                factContent: values.description.trim(),
                imageId: imageId.current,
                imageDescription: values.imageAlt?.trim() || undefined,
                streetcodeId: 2
            };

            await factsStore.createFact(fact);
            message.success('Fact created successfully');
            onClose();
        } catch (error) {
            message.error('Failed to create fact');
            console.error('Fact creation error:', error);
        }
    };

    return (
        <Form
            form={form}
            layout="vertical"
            className="interesting-facts-form"
            preserve={false}
        >
            <Form.Item
                label="Title"
                name="title"
                rules={[{ required: true, message: 'Please input the title!' }]}
            >
                <Input
                    maxLength={MAX_TITLE_LENGTH}
                    showCount
                />
            </Form.Item>

            <Form.Item
                label="Description"
                name="description"
                rules={[{ required: true, message: 'Please input the description!' }]}
            >
                <Input.TextArea
                    maxLength={MAX_DESCRIPTION_LENGTH}
                    showCount
                />
            </Form.Item>

            <Form.Item
                name="logo"
                label="Image"
                valuePropName="fileList"
                getValueFromEvent={(e: any) => {
                    if (Array.isArray(e)) {
                        return e;
                    }
                    return e?.fileList;
                }}
                rules={[{ required: true, message: 'Please upload an image!' }]}
            >
                <FileUploader
                    className="logo-uploader"
                    multiple={false}
                    accept=".jpeg,.png,.jpg"
                    listType="picture-card"
                    maxCount={1}
                    onPreview={handlePreview}
                    uploadTo="image"
                    onSuccessUpload={(value: Image | Audio) => {
                        if ('id' in value) {
                            imageId.current = value.id;
                        }
                    }}
                    defaultFileList={
                        imageUrl
                            ? [
                                {
                                    name: '',
                                    thumbUrl: imageUrl,
                                    uid: imageId.current.toString(),
                                    status: 'done',
                                },
                            ]
                            : []
                    }
                >
                    <p>Select or drag and drop file</p>
                </FileUploader>
            </Form.Item>

            <Form.Item
                label="Image Alt Text"
                name="imageAlt"
            >
                <Input
                    maxLength={MAX_ALT_LENGTH}
                    showCount
                />
            </Form.Item>

            <PreviewFileModal
                opened={previewOpen}
                setOpened={setPreviewOpen}
                file={filePreview}
            />

            <Form.Item className="form-actions">
                <Button 
                    type="primary" 
                    onClick={handleSubmit}
                >
                    {title ? 'Save Changes' : 'Add Fact'}
                </Button>
            </Form.Item>
        </Form>
    );
};

export default InterestingFactsAdminItem; 