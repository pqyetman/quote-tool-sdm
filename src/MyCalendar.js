import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useMemo, useState, useCallback} from 'react';
import { Calendar, dayjsLocalizer } from 'react-big-calendar';
import dayjs from 'dayjs';




export default function MyCalendar (props){

  const [myEvents, setMyEvents] = useState([
    {
      id: 0,
      title: 'All Day Event very long title',
      allDay: true,
      start: new Date(2023, 4, 20),
      end: new Date(2023, 4, 20),
    },
    {
      id: 1,
      title: 'Long Event',
      start: new Date(2023, 4, 19),
      end: new Date(2023, 4, 20),
    },
  ])

  const localizer = dayjsLocalizer(dayjs)

  const handleSelectSlot = useCallback(
    ({ start, end }) => {
      const title = window.prompt('New Event name')
      if (title) {
        setMyEvents((prev) => [...prev, { start, end, title }])
      }
    },
    [setMyEvents]
  )

  
  const handleSelectEvent = useCallback(
    (event) => console.log(event),
    
    []
  )

  const { defaultDate, scrollToTime } = useMemo(
    () => ({
      defaultDate: new Date(2015, 3, 12),
      scrollToTime: new Date(1970, 1, 1, 6),
    }),
    []
  )


  
 return  (
  <div>
    <Calendar
      localizer={localizer}
     // events={myEventsList}
      startAccessor="start"
      endAccessor="end"
      style={{ height: 500 }}
      events={myEvents}
      onSelectEvent={handleSelectEvent}
      onSelectSlot={handleSelectSlot}
      selectable
      scrollToTime={scrollToTime}
    />
  </div>
);


}