import React, { Component } from 'react'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'

class AdminApproval extends Component {

  render() {
    return (
      <div className="container-fluid mt-5">
            <main role="main" className="col-lg-12 d-flex text-center">
              <div className="content mr-auto ml-auto">
                  <Card className="card">
                  <p></p>
                  <Card.Title><h3 className="title">Give approval to producer</h3></Card.Title>
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
              </div>
            </main>
      </div>
    );
  }
}

export default AdminApproval;