import React, { Component } from 'react';
import logo from '../logo.png';
import './App.css';
import Web3 from 'web3';
import Navbar from './Navbar'
import Main from './Main'
import AddMovie from './AddMovie'
import AdminApproval from './AdminApproval'
import DisplayTipMovie from './DisplayTipMovie'
import DisplayMyMovies from './DisplayMyMovies'
import MovieFunder from '../abis/MovieFunder.json'
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom'
import Error from './Error'

//Declare IPFS
const ipfsClient = require('ipfs-http-client')
const ipfs = ipfsClient({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' }) // leaving out the arguments will default to these values

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
        if(movie.title.length>0 && movie.active && this.state.account!=movie.producer){
        this.setState({
          movies: [...this.state.movies, movie]
        })
      }
      if(movie.title.length>0 && movie.active && this.state.account===movie.producer){
        this.setState({
          myMovies: [...this.state.myMovies,movie]
        })
      }
      }

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

   captureFile = event => {

    event.preventDefault()
    const file = event.target.files[0]
    const reader = new window.FileReader()
    reader.readAsArrayBuffer(file)

    reader.onloadend = () => {
      this.setState({ buffer: Buffer(reader.result) })
      console.log('buffer', this.state.buffer)
    }
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
      myMovies:[]
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
      ipfs.add(this.state.buffer, (error, result) => {
      console.log('Ipfs result', result)
      if(error) {
        console.error(error)
        return
      }

      this.setState({ loading: true })
      this.state.movieFunder.methods.createMovie(result[0].hash,title,description,requiredAmount).send({ from: this.state.account }).on('transactionHash', (hash) => {
        this.setState({ loading: false })
      })
    })
    }
 

  tipMovieOwner(id, tipAmount) {
    this.setState({ loading: true })
    this.state.movieFunder.methods.tipMovieOwner(id).send({ from: this.state.account, value: tipAmount }).on('transactionHash', (hash) => {
    this.setState({ loading: false })
    })
  }

  render() {

    let content,movies,adminView
    if(this.state.loading){
      content=<p id="loader" className="text-center">Loading...</p>
    }else{
      content=<Main ethBalance={this.state.ethBalance}/>      
    }

    return (
      <Router>
      <div>
        <Navbar account={this.state.account} admin={this.state.admin}/>
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
                <p/>
              </div>
            </main>
          </div>
        </div>
      </div>
      <Route exact path="/error" component={Error}/> 
      <Route exact path="/new_movie" component={() => <AddMovie captureFile={this.captureFile} movies={this.state.movies} createMovie={this.createMovie} />} />
      <Route exact path="/movies" component={() => <DisplayTipMovie movies={this.state.movies} tipMovieOwner={this.tipMovieOwner} />} />
      <Route exact path="/my_movies" component={() => <DisplayMyMovies movies={this.state.myMovies} tipMovieOwner={this.tipMovieOwner} />} />
      <Route exact path="/producer" component={() => <AdminApproval giveRightToProducer={this.giveRightToProducer} />} />
      <Route exact path="/" component={() => <Main ethBalance={this.state.ethBalance} />} />
      </Router>
    );
  }
}

export default App;
