
describe('Issue Deletion', () => {
    beforeEach(() => {
      // Open the first issue from the board
      cy.visit('/-jira-board-url');
      cy.contains('This is an issue of type: Task').click(); 
      


    });
  
    it('Deleting issue from the board', () => {
       cy.get('[data-testid="icon:trash"]').click()
       cy.get('[data-testid="modal:confirm"]');
       cy.contains('Delete issue').click()


        
    });
it(' Issue Deletion Cancellation', () => {
    cy.get('[data-testid="icon:trash"]').click()
    cy.get('[data-testid="modal:confirm"]').should('be.visible')
    cy.contains('Cancel').click()

    cy.get('[data-testid="modal:confirm"]').should('not.exist')

    cy.get('[data-testid="icon:close"]').eq('0').click()

    cy.contains('This is an issue of type: Task').click(); 

    
});

    });