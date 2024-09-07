const express = require('express');
const fetch = require('node-fetch');

const router = express.Router();

const url = 'https://data.taipei/api/v1/dataset/bdc841eb-e8c8-41ee-abfc-1e198a96e905?scope=resourceAquire';

router.get('/', async (req, res) => {
    try {
        const response = await fetch(url);
        const data = await response.json();

        // 假設數據在 data.result.results 中
        const filteredData = data.result.results.map(item => ({
            ORG_NAME: item.ORG_NAME,
            ADDRESS: item.ADDRESS,
            PERSON_IN_CHARGE: item.PERSON_IN_CHARGE,
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
});

module.exports = router;