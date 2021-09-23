import {useState} from 'react'

const Rewards  = (props)=>{

  const [rw, setRw] = useState([]);

  const fetchy = async()=>{
    fetch(`https://api.helium.io/v1/hotspots/${props.a}/rewards/sum?min_time=-${props.timeFrame}%20day`,{mode:'cors'})
     .then(res=>res.json())
       .then(result=> {
          setRw(result.data.total);
        });
        
  }

  fetchy();

  return (<li>{rw} HNT in the last <span className="timeframe">{props.timeFrame}</span> day(s)</li>);
};

export default Rewards;