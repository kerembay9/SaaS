import React, {useState, useEffect} from 'react';
import { ScheduleComponent, Day, Week, WorkWeek, Month, Agenda, Inject, Resize, DragAndDrop } from '@syncfusion/ej2-react-schedule';
import { Header } from '../components';

const Calendar = () => {
  const [scheduleData, setScheduleData] = useState([]); // State to store calendar events

  useEffect(() => {
    // Fetch initial data from the server
    fetchDataFromServer();
  }, []);

  const fetchDataFromServer = () => {
    // Make an HTTP request to fetch initial calendar event data from the server
    // Example using the fetch API:
    const apiUrl = 'http://127.0.0.1:8000/calendar/';
    console.log('entered fetch')
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        setScheduleData(data);
        console.log('data is', data)
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };
  const deleteDataFromServer = (eventData) => {
    const apiUrl = `http://127.0.0.1:8000/calendar/${eventData.id}/`;
    fetch(apiUrl,{
      method: 'DELETE',
      headers: {
        'Content-Type' : 'application/json',
      },
      body: JSON.stringify(eventData),
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Failed to delete event: ${response.statusText}`);
      }
      fetchDataFromServer();
    })
    .catch((error) => {
      console.error('Error saving event data:', error);
    });
    return;
  };
  const saveEventDataToServer = (eventData) => {
    // Make an HTTP request to save the new event data on the server
    // Example using the fetch API:
    const apiUrl = 'http://127.0.0.1:8000/calendar/';
    fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(eventData),
    })
      .then((response) => response.json())
      .then((response) => {
        // Handle the server's response if needed
        console.log('Event saved on the server:', response);
        fetchDataFromServer();
      })
      .catch((error) => {
        console.error('Error saving event data:', error);
      });
    }
    const updateEventDataToServer = (eventData) => {
      // Make an HTTP request to save the new event data on the server
      // Example using the fetch API:
      const apiUrl = `http://127.0.0.1:8000/calendar/${eventData.id}/`;
      fetch(apiUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(eventData),
      })
        .then((response) => response.json())
        .then((response) => {
          // Handle the server's response if needed
          console.log('Event saved on the server:', response);
          fetchDataFromServer();
        })
        .catch((error) => {
          console.error('Error saving event data:', error);
        });
      }
  const handleDateClick = (args) => {
      console.log(args.requestType)
      // Handle user click on a date/time slot
      switch (args.requestType) {
        case 'eventChanged':
          const changeEvent =  args.data[0];
          updateEventDataToServer(changeEvent);
          return;
        case 'eventCreated':
          const createEvent =  args.data[0];
          saveEventDataToServer(createEvent);
          return;
        case 'eventRemoved':
          const deleteEvent =  args.data[0];
          deleteDataFromServer(deleteEvent)
          return;
        case 'refreshed':
          console.log('entered refreshed')

          return;
        default:
          return;
        };
  };
  return (
    <div className=' m-22 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl'>
      <Header
      category="Uygulamalar"
      title="Takvim"
      />
      <ScheduleComponent
      height="85vh"
      eventSettings={{dataSource: scheduleData}}
      selectedDate={new Date()}
      actionComplete={handleDateClick}
      >
        <Inject 
        services={[Day, Week, WorkWeek, Month, Agenda, Resize, DragAndDrop]}
        />
      </ScheduleComponent>
    </div>
  )
}

export default Calendar