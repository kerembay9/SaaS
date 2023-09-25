import React, {useEffect, useState} from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective, ContextMenu, Page, Edit, Inject, Search, Toolbar } from '@syncfusion/ej2-react-grids';
import {  employeesGrid } from '../data/dummy';
import { Header } from '../components';
const Employees = () => {
    const [employeeData, setEmployeeData] = useState([]);
    useEffect(() => {
      // Define the API endpoint
      const apiUrl = 'http://127.0.0.1:8000/employees/'; // Replace with your actual API endpoint
      // Fetch data from the API
      fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
          setEmployeeData(data); // Update the state with the fetched data
          console.log(data)
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
    }, []);
    const handleActionBegin = (args) => {
      if (args.requestType === 'delete') {
        const selectedEmployees = args.data;
        const confirmDelete = window.confirm('Bu çalışan/çalışanları sistemden çıkarmak istediğinizden emin misiniz?');
        if (!confirmDelete) {
          // The user canceled the deletion
          return;
        }
        const employeeIds = selectedEmployees.map((employee) => employee.id);
        console.log(employeeIds)
        // Make an HTTP DELETE request to your Django backend
        fetch(`http://127.0.0.1:8000/employees/bulk-delete-employees/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            employee_ids: employeeIds
          })
        })
          .then((response) => response.json())
          .then((data) => {
            // Handle success or error response from the backend
            console.log(data.message);
          })
          .catch((error) => {
            console.error('Error deleting employee:', error);
          });
      }
    };
  return (
    <div className=' hero-pattern m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl'>
      <Header category="Page" title="Employees" />
      <GridComponent
      dataSource={employeeData}
      allowPaging
      allowSorting
      toolbar={['Delete', 'Search']}
      editSettings={{allowDeleting:true, allowEditing:true}}
      width="auto"
      actionBegin={handleActionBegin}
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