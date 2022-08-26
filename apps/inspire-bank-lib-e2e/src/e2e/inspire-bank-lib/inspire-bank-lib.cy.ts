describe('inspire-bank-lib: InspireBankLib component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=inspirebanklib--primary'));

  it('should render the component', () => {
    cy.get('h1').should('contain', 'Welcome to InspireBankLib!');
  });
});
