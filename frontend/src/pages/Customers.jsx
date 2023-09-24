import React, {useEffect, useState} from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective, Page, Selection, Inject, Edit, Toolbar, Sort, Filter } from '@syncfusion/ej2-react-grids';
import { customersGrid} from '../data/dummy'; // customersData
import { Header } from '../components';

const Customers = () => {
  const [customersData, setCustomersData] = useState([]);
  useEffect(() => {
    // Define the API endpoint
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
  }, []);
  

  return (
    <div className=' hero-pattern m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl'>
      <Header category="Page" title="Customers" />
      
      
      <GridComponent
      dataSource={customersData}
      allowPaging
      allowSorting
      toolbar={['Delete']}
      editSettings={{allowDeleting:true, allowEditing:true}}
      width="auto"
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