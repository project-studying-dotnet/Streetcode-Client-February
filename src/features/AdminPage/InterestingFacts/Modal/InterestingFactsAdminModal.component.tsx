import { FC } from 'react';
import { Card, Typography, Button } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import './InterestingFactsAdminModal.styles.scss';

const { Text, Title } = Typography;

interface InterestingFactsAdminModalProps {
    id: number;
    title: string;
    description: string;
    onEdit: (id: number) => void;
    onDelete: (id: number) => void;
}

const InterestingFactsAdminModal: FC<InterestingFactsAdminModalProps> = ({
    id,
    title,
    description,
    onEdit,
    onDelete,
}) => {
    const truncatedDescription = description.length > 100
        ? `${description.substring(0, 100)}...`
        : description;

    return (
        <Card className="interesting-facts-modal">
            <div className="interesting-facts-modal-content">
                <div className="interesting-facts-modal-text">
                    <Title level={5}>{title}</Title>
                    <Text type="secondary">{truncatedDescription}</Text>
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