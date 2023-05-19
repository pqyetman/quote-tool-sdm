import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Calendar, dayjsLocalizer } from 'react-big-calendar';
import dayjs from 'dayjs';

const localizer = dayjsLocalizer(dayjs)

export default function MyCalendar (props){
  
  
 return  (
  <div>
    <Calendar
      localizer={localizer}
     // events={myEventsList}
      startAccessor="start"
      endAccessor="end"
      style={{ height: 500 }}
    />
  </div>
);


}