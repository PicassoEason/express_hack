const express = require('express');
const { fetchTaipeiData } = require('./taipeiDataFetcher');

const app = express();
const port = 5001;  // 更新為 5001

app.get('/', async (req, res) => {
  print("hello");
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});