import React,{useEffect} from 'react'
import { useHistory } from 'react-router';

import { connect } from 'react-redux';


 function reduxP(props){
      const useHis = useHistory()
      const linkTO = () =>{
        useHis.push({pathname:'./'});
      }

  const pluss = ()=>{
    props.plus()
  }
  const minuss = () =>{
    props.minus()
  }
  const oddPlusss = ()=>{
      if(props.coutV %2 !== 0) props.plus()
  }

  const asyInc = ()=>{
  setTimeout(() => {
    props.plus()
  }, 1000);
  }
  let inte ;
  useEffect(() => {
      if(props.isOn) {
        inte = setInterval(() => {
          props.plus()
        }, 1000);
      }else{
        clearInterval(inte)
      }
     

    return () => {
      clearInterval(inte)
    }
  }, [props.isOn])

  const IntervelInc = ()=>{
     props.switchS()
  }

    return( 
        <div>
        <button style={{display:'block',margin : '20px 10px auto',height:50}} onClick = {linkTO}>GO BACK</button>
        <div style={{margin : '0px auto',height:50,width:100}}> YOU CLICKED :{props.coutV}</div>

        <button style={{display:'inline',marginTop : '50px',height:50,width:100}} onClick={pluss}>+</button>
        <button style={{display:'inline',height:50,width:100}}  onClick={minuss}>-</button>
        <button style={{display:'inline',height:50,width:100}}  onClick={oddPlusss}>oddInc</button>
        <button style={{display:'inline',height:50,width:100}}  onClick={asyInc}>oddInc</button>
        <button style={{display:'block',height:50,width:100}}  onClick={IntervelInc}>{!props.isOn?'IntervelInc':'Stop'}</button>
        
        </div>
    )
}
// Object of action creators ****useFunc

 const plus = ()=>({
  type:'INCREMENT'
})
 const minus = ()=>({
  type:'DECREMENT'
 })
 const switchS = ()=>({
  type:'SWITCH'
})

 const mapDispatchToProps = {
  plus,
  minus,
  switchS
}
 //invoke when update ****useValue
 const mapStateToProps = function(state) {
  return {
    isOn: state.switchValue,
    coutV:state.couterValue
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(reduxP)