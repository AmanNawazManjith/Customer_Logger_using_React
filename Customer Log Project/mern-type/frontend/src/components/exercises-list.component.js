import React, { Component } from "react";
import axios from "axios";
import SearchBox from "./searchbox.component";
import SearchResults from "./search-results.component";
import Exercise from "./exercise.component";

export default class ExercisesList extends Component {
  constructor(props) {
    super(props);

    this.deleteExercise = this.deleteExercise.bind(this);

    this.state = {
      exercises: [],
      searchResults: "",
    };
  }

  componentDidMount() {
    axios
      .get("/exercises/")
      .then((response) => {
        this.setState({ exercises: response.data });
      })
      .catch((error) => {
        console.log(error);
      });

    this.getCustDatabase();
  }

  getCustDatabase = () => {
    axios
      .get("/exercises")
      .then((response) => {
        const data = response.data;
        this.setState({ posts: data });
        console.log("Data has been received!");
      })
      .catch(() => {
        alert("Error retrieving data!");
      });
  };

  deleteExercise(id) {
    axios.delete("http://localhost:5000/exercises/" + id).then((response) => {
      console.log(response.data);
    });

    this.setState({
      exercises: this.state.exercises.filter((el) => el._id !== id),
    });
  }

  exerciseList() {
    return this.state.exercises.map((currentexercise) => {
      return (
        <Exercise
          exercise={currentexercise}
          deleteExercise={this.deleteExercise}
          key={currentexercise._id}
        />
      );
    });
  }

  render() {
    const { exercises, searchResults } = this.state;
    let filteredResults;
    if (searchResults !== "") {
      filteredResults = exercises.filter((data) =>
        data.cName.toLowerCase().includes(searchResults.toLowerCase())
      );
    } else {
      <h6>No results found</h6>
      filteredResults = this.state.exercises;
    }

    return (
      <div>
        <SearchBox
          placeholder="Enter text here..."
          handleChange={(e) => this.setState({ searchResults: e.target.value })}
        />
        <h3>Customer List</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Job Number</th>
              <th>Customer Name</th>
              <th>Customer Details</th>
              <th>Item Details</th>
              <th>Problem/Work</th>
              <th>Work Done</th>
              <th>Work Status</th>
              <th>Charges</th>
              <th>Delivery Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <SearchResults
              stats={filteredResults}
              deleteExercise={this.deleteExercise}
            />
          </tbody>
        </table>
      </div>
    );
  }
}
