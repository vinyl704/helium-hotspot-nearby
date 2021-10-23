const DistanceBetween = (props)=>{

   const earthR = 3963;
   
   //converting origin and dest lat and long to radian  input/(180/PI)
   const oLat = props.oLat/(180/Math.PI);
   const oLong=props.oLong/(180/Math.PI);
   const destLong=props.destLong/(180/Math.PI);
   const destLat=props.destLat/(180/Math.PI);
   const distBetween = (earthR * Math.acos(
    (Math.sin(oLat)*Math.sin(destLat))+
    (Math.cos(oLat)*Math.cos(destLat))*
    Math.cos(destLong-oLong)
   ))

    return (<p>{distBetween.toFixed(3)} Miles from you</p>)
}

export default DistanceBetween;