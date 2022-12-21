import crypto from 'crypto';

const randomNumberGenerator = (a, b) => {
    return new Promise((resolve, reject) => {
        crypto.randomBytes(1, (err, buffer) => {
            if (err) {
                reject(err);
                return;
            }

            const randomNumber = buffer.readUInt8(0) / 256;
            const result = Math.floor(randomNumber * (b - a + 1)) + a;
            resolve(result);
        });
    });
};

const STOCK_SYMBOLS = ['APPLE', 'MSFT', 'NFLX', 'GOOGL', 'TSLA', 'META', 'NVIDIA', 'BABA'];


const GeneratePrices = async () => {
    const stocks = [];

    for (let symbol of STOCK_SYMBOLS) {
        const obj = { "price": await randomNumberGenerator(0, 1000), symbol, prev: await randomNumberGenerator(0, 1000) };
        stocks.push(obj);
    }

    return stocks
}

export default GeneratePrices;
