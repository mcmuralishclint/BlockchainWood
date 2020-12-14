import React, { Component } from 'react'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'

class AdminApproval extends Component {

  render() {
    return (

      <Card className="card">
      <p></p>
      <Card.Title><h3>Give approval to producer</h3></Card.Title>
      <Card.Body>
      <div className="adminpanel">
        <Form onSubmit={(event) => {
          event.preventDefault()
          this.props.giveRightToProducer(this.producer.value)
        }}>
          <Form.Group controlId="producer">
            <Form.Control ref={(input) => this.producer = input} type="text" placeholder="Producer Address" />
          </Form.Group>

          <input type="submit" className="btn btn-primary float-right" />
        </Form>
      </div>
      </Card.Body>
      </Card>
    );
  }
}

export default AdminApproval;