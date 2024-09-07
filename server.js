const express = require('express');
const cors = require('cors');
const foodRouter = require('./routes/food');
const serviceRouter = require('./routes/service');
const app = express();
const port = 5004;

// 啟用 CORS
app.use(cors());

// 使用 /food 路徑來處理所有食品相關的請求
app.use('/food', foodRouter);
app.use('/api',serviceRouter);

app.get("/", (req, res) => res.send("Express on Vercel"));
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});