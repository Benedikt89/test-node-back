// const puppeteer = require('puppeteer');
// const fs = require('fs-extra');
// const hbs = require('handlebars');
// const data = require('getData');
// const moment = require('moment');
//
// const compile = async (templateName, data) => {
//     const filePath = path.join(process.cwd(), 'templates', `${templateName}.hbs`);
//     const html = await fs.readFile(filePath, 'utf-8');
//     return hbs.compile(html)(data);
// };
// hbs.registerHelper('dateFormat', (value, format)=>{
//     console.log('formatting', value, format);
//     return moment(value).format(format);
// })
//
// (async function() {
//     try {
//
//         const  browser = await puppeteer.launch();
//         const page = await browser.newPage();
//
//         const content = await compile('short-list', data);
//
//         await page.setContent(content);
//         await page.emulateMedia('screen');
//         await page.pdf({
//             path: 'mypdf.pdf',
//             format: 'A4',
//             printBackground: true
//         });
//
//         console.log('done');
//         process.exit();
//
//
//     } catch (e) {
//         console.log('error', e);
//     }
//
// })();