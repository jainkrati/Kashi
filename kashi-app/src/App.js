import "./App.css";

// import Admin from './Components/admin';
// import LoginComponent from './Components/login';
import WalletCard from "./Components/walletCard";
import GetBusinesses from "./Components/getBusinesses";
import GetMySubscriptions from "./Components/getMySubscriptions";

function App() {
  return (
    <div className="App">
      {/* <LoginComponent /> */}
      <header className="App-header">
        {/* <Admin /> */}
        <WalletCard />
        <GetBusinesses />
        <GetMySubscriptions />
      </header>
    </div>
  );
}

export default App;
