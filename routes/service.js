const express = require('express');
const fetch = require('node-fetch');

const router = express.Router();
const emptySpace='https://data.taipei/api/v1/dataset/ffa97c0a-d918-4bc6-a00b-298c39ed4e81?scope=resourceAquire' //臺北市身障機構收容暨空位狀態
const loveRestaurant='https://data.taipei/api/v1/dataset/bdc841eb-e8c8-41ee-abfc-1e198a96e905?scope=resourceAquire' //愛心餐廳
const sponsor='https://data.taipei/api/v1/dataset/d9d91248-5a97-4e07-956c-9f6af83e7a2a?scope=resourceAquire'; // 我要贊助
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
router.get('/sponsor', async (req, res) => {
    try {
        const response = await fetch(sponsor);
        const data = await response.json();

        // 假設數據在 data.result.results 中
        const filteredData = data.result.results.map(item => ({
            勸募團體: item.勸募團體,
            起始日期: item.起始日期,
            結束日期: item.結束日期,
            電話: item.聯絡電話,
        }));

        // 使用 Map 來去除重複的勸募團體，保留最後一次出現的數據
        const uniqueMap = new Map();
        filteredData.forEach(item => {
            uniqueMap.set(item.勸募團體, item);
        });

        // 將 Map 轉換回數組
        const uniqueData = Array.from(uniqueMap.values());

        console.log('Unique filtered data:', uniqueData[0]); // 記錄第一項以供檢查
        res.json(uniqueData);
    } catch(error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'An error occurred while fetching or processing data' });
    }
});

module.exports = router;