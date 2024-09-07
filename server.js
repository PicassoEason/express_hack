const express = require('express');
const foodRouter = require('./food');

const app = express();
const port = 3000;

// 使用 /food 路徑來處理所有食品相關的請求
app.use('/food', foodRouter);

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});