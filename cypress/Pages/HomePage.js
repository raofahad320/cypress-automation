class HomePage {
  
  // ========= Selectors =========
  bodySelector = 'body'
  orangeCloudLabLinkText = 'Orange Cloud Lab'
  orangeCloudLabSection = '#orange-cloud-lab'
  footerSelector = 'footer'
  imageSelector = 'img'

  // ========= Actions / Methods =========
  visit() {
    cy.visit('https://orangetesting.com/')
  }

  getBody() {
    return cy.get(this.bodySelector)
  }

  clickOrangeCloudLab() {
    cy.contains(this.orangeCloudLabLinkText, { matchCase: false })
      .click({ force: true })
  }

  getOrangeCloudLabSection() {
    return cy.get(this.orangeCloudLabSection)
  }

  getFooter() {
    return cy.get(this.footerSelector)
  }

  getFirstImage() {
    return cy.get(this.imageSelector).first()
  }
}

export default HomePage
