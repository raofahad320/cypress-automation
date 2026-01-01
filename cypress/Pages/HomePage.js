class HomePage {


    
  // ========= Selectors =========
  // body                → Complete page container
  // 'Orange Cloud Lab'  → Navigation / section link (by text)
  // #orange-cloud-lab   → Orange Cloud Lab section
  // footer              → Footer section
  // img                 → Images on homepage



  visit() {
    cy.visit('https://orangetesting.com/')
  }

  getBody() {
    return cy.get('body')
  }

  clickOrangeCloudLab() {
    cy.contains('Orange Cloud Lab', { matchCase: false })
      .click({ force: true })
  }

  getOrangeCloudLabSection() {
    return cy.get('#orange-cloud-lab')
  }

  getFooter() {
    return cy.get('footer')
  }

  getFirstImage() {
    return cy.get('img').first()
  }
}

export default HomePage
