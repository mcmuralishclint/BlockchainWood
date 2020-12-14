import React, { Component } from 'react'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'

class DisplayMovie extends Component {

  render() {
    return (
      <Card>
      <p></p> 
      <Card.Title><h3>List of movies</h3></Card.Title>
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
                    <p><b>Required Amount:</b> {movie.requiredAmount}</p>
                    <p><b>Available Amount:</b> {movie.availableAmount}</p>
                    <a href="#" class="btn-sm btn-dark float-right">Tip movie</a>
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