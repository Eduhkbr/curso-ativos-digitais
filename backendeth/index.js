require("dotenv").config();
const { ethers } = require("ethers");

const ABI = require("./erc20.abi.json");
const ABIHelper = new ethers.Interface(ABI);
/* const contractAddress = "0x4EAD784006Cb920965CB1B45A9F6923330A3Ccf0"; */
const contractAddress = "0x2A846FC387e88F1fAC685AeFD70EeE26394C5611";
const provider = new ethers.InfuraProvider("sepolia");
const signer = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
const signerAccount = signer.address;
const contractReadMode = new ethers.Contract(contractAddress, ABI, provider);
const contractReadWriteMode = new ethers.Contract(contractAddress, ABI, signer);


async function getRandomWallet() {
    console.log("Gerando uma nova carteira...");
    const wallet = ethers.Wallet.createRandom()
    const walletResp = {
        mnemonic: wallet.mnemonic.phrase,
        address: wallet.address,
        privateKey: wallet.privateKey
    }
    console.log(walletResp)
    return walletResp
}

async function getBalance(contaCliente) {
    const saldo = await contractReadMode.balanceOf(contaCliente);
    console.log("Saldo do cliente: ", contaCliente, "é", saldo);
}

async function getNomeToken() {
    const nome = await contractReadMode.name();
    console.log("Nome do Token é: ", nome);
}

async function getTotalSupply() {
    const totalSupply = await contractReadMode.totalSupply();
    console.log("Total Supply é: ", totalSupply);
}

async function getSymbol() {
    const symbol = await contractReadMode.symbol();
    console.log("O symbol é: ", symbol);
}

async function getLogTransferencia(contaCliente, txReceiptBlockNumber) {
    const from = [];
    const filter = contractReadMode.filters.Transfer(from, contaCliente);
    const events = await contractReadMode.queryFilter(filter, txReceiptBlockNumber);
    console.log("Um total de ", events.length, " transações foram encontradas.");
    events.forEach((evento) => parseLogTransferencia(evento));
}

function parseLogTransferencia(evento) {
    const parsedLog = ABIHelper.parseLog(evento);
    console.log("Evento de Transferencia Parseado:", parsedLog);
}

async function transferirToken(contaDestino) {
    console.log("Preparando transação...");
    const tx = await contractReadWriteMode.transfer(contaDestino, 10000000n);
    console.log("Tx enviada ao transaction pool da rede blockchain. TxHash:", tx.hash);
    const txReceipt = await tx.wait(1);
    if (txReceipt.status != 1) {
        console.error(`Falha na transação ${txReceipt}`);
        return
    }
    console.log("Transacao de mint realizada com sucesso!");
    console.log("Detalhes: ", txReceipt);
    await getLogTransferencia(contaDestino, txReceipt.blockNumber);
}

async function main() {
    try {
        /*
        console.log("chamando getRandomWallet...");
        const randomWallet = await getRandomWallet();
        console.log("Carteira gerada...", randomWallet.address);

        await getNomeToken();
        await getBalance(randomWallet.address);

        await getBalance("0x263C3Ab7E4832eDF623fBdD66ACee71c028Ff591");
        */

        /*
        await getNomeToken();
        await getBalance("0x263C3Ab7E4832eDF623fBdD66ACee71c028Ff591");
        await getBalance(signerAccount);
        await transferirToken("0x263C3Ab7E4832eDF623fBdD66ACee71c028Ff591");
        await getBalance("0x263C3Ab7E4832eDF623fBdD66ACee71c028Ff591");
        */

        await getNomeToken();
        await getTotalSupply();
        await getSymbol();
        await getBalance("0xa46236D9c295F30FC987C4734bf084AdCDDe03b5");
        await getBalance(signerAccount);
        await transferirToken("0xa46236D9c295F30FC987C4734bf084AdCDDe03b5");
        await getBalance("0xa46236D9c295F30FC987C4734bf084AdCDDe03b5");
    } catch (error) {
        console.log('Erro no processamento: ', error);
    }
}

main().then(() => process.exit(0))