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
      .get("/exercises")
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
        console.log(data);
      })
      .catch(() => {
        alert("Error retrieving data!");
      });
  };

  deleteExercise(id) {
    axios.delete("/exercises/" + id).then((response) => {
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
    const { sorted, setSorted } = this.state;
    let filteredResults;
    if (searchResults !== "") {
      filteredResults = exercises.filter((data) =>
        data.cName.toLowerCase().includes(searchResults.toLowerCase())
      );
    } else {
      <h6>No results found</h6>
      filteredResults = this.state.exercises;
    }
    const getStatus = ()=>{
      let newExe = [];
      for(var i=0;i<exercises.length;i++){
        var element = exercises[i];
        if(element.workStat == " Completed"){
          newExe.splice(0, 0, element);
        }else{
          newExe[newExe.length] = element;
        }
      }
      this.setState({exercises:newExe});
      this.setState({sorted:"Status"});
    }
    const getName = ()=>{
      const exe = exercises;
      exe.sort(function(a, b) { return a.cName.localeCompare(b.cName); });
      this.setState(exe);
      this.setState({sorted:"Name"});
    }
    return (
      <div>
        <SearchBox
          placeholder="Enter text here..."
          handleChange={(e) => this.setState({ searchResults: e.target.value })}
        />
        <div class="dropdown py-2">
        <button
          class="btn btn-secondary dropdown-toggle"
          type="button"
          id="dropdownMenuButton1"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          {sorted == undefined ? "Sort" : sorted}
        </button>
        <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
          <li>
            <a class="dropdown-item" href="#" onClick={getName}>
              Name
            </a>
          </li>
          <li>
            <a class="dropdown-item" href="#" onClick={getStatus}>
              Status
            </a>
          </li>
        </ul>
      </div>
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
