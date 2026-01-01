describe('CSSLocators', () => {

it("csslocators", () => {

cy.visit("https://opensource-demo.orangehrmlive.com/");
cy.get(".inputBox").type("Raofahad194@gmail.com")
cy.wait(10000);
cy.get(".inputBox").type("Raofahad@")
cy.wait(10000);

cy.get(".submit").eq.click();
cy.get(".lighter") .contains("submit")

})



})