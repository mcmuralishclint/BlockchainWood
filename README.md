# Movie-BFund
A Blockchain based crowdfunding platform to fund movies

## Overview
Building an Ethereum based DApp to fund movies

### Part 1 - Planning the Smart Contract
- There is one admin and the admin can give approval to producers to create and post movies
- A viewer can view the information of a movie and tip it if interested
- The tipped amount directly goes to the account of the producer
- The campaign runs until the required amount is raised
- The tipper can't send more than the required amount
- When the required amount is reached, the movie will be disabled for tipping

### Part 2 - Testing the smart contract using truffle
- Individual tests for each feature mentioned in Part 1

### Part 3 - Creating a frontend using react.js
- Seperate views for producers and admin
- A producer can create a new movie
- A producer can tip other movies
- An admin can give priveleges to a producer
- Made use of routes for seperate components

### Features to add
- IPFS based image associated with each movie
- Error handling
- Validations
- View transaction history for each movie by user