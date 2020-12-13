pragma solidity ^0.5.16;

contract MovieFunder{
    
    mapping (uint => Movie) public movies;
    mapping(address => Producer) public producers;
    uint public movieCount=0;
    uint public producerCount=0;
    address public admin;
    
    event movieCreated(
      uint id,
      string title,
      string description,
      uint requiredAmount,
      uint availableAmount,
      address payable producer,
      bool active
     );
     
    event movieTipped(
      uint id,
      string title,
      string description,
      uint requiredAmount,
      uint availableAmount,
      address payable producer,
      bool active
     );

    struct Movie{
        uint id;
        string title;
        string description;
        uint requiredAmount;
        uint availableAmount;
        address payable producer;
        bool active;
    }
    
    struct Producer{
        bool approved;
    }

    constructor() public{
        admin = msg.sender;
    }
    
    //Allow a producer to create a movie
    function giveRightToProducer(address _producer) public{
        require(msg.sender==admin,"You are not the admin");
        require(_producer!=admin,"You can't be a producer");
        producers[_producer]=Producer(true);
        producerCount++;
    }
    
    
    //create a movie
    function createMovie(string memory _title, string memory _description, uint  _requiredAmount) public{
        require(msg.sender!=admin,"You are not a producer");
        require(producers[msg.sender].approved==true,"Get approval from the admin");
        require(bytes(_title).length>0,"title cant be empty");
        require(bytes(_description).length>0,"description cant be empty");
        require(msg.sender!=address(0),"producer cant be empty");
        require(_requiredAmount>0);
        movies[movieCount] = Movie(movieCount,_title,_description,_requiredAmount,0,msg.sender,true);
        emit movieCreated(movieCount,_title,_description,_requiredAmount,0,msg.sender,true);
        movieCount++;
    }
    //tip a movie
    function tipMovieOwner(uint _id) public payable{
        require(movies[_id].id==_id,"Movie doesnt exists");
        Movie memory _movie = movies[_id];
        address payable _producer = _movie.producer;
        require(_movie.active==true,"The movie is not ready to be funded");
        require(msg.sender!=_producer,"You cant fund your own movie");
        require(msg.value<=_movie.requiredAmount-_movie.availableAmount,"Please enter an amount less than the required amount");
        require(msg.value>0 ether,"Send more than 0 ether");
        _producer.transfer(msg.value);
        _movie.availableAmount = _movie.availableAmount+msg.value;
        //if required amount is reached, disable the movie
        if (_movie.availableAmount==_movie.requiredAmount){
        _movie.active=false;}
        movies[_id] = _movie;
        emit movieTipped(_id,_movie.title,_movie.description,_movie.requiredAmount,_movie.availableAmount,_producer,_movie.active);
    }
    
}