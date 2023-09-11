

const Total = (props) => {
    return ( 
        <div>
           <strong>total of {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises +  props.parts[3].exercises} exercises</strong>
        </div>
     );
}
 
export default Total;