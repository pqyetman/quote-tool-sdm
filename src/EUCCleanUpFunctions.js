
  const monthArray = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
export function calculateMonthlyWorkDays(start, end) {


  let weekDayWeekEndArray = [];
  let startDate = new Date(start);
  let endDate = new Date(end);
  let newDay = new Date(start);
  let dayIncrementer = 0;

  do {
    let month = newDay.getMonth();
    let year = newDay.getFullYear();
    let dayOfWeek = newDay.getDay();

    //create a new monthYear key if you cant find one

    if (
      !weekDayWeekEndArray.some(
        (value) =>
          value.monthYear ===
          year.toString().concat("-", monthArray[month].toString())
      )
    ) {
      let newMonthObj = { monthYear: "", weekDays: 0, weekEnds: 0 , weekdayevents: [], weekendevents: []};
      weekDayWeekEndArray.push(newMonthObj);
      weekDayWeekEndArray[weekDayWeekEndArray.length - 1].monthYear = year
        .toString()
        .concat("-", monthArray[month].toString());
    }

    //find the correct array index based on month and year of newDay

    let index;
    weekDayWeekEndArray.some((x, i) => {
      if (
        x.monthYear ===
        year.toString().concat("-", monthArray[month].toString())
      )
        return (index = i);
    });

    dayOfWeek === 6 || dayOfWeek === 0
      ? weekDayWeekEndArray[index].weekEnds++
      : weekDayWeekEndArray[index].weekDays++;

    //increase day by 1

    dayIncrementer++;

    newDay = new Date(
      startDate.getFullYear(),
      startDate.getMonth(),
      startDate.getDate() + dayIncrementer
    );
  } while (newDay.getTime() < endDate.getTime());

  return weekDayWeekEndArray;
}

export function removeNonBillableDays(data, monthWorkDayArray) {

  let exclusionArray = [
    "vacation",
    "office",
    "dentist",
    "doctor",
    "half day",
    "sick",
    "on call",
    "unavailable",
    "late",
    "airport",
  ];
  let blankArray = [];

  for (let i = 0; i < data.length; i++) {

    //function to determine if value from exclusion array equals a title in calendar data
    function isEqualtoDataSubject(element) {
      let returnValue = data[i].title
        .toString()
        .toLowerCase()
        .includes(element);
      return returnValue;
    }

    //If the object had a title and its not a value to be excluded, push data

    if (data[i].title !== undefined && !exclusionArray.some(isEqualtoDataSubject)) {

      // blankArray.push(data[i]);
      let startDate = new Date(data[i].start_dt);
      let endDate = new Date(data[i].end_dt);

      if (startDate.getDate() === endDate.getDate()) {
      
        let year = startDate.getFullYear();
        let month = startDate.getMonth()
        let dayOfWeek = startDate.getDay();
       
        let index;

        monthWorkDayArray.some((x, i) => {
          if (
            x.monthYear ===
            year.toString().concat("-", monthArray[month].toString())
          )
            return (index = i);
        });

        let eventObj = {date: startDate , title: data[i].title.toString()}

        dayOfWeek === 6 || dayOfWeek === 0? 
        monthWorkDayArray[index].weekendevents.push(eventObj)
      : monthWorkDayArray[index].weekdayevents.push(eventObj)
       
      
    }


    else{

      let incrementedDate = startDate
      let date = startDate.getDate()

      do {
        let year = incrementedDate.getFullYear();
        let month = incrementedDate.getMonth()
        let dayOfWeek = incrementedDate.getDay();
       
        let index;

        monthWorkDayArray.some((x, i) => {
          if (
            x.monthYear ===
            year.toString().concat("-", monthArray[month].toString())
          )
            return (index = i);
        });

        let eventObj = {date: incrementedDate , title: data[i].title.toString()}

        dayOfWeek === 6 || dayOfWeek === 0? 
        monthWorkDayArray[index].weekendevents.push(eventObj)
      : monthWorkDayArray[index].weekdayevents.push(eventObj)

        incrementedDate = new Date(year, month, ++date)

      }

      while(incrementedDate.getTime()< endDate.getTime())

    }
  }
}





for (let i = 0; i < monthWorkDayArray.length; i++) {

  let existingWDA = [...monthWorkDayArray[i].weekdayevents]
  let existingWEA = [...monthWorkDayArray[i].weekendevents]

  const uniqueWDA = existingWDA.filter((obj, index) => {
    return index === existingWDA.findIndex(o => obj.date.getDate() === o.date.getDate());
  });

  const uniqueWEA = existingWEA.filter((obj, index) => {
    return index === existingWEA.findIndex(o => obj.date.getDate() === o.date.getDate());
  });

  monthWorkDayArray[i].weekdaysworked = uniqueWDA.length
  monthWorkDayArray[i].weekendsworked = uniqueWEA.length

}

  return blankArray;
}
