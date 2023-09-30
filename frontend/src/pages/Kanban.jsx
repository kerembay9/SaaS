import React, {useState, useEffect} from 'react';
import { KanbanComponent, ColumnsDirective, ColumnDirective } from '@syncfusion/ej2-react-kanban';
import { kanbanDatas, kanbanGrid } from '../data/dummy';
import { Header } from '../components';
import AddCardModal from '../components/AddCardModal';
const Kanban = () => {
// Set the culture to Turkish
  const [kanbanData, setKanbanData] = useState([]);

  useEffect(() => {
    // Define the API endpoint
    const apiUrl = 'http://127.0.0.1:8000/kanban/'; // Replace with your actual API endpoint
    // Fetch data from the API
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        setKanbanData(data); // Update the state with the fetched data
        console.log(data)
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);
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
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mb-3 mr-3"
        onClick={() => setIsModalOpen(true)} 
      >
        Görev ekle
      </button>
      </div>

      <KanbanComponent
      id="kanban"
      dataSource={kanbanData}
      cardSettings={{ contentField:'Summary', headerField:'Id'}}
      keyField="Status"
      actionBegin={handleActionBegin}
      locale="tr"
      >
        <ColumnsDirective>
        {kanbanGrid.map((item, index) => <ColumnDirective key= { index} {...item}/>)}
        </ColumnsDirective>
      </KanbanComponent>

      </div>
      <AddCardModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddCard={handleAddCard}
      />
    </div>
  )
}

export default Kanban