// Send a GET request for all events in a date range

export  const getData =(url, setData) => {


const apiKey = process.env.REACT_APP_TEAM_UP_API_KEY;

const xhr = new XMLHttpRequest();

xhr.open('GET', url);
xhr.setRequestHeader('Teamup-Token', apiKey);

xhr.responseType = 'json';

xhr.onload = () => {

    const data = xhr.response;
   
    

    data.subcalendars === undefined ? setData (data.events) : setData(data.subcalendars)

   

}

xhr.send();

}
