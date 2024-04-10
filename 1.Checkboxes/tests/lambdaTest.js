const LambdaPage = require("../pages/lambdaTestPage");

(async function pomLambdaTest() {
    new LambdaPage()
        .goToHomePage()
        .then(async page => await page.assertAmountofActiveCheckboxes(5, 5),
            () => { throw new Error(); })
        .then(async page => await page.collectActiveCheckboxes())
        .then(async (checkboxes, page) => await page.clickOnAllCheckboxes(checkboxes))
        .then(async page => page.addNewElement())
        .then(async page => page.assertAmountofActiveCheckboxes(1, 6))
        .catch(async error => {
            console.error(error);
        })
        .finally(async page => page.closeBrowser())
})();