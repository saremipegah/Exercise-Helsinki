const Statistics = ({good,neutral,bad}) => {

  const all = good+neutral+bad;
  if(all === 0){
    return  <p>No feedback given </p>
   
    
  }
  const average = (good*(1)+neutral*(0)+bad*(-1))/all;
  const positive = (good * 100) / all;
  
 
  
    return(
        <div>
        <p>all {all}</p>
       <p>average {average}</p>
       <p>positive {positive}%</p>
            
        </div>
    )
}
export default Statistics