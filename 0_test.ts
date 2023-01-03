import { AxelarAssetTransfer, AxelarQueryAPI, Environment, CHAINS, AxelarGMPRecoveryAPI, GMPStatusResponse } from "@axelar-network/axelarjs-sdk";

import { SigningCosmWasmClient, Secp256k1HdWallet, GasPrice } from "cosmwasm";



const osmoRpc = "https://rpc-test.osmosis.zone";

const axelarAssetTransfer = new AxelarAssetTransfer({
    environment: Environment.TESTNET,
    auth: "metamask"
});
const axelarQuery = new AxelarQueryAPI({
    environment: Environment.TESTNET,
});

const recoveryApi = new AxelarGMPRecoveryAPI({
    environment: Environment.TESTNET,
});

const mnemonic = "uncover play shiver victory embody seat engage mule public hip cruel mountain";
const osmo_address = "osmo12vnlw82ynj6lhcnecfv939jzrxenk3h9y92jj3";
const deposit_address = "0x6e775b04639fB207Cf36be052E79b53d8F2cf283";

async function setupClient(mnemonic: string, rpc: string, gas: string | undefined): Promise<SigningCosmWasmClient> {
    if (gas === undefined) {
        let wallet = await Secp256k1HdWallet.fromMnemonic(mnemonic, { prefix: 'osmo' });
        let client = await SigningCosmWasmClient.connectWithSigner(rpc, wallet);

        return client;
    } else {
        let gas_price = GasPrice.fromString(gas);
        let wallet = await Secp256k1HdWallet.fromMnemonic(mnemonic, { prefix: 'osmo' });
        let client = await SigningCosmWasmClient.connectWithSigner(rpc, wallet, { gasPrice: gas_price });
        return client;
    }
}

async function getAddress(mnemonic: string, prefix: string = 'osmo') {
    let wallet = await Secp256k1HdWallet.fromMnemonic(mnemonic, { prefix });
    let accounts = await wallet.getAccounts();
    return accounts[0].address;
}


describe("Axelar-js tests", () => {
    xit("Generate Wallet", async () => {
        let wallet = await Secp256k1HdWallet.generate(12);
        console.log(wallet.mnemonic);
    });

    xit("get deposit address", async () => {
        let address = await getAddress(mnemonic);
        console.log(address);
        let res = await axelarAssetTransfer.getDepositAddress(
            CHAINS.TESTNET.POLYGON, CHAINS.TESTNET.OSMOSIS, address, "uausdc");
        console.log(res);
    });

});