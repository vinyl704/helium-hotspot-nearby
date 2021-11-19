const DistanceBetween = (props)=>{

    let dist = props.dist;
    let mdist = (dist*3)/5280;

    const distant =()=>{
        if(measurement.value == 'miles'){
            return mdist
        }else{return dist}
    }
    
    return `${distant().toFixed(2)} ${measurement.value} away`
}

export default DistanceBetween;