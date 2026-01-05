class OrangeHRMFreeTrial {
  visit() {
    cy.visit('https://www.orangehrm.com/en/30-day-free-trial/')
  }

  fillFreeTrial({ subdomain, email }) {
    if (subdomain) cy.get('input[name="subdomain"]').clear().type(subdomain)
    if (email) cy.get('input[type="email"]').clear().type(email)
  }

  assertEmailValue(expected) {
    cy.get('input[type="email"]').should('have.value', expected)
  }

  assertGetFreeTrialButton() {
    cy.contains('button', 'Get Your Free Trial').should('be.visible')
  }

  assertCaptchaExists() {
    cy.get('iframe[src*="recaptcha"]', { timeout: 10000 }).should('exist')
  }

  takeScreenshot(name) {
    cy.screenshot(name)
  }
}

export default OrangeHRMFreeTrial
