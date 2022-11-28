import React, {useState, useEffect} from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective, Search, Page, Selection, Inject, Edit, Toolbar, Sort, Filter } from '@syncfusion/ej2-react-grids';
import { Header } from '../components';
import { DataManager, WebApiAdaptor, Query} from '@syncfusion/ej2/data';
const Customers = () => {
  const customersGrid = [
    { type: 'checkbox', width: '50' },
    { field: 'id',
    headerText: 'Customer ID',
    width: '120',
    textAlign: 'left',
    isPrimaryKey: true,
    isIdentity: true,
    },
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
      textAlign: 'left',
      editType:"dropdownedit",
    },
  
    { field: 'email',
      headerText: 'Email',
      width: '150',
      textAlign: 'left' },

      { field: 'phone',
      headerText: 'Phone Number',
      width: '150',
      textAlign: 'left' },

    { field: 'created_on',
      headerText: 'Join Date',
      width: '120',
      format: 'yMd',
      textAlign: 'left',
      editType:'datepickeredit',
    },
  ];
  const [customers, setCustomers] = useState()
  const baseURL = "http://127.0.0.1:8000/customers/";
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
      setCustomers(response.result)
      console.log(response);
      },[]);;
  console.log(customers);
   
 }, [])
 
  return (
    <div className=' hero-pattern m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl'>
      <Header category="Page" title="Customers" />
      
      
      <GridComponent
      dataSource={customers}
      allowPaging
      allowSorting
      toolbar={['Add','Edit','Delete','Search']}
      editSettings={{allowDeleting:true,allowAdding:true, allowEditing:true, mode:"Dialog"}}
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

 // useEffect(() => {
    //   axios.post(baseURL, {
    //     name: "client",
    //     surname: "side",
    //     company_name: "a",
    //     industry:"b",
    //     email:"a@hotmail.com",
    //     phone:5321234567,
    //     auth: {
    //       username: 'admin',
    //       password: 'password123'
    //     },
    //    }).then((response) => {
    //       setCustomers(response.data.results);
    //       console.log(customers)
    //   },[]);
    // }, [customers])
