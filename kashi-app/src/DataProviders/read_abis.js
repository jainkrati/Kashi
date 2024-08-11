// import kashiContract
import { kashiContract } from './DataProviders/kashiContract';

async function testKashi() {
    const contract = kashiContract();
    let admin = await contract.admin();
    console.log("admin: ", admin);
}
testKashi();
