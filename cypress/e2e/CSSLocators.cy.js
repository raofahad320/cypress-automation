describe('CSSLocators', () => {

  it('Login using CSS selectors', () => {

    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

    // username
    cy.get('input[name="username"]').type('Admin');

    // password
    cy.get('input[name="password"]').type('admin123');

    // login button
    cy.get('button[type="submit"]').click();

    // dashboard verification
    cy.get('.oxd-topbar-header-breadcrumb')
      .should('contain.text', 'Dashboard');

  });

});
