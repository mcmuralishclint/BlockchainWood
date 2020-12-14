import React, { Component } from 'react';
import logo from '../logo.png';
import './App.css';
import Web3 from 'web3';
import Navbar from './Navbar'
import Main from './Main'
import AddMovie from './AddMovie'
import AdminApproval from './AdminApproval'
import DisplayMovie from './DisplayMovie'
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
      
      const movieCount = await movieFunder.methods.movieCount().call()
      this.setState({ movieCount })
      for (var i = 0; i <= movieCount; i++) {
        const movie = await movieFunder.methods.movies(i).call()
        if(movie.title.length>0 && movie.active){
        this.setState({
          movies: [...this.state.movies, movie]
        })
      }
        console.log(movie)
      }


      console.log(await movieFunder.methods.movieCount().call())
      const admin = await movieFunder.methods.admin().call()
      if(admin===this.state.account){
        this.setState({admin:true})
      }else{
        this.setState({admin:false})
      }
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
      loading:true,
      admin:false,
      movieCount: 0,
      movies: [],
    }
    this.createMovie = this.createMovie.bind(this)
    this.giveRightToProducer = this.giveRightToProducer.bind(this)
    this.tipMovieOwner = this.tipMovieOwner.bind(this)
  }

  giveRightToProducer(producer) {
        this.setState({ loading: true })
        this.state.movieFunder.methods.giveRightToProducer(producer).send({ from: this.state.account })
        .once('receipt', (receipt) => {
        this.setState({ loading: false })
      })
    }

  createMovie(title,description,requiredAmount) {
        console.log(title)
        this.setState({ loading: true })
        this.state.movieFunder.methods.createMovie(title,description,requiredAmount).send({ from: this.state.account })
        .once('receipt', (receipt) => {
        this.setState({ loading: false })
      })
    }

  tipMovieOwner(id, tipAmount) {
    this.setState({ loading: true })
    this.state.movieFunder.methods.tipMovieOwner(id).send({ from: this.state.account, value: tipAmount }).on('transactionHash', (hash) => {
    this.setState({ loading: false })
    })
  }

  render() {
    let content
    if(this.state.loading){
      content=<p id="loader" className="text-center">Loading...</p>
    }else{
      content=<Main ethBalance={this.state.ethBalance}/>
    }

    const renderAdminView = ()=>{
      if(this.state.admin){
        return  <AdminApproval giveRightToProducer={this.giveRightToProducer} />
      } else{
        return <AddMovie movies={this.state.movies} createMovie={this.createMovie} />
      }
    }

    return (
      <div>
        <Navbar account={this.state.account} />
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 d-flex text-center">
              <div className="content mr-auto ml-auto">
                <a
                  href="https://www.linkedin.com/in/mcmuralishclint"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={logo} className="App-logo" alt="logo" />
                </a>
                <p></p>
                {content}
                {renderAdminView()}
                <DisplayMovie movies={this.state.movies} tipMovieOwner={this.tipMovieOwner} />
              </div>
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
