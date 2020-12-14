import React, { Component } from 'react'

class AddMovie extends Component {

  render() {
    return (

      <div id="content">
        <form onSubmit={(event) => {
          event.preventDefault()
          this.props.createMovie(this.title.value,this.description.value,this.requiredAmount.value)
        }}>
          <input id="newTitle" ref={(input) => this.title = input} type="text" className="form-control" placeholder="Title" required />
          <input id="newDescription" ref={(input) => this.description = input} type="text" className="form-control" placeholder="Description" required />
          <input id="newRequiredAmount" ref={(input) => this.requiredAmount = input} type="text" className="form-control" placeholder="Required Amount" required />
          <input type="submit" />
        </form>
      </div>
    );
  }
}

export default AddMovie;