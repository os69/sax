import { load, click, exists } from "../uil/uil";


describe('xTest1', async function () {
  it('xTest11', async function () {

    //cy.visit("http://localhost:54000/main.html").get("button").click();

    await load("http://localhost:54000/main.html");
    await click("#button");
    await exists("#hallo");

  })
})

