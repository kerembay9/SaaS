import React, {useState, useEffect} from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective, ContextMenu, Page, Edit, Inject, Search, Toolbar } from '@syncfusion/ej2-react-grids';
import { Header } from '../components';
import { DataManager, WebApiAdaptor, Query} from '@syncfusion/ej2/data';
const Employees = () => {
  const employeesGrid = [
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
  const [employees, setEmployees] = useState()
  const baseURL = "http://127.0.0.1:8000/employees/";
  useEffect(() => {
   new DataManager({
     adaptor: new WebApiAdaptor(),
     insertUrl: baseURL,
     removeUrl: baseURL,
     updateUrl: baseURL,
     url: baseURL,
     authentication: {
       username: 'admin',
       password: 'password123'
     }, 
     'content-type': 'application/json',    
   }).executeQuery(new Query())
   .then((response) => {
       setEmployees(response.result)
       console.log(response);
       },[]);;
   console.log(employees);
    
  }, [])
  
  return (
    <div className=' hero-pattern m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl'>
      <Header category="Page" title="Employees" />
      <GridComponent
      dataSource={employees}
      allowPaging
      allowSorting
      toolbar={['Add','Edit','Delete','Search']}
      editSettings={{allowDeleting:true,allowAdding:true, allowEditing:true, mode:"Dialog"}}
      width="auto"
      >
        <ColumnsDirective>
        {employeesGrid.map((item,index)=>(
          <ColumnDirective key={index} {...item}/>
        ))}
        </ColumnsDirective>
        <Inject services={[ContextMenu, Page, Search, Edit, Toolbar]}/>
      </GridComponent>
    </div>
  )
}

export default Employees