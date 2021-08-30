
import React from 'react'
import { useState} from 'react';
import { useHistory } from 'react-router';
import SerchFunc from './serch'
import './App.css';
import Bar from './barProcess';


function App() {
 
  // game
   let ran1 = Math.floor(Math.random() * 9)
   let ran2 = Math.floor(Math.random() * 9)
   while(ran2 == ran1) ran2 = Math.floor(Math.random() * 9)
   let ran3 = Math.floor(Math.random() * 9)
   while (ran3 == ran2 || ran3 == ran1) ran3 = Math.floor(Math.random() * 9)
  //  const table = useRef()
  // if( table.current) {
  //  table.current.querySelectorAll('*').forEach(ele=>{
  //       ele.addEventListener('click', function(e) {
  //          console.log(e.target)
  //       })
  //  })  
  // }
  const [count, setCount] = useState(0)
  const [shouldUpdate, setshouldUpdate] = useState(0)
  const clickTable = (e) => {
  
     if(e.target.className == ran1 || e.target.className ==ran2 || e.target.className ==ran3) 
     setCount(count+1) 
     else if(e.target.className>=0){
       setshouldUpdate(!shouldUpdate)
     }else return
     
  }
  const useHis = useHistory()
  const linkTO = () =>{

    useHis.push({pathname:'./reactAssi.js'});
  }

  return (
      <div className="App">
          <Bar/>
          <SerchFunc/>
    
          <div className="square">
            <div className="square-inner grid"  onClick = {clickTable}>
              
            {[...Array(9)].map((x, i) =>{
              if(i == ran1) return (<div className = {ran1} >M</div>)
              else if(i == ran2) return (<div className = {ran2} >M</div>)
              else if(i == ran3) return (<div className = {ran3} >M</div>)
              else return(
              <div key={i} className = {i} ></div>)}
            )}
            </div>
          </div>
         

          <p style = {{textAlign : 'center',marginTop : 150}}> you have {count} scored </p>
          {
            count >= 7 ? <p style = {{textAlign : 'center',marginTop : 0}}>Success</p> : null
          }
                  
            <button style={{display:'block',margin : '20px auto',height:50}} onClick={linkTO}>GO TO React Assignment</button>
      </div> 

    
      
 )
  
}

export default App;
