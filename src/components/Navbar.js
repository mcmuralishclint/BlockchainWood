import React, { Component } from 'react';
import Identicon from 'identicon.js';
import './Navbar.css';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom'
import Error from './Error'
import AddMovie from './AddMovie'

class Navbar extends Component {
  
  render() {

    const isAdmin = this.props.admin;
    let btnProducers,btnMovies,btnTipMovies,btnMyMovies;
    if (isAdmin) {
      console.log(isAdmin)
      btnProducers = <li class="nav-item">
                  <a class="nav-link" href="/producer">Producers</a>
                </li>
    } else {
      btnMovies = <li class="nav-item">
                    <a class="nav-link" href="/new_movie">New Movie</a>
                  </li>
      btnTipMovies = <li class="nav-item">
                        <a class="nav-link" href="/movies">Tip Movies</a>
                     </li>
      btnMyMovies = <li class="nav-item">
                      <a class="nav-link" href="/my_movies">My Movies</a>
                    </li>
    }

    return (
        <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <a
            className="navbar-brand col-sm-3 col-md-2 mr-0"
            href="https://www.linkedin.com/in/mcmuralishclint"
            target="_blank"
            rel="noopener noreferrer"
          >
            BlockchainWood
          </a>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
            <li class="nav-item">
              <a class="nav-link" href="/">Home</a>
            </li>
            
            {btnMovies}
            {btnProducers}
            {btnTipMovies}
            {btnMyMovies}
            

            
            </ul>
          </div>
          <div class="navbar-collapse collapse w-100 order-3 dual-collapse2">
          <ul class="navbar-nav ml-auto">
          <li className="nav-item my-2 my-lg-0">
              <small className="text-secondary">
                <small id="account">{this.props.account}</small>
              </small>

              { this.props.account
                ? <img
                  className="ml-2"
                  width='30'
                  height='30'
                  src={`data:image/png;base64,${new Identicon(this.props.account, 30).toString()}`}
                  alt=""
                />
                : <span></span>
              }
          </li>
          </ul>
          </div>
        </nav> 
        </div>

    );
  }
}

export default Navbar;
