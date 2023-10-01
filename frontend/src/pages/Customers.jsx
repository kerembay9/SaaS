import React, {useEffect, useState} from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective, Page, Selection, Inject, Edit, Toolbar, Sort, Filter } from '@syncfusion/ej2-react-grids';
import { customersGrid} from '../data/dummy'; // customersData
import { Header } from '../components';

// TO-DO : Tarih değerleri server'a düzgün gitmeyor olabilir
const Customers = () => {
  const [customersData, setCustomersData] = useState([]);
  const [action, setAction] = useState('add')

  useEffect(() => {
    fetchDataFromServer();
  }, []);
  const fetchDataFromServer = () => {
    const apiUrl = 'http://127.0.0.1:8000/customers/'; // Replace with your actual API endpoint
    // Fetch data from the API
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        setCustomersData(data); // Update the state with the fetched data
        console.log(data)
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }
  const handleActionBegin = (args) => {
    console.log(args.requestType)
    switch (args.requestType) {
      case 'add':
        setAction('add');
        return;
      case 'beginEdit':
        setAction('update');
        return;
      case 'delete':
          const selectedCustomers = args.data;
          const confirmDelete = window.confirm('Bu müşteri/müşterileri silmek istediğinizden emin misiniz?');
          if (!confirmDelete) {
            console.log('cancelled deletion')
            args.cancel = true;
            return;
          } else {
          const customerIds = selectedCustomers.map((customer) => customer.id);
          console.log(customerIds)
          fetch(`http://127.0.0.1:8000/customers/bulk-delete-customers/`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              customer_ids: customerIds
            })
          })
            .then((response) => {
              if (!response.ok) {
                throw new Error(`Failed to delete event: ${response.statusText}`);
              }
            })
            .catch((error) => {
              console.error('Error deleting customer:', error);
            });
        return;}
      case 'save':
        switch(action){
          case 'update':
            const apiUrl = `http://127.0.0.1:8000/customers/${args.data.id}/`;
            fetch(apiUrl,{
              method: 'PUT',
              headers: {
                'Content-Type' : 'application/json',
              },
              body: JSON.stringify(args.data)
            })
              .then((response) => response.json())
              .then((data) => {
                if ('id' in data) {
                setCustomersData(data);
                console.log('set data:',data)
              }
              console.log('unset data:',data)
            })
              .catch((error) => {
                console.error('Error fetching data:', error); 
              });
            break;
          default: //case add
            const addUrl = 'http://127.0.0.1:8000/customers/';
            fetch(addUrl,{
              method: 'POST',
              headers: {
                'Content-Type' : 'application/json',
              },
              body: JSON.stringify(args.data)
            })
              .then((response) => response.json())
              .then((data) => {
                if ('id' in data) {
                setCustomersData(data);
                console.log('set data:',data)
              }
              console.log('unset data:',data)
            })
              .catch((error) => {
                console.error('Error fetching data:', error); 
              });
              break;
          }
        break;
      case 'refresh':
        fetchDataFromServer();
        break;
      default:
        return;
      }
  };
  return (
    <div className=' hero-pattern m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl'>
      <Header category="Page" title="Customers" />
      
      
      <GridComponent
      dataSource={customersData}
      allowPaging
      allowSorting
      toolbar={['Edit', 'Delete', 'Update', 'Cancel','Search']}
      editSettings={{allowDeleting:true, allowEditing:true, allowAdding: true}}
      width="auto"
      actionBegin={handleActionBegin}
      locale='tr-TR'
      >
        <ColumnsDirective>
        {customersGrid.map((item,index)=>(
          <ColumnDirective key={index} {...item}/>
        ))}
        </ColumnsDirective>
        <Inject services={[Page, Selection, Sort, Filter, Edit, Toolbar]}/>
      </GridComponent>
    </div>
  )
}

export default Customers