import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export default class EditExercise extends Component {
  constructor(props) {
    super(props);

    this.onChangejNum = this.onChangejNum.bind(this);
    this.onChangecName = this.onChangecName.bind(this);
    this.onChangecNum = this.onChangecNum.bind(this);
    this.onChangeitemDetail = this.onChangeitemDetail.bind(this);
    this.onChangeproblem = this.onChangeproblem.bind(this);
    this.onChangeworkDone = this.onChangeworkDone.bind(this);
    this.onChangeworkStat = this.onChangeworkStat.bind(this);
    this.onChangecharges = this.onChangecharges.bind(this);
    this.onChangedate = this.onChangedate.bind(this);

    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      jNum: '',
      cName: '',
      cost: '',
      cNum:' ',
      itemDetail: '',
      problem:' ',
      workDone:' ',
      workStat:' ',
      charges:' ',
      date: new Date(),
      users: []
    }
  }

  async componentDidMount() {
    console.log(this.props)

    await axios.get('/exercises/'+this.props.match.params.id)
      .then(response => {
        console.log(response);
        this.setState({
          jNum: response.data.jNum,
          cName: response.data.cName,
          cNum: response.data.cNum,
          itemDetail: response.data.itemDetail,
          problem: response.data.problem,
          workDone: response.data.workDone,
          workStat: response.data.workStat,
          charges: response.data.charges,
          date: new Date(response.data.delDate)
        })   
      })
      .catch(function (error) {
        console.log(error);
      })

    await axios.get('/users/')
      .then(response => {
        if (response.data.length > 0) {
          this.setState({
            users: response.data.map(user => user.jNum),
          })
        }
      })
      .catch((error) => {
        console.log(error);
      })

  }

  onChangejNum(e) {
    this.setState({
      jNum: e.target.value
    })
  }

  onChangecName(e) {
    this.setState({
      cName: e.target.value
    })
  }

  onChangecNum(e) {
    this.setState({
      cNum: e.target.value
    })
  }

  onChangeitemDetail(e) {
    this.setState({
      itemDetail: e.target.value
    })
  }

  onChangeproblem(e) {
    this.setState({
      problem: e.target.value
    })
  }

  onChangeworkDone(e) {
    this.setState({
      workDone: e.target.value
    })
  }

  onChangeworkStat(e) {
    this.setState({
      workStat: e.target.value
    })
  }

  onChangecharges(e) {
    this.setState({
      charges: e.target.value
    })
  }

  onChangedate(date) {
    this.setState({
      date: date
    })
  }

  async onSubmit(e) {
    e.preventDefault();

    const exercise = {
      jNum: this.state.jNum,
      cName: this.state.cName,
      cNum: this.state.cNum,
      itemDetail: this.state.itemDetail,
      problem: this.state.problem,
      workDone: this.state.workDone,
      workStat: this.state.workStat,
      charges: this.state.charges,
      date: this.state.date
    }

    console.log(exercise);

    await axios.post('/exercises/update/' + this.props.match.params.id, exercise)
      .then(res => console.log(res.data));

    window.location = '/';
  }

  render() {
    return (
    <div>
      <h3>Edit Customer Log</h3>
      <form onSubmit={this.onSubmit}>
        <div className="form-group"> 
          <label>Job Number: </label>
          <input ref="userInput"
              required
              className="form-control"
              value={this.state.jNum}
              onChange={this.onChangejNum}>
              
          </input>
        </div>
        <div className="form-group"> 
          <label>Customer Name: </label>
          <input  
              ref="userInput"
              type="text"
              required
              className="form-control"
              value={this.state.cName}
              onChange={this.onChangecName}
              />
        </div>
        <div className="form-group">
          <label>Customer Number</label>
          <input 
              required
              ref="userInput"
              type="number" 
              className="form-control"
              value={this.state.cNum}
              onChange={this.onChangecNum}
              />
        </div>
        <div className="form-group">
          <label>Item Details</label>
          <input
            required
            ref="userInput"
            type="text"
            className="form-control"
            value={this.state.itemDetail}
            onChange={this.onChangeitemDetail}
          />
        </div>
        <div className="form-group">
          <label>Problem</label>
          <input
            required
            ref="userInput"
            type="text"
            className="form-control"
            value={this.state.problem}
            onChange={this.onChangeproblem}
          />
        </div>
        <div className="form-group">
          <label>Work Done</label>
          <input
            required
            ref="userInput"
            type="text"
            className="form-control"
            value={this.state.workDone}
            onChange={this.onChangeworkDone}
          />
        </div>
        <div className="form-group">
          <label>Work Status</label>
          <input
            required
            ref="userInput"
            type="text"
            className="form-control"
            value={this.state.workStat}
            onChange={this.onChangeworkStat}
          />
        </div>
        <div className="form-group">
          <label>Charges</label>
          <input
            required
            ref="userInput"
            type="text"
            className="form-control"
            value={this.state.charges}
            onChange={this.onChangecharges}
          />
        </div>
        <div className="form-group">
          <label>Delivery Date:</label>
          <div>
            <DatePicker
              selected={this.state.date}
              onChange={this.onChangedate}
            />
          </div>
        </div>

        <div className="form-group">
          <input type="submit" value="Edit Exercise Log" className="btn btn-primary" />
        </div>
      </form>
    </div>
    )
  }
}