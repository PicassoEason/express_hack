const express = require('express');
const fetch = require('node-fetch');

const router = express.Router();
const emptySpace='https://data.taipei/api/v1/dataset/ffa97c0a-d918-4bc6-a00b-298c39ed4e81?scope=resourceAquire' //臺北市身障機構收容暨空位狀態
const loveRestaurant='https://data.taipei/api/v1/dataset/bdc841eb-e8c8-41ee-abfc-1e198a96e905?scope=resourceAquire' //愛心餐廳

router.get('/emptySpace', async (req, res) => {
    try {
        const response = await fetch(emptySpace);
        const data = await response.json();

        // 假設數據在 data.result.results 中
        const filteredData = data.result.results.map(item => ({
            屬性: item.屬性,
            機構名稱: item.機構名稱,
            全日型住宿床位數量: item.全日型住宿床位數量,
            緊急短期安置床位數量: item.緊急短期安置床位數量,
            地址:item.地址,
        }));

        console.log('Filtered data:', filteredData[0]); // 記錄第一項以供檢查
        res.json(filteredData);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'An error occurred while fetching or processing data' });
    }
}
);
router.get('/loveRestaurant', async (req, res) => {
    try {
        const response = await fetch(loveRestaurant);
        const data = await response.json();

        // 假設數據在 data.result.results 中
        const filteredData = data.result.results.map(item => ({
            ORG_NAME: item.ORG_NAME,
            Food_NAME: item.L1_NAME,
            ADDRESS: item.ADDRESS,
            PHONE: item.PHONE,
            POST_DATE: item.POST_DATE,
            LAT: item.LAT,
            LON: item.LON
        }));

        console.log('Filtered data:', filteredData[0]); // 記錄第一項以供檢查
        res.json(filteredData);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'An error occurred while fetching or processing data' });
    }
}
);

module.exports = router;