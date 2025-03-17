import { FC, useState, useEffect } from 'react';
import { Button, Modal, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { DragDropContext, Draggable } from 'react-beautiful-dnd';
import InterestingFactsAdminModal from '../Modal/InterestingFactsAdminModal.component';
import InterestingFactsAdminItem from '../Item/InterestingFactsAdminItem.component';
import StrictModeDroppable from '@/app/common/components/StrictModeDroppable';
import { Fact } from '@/models/streetcode/text-contents.model';
import useMobx from '@/app/stores/root-store';
import './InterestingFactsAdminBlock.styles.scss';

interface InterestingFactsAdminItemValues {
    title: string;
    description: string;
    imageUrl?: string;
    imageAlt?: string;
}

const InterestingFactsAdminBlock: FC = () => {
    const { factsStore } = useMobx();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingFact, setEditingFact] = useState<Fact | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchFacts = async () => {
            setLoading(true);
            try {
                await factsStore.fetchAllFacts();
            } catch (error) {
                message.error('Failed to fetch facts');
            } finally {
                setLoading(false);
            }
        };

        fetchFacts();
    }, []);

    const handleDragEnd = (result: any) => {
        if (!result.destination) return;

        const items = Array.from(factsStore.getFactArray);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        console.log(`modal with title "${reorderedItem.title}" moved to position ${result.destination.index + 1}`);
        
        // Update the order in the store
        items.forEach((item, index) => {
            factsStore.updateFactInMap({ ...item, id: index + 1 });
        });
    };

    const handleAdd = () => {
        setEditingFact(null);
        setIsModalVisible(true);
    };

    const handleEdit = (id: number) => {
        const factToEdit = factsStore.factMap.get(id);
        if (factToEdit) {
            setEditingFact(factToEdit);
            setIsModalVisible(true);
        }
    };

    const handleDelete = async (id: number) => {
        try {
            await factsStore.deleteFact(id);
            message.success('Fact deleted successfully');
        } catch (error) {
            message.error('Failed to delete fact');
        }
    };

    const transformValuesToFact = (values: InterestingFactsAdminItemValues): Omit<Fact, 'id'> => {
        return {
            title: values.title,
            factContent: values.description,
            imageId: 0, // This should be set when image is uploaded
            image: undefined
        };
    };

    const handleSubmit = async (values: InterestingFactsAdminItemValues) => {
        try {
            const factData = transformValuesToFact(values);
            if (editingFact) {
                await factsStore.updateFact({ ...editingFact, ...factData });
                message.success('Fact updated successfully');
            } else {
                factsStore.addFact(factData as Fact);
                message.success('Fact created successfully');
            }
            setIsModalVisible(false);
            setEditingFact(null);
        } catch (error) {
            message.error(editingFact ? 'Failed to update fact' : 'Failed to create fact');
        }
    };

    const handleModalClose = () => {
        setIsModalVisible(false);
        setEditingFact(null);
    };

    const facts = factsStore.getFactArray;

    return (
        <div className="interesting-facts-admin-block">
            <div className="interesting-facts-header">
                <h2>Interesting Facts</h2>
                <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={handleAdd}
                >
                    Add New Fact
                </Button>
            </div>

            <DragDropContext onDragEnd={handleDragEnd}>
                <StrictModeDroppable droppableId="facts">
                    {(provided) => (
                        <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            className="facts-list"
                        >
                            {facts.map((fact, index) => (
                                <Draggable
                                    key={fact.id}
                                    draggableId={fact.id.toString()}
                                    index={index}
                                >
                                    {(provided) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                        >
                                            <InterestingFactsAdminModal
                                                id={fact.id}
                                                title={fact.title}
                                                description={fact.factContent}
                                                imageUrl={fact.image?.base64}
                                                onEdit={handleEdit}
                                                onDelete={handleDelete}
                                            />
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </StrictModeDroppable>
            </DragDropContext>

            <Modal
                title={editingFact ? "Edit Fact" : "Add New Fact"}
                open={isModalVisible}
                onCancel={handleModalClose}
                footer={null}
                destroyOnClose
            >
                <InterestingFactsAdminItem
                    title={editingFact?.title || ''}
                    description={editingFact?.factContent || ''}
                    imageUrl={editingFact?.image?.base64}
                    imageAlt={editingFact?.image?.imageDetails?.alt}
                    onSubmit={handleSubmit}
                />
            </Modal>
        </div>
    );
};

export default InterestingFactsAdminBlock; 