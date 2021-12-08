import {useEffect, useState} from 'react'

const Rewards  = (props)=>{

  const [rw, setRw] = useState([]);

  
     
    const fetchy = async()=>{
      
      await fetch(`https://api.helium.io/v1/hotspots/${props.a}/rewards/sum?min_time=-${props.timeFrame}%20day`,{mode:'cors'})
     .then(res=>res.json())
       .then(result=> {

        if(result.data.total){
          setRw(result.data.total.toFixed(5))
        }else{
          setRw(0);
        }
        }); 
  }

 useEffect(() => {
    fetchy();

}, [setRw,props.a,props.timeFrame])
  
 
return (<li onClick={fetchy}><span id="rw">{rw}</span> HNT in the last <span className="timeframe">{props.timeFrame}</span> day(s)</li>);

  
};

export default Rewards;