require('@nomicfoundation/hardhat-toolbox');
require('@parity/hardhat-polkadot');
require("dotenv").config();
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
    solidity: '0.8.28',
    resolc: {
        compilerSource: "npm",
        settings: {
            optimizer: {
                enabled: true,
            }
        }
    },
    networks: {
        hardhat: {
            polkavm: true,
            forking: {
                url: 'wss://westend-asset-hub-rpc.polkadot.io',
            },
            adapterConfig: {
                adapterBinaryPath: './bin/eth-rpc',
                dev: true,
            },
        },
        kusamaHub: {
            polkavm: true,
            url: "https://kusama-asset-hub-eth-rpc.polkadot.io",
            accounts: [process.env.PRIVATE_KEY],
            chainId: 420420418,
        },
    }
};
