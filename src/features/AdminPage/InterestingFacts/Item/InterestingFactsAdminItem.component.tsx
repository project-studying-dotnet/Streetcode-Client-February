import { FC, useState } from 'react';
import { Input, Form, Upload, message, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import './InterestingFactsAdminItem.styles.scss';

interface InterestingFactsAdminItemProps {
    title: string;
    description: string;
    imageUrl?: string;
    imageAlt?: string;
    onSubmit: (values: { title: string; description: string; imageUrl?: string; imageAlt?: string }) => void;
}

const MAX_TITLE_LENGTH = 68;
const MAX_DESCRIPTION_LENGTH = 600;
const MAX_ALT_LENGTH = 200;

const InterestingFactsAdminItem: FC<InterestingFactsAdminItemProps> = ({
    title,
    description,
    imageUrl,
    imageAlt,
    onSubmit,
}) => {
    const [form] = Form.useForm();
    const [titleCount, setTitleCount] = useState(title.length);
    const [descriptionCount, setDescriptionCount] = useState(description.length);
    const [altCount, setAltCount] = useState(imageAlt?.length || 0);

    const handleImageUpload = (info: any) => {
        if (info.file.status === 'done') {
            message.success(`${info.file.name} file uploaded successfully`);
            form.setFieldValue('imageUrl', info.file.response.url);
        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    };

    const handleSubmit = () => {
        form.validateFields().then((values) => {
            onSubmit(values);
        });
    };

    return (
        <Form
            form={form}
            layout="vertical"
            initialValues={{ title, description, imageUrl, imageAlt }}
            className="interesting-facts-form"
        >
            <Form.Item
                label="Title"
                name="title"
                rules={[{ required: true, message: 'Please input the title!' }]}
            >
                <Input
                    maxLength={MAX_TITLE_LENGTH}
                    showCount={{
                        formatter: ({ count }) => {
                            setTitleCount(count);
                            return `${MAX_TITLE_LENGTH - count} characters remaining`;
                        },
                    }}
                />
            </Form.Item>

            <Form.Item
                label="Description"
                name="description"
                rules={[{ required: true, message: 'Please input the description!' }]}
            >
                <Input.TextArea
                    maxLength={MAX_DESCRIPTION_LENGTH}
                    showCount={{
                        formatter: ({ count }) => {
                            setDescriptionCount(count);
                            return `${MAX_DESCRIPTION_LENGTH - count} characters remaining`;
                        },
                    }}
                />
            </Form.Item>

            <Form.Item
                label="Image"
                name="imageUrl"
                rules={[{ required: true, message: 'Please upload an image!' }]}
            >
                <Upload
                    name="file"
                    onChange={handleImageUpload}
                    maxCount={1}
                    listType="picture"
                >
                    <Input
                        type="button"
                        value="Upload Image"
                        prefix={<UploadOutlined />}
                    />
                </Upload>
            </Form.Item>

            <Form.Item
                label="Image Alt Text"
                name="imageAlt"
            >
                <Input
                    maxLength={MAX_ALT_LENGTH}
                    showCount={{
                        formatter: ({ count }) => {
                            setAltCount(count);
                            return `${MAX_ALT_LENGTH - count} characters remaining`;
                        },
                    }}
                />
            </Form.Item>

            <Form.Item className="form-actions">
                <Button type="primary" onClick={handleSubmit}>
                    {title ? 'Save Changes' : 'Add Fact'}
                </Button>
            </Form.Item>
        </Form>
    );
};

export default InterestingFactsAdminItem; 