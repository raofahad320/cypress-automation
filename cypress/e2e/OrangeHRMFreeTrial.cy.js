import OrangeHRMFreeTrial from '../Pages/OrangeHRMFreeTrial'

describe('OrangeHRM – 30 Day Free Trial Form', () => {
  const page = new OrangeHRMFreeTrial()
  let users = null

  before(() => {
    cy.fixture('users').then(f => { users = f })
  })

  beforeEach(() => {
    cy.on('uncaught:exception', (err, runnable) => {
      return false
    })
    page.visit()
    cy.wait(1000)
  })




  it('TC-01: Basic email submission test', () => {
    // Step 1: Enter email from fixture
    page.fillFreeTrial({ email: users.testEmail })
    page.assertEmailValue(users.testEmail)
    page.assertGetFreeTrialButton()
    page.takeScreenshot('TC-01-email-entered')
  })




  it('TC-02: Form field filling with username and email', () => {
    // Step 1: Fill username with unique value
    const name = `rao${Date.now()}`
    page.fillFreeTrial({ subdomain: name, email: users.userEmail1 })

    // Step 2: Fill email
    page.assertEmailValue(users.userEmail1)
    page.takeScreenshot('TC-02-form-filled')
  })






  it('TC-03: Complete form with captcha verification', () => {
    // Step 1: Fill username with unique value
    const name = `testuser${Date.now()}`
    page.fillFreeTrial({ subdomain: name, email: users.userEmail2 })
    cy.wait(1000)
    page.assertCaptchaExists()
    page.assertGetFreeTrialButton()
    page.takeScreenshot('TC-03-captcha-verified')
  })



  

  
  it('TC-04: Form validation with different user data', () => {
    // Step 1: Fill username with unique value
    const name = `automation${Date.now()}`
    const email = `johntest${Date.now()}@yopmail.com`
    page.fillFreeTrial({ subdomain: name, email })
    cy.get('input[type="email"]').should('contain.value', '@yopmail.com')
    page.assertGetFreeTrialButton()
    page.takeScreenshot('TC-04-validation-complete')
  })

})
