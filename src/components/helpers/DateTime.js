import  React, { useState , useEffect } from 'react'

export const DateTime = () => {

    var [date,setDate] = useState(new Date());
    
    useEffect(() => {
        var timer = setInterval(()=>setDate(new Date()), 1000 )
        return function cleanup() {
            clearInterval(timer)
        }
    
    });

    return(
        <div className="row center">
            <h4> Date : {date.toLocaleDateString()}</h4>
            <h4> Time : {date.toLocaleTimeString()}</h4>
        </div>
    )
}

export default DateTime;