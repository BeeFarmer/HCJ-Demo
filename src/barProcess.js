import React from 'react'

import {useState, Fragment,useEffect} from 'react'

export default function Bar()  {

     //1. bar animition  
  const [percentAni, setPercent] = useState(0)
  const [reverse,setReverse] = useState(0)
  const [willStop, setwillStop] = useState(0)
  const increase = () => {
      if(percentAni >= 100) {
        setPercent(100)
        setReverse(1)
      }else {
        setPercent(percentAni+10)
      }
  }

  const decrease = () => {
      if(percentAni<=0){
        setPercent(0)
        setReverse(0)
      }else {
        setPercent(percentAni-10)
      }
  }

 var param =  setTimeout(() => {
   if(!willStop){
    if(reverse ===0) increase()
    else if( reverse === 1) decrease()
   }
  }, 400);
 
  const stopAni = ()=>{
      setwillStop(!willStop)
      if(willStop) clearTimeout(param)
  }
  useEffect(() => {
    stopAni()
  }, [])

  return(
        <Fragment>
        <div className="bar_container"  style = {{width: `${percentAni}%`}}></div>
        <button className="stop_btn" onClick = {stopAni}>{willStop?'resume' : 'stop'}</button>
        </Fragment>
  )
}
