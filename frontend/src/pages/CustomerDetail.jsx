import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import logo from './../data/painregions.png';
import { Header } from '../components';
import ImageMarker from 'react-image-marker';
 

const CustomerDetail = () => {
  const [message, setMessage] = useState(''); // State to store the message
  const handleSelectChange = (event, click_inst_id) => {
    if (event.target.value === 'del') {
      // id and click instance id are different solve it and rest is easy
      fetch(`http://127.0.0.1:8000/customers/${id}/click-instance/${click_inst_id}/`, {
          method: 'DELETE',
      })
      .then((response) => {
          if (response.ok) {
            fetchClickData();
          } else {
              // Handle error.
              return response.json()
                  .then((data) => {
                      console.error('Error:', data);
                  });
          }
      })
      .catch((error) => {
          console.error('Fetch error:', error);
      });
  } else {
    fetch(`http://127.0.0.1:8000/customers/${id}/click-instance/${click_inst_id}/`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ pain_level: event.target.value }),
    })
    .then((response) => {
        if (response.ok) {
          fetchClickData();
        } else {
            return response.json()
                .then((data) => {
                    console.error('Error:', data);
                });
        }
    })
    .catch((error) => {
        console.error('Fetch error:', error);
    });
  };};
  const handleSendMessage = () => {
    console.log('Message:', message);
}
  const CustomMarker = (props) => {
    return (
      <div style={{ display: "flex" }}>
        <div class="w-5 h-5 rounded-full bg-red-900 flex items-center justify-center pl-2 pb-1">
          <select
            value={props.pain_level}
            className="absolute top-0 left-0 appearance-none border-none bg-transparent w-full h-full pl-1.5"
            onChange={(e) => {
              handleSelectChange(e, props.id);
              
                // setSelectedValue(e.target.value);
              }}
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="del">sil</option>

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
      console.log('entered fetch data')
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
 
     fetchData()
     .then(()=> fetchClickData() )
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
          
        <div className="border p-4 rounded-lg shadow-md mb-2">
            <h2 className="text-2xl font-semibold">Hasta Bilgileri</h2>
            <div className="grid grid-cols-2 gap-4 mt-4">
                <div>
                    <span className="font-semibold pr-1">Adı:</span> {patient.name || "Yetersiz Bilgi"}
                </div>
                <div>
                    <span className="font-semibold pr-1">Üyelik:</span> {patient.membership || "Yetersiz Bilgi"}
                </div>
                <div>
                    <span className="font-semibold pr-1">Telefon:</span> {patient.phone || "Yetersiz Bilgi"}
                </div>
                <div>
                    <span className="font-semibold pr-1">Yaş:</span> {patient.age || "Yetersiz Bilgi"}
                </div>
                <div>
                    <span className="font-semibold pr-1">Kilo:</span> {patient.weight || "Yetersiz Bilgi"}
                </div>
                <div>
                    <span className="font-semibold pr-1">Boy:</span> {patient.height || "Yetersiz Bilgi"}
                </div>
                <div>
                    <span className="font-semibold pr-1">Vücut Kitle İndeksi (VKİ):</span> {patient.bmi || "Yetersiz Bilgi"}
                </div>
                <div>
                    <span className="font-semibold pr-1">VKİ Kategorisi:</span> {patient.bmi_category || "Yetersiz Bilgi"}
                </div>
            </div>
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
      <div className="col-span-2 mt-4">
                    <input
                        type="text"
                        placeholder="Mesajınızı buraya yazın"
                        className="w-full p-2 border rounded h-40 min-h-full"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />
                </div>

                <div className="col-span-2 mt-4">
                    <button
                        onClick={handleSendMessage}
                        className="w-full bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
                    >
                        Gönder
                    </button>
                </div>
                <div className="container mx-auto mt-8 p-4">
            <div>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fugiat, vel, laudantium omnis repellendus qui aperiam repellat enim rem eaque quis molestiae totam quasi eum optio natus voluptas maxime adipisci? Error deserunt, provident voluptatum libero labore sint suscipit consequatur dolores veritatis nemo mollitia molestias esse vero eaque itaque facilis voluptatibus. Numquam debitis eaque fuga cum ex fugit cumque. Quibusdam facilis, itaque dolorum possimus nemo architecto aliquam illo, facere quisquam sint suscipit dolor impedit delectus magnam optio. Officiis, sapiente laudantium eligendi soluta velit magnam accusantium? Cum odio rem at consectetur explicabo mollitia? At delectus expedita, veniam tempore ab laudantium fugiat animi explicabo.
            </div>
        </div>
    </div>
   );
};

export default CustomerDetail;
