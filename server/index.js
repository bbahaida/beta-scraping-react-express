const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const scraper = require('./scraper/beta-scraper');
const cron = require("node-cron");
const app = express();
const PORT = process.env.PORT || 9000;
const NODE_ENV = process.env.NODE_ENV || 'development';
const data = [];
app.set('port', PORT);
app.set('env', NODE_ENV);
app.use(logger('tiny'));
app.use(bodyParser.json());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
scraper.scrapeOffre().then(d => {
    const newData = d.filter(el => data.filter(e => e.hash === el.hash).length === 0);
    data.push(...newData);
});
// schedule tasks to be run on the server   
cron.schedule("20 * * * *", () => {
    console.log("************** Schedueled job **********");
    console.log(`************** Scraping data from https://beta.mr/appelsoffres.php **********`);
    scraper.scrapeOffre().then(d => {
        const newData = d.filter(el => data.filter(e => e.hash === el.hash).length === 0);
        data.push(...newData);
    });
});
app.get("/beta", (req, res, next) => {
    res.json(data);

});
app.listen(PORT, () => {
    console.log(
        `Express Server started on Port ${app.get(
            'port'
        )} | Environment : ${app.get('env')}`
    );
});
