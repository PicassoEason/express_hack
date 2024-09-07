const express = require('express');
const foodRouter = require('./routes/food');

const app = express();
const port = 5001;

// 使用 /food 路徑來處理所有食品相關的請求
app.use('/food', foodRouter);
app.get("/", (req, res) => res.send("Express on Vercel"));
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});