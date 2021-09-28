import React, { Component } from "react";
import axios from "axios";
import Exercise from "./exercise.component";

export class SearchResults extends Component {
  constructor(props) {
    super(props);

    this.deleteExercise = this.deleteExercise.bind(this);

    this.state = {
      exercises: [],
      searchResults: "",
    };
  }
  deleteExercise(id) {
    axios.delete("/exercises/" + id).then((response) => {
      console.log(response.data);
    });

    this.setState({
      exercises: this.state.exercises.filter((el) => el._id !== id),
    });
  }
}
const searchResults = (props) => {
  return props.stats.map((currentexercise) => {
    console.log(currentexercise);
    return (
      <Exercise
        exercise={currentexercise}
        deleteExercise={props.deleteExercise}
        key={currentexercise._id}
      />
    );
  });
};
export default searchResults;
