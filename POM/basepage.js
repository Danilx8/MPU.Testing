var webdriver = require('selenium-webdriver');
const { By, Key } = require('selenium-webdriver');
var driver = new webdriver.Builder().forBrowser('firefox').build();
driver.manage().setTimeouts({implicit: (10000)});

class BasePage {
    constructor() {
        global.driver = driver;
    }

    async goToUrl(Url) {
        await driver.get(Url);
    }

    async getTitle() {
        await driver.getTitle();
    }

    async getElementByXpath(xpath) {
        await driver.findElement(By.xpath(xpath));
    }

    async enterTextByXpath(xpath, text) {
        await driver.findElement(By.xpath(xpath)).sendKeys(text);
    }

    async enterTextByXpathAndSubmit(xpath, text) {
        await driver.findElement(By.xpath(xpath)).sendKeys(text, Key.RETURN);
    }

    async clickByXpath(xpath) {
        await driver.findElement(By.xpath(xpath)).click();
    }

    async takeScreenshot() {
        driver.takeScreenshot().then(function (image) {
            require('fs').writeFileSync('screenshot_error.png', image, 'base64')
        })
    }

    async closeBrowser() {
        await driver.quit();
    }
}

module.exports = BasePage;