import './App.css';
import React,{ useState, useEffect } from 'react'
import Rewards from './components/Rewards';
import DistanceBetween from './components/DistanceBetween'
import { Dimmer, Loader } from 'semantic-ui-react';

function App() {
  const [lat, setLat] = useState('');
  const [long, setLong] = useState('');
  const [data, setData] = useState([]);
  const [dist, setDist] = useState(10000);
  const [timeFrame,setTimeFrame] =useState("1");
  const [measurement,setMeasurement] = useState('meters')
  let mdist = dist*3/5280
          //console.log(measurement)

    
  
  useEffect(()=>{
    const fetchData = async()=>{
      window.navigator.geolocation.getCurrentPosition(function(position){
        const lat = position.coords.latitude
        const long = position.coords.longitude
       setLat(lat);
       setLong(long);
      });

            if(lat !== '' && long !==''){
        
        await fetch(`https://api.helium.io/v1/hotspots/location/distance?lat=${lat}&lon=${long}&distance=${dist}`, {mode:'cors'})
      .then(res=>res.json())
      .then(result=>{
            let data = result.data;
            
            setData(data);  
          })
      }
      
        }
    

      fetchData();
    
  }
  ,[onload, dist]);
    

const handleChange=(event)=>{
  if(measurement == 'meters'){
    
            setDist(event.target.value);

    
    
  }else{  
            setDist(event.target.value * 5280/3)  
  }
};

const handleRange=(event)=>{
  setTimeout(() => {
    setTimeFrame(event.target.value);
  }, 2000);
  
};

const changeMeasure=(event)=>{
  setMeasurement(event.target.value)
  if(event.target.value == 'meters'){
    setDist(dist)
  }else{
    
    document.getElementById('distance').placeholder = mdist
    setDist(dist)
    
    
  }
  

  
}
let spots = [];
if(data){
 spots =
 
 data.map((a,b)=>{
        
          return(
              <ul className="spots" style={{listStyleType:'none',display:'flex',flexDirection:'column',margin:20}} key={b}>
                <li><strong>{a.name}</strong></li>
                <li className="addy">{a.address}</li>
                
                <li>Street Name: {a.geocode.long_street}</li>
                <li>City: {a.geocode.long_city}</li>
                <li>Reward Scale: {a.reward_scale}</li> 
                <DistanceBetween dist ={a.distance} oLat={lat} oLong={long} destLat = {a.lat} destLong = {a.lng}/>
                <Rewards a={a.address} timeFrame={timeFrame} />
            </ul>
            )}
          )} 



          //ui changing
  let disp =function(){
    if (measurement=='meters'){
      return dist
    }else{return mdist}
  }
  return (
    <div className="App">
      <div className="bg"></div>
     <h1>
       Hotspots near you
     </h1>
     <p>There are <span className="distance">{spots.length}</span> Helium Hotspots within <br/>{disp()} {measurement} of your location</p>
     <input name="distance" type='number' placeholder={disp()} value={disp()} id='distance' onChange={handleChange} min="1"/> 
     <label id="distLabel" for="distance">{measurement.charAt(0).toUpperCase()+measurement.substr(1)}</label>
     <select name="timeFrame" id="timeFrame" onChange={handleRange}>
       <option value='1'>1 Day</option>
       <option value="7">7 Days</option>
       <option value="30">30 Days</option>
     </select>
     <label id="timeLabel" for="timeFrame">Rewards Duration</label>
    
     <select name="measurement" id="measurement" onChange={changeMeasure}>
       <option value="miles">Miles</option>
       <option selected value ="meters">Meters</option>
     </select>
     <label for="measurement" id="measurementLabel">Miles or Meters</label>

     
     
    
     {
     spots!='undefined'?(<ul>{spots}</ul>):(<div>
       <Dimmer active>
          <Loader active>Loading</Loader>
        </Dimmer>
        </div>) 
      }
     
    </div>
  );
}

export default App;
