import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {

  render() {
    return (
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
      <div class="container-fluid">
      <a class="navbar-brand" href="/"><h3>Infonet Computers Logger</h3></a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li className="navbar-item">
          <Link to="/" className="nav-link"> View Log</Link>
          </li>
          <li className="navbar-item">
          <Link to="/create" className="nav-link">Create Customer Log</Link>
          </li>
        </ul>
        </div>
      </div>
      </nav>
    );
  }
}