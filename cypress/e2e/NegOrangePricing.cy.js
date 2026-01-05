import NegOrangePricingPage from '../Pages/NegOrangePricingPage'

describe('OrangeHRM – Pricing Page Negative Test Cases', () => {

  const page = new NegOrangePricingPage()
  let pricingData = null

  before(() => {
    cy.fixture('pricing').then(f => { pricingData = f })
  })

  beforeEach(() => {
    cy.on('uncaught:exception', () => false)
    page.visit()
  })

  // ------------------------------------------------
  // NEG-TC-01: Verify home page loads successfully
  // ------------------------------------------------
  it('NEG-TC-01: Verify home page loads', () => {

    cy.url().should('include', 'orangehrm.com')
    cy.get('header, nav').first().should('be.visible')
  })

  // ------------------------------------------------
  // NEG-TC-02: Verify navigation to Pricing page
  // ------------------------------------------------
  it('NEG-TC-02: Verify Pricing page navigation', () => {

    cy.contains('Pricing', { matchCase: false })
      .should('be.visible')
      .click()

    cy.url().should('include', '/pricing')
  })

  // ------------------------------------------------
  // NEG-TC-03: Verify form shows validation with invalid data
  // ------------------------------------------------
  it('NEG-TC-03: Verify form behavior with invalid input data', () => {

    // use fixture invalid data
    page.visit()
    page.fillInvalidData({ fullName: 'R', email: pricingData.invalidEmail, phone: pricingData.invalidPhone })

    // Try to find and click submit inside the pricing form; prefer button with 'Submit' text
    cy.get('form[id*="getForm"], form#Form_getForm', { timeout: 10000 }).first().within(() => {
      cy.get('button, input[type="submit"], input[type="button"]', { timeout: 8000 }).then($els => {
        const candidates = Cypress._.filter($els.toArray(), el => /submit/i.test((el.innerText || el.value || '').trim()))
        if (candidates.length) {
          cy.wrap(candidates[0]).click({ force: true })
        } else if ($els.length) {
          cy.wrap($els.eq(0)).click({ force: true })
        } else {
          // fallback: try contains
          cy.contains('button', 'Submit', { matchCase: false }).click({ force: true })
        }
      })
    })

    // Validation expected – URL should NOT change
    cy.url().should('include', '/pricing')

    page.takeScreenshot('NEG-TC-03-invalid-data')
  })

  // ------------------------------------------------
  // NEG-TC-04: Verify form cannot be submitted without captcha
  // ------------------------------------------------
  it('NEG-TC-04: Verify form submission blocked without captcha', () => {

    page.visit()
    page.fillInvalidData({ fullName: 'Rao Fahad', email: pricingData.validEmail, phone: '03001340881' })

    // Captcha iframe exists
    cy.get('iframe[src*="recaptcha"]').should('exist')

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

    // Still on same page (submission blocked)
    cy.url().should('include', '/pricing')

    page.takeScreenshot('NEG-TC-04-captcha-not-completed')
  })

  // ------------------------------------------------
  // NEG-TC-05: Verify required fields validation
  // ------------------------------------------------
  it('NEG-TC-05: Verify submit without filling required fields', () => {

    page.visit()
    page.submitAttempt()

    // Page should not redirect
    page.assertOnPricingPage()

    page.takeScreenshot('NEG-TC-05-required-fields-missing')
  })

})
