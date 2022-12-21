import express from 'express';
import cors from 'cors';
import prices from './RandomPriceGenerator.js';

const PORT = 8080;
const app = express();

app.use(cors())

app.get('/prices', async (req, res) => {
    try {
        const stocks = await prices();
        return res.status(200).json({
            success: true,
            data: stocks
        });
    } catch (e) {
        res.status(500).json("...hhhmm, we are flabbergasted too");
    }
});

app.use("*", (req, res) => {
    res.status(404).json("Seems you are lost")
});


app.listen(PORT, () => console.log(`Server running at port: ${PORT}`));