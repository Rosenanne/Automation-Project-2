describe('Issue details editing', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.url().should('eq', `${Cypress.env('baseUrl')}project`).then((url) => {
      cy.visit(url + '/board');
      cy.contains('This is an issue of type: Task.').click();
    });
  });

    it('Delete issue successfully', () => {
      
      //Assert the visibility of the issue detail view modal
      cy.get('[data-testid="modal:issue-details"]').should('be.visible');
    
      //Select delete issue and that confirmation window is visible
      cy.get('[data-testid="icon:trash"]').click();
      cy.get('[data-testid="modal:confirm"]').should('be.visible').contains('Delete issue').click();

      //Assert that confirmation dialogue is not visible
      cy.get('[data-testid="modal:confirm"]').should('not.exist');
        
      //Assert that the issue is deleted and no longer displayed on the Jira board
      cy.reload()
      cy.contains("This is an issue of type: Task.").should('not.exist');
      
    });

    it('Cancel delete issue process', () => {
       //Select delete issue and that confirmation window is visible
       cy.get('[data-testid="icon:trash"]').click();
       cy.get('[data-testid="modal:confirm"]').should('be.visible').contains('Cancel').click();

       //Assert that confirmation dialogue is not visible.
       cy.get('[data-testid="modal:confirm"]').should('not.exist');
     
       //Cancel the deletion
       cy.get('[data-testid="modal:issue-details"]').click();
       
       //Click the close button to close the window
       cy.get('[data-testid="icon:close"]').first().click();

       //Assert that issue is visble on the Jira board 
       cy.reload()
       cy.contains('This is an issue of type: Task.').should('exist');

       });
    });
  