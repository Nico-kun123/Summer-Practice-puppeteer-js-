"use strict"; // Строгий режим

//~~ PUPPETEER ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// Используем puppeteer для парсинга
const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());

const fs = require('fs'); // Файловая система
const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({ extended: false });

// Функция перехода по нужному URL
async function fetchProductList(obj) {
  // ЗДЕСЬ ВСЕ СООБЩЕНИЯ В TRYCATCH ОТОБРАЖАЮТСЯ В КОМАНДНОЙ СТРОКЕ

  // Запускаем puppeteer
  const browser = await puppeteer.launch({ 
    headless: true,         // false: позволяет нам наблюдать за тем, что происходит
    defaultViewport: null,  // (optional) useful only in non-headless mode
    
    // Используем Google Chrome в качестве основного браузера
    executablePath: 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
    userDataDir: '%userprofile%\\AppData\\Local\\Google\\Chrome\\User Data\\AllowCookies',  
    args: [ "--disable-web-security" ], // Доп. аргумент
  });

  var page1 = await browser.newPage(); // Открываем страницы браузера
  var page2 = await browser.newPage();
  var page3 = await browser.newPage();
  var page4 = await browser.newPage();
  var page5 = await browser.newPage();

  console.log(`\t! Парсинг сайтов может занять некоторое время. Пожалуйста, подождите... !`);
  console.log(`\tСервер запустится после того, как будут собраны данные`);
  console.log(`\t... `);

  // "networkidle2" гарантирует, что состояние загрузки страницы считается окончательным,
  // если она имеет не более 2 подключений, работающих в течение не менее 500 мс.
  // ...
  // Переходим на эту страницу
  try{
    // По умолчанию оказываемся на странице №1
    page1.goto(obj[0].url + `?page=${obj[0].sheet}`, { waitUntil: 'networkidle2' });
    page2.goto(obj[1].url + `?page=${obj[1].sheet}`, { waitUntil: 'networkidle2' });
    page3.goto(obj[2].url + `?page=${obj[2].sheet}`, { waitUntil: 'networkidle2' });
    page4.goto(obj[3].url + `?page=${obj[3].sheet}`, { waitUntil: 'networkidle2' });
    page5.goto(obj[4].url + `?page=${obj[4].sheet}`, { waitUntil: 'networkidle2' });

    console.log(`\tОткрываются страницы сайтов...`);
  } catch (error) {
    console.log(`\tНе удалось открыть страницу сайта из-за ошибки:\n ${error}`);
  };
  
  // Ждём пока загрузится поле с товарами
  try{
    await page1.waitForSelector('#root > div > main > div.p15u6wpy_plp > div:nth-child(2) > div > section > div:nth-child(4) > section');
    await page2.waitForSelector('#root > div > main > div.p15u6wpy_plp > div:nth-child(2) > div > section > div:nth-child(4) > section');
    await page3.waitForSelector('#root > div > main > div.p15u6wpy_plp > div:nth-child(2) > div > section > div:nth-child(4) > section');
    await page4.waitForSelector('#root > div > main > div.p15u6wpy_plp > div:nth-child(2) > div > section > div:nth-child(4) > section');
    await page5.waitForSelector('#root > div > main > div.p15u6wpy_plp > div:nth-child(2) > div > section > div:nth-child(4) > section');
    console.log(`\tЗагрузка полей с товарами...`);
    console.log(`\t!! Последующие сообщения будут выводиться в консолях браузера !!`);
  } catch (error) {
    console.log(`\tОшибка загрузки элемента у сайта:\n ${error}`);
  };
  
  let placeHolder = new Object();
  await pageEvaluate(page1, 1, placeHolder);
  await pageEvaluate(page2, 2, placeHolder);
  await pageEvaluate(page3, 3, placeHolder);
  await pageEvaluate(page4, 4, placeHolder);
  await pageEvaluate(page5, 5, placeHolder);

  // browser.close();  // Закрываем браузер
  // return parsedObj;  // Возвращаем конечный результат
};

// Получение данных с сайтов
async function pageEvaluate(currentPage, pageNumber, obj_with_results){
  // ЗДЕСЬ ВСЕ СООБЩЕНИЯ В TRYCATCH ОТОБРАЖАЮТСЯ В КОНСОЛИ БРАУЗЕРА

  // Для запроса DOM используем метод "page.evaluate()"
  // Для обхода DOM – обычные методы JavaScript "document.querySelector()" и "document.querySelectorAll()".
  const result = await currentPage.evaluate(() => {

    // Считаем кол-во всех товаров на 1й странице сайта
    var totalSearchResults = 0;
    try {
      console.log(`Считаем кол-во товаров на странице...`);
      totalSearchResults = Array.from(document.querySelectorAll('[class="phytpj4_plp largeCard"]')).length;
    } catch (error) {
      console.error(`Не получилось посчитать кол-во товаров:\n ${error}`);
    }

    // Собираем данные о каждом товаре на странице
    console.log(`Идёт сбор данных об изображении товара, URL ссылки на него и его цены...`);

    let productsList = [];

    for (let i = 1; i <= totalSearchResults; i++) {
      let product = {}; // Объект, в котором будут храниться данные об ОДНОМ товаре
      
      try {
        // Извлекаем картинки товара
        let rawImage = document.querySelector(`#root > div > main > div.p15u6wpy_plp > div:nth-child(2) > div > section > div:nth-child(4) > section > div.pr7cfcb_plp.largeCard > div:nth-child(${i}) > a > span > picture > source:nth-child(1)`);
        product.image = rawImage ? rawImage.srcset : '';

        // Извлекаем URL товара
        let rawUrl = document.querySelector(`#root > div > main > div.p15u6wpy_plp > div:nth-child(2) > div > section > div:nth-child(4) > section > div.pr7cfcb_plp.largeCard > div:nth-child(${i}) > a`);
        product.url = rawUrl ? rawUrl.href : '';

        // Извлекаем название товара
        let rawName = document.querySelector(`#root > div > main > div.p15u6wpy_plp > div:nth-child(2) > div > section > div:nth-child(4) > section > div.pr7cfcb_plp.largeCard > div:nth-child(${i}) > div.c155f0re_plp.cz97q1i_plp.largeCard > a > span > span`);
        product.name = rawName ? rawName.innerText : '';

        // Извлекаем цену товара...
        let rawPrice = document.querySelector(`#root > div > main > div.p15u6wpy_plp > div:nth-child(2) > div > section > div:nth-child(4) > section > div.pr7cfcb_plp.largeCard > div:nth-child(${i}) > div.oo1t094_plp.largeCard > div > div:nth-child(1) > p.t3y6ha_plp.xc1n09g_plp.p1q9hgmc_plp`);
        // Если на товар есть скидка, то его Selector будет другим !!!
        if( !rawPrice ){
            rawPrice = document.querySelector(`#root > div > main > div.p15u6wpy_plp > div:nth-child(2) > div > section > div:nth-child(4) > section > div.pr7cfcb_plp.largeCard > div:nth-child(${i}) > div.oo1t094_plp.largeCard.o1nn3tkz_plp > div > div > div.n1s0vz55_plp > span._3rC-Ot1yr4_plp._1pNwL6sJc8_plp.nfh3x0v_plp`);
            product.price = rawPrice ? rawPrice.innerText : '';
          }
        product.price = rawPrice ? rawPrice.innerText : '';

      } catch (error) {
        console.log(`Ошибка сбора данных о товарах!\n${error}`);
      }
      
      // Из полученного URL картинки товара извлекаем нужную часть
      var str = product.image.split(' ');
      product.image = str[2];

      // Убираем ВСЕ символы "U00a0" из строки с ценой товара
      str = product.price.replace(/\u00A0/g, '');
      product.price = str;
      
      productsList = productsList.concat(product);  // Собираем все полученные данные в объект "productsList"
    };

    // console.log(`Кол-во товаров на первой странице этого сайта: ${totalSearchResults}`);
    // console.log(`Было получено: ${imgCount} изображений товаров, ${urlCount} ссылок на эти товары и ${pricesCount} цен`);

    return productsList;  // Возвращаем полученный объект с товарами
  });

  // Присваиваем определённому параметру объекта наши данные о всех товарах на странице с номером "pageNumber"
  if(pageNumber == 1) { obj_with_results.Emali                  = await result; }
  if(pageNumber == 2) { obj_with_results.Paint_for_inside_work  = await result; }
  if(pageNumber == 3) { obj_with_results.Paint_for_outside_work = await result; }
  if(pageNumber == 4) { obj_with_results.Wood_paint             = await result; }
  if(pageNumber == 5) { obj_with_results.Preparing_for_painting = await result;

    // Сохраняем ВСЕ полученные данные в файл "ParsedData.json"
    fs.writeFile(`public/json/ParsedData.json`, JSON.stringify(obj_with_results, null, '\t'), (err) => {
      if (err) throw err;

      console.log('\t...\n\tВсе данные были собраны и сохранены в файле "ParsedData.json"!');
      startServer();  // Запускаем сервер после сбора данных
    });
  };

  // return obj_with_results;
};

// Чтение файла Object.json, в котором находится наш исходный объект
fs.readFile(`public/json/Object.json`, function (err, file){
    if (err) throw err;
		
		var Myobj = JSON.parse(file); // Считали данные из Object.json, поместив их в объект Myobj
    fetchProductList(Myobj);
});

//~~ EXPRESS. Создание сервера ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// Запускаем сервер после сбора данных
function startServer() {
  
  const express = require("express"); // Используем express для создания сервер
  const port = 5500;                  // Номера порта
  const app = express();              // Создаем объект приложения

  app.use(express.json());

  // Статические файлы, которые будут считываться (js, html, css) находятся в папке "public"
  app.use(express.static(__dirname + '/public'));

  // Загрузка файла "ParsedData.json" на сайт при нажатии на кнопку "Показать"
  app.get('/ParsedData.json', function(req, res) {
    fs.readFile("public/json/ParsedData.json", urlencodedParser, function (err, file) {
      var data = JSON.parse(file);
      res.json(data);
    });
  });

  // Запускаем наше приложение на порту, равному значению переменной "port"
  app.listen(port, () => {
    console.log(`\tСервер был запущен на порту: ${port}!\n`);
  });
};