const MovieFunder = artifacts.require('./contracts/MovieFunder.sol')

require('chai')
  .use(require('chai-as-promised'))
  .should()

contract('MovieFunder', ([deployer, author, tipper]) => {
  let moviefunder

  before(async () => {
    moviefunder = await MovieFunder.deployed()
  })

  describe('deployment', async () => {
    it('deploys successfully', async () => {
      const address = await moviefunder.address
      assert.notEqual(address, 0x0)
      assert.notEqual(address, '')
      assert.notEqual(address, null)
      assert.notEqual(address, undefined)
    })
  })

  describe('admin',async() => {
    it('Admin rights', async() => {
      await moviefunder.createMovie("movie","description",10).should.be.rejected;
      await moviefunder.tipMovieOwner(deployer).should.be.rejected;
    })
    it("Assign producer rights", async() => {
      assert.equal(await moviefunder.producerCount(),0)
      await moviefunder.giveRightToProducer(author)
      assert.equal(await moviefunder.producerCount(),1)
      //check if the boolean value has changed
    })
  })

  describe("create movie", async() => {
    it("Producer create movie successfully", async() => {
      await moviefunder.giveRightToProducer(author)
      assert.equal(await moviefunder.movieCount(),0)
      let movie = moviefunder.createMovie("Movie","Description",web3.utils.toWei('100', 'Ether'),{ from: author })
      assert.equal(await moviefunder.movieCount(),1)
      await moviefunder.createMovie('', 'description', { from: author },10).should.be.rejected;
      await moviefunder.createMovie('Movie', '', { from: author },10).should.be.rejected;
      await moviefunder.createMovie('Movie', '', { from: author },0).should.be.rejected;
    })
  })

  describe("Tip movie", async() => {
    it("Allows users to tip movies",async() => {

      let required_amount = web3.utils.toWei('100', 'Ether')
      await moviefunder.createMovie("Movie","Description",required_amount,{ from: author })

      let oldAuthorBalance
      oldAuthorBalance = await web3.eth.getBalance(author)
      oldAuthorBalance = new web3.utils.BN(oldAuthorBalance)

      let movieCount = await moviefunder.movieCount()-1
      await moviefunder.tipMovieOwner(movieCount, { from: tipper, value: web3.utils.toWei('1', 'Ether') })

      // Check that author received funds
      let newAuthorBalance
      newAuthorBalance = await web3.eth.getBalance(author)
      newAuthorBalance = new web3.utils.BN(newAuthorBalance)

      // let tipMovieOwner
      let tipMovieOwner = web3.utils.toWei('1', 'Ether')
      tipMovieOwner = new web3.utils.BN(tipMovieOwner)

      const expectedBalance = oldAuthorBalance.add(tipMovieOwner)

      assert.equal(newAuthorBalance.toString(), expectedBalance.toString())

      //cant tip more than the required amount
      await moviefunder.tipMovieOwner(await moviefunder.movieCount()-1, { from: tipper, value:required_amount }).should.be.rejected;

    })
  })

})
