import React, { Component } from 'react'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'

class DisplayMyMovies extends Component {
  render() {
    return (
      <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 d-flex text-center">
              <div className="content mr-auto ml-auto">
                <Card>
                <p></p> 
                <Card.Title><center><h3>List of my movies</h3></center></Card.Title>
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
              </div>
            </main>
          </div>
          <p></p>
      </div>

    );
  }
}

export default DisplayMyMovies;