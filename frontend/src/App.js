 import React from 'react'; 
 import {BrowserRouter, Routes, Route} from 'react-router-dom';
//  import {FiSettings} from 'react-icons/fi';
//  import { TooltipComponent } from '@syncfusion/ej2-react-popups';
 import { Navbar, Sidebar} from './components'; // ThemeSettings
 import { Ecommerce, Calendar, Employees, Customers, Kanban, Editor, Login} from './pages';
import { useStateContext } from './contexts/ContextProvider';
import './App.css';
 

function App() {
    const {activeMenu, currentMode, isLoggedIn} = useStateContext();
   return isLoggedIn ? 
    <div className={` ${ currentMode === 'Dark' ? 'dark': ''}`}>
        <BrowserRouter>
        <div className="flex relative dark:bg-main-dark-bg">
            {activeMenu ? (
                <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white"> 
                    <Sidebar />
                </div>
            ) : (
                <div className="w-0 dark:bg-secondary-dark-bg">
                    <Sidebar />
                </div>
            )}
            <div className={`background-pattern dark:bg-main-dark-bg bg-main-bg min-h-screen w-full ${
              activeMenu
                ? 'md:ml-72  '
                : 'flex-2 '}`
            }>
                <div className='fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full'>
                    <Navbar />
                    </div>
<div>
    {/* { themeSettings &&  <ThemeSettings /> } */}
    <Routes>

         {/* Dashboard  */}
        <Route path='/' element={<Ecommerce/>} />
        <Route path='/eCommerce' element={<Ecommerce/>}/>
         {/* Pages  */}
        {/* <Route path='/orders' element={<Orders/>}/> */}
        <Route path='/employees' element={<Employees/>}/>
        <Route path='/customers' element={<Customers/>}/>
         {/*  Apps  */}
        <Route path='/kanban' element={<Kanban/>}/>
        <Route path='/editor' element={<Editor/>}/>
        <Route path='/calendar' element={<Calendar/>}/>
         {/*  Charts  */}
        {/* <Route path='/line' element={<Line/>}/>
        <Route path='/area' element={<Area/>}/> */}
    </Routes>
        </div>
        </div>
        </div>
        </BrowserRouter>
    </div> 
    :<Login/>}
 
 
 export default App