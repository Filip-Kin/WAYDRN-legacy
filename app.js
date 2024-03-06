const dotenv = require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 3000; // Set your port if it's different
const { GoogleSpreadsheet } = require('google-spreadsheet');

function getDay(dateParam, timeParam) {
    let date = new Date(dateParam);
    let time = parseInt(timeParam.split('.')[0])

    let start = new Date(date.getFullYear(), 0, 0);
    let diff = (date - start) + ((start.getTimezoneOffset() - date.getTimezoneOffset()) * 60 * 1000);
    let oneDay = 1000 * 60 * 60 * 24;
    let day = Math.floor(diff / oneDay);

    return [date, day, time]
}

(async () => {
    let waydrnSheet, hayfrnSheet;

    try {
        const doc = new GoogleSpreadsheet(process.env.SPREADSHEET_ID); // Document ID here

        // Your google API credentials here
        await doc.useServiceAccountAuth({
            client_email: process.env.CLIENT_EMAIL,
            private_key: (process.env.PRIVATE_KEY || "").replace(/\\n/g, '\n'),
        });
        await doc.loadInfo();

        waydrnSheet = doc.sheetsByIndex[0];
        hayfrnSheet = doc.sheetsByIndex[1];
    } catch (e) {
        console.error(e);
    }

    /*
    app.get('/waydrn/:date/:time/:selection', async (req, res) => {
        let info = getDay(req.params.date, req.params.time);
        let date = info[0];
        let day = info[1];
        let time = info[2];

        console.log(`[${day} ${time}] 
WAYDRN ${req.params.selection - 1}`);
        res.send('Recorded');
        await waydrnSheet.loadCells({ startRowIndex: day, startColumnIndex: time + 2 });
        waydrnSheet.getCell(day, time + 2).value = req.params.selection - 1;



        await waydrnSheet.saveUpdatedCells();
    });

    app.get('/hayfrn/:date/:time/:selection', async (req, res) => {
        let info = getDay(req.params.date, req.params.time);
        let date = info[0];
        let day = info[1];
        let time = info[2];

        console.log(`[${day} ${time}] HAYFRN ${req.params.selection - 1}`);
        res.send('Recorded');
        await hayfrnSheet.loadCells({ startRowIndex: day, startColumnIndex: time + 2 });
        hayfrnSheet.getCell(day, time + 2).value = req.params.selection - 1;



        await hayfrnSheet.saveUpdatedCells();
    });
    */

    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`);
    });
})()
