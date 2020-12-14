import React, { Component } from 'react'; 

class Main extends Component {

  render() {
    return (
      <div id="content">
      	<div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 d-flex text-center">
              <div className="content mr-auto ml-auto">
        		<p>Welcome! Your balance is <b>{this.props.ethBalance} ether</b></p>
        	  </div>
        	</main>
          </div>
        </div>
      </div>
    );
  }
}

export default Main;
