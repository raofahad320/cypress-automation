import HomePage from '../Pages/HomePage'

// Spec File Level Hooks
before(() => {
  cy.log('Spec file execution started')
})

after(() => {
  cy.log('Spec file execution finished')
})

describe('Orange Testing Website - Automation Suite', () => {

  const homePage = new HomePage()
  let homePageData = null

  before(() => {
    cy.fixture('homepage').then(f => { homePageData = f })
  })

  beforeEach(() => {
    homePage.visit()
  })

  it('TC-01: Verify Home Page Loads Successfully', () => {
    homePage.getBody().should('be.visible')
    cy.screenshot('TC-01-home-page-loaded')
  })

  


  it.skip('TC-02: Verify Logo Image is Visible', () => {
    cy.get('img').first().should('be.visible')
  })





  it('TC-03: Verify Orange Cloud Lab link navigates correctly', () => {
    homePage.clickOrangeCloudLab()

    debugger

    cy.url().should('include', '#orange-cloud-lab')

    homePage.getOrangeCloudLabSection()
      .scrollIntoView()
      .should('exist')

    cy.screenshot('TC-03-orange-cloud-lab-navigated')
  })




  it('TC-04: Verify Footer Section is Visible', () => {
    homePage.getFooter()
      .scrollIntoView()
      .should('be.visible')

    cy.screenshot('TC-04-footer-visible')
  })

})
