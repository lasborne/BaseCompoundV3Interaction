# Compound Interaction Contract

This is a basic Compound Supply/Withdraw Project deployed on the Base mainnet. It approves and supplies any specified amount of USDbC tokens to the Compound V3 USDbC Contract utilizing the supply function of the Comet contract and withdraws whatever amount provided, and a script that deploys the contract and contains functions for lend, withdraw, and few other logic. The approval amount must be set to type(uint256).max, else, the approve transaction fails. (Not that claiming rewards function works successfully but does not accrue any COMP rewards; i.e. accruedRewards is 0, therefore nothing is realistically claimed).

usdbcMainAddress = '0xd9aAEc86B65D86f6A7B5B1b0c42FFA531710b6CA', cometMainAddress (on Base mainnet) = '0x9c4ec768c28520B50860ea7a15bd7213a9fF58bf' compoundInteractionAddress (created) = '0x7Ad9566d14A0DC48FA752bFB9712127f43cB2e5C'.

Try running some of the following tasks:

npx hardhat help 
npx hardhat node 
npx hardhat run scripts/tryFarm.js --network base

Special credits to Compound V3 docs = 'docs.compound.finance'.
