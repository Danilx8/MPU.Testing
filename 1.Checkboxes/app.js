const { Builder, By } = require('selenium-webdriver')
const assert = require('assert')

//old and stinky version
async function lambdaTest() {
  const driver = new Builder().forBrowser('firefox').build()
  await driver
    .get('https://lambdatest.github.io/sample-todo-app/')
    .then(async() => {
      console.log('Checking page title')
      return new Promise(async (resolve, reject) => {
        assert.equal(await driver.getTitle(), 'Sample page - lambdatest.com');
        console.log('Success');
        resolve();
      })
    }, () => { throw new Error("Current page's title is incorrect") })
    .then(async () => {
      console.log('Checking "5 of 5 remaining" text');
      return new Promise(async (resolve, reject) => {
        await driver.findElement(By.xpath("//*[text()='5 of 5 remaining']"));
        console.log('Success');
        resolve();
      })
    }, () => { throw new Error("'5 of 5 remaining' text wasn't found") })
    .then(async () => {
      console.log('Getting all 5 input boxes')
      return new Promise(async (resolve, reject) => {
        let inputBoxes = await driver.findElements(By.xpath("//li/span[@class='done-false']/preceding::input"));
        assert(inputBoxes.length, 5);
        console.log('Success');
        resolve(inputBoxes);
      })
    }, () => { throw new Error("Failed getting uncrossed checkboxes"); })
    .then(async inputBoxes => {
      return new Promise(async (resolve, reject) => {
        for (let i = 0; i < inputBoxes.length; ++i) {
          console.log(`Clicking on checkbox number ${i + 1}`);
          await inputBoxes[i].click();
          console.log('Success');
        
          console.log('Checking if the clicked element is crossed')
          await driver.findElement(By.xpath(`//li[${i + 1}]/span[@class='done-true']/preceding::input`))
          console.log('Success');

          console.log('Checking if number of elements decreased');
          await driver.findElement(By.xpath(`//*[text()='${5 - 1 - i} of 5 remaining']`));
          console.log('Success');
        }
        console.log("Success");
        resolve();
      })
    }, () => { throw new Error("Unexpected behavior while clicking on checkboxes") })
    .then(async () => {
      console.log('Typing new item in input field');
      return new Promise(async (resolve, reject) => {
        await driver.findElement(By.xpath("//input[@id='sampletodotext']")).sendKeys("New item");
        console.log('Success');
        resolve();
      })
    }, () => { throw new Error("Couldn't type new item into input field") })
    .then(async () => {
      console.log('Submitting new item');
      return new Promise(async (resolve, reject) => {
        await driver.findElement(By.xpath("//input[@id='addbutton']")).click();
        console.log('Success');
        resolve();
      })
    }, () => { throw new Error("Couldn't submit new item") })
    .then(async() => {
      console.log('Check if number of elements increased');
      return new Promise(async (resolve, reject) => {
        await driver.findElement(By.xpath("//*[text()='1 of 6 remaining']"));
        console.log('Success');
        resolve();
      })
    }, () => { throw new Error("Number of elements after new input is incorrect")})
    .then(async () => {
        console.log('Closing browser gracefully');
        await driver.quit();
      })
    .catch(async error => { 
      driver.takeScreenshot().then(function(image) {
        require('fs').writeFileSync('screenshot_error.png', image, 'base64')
      })
      console.error(error);
      console.log('Closing browser on error');
      await driver.quit();
    })

}

lambdaTest();