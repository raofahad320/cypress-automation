class OrangePricing {
  visit() {
    cy.visit('https://www.orangehrm.com/en/pricing')
  }

  fillBasicInfo({ fullName, email, phone, company, jobTitle }) {
    if (fullName) cy.get('input[placeholder*="Full Name"]').clear().type(fullName)
    if (email) cy.get('input[placeholder*="Work Email"]').clear().type(email)
    if (phone) cy.get('input[placeholder*="Phone Number"]').clear().type(phone)
    if (company) cy.get('input[placeholder*="Company Name"]').clear().type(company)
    if (jobTitle) cy.get('input[placeholder*="Job Title"]').clear().type(jobTitle)
  }

  submitForm() {
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

  assertCaptchaPresent() {
    cy.get('iframe[src*="recaptcha"]', { timeout: 15000 }).should('exist')
  }

  takeScreenshot(name) {
    cy.screenshot(name)
  }
}

export default OrangePricing
