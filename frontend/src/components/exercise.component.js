import React from "react";
import { Link } from 'react-router-dom';


const secToDateConverter = (SECONDS) => {
  var date = new Date(SECONDS);
  // date.setSeconds(SECONDS); // specify value for SECONDS here
  var result = date.toString().substr(4,11);
  return result;
}

const Exercise = (props) => (
  <tr>
    {console.log(props)}
    <td>{props.exercise.jNum}</td>
    <td>{props.exercise.cName}</td>
    <td>{props.exercise.cNum}</td>
    <td>{props.exercise.itemDetail}</td>
    <td>{props.exercise.problem}</td>
    <td>{props.exercise.workDone}</td>
    <td>{props.exercise.workStat}</td>
    <td>{props.exercise.charges}</td>
    <td>{secToDateConverter(props.exercise.delDate)}</td>
    <td>
      <Link
      to={`/edit/${props.exercise._id}`} className="nav-link">Edit
      </Link>{" "}
      |{" "}
      <button
        className="btn btn-danger"
        onClick={() => {
          props.deleteExercise(props.exercise._id);
        }}
      >
        Delete
      </button>
    </td>
  </tr>
);

export default Exercise;
