const Total =(props) => {
  console.log(props);

    return(
        <div>
           <p>Number of exercises {props.part1 + props.part2 + props.part3}</p>
        </div>
    )
}
export default Total