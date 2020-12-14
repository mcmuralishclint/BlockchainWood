import React, { Component } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'

class AddMovie extends Component {

  render() {
    return (
      <Card className="card">
      <p></p>
      <Card.Title><h3>Add a new movie</h3></Card.Title>
      <Card.Body>
      <div className="addMovie">
        <Form onSubmit={(event) => {
          event.preventDefault()
          this.props.createMovie(this.title.value,this.description.value,this.requiredAmount.value)
        }}>
          <Form.Group controlId="title">
            <Form.Control ref={(input) => this.title = input} type="text" placeholder="Title of the movie" />
          </Form.Group>

          <Form.Group controlId="description">
            <Form.Control ref={(input) => this.description = input} type="text" placeholder="Description of the movie" />
          </Form.Group>

          <Form.Group controlId="requiredAmount">
            <Form.Control ref={(input) => this.requiredAmount = input} type="text" placeholder="Required amount for the movie" />
          </Form.Group>

          <input type="submit" className="btn btn-primary float-right" />
        </Form>
      </div>
      </Card.Body>
      </Card>
    );
  }
}

export default AddMovie;