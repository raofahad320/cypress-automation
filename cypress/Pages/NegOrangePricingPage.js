class NegOrangePricingPage {
  visit() {
    cy.visit('https://www.orangehrm.com/en/pricing')
  }

  fillInvalidData({ fullName, email, phone }) {
    if (fullName) cy.get('input[placeholder*="Full Name"]').clear().type(fullName)
    if (email) cy.get('input[placeholder*="Work Email"]').clear().type(email)
    if (phone) cy.get('input[placeholder*="Phone Number"]').clear().type(phone)
  }

  submitAttempt() {
    cy.get('form[id*="getForm"], form#Form_getForm', { timeout: 10000 }).first().within(() => {
      cy.get('button, input[type="submit"], input[type="button"]', { timeout: 8000 }).then($els => {
        const candidates = Cypress._.filter($els.toArray(), el => /submit/i.test((el.innerText || el.value || '').trim()))
        if (candidates.length) {
          cy.wrap(candidates[0]).click({ force: true })
        } else if ($els.length) {
          cy.wrap($els.eq(0)).click({ force: true })
        } else {
          cy.contains('button', 'Submit', { matchCase: false }).click({ force: true })
        }
      })
    })
  }

  assertOnPricingPage() {
    cy.url().should('include', '/pricing')
  }

  takeScreenshot(name) {
    cy.screenshot(name)
  }
}

export default NegOrangePricingPage
