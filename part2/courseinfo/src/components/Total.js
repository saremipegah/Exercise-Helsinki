

const Total = (props) => {

    const all =props.parts.reduce((acc,p)=> acc + p.exercises,0)
    return ( 
        <div>
          <strong>Total of {all} exercises</strong>
        </div>
     );
}
 
export default Total;