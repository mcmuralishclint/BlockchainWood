import React, { Component } from 'react'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'

class DisplayMovie extends Component {
  render() {
    return (
      <Card>
      <p></p> 
      <Card.Title><h3>List of movies to tip</h3></Card.Title>
      <div className="container-fluid">
      <div className="row">
        <main role="main" className="col-lg-12 d-flex justify-content-center">
          <div id="content">
            <ul id="movieList" className="list-unstyled">
              { this.props.movies.map((movie, key) => {
                return(


                <div class="card">
                  <div class="card-header">
                    <b>{movie.title}</b>
                  </div>
                  <div class="card-body">
                    <p><b>Description:</b> {movie.description}</p>
                    <p><b>Required Amount:</b> {window.web3.utils.fromWei(movie.requiredAmount,'Ether')}</p>
                    <p><b>Available Amount:</b> {window.web3.utils.fromWei(movie.availableAmount,'Ether')}</p>
          
                    <button
                      className="btn btn-link btn-sm float-right"
                      name={movie.id}
                      onClick={(event) => {
                        let tipAmount = window.web3.utils.toWei('0.1','Ether')
                        console.log(event.target.name,tipAmount)
                        this.props.tipMovieOwner(event.target.name,tipAmount)
                      }}
                    >
                    Tip 0.1 Ether
                    </button>
                  </div>
                </div>

                )
              })}
            </ul>
            <ul id="completedMovieList" className="list-unstyled">
            </ul>
          </div>
        </main>
      </div>
    </div>
      </Card>
    );
  }
}

export default DisplayMovie;