import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import logo from './../data/painregions.png';
import { Header } from '../components';
import ImageMarker from 'react-image-marker';
 

const CustomerDetail = () => {
  const [selectedValue, setSelectedValue] = useState('');
  const handleSelectChange = (event) => {
    console.log(event)
    setSelectedValue(event.target.value);
  };
  const CustomMarker = (props) => {
    return (
      <div style={{ display: "flex" }}>
        <div class="w-5 h-5 rounded-full bg-red-900 flex items-center justify-center pl-2 pb-1">
          <select
            value={selectedValue}
            className="absolute top-0 left-0 appearance-none border-none bg-transparent w-full h-full"
            onChange={(e) => {
              handleSelectChange(e);
              setMarkers(
                  markers.map((each) => {
                    console.log("each", each);
                    console.log("props", props);
                    if (each.top === props.top && each.left === props.left) {
                      return { ...each, textMark: e.target.value };
                    } else {
                      return each;
                    }
                    
                  })
                );
                // setSelectedValue(e.target.value);
              }}
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
            </div>
           {/* props.pain_level */}
      </div>
    );
};
   const [markers, setMarkers] = useState([]);
   const { id } = useParams();
   const [patient, setPatient] = useState(null);
   const fetchClickData= async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/customers/${id}/click-instance/`);
      const data = await response.json();
      const convertedData = data.map(item => ({
        ...item,
        left: parseFloat(item.x),
        top: parseFloat(item.y),
      }));
      setMarkers(convertedData);
      console.log(convertedData)
    } catch (error) {
      console.error('Error fetching marker data', error);
    }
  };
   const handleAddMarker = (marker) =>{
    // setMarkers([...markers, marker])
    console.log(JSON.stringify({ "customer": id ,"x": marker.left , "y": marker.top }))
    fetch(`http://127.0.0.1:8000/customers/click-instance/`,{
      method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ "customer": id ,"x": marker.left , "y": marker.top })
          })
          .then((response) => {
              fetchClickData();
              if (!response.ok) {
                throw new Error(`Failed adding point: ${response.statusText}`);
              }
          })
          .catch((error) => {
              console.error('Error adding point:', error);
          })


        };
    
    //1. create a field for the markers in dB DONE
    //2. save the markers to the database
    //3. fetch markers from dB

   useEffect(() => {
     const fetchData = async () => {
       try {
         const response = await fetch(`http://127.0.0.1:8000/customers/${id}/`);
         const data = await response.json();
         setPatient(data);
       } catch (error) {
         console.error('Error fetching patient data', error);
       }
     };
     const fetchClickData= async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/customers/${id}/click-instance/`);
        const data = await response.json();
        setMarkers(data);
      } catch (error) {
        console.error('Error fetching marker data', error);
      }
    };
 
     fetchData();
     fetchClickData();
   }, [id]);
   if (!patient) {
     return (
       <div>
         <h1>Loading Patient Data...</h1>
       </div>
     );
   }
   return (
    <div className=' m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl items-center justify-center min-h-screen'>
      <Header category="Sayfalar" title="Müşteri Detayları" />     
      <div className=' flex flex-row text-justify items-center justify-center text-lg'>
        <div className=' flex flex-row text-justify items-center justify-center text-lg'>
          
                <div className='flex flex-col p-2'>
            <p>Müşteri No: {patient.id}</p>
            <p>İsim: {patient.name}</p>
                </div>
                <div className='flex flex-col p-2'>
            <p>Doğum Tarihi: {patient.dateOfBirth}</p>
            <p>Detay bir şey:</p>
                </div>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center">
      <ImageMarker
      src={logo}
      markers={markers}
      onAddMarker={(marker) => handleAddMarker(marker)}
      markerComponent={CustomMarker}
      />
      </div>
    </div>
   );
};

export default CustomerDetail;
