import React, { Component } from 'react'

class AdminApproval extends Component {

  render() {
    return (

      <div id="adminpanel">
        <form onSubmit={(event) => {
          event.preventDefault()
          this.props.giveRightToProducer(this.producer.value)
        }}>
          <input id="producer" ref={(input) => this.producer = input} type="text" className="form-control" placeholder="Producer Address" required />
          <input type="submit" />
        </form>
      </div>
    );
  }
}

export default AdminApproval;