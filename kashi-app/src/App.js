import "./App.css";

import WalletCard from "./Components/walletCard";
import BusinessSetter from "./Components/businessSetter";
import GetBusinesses from "./Components/getBusinesses";
import GetMySubscriptions from "./Components/getMySubscriptions";
import { Wallet } from "ethers";

function App() {
  const [walletAddress, setWalletAddress] = useState(
    "0x44AC194359fA44eCe6Cb2E53E8c90547BCCb95a0"
  );
  const [businessId, setBusinessId] = useState(1);

  return (
    <div className="App">
      {/* <LoginComponent /> */}
      <header className="App-header">
        {/* <Admin /> */}
        <Wallet />
        <BusinessSetter setter={setBusinessId} />
        <GetBusinesses walletAddress={walletAddress} businessId={businessId} />
        <GetMySubscriptions
          walletAddress={walletAddress}
          businessId={businessId}
        />
      </header>
    </div>
  );
}

export default App;
