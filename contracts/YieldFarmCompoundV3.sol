// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;
import './CometInterface.sol';
import 'hardhat/console.sol';
import '@aave/core-v3/contracts/flashloan/base/FlashLoanSimpleReceiverBase.sol';
import '@aave/core-v3/contracts/interfaces/IPoolAddressesProvider.sol';
import '@openzeppelin/contracts/utils/math/SafeMath.sol';
import '@openzeppelin/contracts/token/ERC20/IERC20.sol';
import {FiatTokenProxy} from './FiatTokenProxy.sol';
import {FiatTokenV2_1} from './FiatTokenV2_1.sol';
import './IERC20NonStandard.sol';
import './CometRewards.sol';

interface IAdminUpgradeabilityProxy {
  function implementation() external view returns (address);
}

/**
  * @author Lasborne
  * @notice Use FlashLoaned fund to farm yield in COMPOUND by supplying and borrowing.
  * @dev The contract is YieldFarm to farm COMP tokens using flash loan from Aave.
  */
contract YieldFarmCompoundV3 is FiatTokenProxy {
    using SafeMath for uint256;

    event Lending(address indexed from, address indexed to, uint256 amount);
    error TransferError();
    error WithdrawalError();

    uint256 borrowAmount;
    uint256 amount;
    address owner;
    FiatTokenV2_1 public FiatToken;

    IERC20 public comp;
    CometInterface public Comet;
    CometRewards public cometRewards;
    address public borrowedToken_;

    mapping(address => uint256) internal balance;
    mapping(address => mapping(address => uint256)) internal _allowance;

    constructor(
      address _cometAddress, address _cometRewards, address _borrowedToken,
      address _comp, address _implementationAddress
    ) FiatTokenProxy(_implementationAddress) {
      owner = msg.sender;
      Comet = CometInterface(_cometAddress);
      //loanedCToken = FiatTokenProxy(payable(address(_implementationAddress)));
      borrowedToken_ = _borrowedToken;
      comp = IERC20(_comp);
      cometRewards = CometRewards(_cometRewards);
    }

    /**
     * @notice Gets the amount of approved tokens to be spent by addresses.
     * @dev Proxy uses a call to get allowance function of the implementation contract.
     * @dev Returns allowance in uint256 if call is successful.
     */
    function getAllowance(address _token) internal view returns (uint256) {
      return IERC20(_token).allowance(tx.origin, address(this));
    }

    /**
     * @notice Gets the balance of tokens owned by the 'original EOA' address.
     * @dev Returns balance of the sender of the transaction.
     */
    function getBalance(address _token) internal view returns (uint256) {
      return IERC20(_token).balanceOf(tx.origin);
    }

    /**
     * @notice Approves an amount for the cometProxy to spend owner tokens.
     * @param _amount the amount to be approved.
     * @param _token the ERC20 token to be approved for spending.
     * @dev Returns original approval result.
     */
    function doApproval(address _token, uint256 _amount) public returns (
    bool) {
      require (getBalance(_token) >= _amount, "Insufficient balance!");
      //IERC20(_token).approve(address(Comet), _amount);
      (bool success, bytes memory data) = _token.delegatecall(
        abi.encodeWithSignature("approve(address, uint256)", address(Comet),
        _amount)
      );
      if (success != true) {
        return success;
      } else {
        return success;
      }
    }

    /**
     * @notice Transfers an amount from the owner to this contract address.
     * @param _amount the amount to be transferred.
     * @dev First checks the allowance is atleast equal to the amount for transfer.
     * @dev Proxy uses a call to get transferFrom function of the implementation contract.
     * @dev Returns original result in bool if call is successful.
     */
    function doTransfer(address _token, uint256 _amount) public returns (
    bool) {
      //doApproval(_token, _amount);
      require (getAllowance(_token) >= _amount, "Inadequate amount approved!");
      IERC20(_token).transferFrom(tx.origin, address(this), _amount);
    }
    
    /**
     * @notice Function not yet in use.
     * @notice lend Flash loaned amount to Compound finance.
     * @param _amount the amount of tokens supplied.
     * @param _token the address of the lent token.
     * @dev Approves the comet address to spend flashloaned fund.
     * @dev Calls the comet's supply function.
     */
    function lend(address _token, uint _amount) external returns (
      bytes memory) {
      //doTransfer(_token, amount);
      // approval for the Comet contract to spend tokens
      IERC20(_token).approve(address(Comet), _amount);
      // Supply funds
      Comet.supply(_token, _amount);
      emit Lending(address(owner), address(this), _amount);
    }

    /**
     * @notice This function is not use yet.
     * @notice withdraw invested Flash loan funds and rewards given.
     * @dev Checks balance of this contract and withdraws all funds.
     * @dev Redeems rewards and funds from cTokens to regular tokens.
     */
    function withdrawAll(address _token, uint256 _amount) external {
      //withdrawRewards();
      IERC20NonStandard(address(Comet)).approve(address(Comet), type(uint256).max);
      Comet.withdraw(_token, type(uint256).max);
    }

    /**
     * @notice This function is not in use yet.
     * @notice withdraw rewards given.
     * @dev Checks balance of this contract and withdraws COMP.
     * @dev Transfers Comp rewards to msg.sender
     */
    function withdrawRewards() external {
      cometRewards.claim(address(Comet), address(this), true);
      console.log(address(this));
      console.log(msg.sender);
      uint256 balanceComp = comp.balanceOf(address(this));
      //comp.transfer(owner, balanceComp);
    }

    /**
     * @notice This function is not in use yet.
     * @notice borrow funds.
     * @dev Approves the cToken address for borrowing.
     * @dev Create an array containing cToken address.
     * @dev Enter the borrow market.
     */
    function borrow() external{
      borrowAmount = (amount.div(2));

      //loanedToken.approve(address(cBorrowedToken), borrowAmount);

      // Signals to compound that a token lent will be used as a collateral.

      // Borrow 50% of the same collateral provided.
      
      Comet.withdraw(address(Comet), borrowAmount);
    }

    /**
     * @notice This function is not in use yet.
     * @notice pay back borrowed funds.
     * @dev Approve the cToken address for repay with a higher amount.
     * @dev Repay borrowed amount and reset.
     * @dev Enter the borrow market.
     */
    function payback() external {
      //borrowedToken.approve(address(Comet), (type(uint256).max));
      (bool success3, bytes memory result3) = address(
        Comet
      ).delegatecall(abi.encodeWithSignature(
        "approve(address, uint256)", address(Comet), type(uint256).max
      ));
      Comet.supply(
        address(Comet), Comet.borrowBalanceOf(address(this))
      );
      // Reset borrow amount back to 0 after pay out is executed.
      borrowAmount = 0;
    }
}