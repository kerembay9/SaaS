import React from 'react';
import { GoPrimitiveDot} from 'react-icons/go';
import { Stacked, Button, Sparkline} from '../components';
import { earningData, SparklineAreaData} from '../data/dummy';
import { useStateContext } from '../contexts/ContextProvider';

const Ecommerce = () => {
  const { currentColor,currentMode} = useStateContext();
  return (
    <div className='mt-12 '>
      <div className='flex flex-wrap lg:flex-nowrap justify-center '>
        <div style={ currentMode === "Dark" 
        ?{borderColor:currentColor}
        :{borderColor: "black"}
      }
        className={` border-1 bg-white dark:text-gray-200
        dark:bg-secondary-dark-bg h-44 gap-10 w-96  p-8 pt-6 m-3 rounded-3xl `}>
          <div className='flex justify-between  items-center'>
            <div className="rounded-3xl p-1.5 w-full">
            <p className='font-extrabold italic text-xl text-black dark:text-gray-200 pl-5 pr-5'>Earnings :</p>
            <p className='text-2xl italic mt-2 pl-5 pr-5 text-black dark:text-gray-200 '>$1234,567.00</p>
            </div>
          </div>
          <div className='mt-2 ml-6'>
              <Button
            color="white"
            bgColor={currentColor}
            text="Download"
            borderRadius="10px"
            size="md"/>
            </div>
        </div>
        

        <div className='flex m-3 flex-wrap justify-center gap-1 items-center'>
          {earningData.map((item)=>(
            <div style={ currentMode === "Dark" 
            ?{borderColor:currentColor}
            :{borderColor: "black"}}
             key={item.title} className=" border-1 h-44 dark:hero-pattern  bg-white dark:text-gray-200 dark:bg-secondary-dark-bg mr-4 md:w-56 p-4 pt-5 rounded-2xl"
            >
              <button type='button'
              style={{color:item.iconColor, backgroundColor: item.iconBg, borderColor:currentColor}}
              className={`border-4 text-2xl opacity-0.9 rounded-full p-4 hover:drop-shadow-xl`}>
                {item.icon}
              </button>
              <p className='mt-3'>
                <span className='text-lg font-semibold'>
                  {item.amount}
                </span>
                <span className={`text-sm text-${item.pcColor} ml-2`}>
                  {item.percentage}
                </span>
              </p>
              <p className='text-2xl text-extrabold italic text-black dark:text-gray-400 mt-1 '>{item.title}</p>
            </div>
          ))}
                  </div>
      </div>
      <div className='flex gap-10 flex-wrap justify-center'>
            <div style={ currentMode === "Dark" 
            ? {color:currentColor, borderColor:currentColor}
            :{color: "black", borderColor: "black"}}
             className='border-1 dark:hero-pattern bg-white dark:text-gray-200 dark:bg-secondary-dark-bg m-3 p-4 rounded-2xl md:w-780'>
              <div className='flex justify-between'>
                <p className='font-semibold text-xl'> Revenue Updates</p>
                <div className=' flex items-center gap-4  mr-8 mt-3 p-3 pr-12 pl-10 rounded-xl'>
                  <p className='flex text-xl items-center gap-2 text-red-400 hover:drop-shadow-2xl'>
                  <span> <GoPrimitiveDot/></span>
                  <span> Expense </span></p>
                  <p className='flex  text-xl items-center gap-2 text-green-400 hover:drop-shadow-2xl '>
                  <span> <GoPrimitiveDot/></span>
                  <span> Budget </span></p>
                </div>
              </div>
              <div className='mt-10 flex gap-10 flex-wrap justify-center'>
                <div className='border-r-1 border-color m-4 pr-10'>
                  <div>
                    <p>
                      <span className='text-3xl font-semibold '>
                        93.400$
                      </span>
                      <span className='p-1.5 hover:drop-shadow-xl cursor-pointer rounded-full text-white bg-green-400 ml-3'>
                        25%
                      </span>
                    </p>
                    <p className='text-gray-500'> Budget
                    </p>
                  </div>
                  <div>
                    <p>
                      <span className='text-3xl font-semibold '>
                        4.400$
                      </span>
                    </p>
                    <p className='text-gray-500'> Expense
                    </p>
                  </div>
                  <div className='mt-5'>
              <Sparkline
               currentColor={currentColor}
               id="line-sparkline"
               type="Line"
               height="80px"
               width="250px"
               data={SparklineAreaData}
               color={currentColor}
              />
              </div>
              <div className='mt-10'>
                <Button 
                color="white"
                bgColor={currentColor}
                text="Download Report"
                borderRadius="10px"
                />
              </div>
                </div>
                <div>
                  <Stacked
                  width="320px"
                  height="360px" />

                </div>

              
              
            </div>
            </div>
            
      </div>
    </div>
  )
}

export default Ecommerce