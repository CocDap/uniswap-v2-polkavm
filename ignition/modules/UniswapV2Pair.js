const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");
const hre = require("hardhat");
const path = require("path");
const fs = require("fs");

module.exports = buildModule("UniswapV2PairModule", (m) => {
  const chainId = hre.network.config.chainId;
  const deployedAddressesPath = path.join(
    __dirname,
    `../deployments/chain-${chainId}/deployed_addresses.json`
  );
  const deployedAddresses = JSON.parse(
    fs.readFileSync(deployedAddressesPath, "utf8")
  );

  const wethAddress = deployedAddresses["UniswapV2WETHModule#WETH"];
  const tokenAddress = deployedAddresses["UniswapV2ERC20Module#UniswapV2ERC20"];
  const factoryAddress = deployedAddresses["UniswapV2FactoryModule#UniswapV2Factory"];

  const weth = m.contractAt("WETH", wethAddress);

  const token = m.contractAt("UniswapV2ERC20", tokenAddress);

  const factory = m.contractAt("UniswapV2Factory", factoryAddress);

  const pair = m.call(factory, "createPair", [
    token.address,
    weth.address,
  ]);

  return { pair };
});