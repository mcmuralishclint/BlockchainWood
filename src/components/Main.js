import React, { Component } from 'react'; 

class Main extends Component {

  render() {
    return (
      <div id="content">
        <p>Welcome your balance is <b>{this.props.ethBalance} ether</b> </p>
      </div>
    );
  }
}

export default Main;
