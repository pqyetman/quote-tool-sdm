    // setEmployee(event.target.value)

    // let lowerCaseConcatEmp = event.target.value.toLowerCase().split(" ").join("")

    // const pick = (obj, arr) =>
    //   arr.reduce((acc, record) => (record in obj && (acc[record] = obj[record]), acc), {});

    //  let employeeDataRange = dateRange.map(
    //     value => pick(value, ["date", "weekDays", "weekEnds", `${lowerCaseConcatEmp}`+"weekdays", `${lowerCaseConcatEmp}`+"weekends",]))
    //     .filter(value => value.weekDays > 0 && value.weekEnds > 0)

    //  setData( employeeDataRange.map(value => {
    //     value[Object.keys(value)[3]] = Math.round((value[Object.keys(value)[3]] / value.weekDays)*100)
    //     value[Object.keys(value)[4]] = Math.round( (value[Object.keys(value)[4]] / value.weekEnds)*100)
    //     return value
    //  }))