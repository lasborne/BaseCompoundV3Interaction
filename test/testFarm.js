const { ethers } = require('hardhat');

// failedRADIANTArbitrumImplementationContract = '0x453213a019585764ecf11075ce600bf8ec7d8c16'

const abi_ = [{"inputs":[{"internalType":"address","name":"_bridge","type":"address"},{"internalType":"address","name":"_remoteToken","type":"address"},{"internalType":"uint8","name":"_decimals","type":"uint8"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"account","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Burn","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint8","name":"version","type":"uint8"}],"name":"Initialized","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"account","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Mint","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[],"name":"BRIDGE","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"REMOTE_TOKEN","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"bridge","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_from","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"burn","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"_name","type":"string"},{"internalType":"string","name":"_symbol","type":"string"}],"name":"initialize","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"l1Token","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"l2Bridge","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_to","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"mint","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"remoteToken","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes4","name":"_interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"pure","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"version","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"}]

// Compound Base Addresses
const usdcAddress = '0xd9aAEc86B65D86f6A7B5B1b0c42FFA531710b6CA'
const compAddress = '0x9e1028F5F1D5eDE59748FFceE5532509976840E0'
const cometFactory = '0x27C348936400791b7350d80Fb81Bc61Ad68dF4AE'

const compRewardsAddress = '0x123964802e6ABabBE1Bc9547D72Ef1B69B00A6b1'

const implementationAddress = '0x3Ab91391221204372DC9FE5E3D4516d03988E8B8'
const cometProxyAddress = '0x9c4ec768c28520B50860ea7a15bd7213a9fF58bf'
//const tryFarmContractAddress = '0xc81B7C46b8cE88210Ad2D9410d89938a8259AC18'


let TryFarmContractDeploy = {

    /** 
     * @dev Deploy the Flash loan contract.
     * This is the Flash loan contract and must be implemented first. 
     * Simply deploys the flash loan contract from Aave v3.
     * 
     * Requirements:
     * 
     */
    deploy: async function deployYieldFarmContract() {
        let deployer, tryFarmContract
        [deployer,] = await ethers.getSigners()

        let TryFarmContract = await ethers.getContractFactory(
            'YieldFarmCompoundV3', deployer
        )
        
        tryFarmContract = await TryFarmContract.deploy(
            cometProxyAddress, compRewardsAddress, usdcAddress, compAddress, usdcAddress,implementationAddress
        )
        await tryFarmContract.deployed()
        console.log(tryFarmContract.address)
        return tryFarmContract
    }
}

let TryFarm = {

    /** 
     * @dev Execute FlashLoan. 
     * Execute the flash loan on Aave V3 on Fantom mainnet to borrow 10 DAI.
     * 
     * Requirements:
     * Should pay back within the same transaction.
     * 
     */
    lendFund: async function lendFundsFunction(tryFarmContractAddress) {
        let deployer_, tryFarmContract
        [deployer_] = await ethers.getSigners()
        let amount = ethers.utils.parseUnits('1000', 'wei')

        let TryFarmContract = await ethers.getContractFactory(
            'YieldFarmCompoundV3'
        )
        
        tryFarmContract = TryFarmContract.attach(tryFarmContractAddress)
        await tryFarmContract.connect(deployer_).functions.lend(
            usdcAddress, amount, {
                gasLimit: 300000,
                gasPrice: Number(ethers.utils.parseUnits('0.04', 'gwei'))
            }
        )
        
        console.log(deployer_.address)
    },

    withdraw: async function withdrawAllLentFunds(tryFarmContractAddress) {
        let deployer_, tryFarmContract
        [deployer_] = await ethers.getSigners()
        let amount = ethers.utils.parseUnits('1000', 'wei')

        let TryFarmContract = await ethers.getContractFactory(
            'YieldFarmCompoundV3'
        )
        
        tryFarmContract = TryFarmContract.attach(tryFarmContractAddress)
        await tryFarmContract.connect(deployer_).functions.withdrawAll(
            usdcAddress, amount, {
                gasLimit: 300000,
                gasPrice: Number(ethers.utils.parseUnits('0.04', 'gwei'))
            }
        )
    },

    withdrawRewards: async function withdrawAll(tryFarmContractAddress) {
        let deployer_, tryFarmContract
        [deployer_] = await ethers.getSigners()

        let TryFarmContract = await ethers.getContractFactory(
            'YieldFarmCompoundV3'
        )
        
        tryFarmContract = TryFarmContract.attach(tryFarmContractAddress)

        await tryFarmContract.connect(deployer_).functions.withdrawRewards(
            {
                gasLimit: 300000,
                gasPrice: Number(ethers.utils.parseUnits('0.04', 'gwei'))
            }
        )
    },

    getTxDetailsFromHash: async function getTx(transactionHash) {
        let txDetails = await ethers.provider.getTransaction(transactionHash)
        console.log(txDetails)
    },

    approveUSDC: async function approveTf() {
        let deployer_, tryFarmContract, usdcContract
        [deployer_] = await ethers.getSigners()
        let approveAmount = ethers.utils.parseEther('1')
        let amount = ethers.utils.parseUnits('0.00001', 'gwei')

        let USDCContract = new ethers.Contract(usdcAddress, abi_, deployer_)
        
        usdcContract = USDCContract.attach(usdcAddress)

        let approveTx = usdcContract.functions.approve(
            cometProxyAddress, approveAmount
        )
        
        let approvalData = (await approveTx).data
        console.log((await approvalData).data)
        let approveTxObject = {
            gasLimit: 300000,
            gasPrice: Number(ethers.utils.parseUnits('0.03', 'gwei')),
            from: deployer_.address,
            to: usdcAddress,
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

    withdrawFunds: async function allowWithdraw(tryFarmContractAddress) {
        let deployer_, tryFarmContract, cUSDContract
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

    transfer: async function transferUSDC(
        ProxyContractAddress, TryFarmContractAddress
    ) {
        let deployer_, proxyContract, tryFarmContract, usdcContract
        [deployer_,] = await ethers.getSigners()
        let approveAmount = ethers.utils.parseEther('1')
        let amount = ethers.utils.parseUnits('0.00000001', 'gwei')

        let ProxyContract = await ethers.getContractFactory('FiatTokenProxy')
        let USDCContract = await ethers.getContractFactory('FiatTokenV2_1')
        let TryFarmContract = await ethers.getContractFactory(
            'YieldFarmCompoundV3'
        )

        usdcContract = USDCContract.attach(ProxyContractAddress)
        let transferTx = usdcContract.functions.transferFrom(
            deployer_.address, TryFarmContractAddress, amount
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
    //await TryFarmContractDeploy.deploy()
    //await TryFarm.approveUSDC()
    //TryFarm.lendFund('0x7a775daa440Dfa605308F018065B815FA7f3f40F')
    //TryFarm.getTxDetailsFromHash('0xab048de1d7179bc571307fdd3d7bd27642c84a42c2b169ce63ab45a5288d33ac')
    //TryFarm.withdraw('0x7a775daa440Dfa605308F018065B815FA7f3f40F')
    TryFarm.withdrawRewards('0x7a775daa440Dfa605308F018065B815FA7f3f40F')

    //0x4eC4E07F194BC942d10Bd3F1db0ACAF4e37b6390
    // Perform the actual Flash Loan on Aave v3 Fantom using DAI as loaned token
    //await YieldFarm.approveTransfer('0x31D3A7711a74b4Ec970F50c3eaf1ee47ba803A95','0x1b95263E44c9d1CF8a1c59767bFc70EcBecB22e9')
    //await YieldFarm.approveLend('0x31D3A7711a74b4Ec970F50c3eaf1ee47ba803A95','0x1b95263E44c9d1CF8a1c59767bFc70EcBecB22e9', '0xe78Fc55c884704F9485EDa042fb91BfE16fD55c1')
    //await YieldFarm.allowTransfer('0x1b95263E44c9d1CF8a1c59767bFc70EcBecB22e9')
    
    
    //await TryFarm.lendFunds('0x1b95263E44c9d1CF8a1c59767bFc70EcBecB22e9')
    
    
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