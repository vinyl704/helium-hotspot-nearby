import './App.css';
import React,{ useState, useEffect } from 'react'
import Rewards from './components/Rewards';

function App() {
  const [lat, setLat] = useState([]);
  const [long, setLong] = useState([]);
  const [data, setData] = useState([]);
  const [dist, setDist] = useState([10000]);
  const [timeFrame,setTimeFrame] =useState("1") ;

  
  
  useEffect(()=>{
    const fetchData = async()=>{
      navigator.geolocation.getCurrentPosition(function(position){
       setLat(position.coords.latitude);
       setLong(position.coords.longitude);
      });
      await fetch(`https://api.helium.io/v1/hotspots/location/distance?lat=${lat}&lon=${long}&distance=${dist}`, {mode:'cors'})
        .then(res=>res.json())
          .then(result=>{
            setData(result.data);  
          })
      }
    fetchData();
  }
  ,[lat,long,dist]);
  
  let spots = data.map(a=>
            (
              <ul className="spots" style={{listStyleType:'none',display:'flex',flexDirection:'column',margin:20}}>
              
                <li><strong>{a.name}</strong></li>
                <li className="addy">{a.address}</li>
                
                <li>Street Name: {a.geocode.long_street}</li>
                <li>City: {a.geocode.long_city}</li>
                <li>Reward Scale: {a.reward_scale}</li> 
              
                <Rewards a={a.address} timeFrame={timeFrame}/>
            </ul>)
            );
  
const handleChange=(event)=>{
  setDist(event.target.value) 
};

const handleRange=(event)=>{
  setTimeFrame(event.target.value);
};

  return (
    <div className="App">
      <div className="bg"></div>
     <h1>
       Hotspots near you
     </h1>
     <p>There are <span className="distance">{spots.length}</span> Helium Hotspots within <br/>{dist} meters of your location</p>
     <input type='number' placeholder='10000' id='distance' onChange={handleChange}/>
     <select name="timeFrame" id="timeFrame" onChange={handleRange}>
       <option value='1'>1 Day</option>
       <option value="7">1 Week</option>
       <option value="30">1 Month</option>
     </select>

     <ul>
      {spots}
     </ul>
    </div>
  );
}

export default App;
