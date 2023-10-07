import React, {useState, useEffect} from 'react';
import { KanbanComponent, ColumnsDirective, ColumnDirective } from '@syncfusion/ej2-react-kanban';
import {  kanbanGrid } from '../data/dummy';
import { Header } from '../components';
import AddCardModal from '../components/AddCardModal';
const Kanban = () => {
  const [kanbanData, setKanbanData] = useState([]);
  const fetchKanbanData  =  () => {
        const apiUrl = 'http://127.0.0.1:8000/kanban/';
        fetch(apiUrl)
          .then((response) => response.json())
          .then((data) => {
            const renamedData = data.map(item => {
              const { id, ...rest } = item;
              return { Id: `Görev ${id}`,id: id, ...rest };
            });
            setKanbanData(renamedData);
            console.log(data)
          })
          .catch((error) => {
            console.error('Error fetching data:', error);
          });
  }
  useEffect(() => {
      fetchKanbanData();
  }, []);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleActionBegin = (args) => {
    switch(args.requestType){
      case 'cardChange':
        const apiUrl = `http://127.0.0.1:8000/kanban/${args.changedRecords[0].id}/`;
            fetch(apiUrl,{
              method: 'PUT',
              headers: {
                'Content-Type' : 'application/json',
              },
              body: JSON.stringify(args.changedRecords[0])
            })
              .then((response) => response.json())
              .then((data) => {
                console.log(data)
                if ('id' in data) {
                  const renamedData =  { Id: `Görev ${data.id}`, ...data };
                  setKanbanData(renamedData); 
                  fetchKanbanData();
              }
            })
              .catch((error) => {
                console.error('Error fetching data:', error); 
              });
        break;
      case 'cardRemove':
        fetch(`http://127.0.0.1:8000/kanban/${args.deletedRecords[0].id}/`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(args.deletedRecords[0])
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error(`Failed to delete event: ${response.statusText}`);
            }
          })
          .catch((error) => {
            console.error('Error deleting customer:', error);
          });
        break;
      default:
        break;
    }
    console.log('Event Type:', args.requestType);
  };

  return (
    <div>
    <div className=' m-22 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl'>
      <Header
      category="Uygulamalar"
      title="İş Akışı"
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
        refetch = {() => fetchKanbanData()}
      />
    </div>
  )
}

export default Kanban