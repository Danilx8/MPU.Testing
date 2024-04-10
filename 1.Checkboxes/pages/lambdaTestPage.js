var BasePage = require('../../POM/basepage');
const assert = require('assert')

class LambdaPage extends BasePage {
    async goToHomePage() {
        super.goToUrl('https://lambdatest.github.io/sample-todo-app/');
        return new Promise(async (resolve, reject) => {
            assert.equal(super.getTitle(), 'Sample page - lambdatest.com');
            resolve(this);
        })
    }

    async assertAmountofActiveCheckboxes(active, overall) {
        return new Promise((resolve, reject) => {
            super.getElementByXpath(`//*[text()='${active} of ${overall} remaining']`);
            resolve(this);
        });
    }

    async collectActiveCheckboxes() {
        return new Promise(async (resolve, reject) => {
            let inputBoxes = await driver.findElements(By.xpath("//li/span[@class='done-false']/preceding::input"));
            resolve(inputBoxes, this);
        });
    }

    async assertCheckboxesAmount(checkboxes, expectedAmount) {
        return new Promise(async (resolve, reject) => {
            if (checkboxes.length == expectedAmount) resolve(this);
            reject(this);
        });
    }

    async clickOnAllCheckboxes(checkboxes) {
        return new Promise(async (resolve, reject) => {
            let checkboxIndex = 0;
            try {
                while (checkboxIndex < checkboxes.length) {
                    await inputBoxes[checkboxIndex].click();
                    await super.getElementByXpath(`//li[${checkboxIndex + 1}]/span[@class='done-true']/preceding::input`);
                    await super.getElementByXpath(`//*[contains(text(), '${5 - 1 - checkboxIndex} remaining')]`);
                    ++checkboxIndex;
                }
            } catch {
                throw new Error(`Trouble with checkbox number ${checkboxIndex}`);
            } finally {
                resolve();
            }
        });
    }

    async addNewElement() {
        return new Promise(async (resolve, reject) => {
            await super.enterTextByXpathAndSubmit("//input[@id='sampletodotext']");
            resolve();
        })
    }
}

module.exports = LambdaPage;