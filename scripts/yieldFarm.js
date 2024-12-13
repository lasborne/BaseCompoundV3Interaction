const { ethers } = require('hardhat');

const abi_ = [{"inputs":[{"components":[{"internalType":"address","name":"governor","type":"address"},{"internalType":"address","name":"pauseGuardian","type":"address"},{"internalType":"address","name":"baseToken","type":"address"},{"internalType":"address","name":"baseTokenPriceFeed","type":"address"},{"internalType":"address","name":"extensionDelegate","type":"address"},{"internalType":"uint64","name":"supplyKink","type":"uint64"},{"internalType":"uint64","name":"supplyPerYearInterestRateSlopeLow","type":"uint64"},{"internalType":"uint64","name":"supplyPerYearInterestRateSlopeHigh","type":"uint64"},{"internalType":"uint64","name":"supplyPerYearInterestRateBase","type":"uint64"},{"internalType":"uint64","name":"borrowKink","type":"uint64"},{"internalType":"uint64","name":"borrowPerYearInterestRateSlopeLow","type":"uint64"},{"internalType":"uint64","name":"borrowPerYearInterestRateSlopeHigh","type":"uint64"},{"internalType":"uint64","name":"borrowPerYearInterestRateBase","type":"uint64"},{"internalType":"uint64","name":"storeFrontPriceFactor","type":"uint64"},{"internalType":"uint64","name":"trackingIndexScale","type":"uint64"},{"internalType":"uint64","name":"baseTrackingSupplySpeed","type":"uint64"},{"internalType":"uint64","name":"baseTrackingBorrowSpeed","type":"uint64"},{"internalType":"uint104","name":"baseMinForRewards","type":"uint104"},{"internalType":"uint104","name":"baseBorrowMin","type":"uint104"},{"internalType":"uint104","name":"targetReserves","type":"uint104"},{"components":[{"internalType":"address","name":"asset","type":"address"},{"internalType":"address","name":"priceFeed","type":"address"},{"internalType":"uint8","name":"decimals","type":"uint8"},{"internalType":"uint64","name":"borrowCollateralFactor","type":"uint64"},{"internalType":"uint64","name":"liquidateCollateralFactor","type":"uint64"},{"internalType":"uint64","name":"liquidationFactor","type":"uint64"},{"internalType":"uint128","name":"supplyCap","type":"uint128"}],"internalType":"struct CometConfiguration.AssetConfig[]","name":"assetConfigs","type":"tuple[]"}],"internalType":"struct CometConfiguration.Configuration","name":"config","type":"tuple"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"Absurd","type":"error"},{"inputs":[],"name":"AlreadyInitialized","type":"error"},{"inputs":[],"name":"BadAsset","type":"error"},{"inputs":[],"name":"BadDecimals","type":"error"},{"inputs":[],"name":"BadDiscount","type":"error"},{"inputs":[],"name":"BadMinimum","type":"error"},{"inputs":[],"name":"BadPrice","type":"error"},{"inputs":[],"name":"BorrowCFTooLarge","type":"error"},{"inputs":[],"name":"BorrowTooSmall","type":"error"},{"inputs":[],"name":"InsufficientReserves","type":"error"},{"inputs":[],"name":"InvalidInt104","type":"error"},{"inputs":[],"name":"InvalidInt256","type":"error"},{"inputs":[],"name":"InvalidUInt104","type":"error"},{"inputs":[],"name":"InvalidUInt128","type":"error"},{"inputs":[],"name":"InvalidUInt64","type":"error"},{"inputs":[],"name":"LiquidateCFTooLarge","type":"error"},{"inputs":[],"name":"NegativeNumber","type":"error"},{"inputs":[],"name":"NoSelfTransfer","type":"error"},{"inputs":[],"name":"NotCollateralized","type":"error"},{"inputs":[],"name":"NotForSale","type":"error"},{"inputs":[],"name":"NotLiquidatable","type":"error"},{"inputs":[],"name":"Paused","type":"error"},{"inputs":[],"name":"SupplyCapExceeded","type":"error"},{"inputs":[],"name":"TimestampTooLarge","type":"error"},{"inputs":[],"name":"TooManyAssets","type":"error"},{"inputs":[],"name":"TooMuchSlippage","type":"error"},{"inputs":[],"name":"TransferInFailed","type":"error"},{"inputs":[],"name":"TransferOutFailed","type":"error"},{"inputs":[],"name":"Unauthorized","type":"error"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"absorber","type":"address"},{"indexed":true,"internalType":"address","name":"borrower","type":"address"},{"indexed":true,"internalType":"address","name":"asset","type":"address"},{"indexed":false,"internalType":"uint256","name":"collateralAbsorbed","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"usdValue","type":"uint256"}],"name":"AbsorbCollateral","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"absorber","type":"address"},{"indexed":true,"internalType":"address","name":"borrower","type":"address"},{"indexed":false,"internalType":"uint256","name":"basePaidOut","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"usdValue","type":"uint256"}],"name":"AbsorbDebt","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"buyer","type":"address"},{"indexed":true,"internalType":"address","name":"asset","type":"address"},{"indexed":false,"internalType":"uint256","name":"baseAmount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"collateralAmount","type":"uint256"}],"name":"BuyCollateral","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"bool","name":"supplyPaused","type":"bool"},{"indexed":false,"internalType":"bool","name":"transferPaused","type":"bool"},{"indexed":false,"internalType":"bool","name":"withdrawPaused","type":"bool"},{"indexed":false,"internalType":"bool","name":"absorbPaused","type":"bool"},{"indexed":false,"internalType":"bool","name":"buyPaused","type":"bool"}],"name":"PauseAction","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"dst","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Supply","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"dst","type":"address"},{"indexed":true,"internalType":"address","name":"asset","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"SupplyCollateral","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":true,"internalType":"address","name":"asset","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"TransferCollateral","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"src","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Withdraw","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"src","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":true,"internalType":"address","name":"asset","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"WithdrawCollateral","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"WithdrawReserves","type":"event"},{"stateMutability":"payable","type":"fallback"},{"inputs":[{"internalType":"address","name":"absorber","type":"address"},{"internalType":"address[]","name":"accounts","type":"address[]"}],"name":"absorb","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"accrueAccount","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"manager","type":"address"},{"internalType":"address","name":"asset","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approveThis","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"baseBorrowMin","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"baseMinForRewards","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"baseScale","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"baseToken","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"baseTokenPriceFeed","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"baseTrackingBorrowSpeed","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"baseTrackingSupplySpeed","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"borrowBalanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"borrowKink","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"borrowPerSecondInterestRateBase","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"borrowPerSecondInterestRateSlopeHigh","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"borrowPerSecondInterestRateSlopeLow","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"asset","type":"address"},{"internalType":"uint256","name":"minAmount","type":"uint256"},{"internalType":"uint256","name":"baseAmount","type":"uint256"},{"internalType":"address","name":"recipient","type":"address"}],"name":"buyCollateral","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"extensionDelegate","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint8","name":"i","type":"uint8"}],"name":"getAssetInfo","outputs":[{"components":[{"internalType":"uint8","name":"offset","type":"uint8"},{"internalType":"address","name":"asset","type":"address"},{"internalType":"address","name":"priceFeed","type":"address"},{"internalType":"uint64","name":"scale","type":"uint64"},{"internalType":"uint64","name":"borrowCollateralFactor","type":"uint64"},{"internalType":"uint64","name":"liquidateCollateralFactor","type":"uint64"},{"internalType":"uint64","name":"liquidationFactor","type":"uint64"},{"internalType":"uint128","name":"supplyCap","type":"uint128"}],"internalType":"struct CometCore.AssetInfo","name":"","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"asset","type":"address"}],"name":"getAssetInfoByAddress","outputs":[{"components":[{"internalType":"uint8","name":"offset","type":"uint8"},{"internalType":"address","name":"asset","type":"address"},{"internalType":"address","name":"priceFeed","type":"address"},{"internalType":"uint64","name":"scale","type":"uint64"},{"internalType":"uint64","name":"borrowCollateralFactor","type":"uint64"},{"internalType":"uint64","name":"liquidateCollateralFactor","type":"uint64"},{"internalType":"uint64","name":"liquidationFactor","type":"uint64"},{"internalType":"uint128","name":"supplyCap","type":"uint128"}],"internalType":"struct CometCore.AssetInfo","name":"","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"utilization","type":"uint256"}],"name":"getBorrowRate","outputs":[{"internalType":"uint64","name":"","type":"uint64"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"asset","type":"address"}],"name":"getCollateralReserves","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"priceFeed","type":"address"}],"name":"getPrice","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getReserves","outputs":[{"internalType":"int256","name":"","type":"int256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"utilization","type":"uint256"}],"name":"getSupplyRate","outputs":[{"internalType":"uint64","name":"","type":"uint64"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getUtilization","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"governor","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"manager","type":"address"}],"name":"hasPermission","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"initializeStorage","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"isAbsorbPaused","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"}],"name":"isAllowed","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"isBorrowCollateralized","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"isBuyPaused","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"isLiquidatable","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"isSupplyPaused","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"isTransferPaused","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"isWithdrawPaused","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"liquidatorPoints","outputs":[{"internalType":"uint32","name":"numAbsorbs","type":"uint32"},{"internalType":"uint64","name":"numAbsorbed","type":"uint64"},{"internalType":"uint128","name":"approxSpend","type":"uint128"},{"internalType":"uint32","name":"_reserved","type":"uint32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"numAssets","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bool","name":"supplyPaused","type":"bool"},{"internalType":"bool","name":"transferPaused","type":"bool"},{"internalType":"bool","name":"withdrawPaused","type":"bool"},{"internalType":"bool","name":"absorbPaused","type":"bool"},{"internalType":"bool","name":"buyPaused","type":"bool"}],"name":"pause","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"pauseGuardian","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"asset","type":"address"},{"internalType":"uint256","name":"baseAmount","type":"uint256"}],"name":"quoteCollateral","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"storeFrontPriceFactor","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"asset","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"supply","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"dst","type":"address"},{"internalType":"address","name":"asset","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"supplyFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"supplyKink","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"supplyPerSecondInterestRateBase","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"supplyPerSecondInterestRateSlopeHigh","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"supplyPerSecondInterestRateSlopeLow","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"dst","type":"address"},{"internalType":"address","name":"asset","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"supplyTo","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"targetReserves","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalBorrow","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"totalsCollateral","outputs":[{"internalType":"uint128","name":"totalSupplyAsset","type":"uint128"},{"internalType":"uint128","name":"_reserved","type":"uint128"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"trackingIndexScale","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"dst","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"dst","type":"address"},{"internalType":"address","name":"asset","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferAsset","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"src","type":"address"},{"internalType":"address","name":"dst","type":"address"},{"internalType":"address","name":"asset","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferAssetFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"src","type":"address"},{"internalType":"address","name":"dst","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"userBasic","outputs":[{"internalType":"int104","name":"principal","type":"int104"},{"internalType":"uint64","name":"baseTrackingIndex","type":"uint64"},{"internalType":"uint64","name":"baseTrackingAccrued","type":"uint64"},{"internalType":"uint16","name":"assetsIn","type":"uint16"},{"internalType":"uint8","name":"_reserved","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"}],"name":"userCollateral","outputs":[{"internalType":"uint128","name":"balance","type":"uint128"},{"internalType":"uint128","name":"_reserved","type":"uint128"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"userNonce","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"asset","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"src","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"address","name":"asset","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"withdrawFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"withdrawReserves","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"address","name":"asset","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"withdrawTo","outputs":[],"stateMutability":"nonpayable","type":"function"}]
const rewardAbi_ = [{"inputs":[{"internalType":"address","name":"governor_","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"AlreadyConfigured","type":"error"},{"inputs":[],"name":"BadData","type":"error"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"InvalidUInt64","type":"error"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"NotPermitted","type":"error"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"NotSupported","type":"error"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"uint256","name":"","type":"uint256"}],"name":"TransferOutFailed","type":"error"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"oldGovernor","type":"address"},{"indexed":true,"internalType":"address","name":"newGovernor","type":"address"}],"name":"GovernorTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"src","type":"address"},{"indexed":true,"internalType":"address","name":"recipient","type":"address"},{"indexed":true,"internalType":"address","name":"token","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"RewardClaimed","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"address","name":"comet","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"RewardsClaimedSet","type":"event"},{"inputs":[{"internalType":"address","name":"comet","type":"address"},{"internalType":"address","name":"src","type":"address"},{"internalType":"bool","name":"shouldAccrue","type":"bool"}],"name":"claim","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"comet","type":"address"},{"internalType":"address","name":"src","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"bool","name":"shouldAccrue","type":"bool"}],"name":"claimTo","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"comet","type":"address"},{"internalType":"address","name":"account","type":"address"}],"name":"getRewardOwed","outputs":[{"components":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"owed","type":"uint256"}],"internalType":"struct CometRewards.RewardOwed","name":"","type":"tuple"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"governor","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"rewardConfig","outputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint64","name":"rescaleFactor","type":"uint64"},{"internalType":"bool","name":"shouldUpscale","type":"bool"},{"internalType":"uint256","name":"multiplier","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"}],"name":"rewardsClaimed","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"comet","type":"address"},{"internalType":"address","name":"token","type":"address"}],"name":"setRewardConfig","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"comet","type":"address"},{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"multiplier","type":"uint256"}],"name":"setRewardConfigWithMultiplier","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"comet","type":"address"},{"internalType":"address[]","name":"users","type":"address[]"},{"internalType":"uint256[]","name":"claimedAmounts","type":"uint256[]"}],"name":"setRewardsClaimed","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newGovernor","type":"address"}],"name":"transferGovernor","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"withdrawToken","outputs":[],"stateMutability":"nonpayable","type":"function"}]

// Compound Eth_Goerli Addresses
/*const usdcAddress = '0x07865c6E87B9F70255377e024ace6630C1Eaa37F'
const wethAddress = '0x42a71137C09AE83D8d05974960fd607d40033499'
//const poolAddress = '0xe20fCBdBfFC4Dd138cE8b2E6FBb6CB49777ad64D'
const compAddress = '0x3587b2F7E0E2D6166d6C14230e7Fe160252B0ba4'
const cometAddress = '0x1c6d7f15935D275a1521D3457dF3b9B7ee89d6Ca'
const compRewardsAddress = '0xef9e070044d62C38D2e316146dDe92AD02CF2c2c'*/

// Compound Base_Goerli Addresses
const usdcAddress = '0x31D3A7711a74b4Ec970F50c3eaf1ee47ba803A95'
const wethAddress = '0x4200000000000000000000000000000000000006'
//const poolAddress = '0xe20fCBdBfFC4Dd138cE8b2E6FBb6CB49777ad64D'
const compAddress = '0x7c6b91D9Be155A6Db01f749217d76fF02A7227F2'
const cometFactory = '0xAC9fC1a9532BC92a9f33eD4c6Ce4A7a54930F376'
const cometAddress = '0xe78Fc55c884704F9485EDa042fb91BfE16fD55c1'
const compRewardsAddress = '0x0818165C053D325985d87F4b8646b3062C72C385'

const implementationAddress = '0x3Ab91391221204372DC9FE5E3D4516d03988E8B8'
//const implementationAddress = '0x21aFad2CE08707218fE9e7AdBE618D55706e6825'


let YieldFarmContractDeploy = {

    /** 
     * @dev Deploy the Flash loan contract.
     * This is the Flash loan contract and must be implemented first. 
     * Simply deploys the flash loan contract from Aave v3.
     * 
     * Requirements:
     * 
     */
    deploy: async function deployYieldFarmContract() {
        let deployer, yieldFarmContract
        [deployer,] = await ethers.getSigners()

        let YieldFarmContract = await ethers.getContractFactory(
            'YieldFarmCompoundV3', deployer
        )
        
        yieldFarmContract = await YieldFarmContract.deploy(
            cometAddress, compRewardsAddress, usdcAddress, compAddress,
            wethAddress,implementationAddress
        )
        await yieldFarmContract.deployed()
        console.log(yieldFarmContract.address)
        return yieldFarmContract
    }
}

let YieldFarm = {

    /** 
     * @dev Execute FlashLoan. 
     * Execute the flash loan on Aave V3 on Fantom mainnet to borrow 10 DAI.
     * 
     * Requirements:
     * Should pay back within the same transaction.
     * 
     */
    lendFund: async function lendFundsFunction(yieldFarmContractAddress) {
        let deployer_, yieldFarmContract
        [deployer_] = await ethers.getSigners()
        let amount = ethers.utils.parseUnits('10000', 'wei')

        let YieldFarmContract = await ethers.getContractFactory(
            'YieldFarmCompoundV3'
        )
        
        yieldFarmContract = YieldFarmContract.attach(yieldFarmContractAddress)
        await yieldFarmContract.connect(deployer_).functions.lend(
            amount, {
                gasLimit: 1000000,
                gasPrice: Number(ethers.utils.parseUnits('2', 'gwei'))
            }
        )
        /*await flashLoanContract.connect(deployer_).functions.executeOperation(
            daiAddress, amount, premium, deployer_.address, '0x', {
                gasLimit: 5000000,
                gasPrice: Number(ethers.utils.parseUnits('50', 'gwei'))
            }
        )*/
        //console.log(flashLoanContract)
        console.log(deployer_.address)
    },

    withdraw: async function withdrawAllLentFunds(yieldFarmContractAddress) {
        let deployer_, yieldFarmContract
        [deployer_] = await ethers.getSigners()

        let YieldFarmContract = await ethers.getContractFactory(
            'YieldFarmCompoundV3'
        )
        
        yieldFarmContract = YieldFarmContract.attach(yieldFarmContractAddress)
        await yieldFarmContract.connect(deployer_).functions.withdrawAll(
            {
                gasLimit: 1000000,
                gasPrice: Number(ethers.utils.parseUnits('2', 'gwei'))
            }
        )
    },

    admin: async function getAdmin(yieldFarmContractAddress) {
        let deployer_, yieldFarmContract
        [deployer_] = await ethers.getSigners()

        let YieldFarmContract = await ethers.getContractFactory(
            'YieldFarmCompoundV3'
        )
        
        yieldFarmContract = YieldFarmContract.attach(yieldFarmContractAddress)
        let admin_ = await yieldFarmContract.connect(deployer_).functions.admin(
            {
                gasLimit: 1000000,
                gasPrice: Number(ethers.utils.parseUnits('2', 'gwei'))
            }
        )

        console.log(await admin_)
    },

    allowTransfer: async function allowTf(yieldFarmContractAddress) {
        let deployer_, yieldFarmContract
        [deployer_,] = await ethers.getSigners()
        let amount = ethers.utils.parseUnits('0.0000001', 'gwei')

        let YieldFarmContract = await ethers.getContractFactory(
            'YieldFarmCompoundV3'
        )
        
        yieldFarmContract = YieldFarmContract.attach(yieldFarmContractAddress)

        let transfer_ = await yieldFarmContract.connect(deployer_).functions.doTransfer(
            amount, {
                gasLimit: 1000000,
                gasPrice: Number(ethers.utils.parseUnits('2', 'gwei')),
                from: deployer_.address
            }
        )
        
        console.log(await transfer_.wait())
    },

    approveTransfer: async function allowTf(
        ProxyContractAddress, YieldFarmContractAddress
    ) {
        let deployer_, proxyContract, yieldFarmContract, usdcContract
        [deployer_,] = await ethers.getSigners()
        let approveAmount = ethers.utils.parseEther('1')
        let amount = ethers.utils.parseUnits('0.00001', 'gwei')

        let ProxyContract = await ethers.getContractFactory('FiatTokenProxy')
        let USDCContract = await ethers.getContractFactory('FiatTokenV2_1')
        let YieldFarmContract = await ethers.getContractFactory(
            'YieldFarmCompoundV3'
        )
        
        proxyContract = ProxyContract.attach(ProxyContractAddress)
        usdcContract = USDCContract.attach(ProxyContractAddress)
        yieldFarmContract = YieldFarmContract.attach(YieldFarmContractAddress)

        let approveTx = usdcContract.functions.approve(
            YieldFarmContractAddress, approveAmount
        )
        //let approvalData = ethers.utils.defaultAbiCoder.encode(["approve"], [approveTx])
        let approvalData = (await approveTx).data
        console.log((await approvalData).data)
        let approveTxObject = {
            gasLimit: 1000000,
            gasPrice: Number(ethers.utils.parseUnits('2', 'gwei')),
            from: deployer_.address,
            to: ProxyContractAddress,
            data: approvalData,
            nonce: deployer_.getTransactionCount()
        }

        let tx = await deployer_.sendTransaction(approveTxObject)

        console.log(await tx.wait())

        /*yieldFarmContract = YieldFarmContract.attach(yieldFarmContractAddress)
        let transfer_ = await yieldFarmContract.connect(deployer_).functions.doTransfer(
            amount, {
                gasLimit: 1000000,
                gasPrice: Number(ethers.utils.parseUnits('2', 'gwei'))
            }
        )
        console.log(await transfer_.wait())*/

    },

    approveLend: async function allowLend(
        ProxyContractAddress, YieldFarmContractAddress, CometContractAddress
    ) {
        let deployer_, proxyContract, yieldFarmContract, usdcContract
        let cometContract
        [deployer_,] = await ethers.getSigners()
        let approveAmount = ethers.utils.parseEther('1')
        let amount = ethers.utils.parseUnits('0.00001', 'gwei')

        let ProxyContract = await ethers.getContractFactory('FiatTokenProxy')
        let USDCContract = await ethers.getContractFactory('FiatTokenV2_1')
        
        
        
        proxyContract = ProxyContract.attach(ProxyContractAddress)
        usdcContract = USDCContract.attach(ProxyContractAddress)
        //yieldFarmContract = YieldFarmContract.attach(YieldFarmContractAddress)

        let approveTx = usdcContract.functions.approve(
            CometContractAddress, approveAmount
        )
        //let approvalData = ethers.utils.defaultAbiCoder.encode(["approve"], [approveTx])
        let approvalData = (await approveTx).data
        console.log((await approvalData).data)
        let approveTxObject = {
            gasLimit: 1000000,
            gasPrice: Number(ethers.utils.parseUnits('2', 'gwei')),
            from: deployer_.address,
            to: ProxyContractAddress,
            data: approvalData,
            nonce: deployer_.getTransactionCount()
        }

        let tx = await deployer_.sendTransaction(approveTxObject)

        console.log(await tx.wait())
    },

    lendFunds: async function allowLend(yieldFarmContractAddress) {
        let deployer_, yieldFarmContract, cUSDContract
        [deployer_,] = await ethers.getSigners()
        let amount = ethers.utils.parseUnits('0.0000001', 'gwei')

        /*let YieldFarmContract = await ethers.getContractFactory(
            'YieldFarmCompoundV3'
        )*/

        let CUSDContract = new ethers.Contract(cometAddress, abi_, deployer_)
        cUSDContract = CUSDContract.attach(cometAddress)
        console.log(cUSDContract)
        let lend_ = cUSDContract.functions.supply(usdcAddress, amount)
        let lendData = (await lend_).data

        let lendObject = 
            {
                gasLimit: 1000000,
                gasPrice: Number(ethers.utils.parseUnits('2', 'gwei')),
                from: deployer_.address,
                nonce: deployer_.getTransactionCount(),
                to: cometAddress,
                data: lendData
            }
        let lendTx = await deployer_.sendTransaction(lendObject)
        //console.log(await lendTx.wait())

        //yieldFarmContract = YieldFarmContract.attach(yieldFarmContractAddress)

        /*let lend_ = await yieldFarmContract.connect(deployer_).functions.lend(
            usdcAddress, amount, {
                gasLimit: 1000000,
                gasPrice: Number(ethers.utils.parseUnits('2', 'gwei')),
                from: deployer_.address,
                //to: cometAddress
            }
        )*/
        
        //console.log(await lend_.wait())
    },

    withdrawFunds: async function allowWithdraw(yieldFarmContractAddress) {
        let deployer_, yieldFarmContract, cUSDContract
        [deployer_,] = await ethers.getSigners()
        let amount = ethers.utils.parseUnits('0.0000001', 'gwei')

        let CUSDContract = new ethers.Contract(cometAddress, abi_, deployer_)
        cUSDContract = CUSDContract.attach(cometAddress)
        let withdraw_ = cUSDContract.functions.withdraw(usdcAddress, amount)
        let withdrawData = (await withdraw_).data

        let withdrawObject = 
            {
                gasLimit: 1000000,
                gasPrice: Number(ethers.utils.parseUnits('2', 'gwei')),
                from: deployer_.address,
                nonce: deployer_.getTransactionCount(),
                to: cometAddress,
                data: withdrawData
            }
        let withdrawTx = await deployer_.sendTransaction(withdrawObject)
        console.log(await withdrawTx.wait())
    },

    claimRewards: async function allowClaimRewards(yieldFarmContractAddress) {
        let deployer_, yieldFarmContract, rewardContract
        [deployer_,] = await ethers.getSigners()
        let amount = ethers.utils.parseUnits('0.0000001', 'gwei')

        let RewardContract = new ethers.Contract(
            '0x0818165C053D325985d87F4b8646b3062C72C385', rewardAbi_, deployer_
        )
        rewardContract = RewardContract.attach('0x0818165C053D325985d87F4b8646b3062C72C385')
        let claim_ = rewardContract.functions.claim(
            cometAddress, deployer_.address, true
        )
        let accrued = await rewardContract.functions.getRewardOwed(
            cometAddress, deployer_.address,
            {
                gasLimit: 1000000,
                gasPrice: Number(ethers.utils.parseUnits('2', 'gwei')),
                nonce: deployer_.getTransactionCount()
            }
        )
        console.log('aaaaaaaaaaaaaaaaaaaa')
        console.log(await accrued.wait())
        console.log('bbbbbbbbbbbbbbbbbbbb')
        let claimData = (await claim_).data

        let claimObject = 
            {
                gasLimit: 1000000,
                gasPrice: Number(ethers.utils.parseUnits('2', 'gwei')),
                from: deployer_.address,
                nonce: deployer_.getTransactionCount(),
                to: '0x0818165C053D325985d87F4b8646b3062C72C385',
                data: claimData
            }
        let claimTx = await deployer_.sendTransaction(claimObject)
        console.log(await claimTx.wait())
    },

    transfer: async function transferUSDC(
        ProxyContractAddress, YieldFarmContractAddress
    ) {
        let deployer_, proxyContract, yieldFarmContract, usdcContract
        [deployer_,] = await ethers.getSigners()
        let approveAmount = ethers.utils.parseEther('1')
        let amount = ethers.utils.parseUnits('0.00000001', 'gwei')

        let ProxyContract = await ethers.getContractFactory('FiatTokenProxy')
        let USDCContract = await ethers.getContractFactory('FiatTokenV2_1')
        let YieldFarmContract = await ethers.getContractFactory(
            'YieldFarmCompoundV3'
        )

        usdcContract = USDCContract.attach(ProxyContractAddress)
        let transferTx = usdcContract.functions.transferFrom(
            deployer_.address, YieldFarmContractAddress, amount
        )
        let transferData = (await transferTx).data
        console.log(await transferData)
        let transferTxObject = {
            gasLimit: 1000000,
            gasPrice: Number(ethers.utils.parseUnits('2', 'gwei')),
            from: deployer_.address,
            to: ProxyContractAddress, //YieldFarmContractAddress, //ProxyContractAddress,
            data: transferData,
            nonce: deployer_.getTransactionCount()
        }

        let tx = await deployer_.sendTransaction(transferTxObject)

        console.log(await tx.wait())

    }
}

Main = async() => {
    // Deploy FlashLoan Contract.
    //await YieldFarmContractDeploy.deploy()

    // Perform the actual Flash Loan on Aave v3 Fantom using DAI as loaned token
    //await YieldFarm.approveTransfer('0x31D3A7711a74b4Ec970F50c3eaf1ee47ba803A95','0x1b95263E44c9d1CF8a1c59767bFc70EcBecB22e9')
    //await YieldFarm.approveLend('0x31D3A7711a74b4Ec970F50c3eaf1ee47ba803A95','0x1b95263E44c9d1CF8a1c59767bFc70EcBecB22e9', '0xe78Fc55c884704F9485EDa042fb91BfE16fD55c1')
    //await YieldFarm.allowTransfer('0x1b95263E44c9d1CF8a1c59767bFc70EcBecB22e9')
    
    await YieldFarm.lendFunds('0x1b95263E44c9d1CF8a1c59767bFc70EcBecB22e9')
    //await YieldFarm.withdrawFunds('0x1b95263E44c9d1CF8a1c59767bFc70EcBecB22e9')
    //await YieldFarm.claimRewards('0x1b95263E44c9d1CF8a1c59767bFc70EcBecB22e9')
    
    //await YieldFarm.lendFunds('0x5Db9efeEe7d4CCBEa167d8226b349cb323169198')
    //await YieldFarm.admin('0x722a959FEF02B631969aB830c60965b34d59611a')

    //await YieldFarm.transfer('0x31D3A7711a74b4Ec970F50c3eaf1ee47ba803A95','0x4Aeb54847537001a8539dF9464057C9A4D479dE5')
    //await YieldFarm.allowTransfer('0x979be1EC1015347cC3cb7f9700d11D8A3B83B18c')
    //await YieldFarm.allowTransfer('0xE5d2aFf524B142291b1A77a9BDA04238ce511644')
    //await YieldFarm.withdraw('0xB0723822600a544Ab42c7ECD05A6B225c2745Fc1')
    
}

Main()