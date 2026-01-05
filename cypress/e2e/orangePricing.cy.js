import OrangePricing from '../Pages/OrangePricing'

describe('OrangeHRM – Pricing Page Complete Flow', () => {

  const page = new OrangePricing()
  const uniqueId = Date.now()
  const fullName = `Rao Fahad ${uniqueId}`
  const email = `fahad${uniqueId}@yopmail.com`
  let pricingData = null

  before(() => {
    cy.fixture('pricing').then(f => { pricingData = f })
  })

  beforeEach(() => {
    // Ignore captcha & site JS errors
    cy.on('uncaught:exception', () => false)
  })

  // ------------------------------------------------





  // TC-01: Verify home page loads successfully
  // ------------------------------------------------
  it('TC-01: Verify OrangeHRM home page loads', () => {
    page.visit()
    cy.url({ timeout: 10000 }).should('include', 'orangehrm.com')
    cy.get('header, nav, .navbar, .site-header', { timeout: 10000 }).first().should('be.visible')
  })

  // ------------------------------------------------






  // TC-02: Verify Pricing link in header is clickable
  // ------------------------------------------------
  it('TC-02: Verify Pricing link navigation', () => {
    page.visit()
    cy.get('header, nav, .navbar, .site-header', { timeout: 10000 }).first().within(() => {
      cy.contains('a', 'Pricing', { matchCase: false, timeout: 8000 }).should('be.visible').click()
    })

    cy.url({ timeout: 10000 }).should('include', '/pricing')
  })

  // ------------------------------------------------






  // TC-03: Verify user can fill Get a Custom Quote form
  // ------------------------------------------------
  it('TC-03: Verify form filling on Pricing page', () => {

    page.visit()
    cy.get('form', { timeout: 15000 }).should('be.visible')

    // Use POM to fill basic info
    page.fillBasicInfo({ fullName, email, phone: '03001340881', company: pricingData.company, jobTitle: pricingData.jobTitle })

    // Country - prefer a native <select> that contains the option text, else open custom dropdown
    cy.get('form[id*="getForm"], form#Form_getForm', { timeout: 10000 }).first().within(() => {
      cy.get('select').then($selects => {
        // find select element that contains option text 'Pakistan'
        const match = Cypress._.find($selects.toArray(), sel => {
          return Cypress.$(sel).find('option').filter((i, o) => Cypress.$(o).text().trim() === 'Pakistan').length > 0
        })

        if (match) {
          cy.wrap(match).select('Pakistan', { force: true })
        } else {
          // fallback: locate label then open the nearest custom dropdown control
          cy.contains('label', 'Country', { timeout: 5000 }).then($lbl => {
            const forId = $lbl.attr('for')
            if (forId) {
              cy.get(`#${forId}`).then($el => {
                if ($el.length && $el.is('select')) {
                  cy.wrap($el).select('Pakistan', { force: true })
                  return
                }
              })
            }
            cy.wrap($lbl).parent().find('[role="button"], .choices__inner, .select2-selection, .selectric, .dropdown, .custom-select').first().click({ force: true })
            cy.contains('Pakistan', { timeout: 5000 }).click({ force: true })
          })
        }
      })
    })

    // Company & Job Title handled by POM

    // Number of Employees - prefer native select with matching option, else open custom dropdown
    cy.get('form[id*="getForm"], form#Form_getForm', { timeout: 10000 }).first().within(() => {
      cy.get('select').then($selects => {
        const match = Cypress._.find($selects.toArray(), sel => {
          return Cypress.$(sel).find('option').filter((i, o) => Cypress.$(o).text().trim() === '< 10').length > 0
        })

        if (match) {
          cy.wrap(match).select('< 10', { force: true })
        } else {
          cy.contains('label', 'Number of Employees', { timeout: 5000 }).then($lbl => {
            cy.wrap($lbl).parent().find('[role="button"], .choices__inner, .select2-selection, .selectric, .dropdown, .custom-select').first().click({ force: true })
            cy.contains('< 10', { timeout: 5000 }).click({ force: true })
          })
        }
      })
    })

    page.takeScreenshot('TC-03-form-filled')
  })

  // ------------------------------------------------








  // TC-04: Verify captcha is present on pricing form
  // ------------------------------------------------
  it('TC-04: Verify captcha presence', () => {

    cy.visit('https://www.orangehrm.com/en/pricing')

    cy.get('iframe[src*="recaptcha"]', { timeout: 15000 }).should('exist')
    cy.screenshot('TC-04-captcha-present')
  })

  // ------------------------------------------------









  
  // TC-05: Verify Submit button is clickable
  // ------------------------------------------------
  it('TC-05: Verify Submit button click', () => {

    cy.visit('https://www.orangehrm.com/en/pricing')

    cy.get('form', { timeout: 15000 }).should('be.visible')

    // Try to find any submit control (button or input) and click it
    cy.get('form[id*="getForm"], form#Form_getForm', { timeout: 10000 }).first().within(() => {
      cy.get('button, input[type="submit"], input[type="button"]', { timeout: 8000 }).then($els => {
        expect($els.length).to.be.greaterThan(0)
        const candidates = Cypress._.filter($els.toArray(), el => /submit/i.test((el.innerText || el.value || '').trim()))
        if (candidates.length) {
          cy.wrap(candidates[0]).click({ force: true })
        } else {
          cy.wrap($els.eq(0)).click({ force: true })
        }
      })
    })

    cy.screenshot('TC-05-submit-click')
  })

})
