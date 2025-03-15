import { FC, useState } from 'react';
import { Button, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import InterestingFactsAdminModal from '../Modal/InterestingFactsAdminModal.component';
import InterestingFactsAdminItem from '../Item/InterestingFactsAdminItem.component';
import './InterestingFactsAdminBlock.styles.scss';

interface InterestingFact {
    id: number;
    title: string;
    description: string;
    imageUrl?: string;
    imageAlt?: string;
}

const EMPTY_FACT = {
    title: '',
    description: '',
    imageUrl: undefined,
    imageAlt: undefined,
};

const InterestingFactsAdminBlock: FC = () => {
    const [facts, setFacts] = useState<InterestingFact[]>([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingFact, setEditingFact] = useState<InterestingFact | null>(null);

    const handleDragEnd = (result: any) => {
        if (!result.destination) return;

        const items = Array.from(facts);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        setFacts(items);
    };

    const handleAdd = () => {
        setEditingFact(null);
        setIsModalVisible(true);
    };

    const handleEdit = (id: number) => {
        const factToEdit = facts.find(fact => fact.id === id);
        if (factToEdit) {
            setEditingFact(factToEdit);
            setIsModalVisible(true);
        }
    };

    const handleDelete = (id: number) => {
        setFacts(facts.filter(fact => fact.id !== id));
    };

    const handleSubmit = (values: Omit<InterestingFact, 'id'>) => {
        if (editingFact) {
            setFacts(facts.map(fact =>
                fact.id === editingFact.id
                    ? { ...fact, ...values }
                    : fact
            ));
        } else {
            const newFact = {
                id: Date.now(),
                ...values
            };
            setFacts([...facts, newFact]);
        }
        setIsModalVisible(false);
        setEditingFact(null);
    };

    const handleModalClose = () => {
        setIsModalVisible(false);
        setEditingFact(null);
    };

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
                <Droppable droppableId="facts">
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
                                                description={fact.description}
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
                </Droppable>
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
                    description={editingFact?.description || ''}
                    imageUrl={editingFact?.imageUrl}
                    imageAlt={editingFact?.imageAlt}
                    onSubmit={handleSubmit}
                />
            </Modal>
        </div>
    );
};

export default InterestingFactsAdminBlock; 