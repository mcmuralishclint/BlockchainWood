const MovieFunder = artifacts.require("MovieFunder");

module.exports = function (deployer) {
  deployer.deploy(MovieFunder);
};
