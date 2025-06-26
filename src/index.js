const { Connection, PublicKey } = require("@solana/web3.js")
const axios = require("axios")
const dotenv = require("dotenv")

dotenv.config()
const BACKEND = process.env.BACKEND_URL || "https://believe-indexer-production.up.railway.app/"
const publicKey = new PublicKey("5qWya6UjwWnGVhdSBL3hyZ7B45jbk6Byt1hwd7ohEGXE")
const monitorBelieveTokens = async () => {
    console.log("Monitoring new believe tokens")
    try {
        const connection = new Connection(process.env.RPC_URL || "", {
            wsEndpoint: process.env.WS_URL || ""
        })

        connection.onLogs(
            publicKey,
            async (logs, ctx) => {
                if (
                    logs.logs.some(log => log.includes("Program log: Instruction: VaultTransactionExecute")) &&
                    logs.logs.some(log => log.includes("Program log: Instruction: InitializeMint2"))
                ) {
                    const signature = logs.signature
                    console.log("new believe token: ", signature)
                    const tx = await connection.getParsedTransaction(signature, { maxSupportedTransactionVersion: 0 })
                    const isSigner = tx?.transaction.message.accountKeys.some(acc => acc.pubkey.equals(publicKey) && acc.signer) || false
                    const mint = tx?.transaction.message.accountKeys.map(acc => acc.pubkey.toBase58())[1]

                    if (isSigner) {
                        // const response = (await axios.get(`https://lite-api.jup.ag/tokens/v1/token/${mint}`)).data
                        // if (response.address) {
                        // const tokenPrice = (await axios.get(`https://lite-api.jup.ag/price/v2?ids=${mint}`)).data.data[`${mint}`].price
                        // const { address, name, symbol, decimals, logoURI, tags, daily_volume, created_at } = response
                        await axios.post(`${BACKEND}/new-token`, {
                            mint
                        })
                        // }
                    }

                }
            }
        )
    } catch (e) {
        console.log(e)
    }

}
monitorBelieveTokens()

// (async () => {
//     const connection = new Connection(process.env.RPC_URL || "", {
//         wsEndpoint: process.env.WS_URL || ""
//     })
//     const tx = await connection.getParsedTransaction("5RpMWKvhC7Fr6Jx7qDFEGjzgwGzUF8RTGv981RfCcp5ho7WPeux2dNu3sEEvaEDCuWJyvDhmwrr9MKjhDgB3pL9D", {
//         maxSupportedTransactionVersion: 0
//     })
//     const isSigner = tx?.transaction.message.accountKeys.some(acc => acc.pubkey.equals(publicKey) && acc.signer) || false
//     if (isSigner) {
//         console.log()
//     }
// })()