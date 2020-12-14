import React, { Component } from 'react'; 

class Main extends Component {

  render() {
    return (
      <div id="content">
        <p>Welcome! Your balance is {this.props.ethBalance} ether</p>
      </div>
    );
  }
}

export default Main;
