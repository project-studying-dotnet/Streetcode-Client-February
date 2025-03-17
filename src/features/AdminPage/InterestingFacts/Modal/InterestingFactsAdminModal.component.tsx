import { FC, useEffect, useState } from 'react';
import { Card, Typography, Button, Image } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import useMobx from '@/app/stores/root-store';
import base64ToUrl from '@/app/common/utils/base64ToUrl.utility';
import './InterestingFactsAdminModal.styles.scss';

const { Text, Title } = Typography;

interface InterestingFactsAdminModalProps {
    id: number;
    title: string;
    description: string;
    imageId?: number;
    onEdit: (id: number) => void;
    onDelete: (id: number) => void;
}

const InterestingFactsAdminModal: FC<InterestingFactsAdminModalProps> = ({
    id,
    title,
    description,
    imageId,
    onEdit,
    onDelete,
}) => {
    const { imagesStore } = useMobx();
    const [imageUrl, setImageUrl] = useState<string>();

    useEffect(() => {
        if (imageId) {
            const image = imagesStore.getImage(imageId);
            if (image) {
                setImageUrl(base64ToUrl(image.base64, image.mimeType));
            } else {
                imagesStore.fetchImage(imageId);
                // Set up an interval to check if the image has been loaded
                const interval = setInterval(() => {
                    const loadedImage = imagesStore.getImage(imageId);
                    if (loadedImage) {
                        setImageUrl(base64ToUrl(loadedImage.base64, loadedImage.mimeType));
                        clearInterval(interval);
                    }
                }, 100);

                // Clean up interval after 5 seconds
                setTimeout(() => clearInterval(interval), 5000);
            }
        }
    }, [imageId]);

    return (
        <Card className="interesting-facts-modal">
            <div className="interesting-facts-modal-content">
                {imageUrl && (
                    <div className="interesting-facts-modal-image">
                        <Image
                            src={imageUrl}
                            alt={title}
                            preview={false}
                            width={120}
                            height={120}
                            style={{ objectFit: 'cover' }}
                        />
                    </div>
                )}
                <div className="interesting-facts-modal-text">
                    <Title level={5}>{title}</Title>
                    <Text type="secondary">{description}</Text>
                </div>
                <div className="interesting-facts-modal-actions">
                    <Button
                        type="text"
                        icon={<EditOutlined />}
                        onClick={() => onEdit(id)}
                        className="edit-button"
                    />
                    <Button
                        type="text"
                        icon={<DeleteOutlined />}
                        onClick={() => onDelete(id)}
                        className="delete-button"
                        danger
                    />
                </div>
            </div>
        </Card>
    );
};

export default InterestingFactsAdminModal; 