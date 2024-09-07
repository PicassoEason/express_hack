const express = require('express');
const fetch = require('node-fetch');

const router = express.Router();

const url = 'https://data.taipei/api/v1/dataset/bdc841eb-e8c8-41ee-abfc-1e198a96e905?scope=resourceAquire';//社會救助
const url_shop='https://data.taipei/api/v1/dataset/209123b3-335f-432f-9521-711e18ce3388?scope=resourceAquire'; // 7-11

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
            PHONE:item.PHONE,
            LAT: item.LAT,
            LON: item.LON
        }));

        // console.log('Filtered data:', filteredData[0]); // 記錄第一項以供檢查
        res.json(filteredData);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'An error occurred while fetching or processing data' });
    }
});

router.get('/shop', async (req, res) => {
    try{
        const response = await fetch(url_shop);
        const data = await response.json();
        const filteredData = data.result.results.map(item => ({
            NAME: item.綠色商店名稱,
            ADDRESS: item.聯絡地址,
         
        }));
        // console.log('Filtered data:', filteredData[0]);
        res.json(filteredData);
    }
    catch(error){
        console.error('Error:', error);
        res.status(500).json({ error: 'An error occurred while fetching or processing data' });
    }
});




module.exports = router;