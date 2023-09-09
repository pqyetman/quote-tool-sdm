
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';



export default function Example ({data}) {

  

 function handleMouseOver(data, index){
 
 }

 const toPercent = (decimal, fixed = 0) => `${(decimal).toFixed(fixed)}%`;



   
    return (
     
      <ResponsiveContainer  width={'100%'} height={500}>
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis domain={[0, 100]} interval={1} tickFormatter={toPercent}/>
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey={Object.keys(data[0])[1]} stroke="#8884d8" activeDot={{ r: 8 }}  />
          <Line type="monotone" dataKey={Object.keys(data[0])[2]} stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
    
      
    );
       
}

