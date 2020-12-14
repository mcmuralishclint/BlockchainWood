import React, { Component } from 'react'; 

class Main extends Component {

  render() {
    return (
      <div id="content">
        <p>Welcome your balance is {this.props.ethBalance} ether</p>
      </div>
    );
  }
}

export default Main;
