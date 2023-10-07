import React, {useEffect, useState} from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective, ContextMenu, Page, Edit, Inject, Search, Toolbar } from '@syncfusion/ej2-react-grids';
import {  accountingGrid } from '../data/dummy';
import { Header } from '../components';
const Accounting = () => {
    const [accountingData, setAccountingData] = useState([]);
    const [action, setAction] = useState('add')
    useEffect(() => {
      fetchDataFromServer();
    }, []);
    const fetchDataFromServer = () => {
      const apiUrl = 'http://127.0.0.1:8000/accounting/';
      fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
          setAccountingData(data);
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
    }
    const handleActionBegin = (args) => {
      console.log(args.requestType)
      if (args.requestType === 'add'){
        setAction('add');
        return;
      } else if (args.requestType === 'beginEdit'){
        setAction('update');
        return;
      } else if (args.requestType === 'delete') {
        const selectedAccounting = args.data;
        const confirmDelete = window.confirm('Bu çalışan/çalışanları sistemden çıkarmak istediğinizden emin misiniz?');
        if (!confirmDelete) {
          // The user canceled the deletion
          console.log('cancelled deletion')
          args.cancel = true;
          return;
        } else {
        const accountingIds = selectedAccounting.map((accounting) => accounting.id);
        console.log(accountingIds)
        // Make an HTTP DELETE request to your Django backend
        // TO-DO: depending on arg req type set action
        fetch(`http://127.0.0.1:8000/accounting/bulk-delete-accounting/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            accounting_ids: accountingIds
          })
        })
          .then((response) => {
            if (response.ok){
              console.log('successfully deleted')
            }})
          .catch((error) => {
            console.error('Error deleting accounting:', error);
          });
        }} else if (args.requestType === 'save') {
        if (action === 'add'){
        const apiUrl = 'http://127.0.0.1:8000/accounting/';
        fetch(apiUrl,{
          method: 'POST',
          headers: {
            'Content-Type' : 'application/json',
          },
          body: JSON.stringify(args.data)
        })
          .then((response) => response.json())
          .then((data) => {
            if ('id' in data) {
            setAccountingData(data);
            console.log('set data:',data)
          }
          console.log('unset data:',data)
        })
          .catch((error) => {
            console.error('Error fetching data:', error); 
          });
      }
      else if ( action === 'update'){
        const apiUrl = `http://127.0.0.1:8000/accounting/${args.data.id}/`;
        console.log(apiUrl)
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
            setAccountingData(data);
            console.log('set data:',data)
          }
          console.log('unset data:',data)
        })
          .catch((error) => {
            console.error('Error fetching data:', error); 
          });
      }
      }
      else if (args.requestType === 'refresh') {
        fetchDataFromServer();
      }
    };
  return (
    <div className=' m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl'>
      <Header category="Sayfalar" title="Ön Muhasebe" />
      <GridComponent
      dataSource={accountingData}
      allowPaging
      allowSorting
      toolbar={['Add', 'Edit', 'Delete', 'Update', 'Cancel','Search']}
      editSettings={{allowDeleting:true, allowEditing:true, allowAdding: true}}
      width="auto"
      actionBegin={handleActionBegin}
      >
        <ColumnsDirective>
        {accountingGrid.map((item,index)=>(
          <ColumnDirective key={index} {...item}/>
        ))}
        </ColumnsDirective>
        <Inject services={[ContextMenu, Page, Search, Edit, Toolbar]}/>
      </GridComponent>
    </div>
  )
}

export default Accounting