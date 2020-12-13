import React, { Component } from 'react';
import logo from '../logo.png';
import './App.css';
import Web3 from 'web3';
import Navbar from './Navbar'
import Main from './Main'
import MovieFunder from '../abis/MovieFunder.json'

class App extends Component {

  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }

  async loadBlockchainData() {
    const web3 = window.web3
    const accounts = await web3.eth.getAccounts()
    this.setState({account:accounts[0]})
    let ethBalance = await web3.eth.getBalance(this.state.account)
    ethBalance = web3.utils.fromWei(ethBalance, 'Ether')
    this.setState({ethBalance})

    //load smart contract
    const networkId = await web3.eth.net.getId()
    const movieFunderData = MovieFunder.networks[networkId]
    if (movieFunderData){
      const movieFunder = new web3.eth.Contract(MovieFunder.abi,movieFunderData.address)
      this.setState({movieFunder})
    }else{
      window.alert("Contract not deployed to the detected network")
    }
    this.setState({loading:false})
  }


  constructor(props) {
    super(props)
    this.state = {
      account:'',
      movieFunder:{},
      ethBalance:'0',
      loading:true
    }
  }

  render() {
    let content
    if(this.state.loading){
      content=<p id="loader" className="text-center">Loading...</p>
    }else{
      content=<Main ethBalance={this.state.ethBalance}/>
    }

    return (
      <div>
        <Navbar account={this.state.account} />
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 d-flex text-center">
              <div className="content mr-auto ml-auto">
                <a
                  href="http://www.dappuniversity.com/bootcamp"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={logo} className="App-logo" alt="logo" />
                </a>
                <p></p>
                {content}
                <a
                  className="App-link"
                  href="https://www.linkedin.com/in/mcmuralishclint"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Subscribe to our service
                </a>
                
              </div>
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
