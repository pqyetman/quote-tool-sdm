import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop'
import { useMemo, useState, useCallback} from 'react';
import { Calendar, Views, dayjsLocalizer } from 'react-big-calendar';
import dayjs from 'dayjs';
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";


const DnDCalendar = withDragAndDrop(Calendar)

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





  const [view, setView] = useState(Views.MONTH)

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

  const onView = useCallback((newView) => setView(newView), [setView])

  const { defaultDate } = useMemo(
    () => ({
      defaultDate: new Date(),
    
    }),
    []
  )

  const resizeEvent = useCallback(
    ({ event, start, end }) => {
      console.log(event)
      setMyEvents((prev) => {
        const existing = prev.find((ev) => ev.id === event.id) ?? {}
        const filtered = prev.filter((ev) => ev.id !== event.id)
        return [...filtered, { ...existing, start, end }]
      })
    },
    [setMyEvents]
  )

  const moveEvent = useCallback(
    ({ event, start, end, isAllDay: droppedOnAllDaySlot = false }) => {
      const { allDay } = event
      if (!allDay && droppedOnAllDaySlot) {
        event.allDay = true
      }

      setMyEvents((prev) => {
        const existing = prev.find((ev) => ev.id === event.id) ?? {}
        const filtered = prev.filter((ev) => ev.id !== event.id)
        return [...filtered, { ...existing, start, end, allDay }]
      })
    },
    [setMyEvents]
  )
  
 return  (
  <div>
    <DnDCalendar
      localizer={localizer}
     // events={myEventsList}
      startAccessor="start"
      endAccessor="end"
      style={{ height: 500 }}
      events={myEvents}
      onDoubleClickEvent={handleSelectEvent}
      onSelectSlot={handleSelectSlot}
      selectable
      onView={onView}
      view={view}
      defaultDate={defaultDate}    
      draggableAccessor={(event) => true}
      onEventDrop={moveEvent}
      onEventResize={resizeEvent}
      popup
      
    />
  </div>
);


}