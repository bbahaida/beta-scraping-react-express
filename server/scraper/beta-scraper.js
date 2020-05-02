const puppeteer = require('puppeteer');
const moment = require('moment');
const sha = require('js-sha1');

const rowSelector = 'body > div > table:nth-child(2) > tbody > tr > td > table > tbody > tr > td > table > tbody > tr:nth-child(1) > td:nth-child(1) > table > tbody > tr:nth-child(2) > td > h2 > table > tbody > tr';
async function scrapeOffre(url = `https://beta.mr/appelsoffres.php`){
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);
    let data = await page.$$eval(rowSelector, nodes => {
        return nodes.map(node => {
            const a = node.querySelector('td:nth-child(2) > p > a');
            const title = a.textContent;
            const url = `https://beta.mr/${a.getAttribute('href')}`;
            let date = node.querySelector('td:nth-child(2) > p > span').textContent;
            return {title, date, url};
        })
    });

    

    moment.locale('fr')
    data = data.map(el => {
        return {
            ...el,
            date: moment(el.date.toLowerCase(), 'dddd DD MMMM YYYY').format('YYYY-MM-DD'),
            hash: sha(el.title + el.url + el.date)
        }
        }).slice();
    
    browser.close();

    return data;

}

module.exports = {
    scrapeOffre: scrapeOffre
}