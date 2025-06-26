const express = require("express")
const axios = require("axios")
const cors = require("cors")
const { PrismaClient } = require("./generated/prisma")

const prisma = new PrismaClient()
const app = express()

app.use(express.json())
app.use(cors())

// Health check endpoint
app.get("/", (req, res) => {
    console.log("Health check - indexer running")
    res.status(200).json({
        status: "ok",
        message: "Indexer server running",
        timestamp: new Date().toISOString()
    })
})
app.post("/new-token", async (req, res) => {
    console.log(req.body)
    const { mint } = req.body
    // const response = (await axios.get(`https://lite-api.jup.ag/tokens/v1/token/${mint}`)).data

    console.log("Got response", mint)
    try {
        await prisma.token.create({
            data: {
                mint,
                created_at: new Date()
            }
        })
        console.log("added new token to DB")
        res.status(200).json({ "message": "Added to DB" })
    } catch (e) {
        console.log("DB Insert failed, ", e.message)
        res.status(500).json({ error: "Db insertion failed" })
    }
})

app.listen(process.env.PORT || 3000, () => { console.log("Server running on port") })