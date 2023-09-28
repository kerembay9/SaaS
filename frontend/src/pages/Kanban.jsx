import React, {useState} from 'react';
import { KanbanComponent, ColumnsDirective, ColumnDirective } from '@syncfusion/ej2-react-kanban';
import { kanbanData, kanbanGrid } from '../data/dummy';
import { Header } from '../components';
import AddCardModal from '../components/AddCardModal';

const Kanban = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleActionBegin = (event) => {
    // Log the event type to the console
    console.log('Event Type:', event.requestType);
  };
  const handleAddCard = (card) => {
    // Handle adding the card to your data source (e.g., kanbanData)
    // ...
    setIsModalOpen(true);
  };
  return (
    <div>
    <div className='hero-pattern m-22 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl'>
      <Header
      category="App"
      title="Kanban"
      />
      <div className='flex flex-row-reverse space-x-2'> 
        <AddCardModal
        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-3 mb-3'
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddCard={handleAddCard}
      />
      </div>

      <KanbanComponent
      id="kanban"
      dataSource={kanbanData}
      cardSettings={{ contentField:'Summary', headerField:'Id'}}
      keyField="Status"
      actionBegin={handleActionBegin}
      >
        <ColumnsDirective>
        {kanbanGrid.map((item, index) => <ColumnDirective key= { index} {...item}/>)}
        </ColumnsDirective>
      </KanbanComponent>

      </div>
    </div>
  )
}

export default Kanban