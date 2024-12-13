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
//const tryFarmContractAddress = '0x7Ad9566d14A0DC48FA752bFB9712127f43cB2e5C'


let TryFarmContractDeploy = {

    /** 
     * @dev Deploy the Defi lend/withdraw contract.
     * This is the Compound DeFi contract and must be implemented first. 
     * Simply deploys the DeFi contract for interacting with Compound v3.
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
            cometProxyAddress, compRewardsAddress, usdcAddress, compAddress,implementationAddress
        )
        await tryFarmContract.deployed()
        console.log(tryFarmContract.address)
        return tryFarmContract
    }
}

let TryFarm = {

    /** 
     * @dev Execute DEFI lend/withdraw. 
     * Execute lend/withdraw on Compound V3 on Base mainnet to lend 0.00998 USDbC.
     * 
     * Requirements:
     * Should lend/withdraw USDbC specified without hiccups.
     * 
     */
    lendFund: async function lendFundsFunction(tryFarmContractAddress) {
        let deployer_, tryFarmContract
        [deployer_] = await ethers.getSigners()
        let amount = ethers.utils.parseUnits('998', 'wei')

        let TryFarmContract = await ethers.getContractFactory(
            'YieldFarmCompoundV3'
        )
        tryFarmContract = TryFarmContract.attach(tryFarmContractAddress)

        /*await tryFarmContract.connect(deployer_).functions.doApproval(
            usdcAddress, amount, {
                gasLimit: 300000,
                gasPrice: Number(ethers.utils.parseUnits('0.04', 'gwei'))
            }
        )

        let USDCContract = new ethers.Contract(usdcAddress, abi_, deployer_)
        
        let usdcContract = USDCContract.attach(usdcAddress)
    
        let approveTx = usdcContract.functions.approve(
            tryFarmContractAddress, amount
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

        await tryFarmContract.connect(deployer_).functions.doTransfer(
            usdcAddress, amount, {
                gasLimit: 300000,
                gasPrice: Number(ethers.utils.parseUnits('0.04', 'gwei'))
            }
        )*/
        
        await tryFarmContract.connect(deployer_).functions.lend(
            usdcAddress, amount, {
                gasLimit: 300000,
                gasPrice: Number(ethers.utils.parseUnits('0.045', 'gwei'))
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
    }
}

Main = async() => {
    // Deploy FlashLoan Contract.
    //await TryFarmContractDeploy.deploy()
    //await TryFarm.approveUSDC()
    //TryFarm.lendFund('0x7Ad9566d14A0DC48FA752bFB9712127f43cB2e5C')
    //TryFarm.getTxDetailsFromHash('0xab048de1d7179bc571307fdd3d7bd27642c84a42c2b169ce63ab45a5288d33ac')
    TryFarm.withdraw('0x7Ad9566d14A0DC48FA752bFB9712127f43cB2e5C')
    //TryFarm.withdrawRewards('0x7Ad9566d14A0DC48FA752bFB9712127f43cB2e5C')

}

Main()