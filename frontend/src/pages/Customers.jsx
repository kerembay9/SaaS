import React, {useEffect, useState} from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective, Search, Page, Selection, Inject, Edit, Toolbar, Sort, Filter } from '@syncfusion/ej2-react-grids';
import { Header } from '../components';
import axios from 'axios';

const Customers = () => {
  const customersGrid = [
    { type: 'checkbox', width: '50' },
  
    { field: 'name',
      headerText: 'Name',
      width: '150',
      textAlign: 'left' },
    { field: 'surname',
      headerText: 'Surname',
      width: '130',
      textAlign: 'left',
    },
    {
      field: 'company_name',
      headerText: 'Company',
      width: '100',
      format: 'C2',
      textAlign: 'left' },
    { field: 'industry',
      headerText: 'Industry',
      width: '100',
      textAlign: 'left' },
  
    { field: 'email',
      headerText: 'Email',
      width: '150',
      textAlign: 'left' },
    { field: 'created_on',
      headerText: 'Join Date',
      width: '120',
      format: 'yMd',
      textAlign: 'left',
    },
  
    { field: 'id',
      headerText: 'Customer ID',
      width: '120',
      textAlign: 'left',
      isPrimaryKey: true,
    },
  
  ];
  const [customers, setCustomers] = useState()
  const baseURL = "http://127.0.0.1:8000/customers/";
   const handleDelete = (id) => {
    axios.delete(baseURL.concat(id,'/'), {
      auth: {
        username: 'admin',
        password: 'password123'
      },
     headers: {
       'Content-type': 'application/json',
     },
     }).then((response) => {
        setCustomers(response.data.results);
        console.log(customers)
    },[]);
  }
    useEffect(() => {
      axios.get(baseURL, {
        auth: {
          username: 'admin',
          password: 'password123'
        },
       headers: {
         'Content-type': 'application/json',
       },
       }).then((response) => {
          setCustomers(response.data.results);
          console.log(customers)
      },[]);
    }, [])

  return (
    <div className=' hero-pattern m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl'>
      <Header category="Page" title="Customers" />
      
      
      <GridComponent
      dataSource={customers}
      allowPaging
      allowSorting
      toolbar={['Delete','Search']}
      editSettings={{allowDeleting:true, allowEditing:true}}
      width="auto"
      >
        <ColumnsDirective>
        {customersGrid.map((item,index)=>(
          <ColumnDirective key={index} {...item}/>
        ))}
        </ColumnsDirective>
        <Inject services={[Page, Selection, Sort, Filter, Edit, Search, Toolbar]}/>
      </GridComponent>
    </div>
  )
}

export default Customers