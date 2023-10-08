import React, { useEffect} from 'react';
import {AiOutlineMenu } from 'react-icons/ai';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import { useStateContext } from '../contexts/ContextProvider';


const NavButton = ({title, customFunc, icon, color, dotColor}) => (
  <TooltipComponent content={title} position="BottomCenter">
    <button type='button' onClick={customFunc}style={{color}} className="relative text-xl rounded-full p-3 hover:bg-light-gray">
      <span style={{ background: dotColor}}
      className="absolute inline-flex rounded-full h-2 w-2 right-2 top-2 "/>
        {icon}
    </button>
  </TooltipComponent>
)

const Navbar = () => {
  const {activeMenu, setActiveMenu, setIsLoggedIn,screenSize, setScreenSize, currentColor, user} = useStateContext();

  useEffect(()=>{
    const handleResize = () => setScreenSize(window.innerWidth);
    window.addEventListener('resize', handleResize);

    handleResize();

    return () => window.removeEventListener('resize',handleResize);
  },[setScreenSize, setActiveMenu]);
 
useEffect(()=>{
  if( screenSize <= 900){
    setActiveMenu(false);
  }else{
    setActiveMenu(true);
  }
},[screenSize,setActiveMenu])
  const handleActiveMenu = () => setActiveMenu(!activeMenu);
  return (
    <div className="flex justify-between p-2 md:mx-6 relative">
      <NavButton title="Menu" customFunc={handleActiveMenu} color={currentColor} icon={<AiOutlineMenu />} />
    
    <div className='flex '>
    <TooltipComponent

    position="BottomCenter">
    <div className='flex items-center p-1 gap-2 rounded-lg'>
    <p>
      <span className='text-gray-200 text-14'>Merhaba, </span> {' '}
      <span className='text-gray-200 font-bold ml-1 text-14'>{user}</span>
    </p>
    <button className='text-gray-200 font-bold ml-1 text-14 cursor-pointer'onClick={()=> setIsLoggedIn(false)}>Çıkış</button>
    </div>
    </TooltipComponent>
    </div>
    </div>

  )
}

export default Navbar