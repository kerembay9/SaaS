import React from 'react';
import { ChartComponent, SeriesDirective, Inject, Legend, Category, StackingColumnSeries, Tooltip, SeriesCollectionDirective } from '@syncfusion/ej2-react-charts';
import { stackedCustomSeries, stackedPrimaryXAxis, stackedPrimaryYAxis } from '../../data/dummy';
import { useStateContext } from '../../contexts/ContextProvider';

const Stacked = ({width,height}) => {
  const { currentColor} = useStateContext();
  return (
    <ChartComponent
    width={width}
    height={height}
    id="charts"
    primaryXAxis={ stackedPrimaryXAxis }
    primaryYAxis={ stackedPrimaryYAxis }
    chartArea={ {border:{width:0}}}
    tooltip={{enable:true}}
    legendSettings={{ background: 'white'}}
    palettes={[currentColor, "#363d46"]}
    
     
    >
      <Inject services={[Legend, Category, StackingColumnSeries, Tooltip]} />
      <SeriesCollectionDirective>
        {stackedCustomSeries.map((item,index)=><SeriesDirective  key ={index} {...item}/>)}
      </SeriesCollectionDirective>
    </ChartComponent>
  )
}

export default Stacked