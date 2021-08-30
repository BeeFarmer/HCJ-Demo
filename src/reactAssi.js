import React from 'react'
import { useHistory } from 'react-router';
export default function(){
    const useHis = useHistory()
    const linkTO = () =>{
        useHis.push({pathname:'./'});
      }
    return( 
        <button style={{display:'block',margin : '20px auto',height:50}} onClick = {linkTO}>GO BACK</button>
        
    )
}