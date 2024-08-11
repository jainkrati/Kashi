const ethers = require("ethers");

const providerURL =
  "https://optimism-mainnet.infura.io/v3/2e7914554fbf4bcba1839d04ddf1f56f";
const provider = new ethers.providers.JsonRpcProvider(providerURL);
const kashiAddress = "0xb59caca318906b1422122f11967537c7492e12c7";
const privateKey = "";

const kashiABI = [
  { inputs: [], stateMutability: "nonpayable", type: "constructor" },
  {
    inputs: [],
    name: "admin",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "businessId",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    name: "businesses",
    outputs: [
      { internalType: "uint256", name: "id", type: "uint256" },
      { internalType: "string", name: "name", type: "string" },
      { internalType: "string", name: "url", type: "string" },
      { internalType: "address", name: "owner", type: "address" },
      { internalType: "uint256", name: "balance", type: "uint256" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "businessRefId", type: "uint256" },
      { internalType: "uint256", name: "amount", type: "uint256" },
    ],
    name: "recordSubscriptionPayment",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "string", name: "name", type: "string" },
      { internalType: "string", name: "url", type: "string" },
      { internalType: "string[]", name: "tiers", type: "string[]" },
      { internalType: "uint256[]", name: "costs", type: "uint256[]" },
    ],
    name: "registerBusiness",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "businessRefId", type: "uint256" },
      { internalType: "string", name: "tier", type: "string" },
      { internalType: "uint256", name: "amount", type: "uint256" },
    ],
    name: "registerUserSubscription",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "", type: "address" },
      { internalType: "uint256", name: "", type: "uint256" },
    ],
    name: "userSubscriptions",
    outputs: [
      { internalType: "uint256", name: "businessId", type: "uint256" },
      { internalType: "string", name: "tierName", type: "string" },
      { internalType: "uint256", name: "startDateTime", type: "uint256" },
      { internalType: "uint256", name: "nextPaymentDueDate", type: "uint256" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "amount", type: "uint256" },
      { internalType: "uint256", name: "businessRefId", type: "uint256" },
    ],
    name: "withdraw",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
];
const wallet = getWallet(privateKey);

function getWallet(privateKey) {
  return new ethers.Wallet(privateKey, provider);
}

function constructContract(smAddress, smABI, privateKey) {
  const signer = new ethers.Wallet(privateKey);
  return new ethers.Contract(smAddress, smABI, signer.connect(provider));
}

async function testKashi() {
  const kashiContract = constructContract(kashiAddress, kashiABI, privateKey);
  let admin = await kashiContract.admin();
  console.log("admin: ", admin);
}
testKashi();
