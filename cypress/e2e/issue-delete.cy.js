describe('Issue delete', () => {
    beforeEach(() => {
        cy.visit('/')
        cy.url().should('eq', `${Cypress.env('baseUrl')}project`).then((url) => {
            cy.visit(url + '/board');
            cy.contains('This is an issue of type: Task.').click()
            getIssueDetailsModal().should('be.visible')
        })
    })
    it('Should delete the issue successfully', () => {
        getIssueDetailsModal().within(() => {
            cy.get('[data-testid="icon:trash"]').click()
        })
        //Should confirm the deletion and click the delete button
        cy.get('[data-testid="modal:confirm"]').should('contain', deletionConfirmation)
        cy.get('.dIxFno').contains('Delete issue').click()

        //Assert that the deletion confirmation dialogue is not visible
        cy.get('[data-testid="modal:confirm"]').should('not.exist')

        //Assert that the issue is deleted and no longer displayed on the Jira board
        //Assert that only one list with name Backlog is visible and do steps inside of it
        cy.get('[data-testid="board-list:backlog').should('be.visible').and('have.length', '1').within(() => {

            //Assert that the list contains 3 issues and 'This is an issue of type: Task.' is not visible
            cy.get('[data-testid="list-issue"]')
                .should('have.length', '3')
                .first()
                .find('p')
                .contains("Click on an issue to see what's behind it.")
        })
    })

    it('Issue deletion cancellation', () => {
        getIssueDetailsModal().within(() => {
            cy.get('[data-testid="icon:trash"]').click()
        })
        //Should click the delete button
        cy.get('[data-testid="modal:confirm"]').should('contain', deletionConfirmation)
        cy.get('.ewzfNn').contains('Cancel').click()

        //Assert that the deletion confirmation dialogue is not visible and close the issue details modal
        cy.contains(deletionConfirmation).should('not.exist')
        cy.get('[data-testid="icon:close"]').first().click()
        cy.get('[data-testid="modal:issue-details"]').should('not.exist')


        //Assert that only one list with name Backlog is visible and do steps inside of it
        cy.get('[data-testid="board-list:backlog').should('be.visible').and('have.length', '1').within(() => {

            //Assert that the issue is not deleted and is still displayed on the Jira board Backlog list
            //which contains 4 issues and first element with tag p has specified text
            cy.get('[data-testid="list-issue"]')
                .should('have.length', '4')
                .first()
                .find('p')
                .contains('This is an issue of type: Task.')
        })

    })
    const getIssueDetailsModal = () => cy.get('[data-testid="modal:issue-details"]')
    const deletionConfirmation = ('Are you sure you want to delete this issue?')

})