// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;


/** 
 * @title Kashi
 * @dev Implements subscription and one-time payments for businesses
 */
contract Kashi {

    uint public businessId;

    struct Business {
        uint id;
        string name; // weight is accumulated by delegation
        string url;  // if true, that person already voted
        address owner; // admin for the business
        string[] tiers;  
        uint[] costs;
        uint256 balance;
    }

    struct UserSubscription {
        uint businessId;
        string tierName; 
        uint256 startDateTime; 
        uint256 nextPaymentDueDate; 
    }


    address public admin;
    mapping(uint => Business) public businesses;

    mapping(address => UserSubscription[]) public userSubscriptions;

    /** 
     * @dev records the admin
     */
    constructor() {
        admin = msg.sender;
        businessId = 1;
    }

    function registerBusiness(string calldata name, string calldata url, string[] calldata tiers, uint[] calldata costs) public {
       require(tiers.length == costs.length, "Tiers and Costs should be same lenght");
        uint businessID = businessId;
        businesses[businessID] = (Business({
            id: businessID,
            name: name,
            url: url,
            owner: msg.sender,
            tiers: tiers,
            costs: costs,
            balance: 0
        }));
        businessId = businessId + 1 ;
    }

    function registerUserSubscription(uint businessRefId, string calldata tier, uint256 amount) payable public {
        require(msg.value != 0);
        // todo check if amount is equal to msg.value
        businesses[businessRefId].balance = businesses[businessRefId].balance + amount;
        userSubscriptions[msg.sender].push(UserSubscription({
        businessId: businessRefId,
        tierName: tier,
        startDateTime: block.timestamp,
        nextPaymentDueDate: block.timestamp + 30 days // todo keep the date fixed
        }));
    }

    function withdraw(uint amount, uint businessRefId) public returns(bool) {
        require(amount <= businesses[businessRefId].balance, "insufficient balance");
        require(msg.sender == businesses[businessRefId].owner, "only business owner can withdraw");
        address payable owner = payable(msg.sender);
        businesses[businessRefId].balance = businesses[businessRefId].balance - amount;
        owner.transfer(amount);
        return true;
    }

    function recordSubscriptionPayment(uint businessRefId, uint256 amount) payable public {
        require(msg.value != 0);
        // todo check if amount is equal to msg.value
        businesses[businessRefId].balance = businesses[businessRefId].balance + amount;
        UserSubscription[] storage subscriptions = userSubscriptions[msg.sender];
        for (uint256 i = 0; i < subscriptions.length - 1; i++) {
            UserSubscription storage subscription = subscriptions[i];

            if (subscription.businessId == businessRefId) {
                subscription.nextPaymentDueDate = block.timestamp + 30 days;
            }
        }
    }

}