import StatisticLine from "./StatisticLine";

const Statistics = ({good,neutral,bad}) => {
   
    const all= good+neutral+bad;
    const average=(good*(1)+neutral*(0)+bad*(-1))/all;
    const positive= (good*(1) * 100) /all;
      

  if (good === 0 && neutral=== 0 && bad === 0) {
    return (
      <div>
        no feed back given
      </div>
    )
  }
  
       return (
        <div>

            <StatisticLine value={good} text="good"/>
            <StatisticLine value={neutral} text="neutral" />
            <StatisticLine value={bad} text="bad"/>
            <StatisticLine value={all} text="all"/>
            <StatisticLine value={average} text="average"/>
            <StatisticLine value={`${positive}%`} text="positive"/>
        </div>
      )
       }
  export default Statistics