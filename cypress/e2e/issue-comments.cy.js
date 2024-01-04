describe('Issue comments creating, editing and deleting', () => {
    beforeEach(() => {
        cy.visit('/');
        cy.url().should('eq', `${Cypress.env('baseUrl')}project/board`).then((url) => {
            cy.visit(url + '/board');
            cy.contains('This is an issue of type: Task.').click();
        });
    });

    const getIssueDetailsModal = () => cy.get('[data-testid="modal:issue-details"]');

    it('Should create a comment successfully', () => {
        const comment = 'TEST_COMMENT';

        getIssueDetailsModal().within(() => {
            cy.contains('Add a comment...')
                .click();

            cy.get('textarea[placeholder="Add a comment..."]').type(comment);

            cy.contains('button', 'Save')
                .click()
                .should('not.exist');

            cy.contains('Add a comment...').should('exist');
            cy.get('[data-testid="issue-comment"]').should('contain', comment);
        });
    });

    it('Should edit a comment successfully', () => {
        const previousComment = 'An old silent pond...';
        const comment = 'TEST_COMMENT_EDITED';

        getIssueDetailsModal().within(() => {
            cy.get('[data-testid="issue-comment"]')
                .first()
                .contains('Edit')
                .click()
                .should('not.exist');

            cy.get('textarea[placeholder="Add a comment..."]')
                .should('contain', previousComment)
                .clear()
                .type(comment);

            cy.contains('button', 'Save')
                .click()
                .should('not.exist');

            cy.get('[data-testid="issue-comment"]')
                .should('contain', 'Edit')
                .and('contain', comment);
        });
    });

    it('Should delete a comment successfully', () => {
        getIssueDetailsModal()
            .find('[data-testid="issue-comment"]')
            .contains('Delete')
            .click();

        cy.get('[data-testid="modal:confirm"]')
            .contains('button', 'Delete comment')
            .click()
            .should('not.exist');

        getIssueDetailsModal()
            .find('[data-testid="issue-comment"]')
            .should('not.exist');
    });


    it('Should create, edit and delete a comment successfully', () => {

        const comment = 'TEST_COMMENT';
        const editedComment = 'TEST_COMMENT_EDITED';
        function getIssueComment() {
            return cy.get('[data-testid="issue-comment"]');
        }
        function clickButtonSave() {
            cy.contains('button', 'Save')
                .click()
                .should('not.exist');
        }
        //Create comment
        getIssueDetailsModal().within(() => {
            cy.contains('Add a comment...')
                .click();

            cy.contains('button', 'Save').should('be.visible');
            cy.contains('button', 'Cancel').should('be.visible');

            cy.get('textarea[placeholder="Add a comment..."]').type(comment);

            clickButtonSave();

            cy.contains(comment).should('be.visible');
            cy.contains('div', 'Edit').should('be.visible');
            cy.contains('div', 'Delete').should('be.visible');
            getIssueComment().should('have.length', 2);

            //Edit comment
            getIssueComment()
                .first()
                .contains('Edit')
                .click()
                .should('not.exist');

            cy.get('textarea[placeholder="Add a comment..."]')
                .should('have.text', comment)
                .clear()
                .type(editedComment);

            clickButtonSave();

            getIssueComment()
                .should('contain', 'Edit')
                .and('contain', editedComment);

            //Delete comment
            getIssueComment()
                .contains(editedComment)
                .parent('div')
                .within(() => {
                    cy.contains('Delete')
                        .click();
                })
        });

        cy.get('[data-testid="modal:confirm"]')
            .contains('button', 'Delete comment')
            .click()
            .should('not.exist');

        getIssueDetailsModal()
            .find('[data-testid="issue-comment"]')
            .contains(editedComment)
            .should('not.exist');

        getIssueComment().should('have.length', 1);

        getIssueDetailsModal()
            .get('[data-testid="icon:close"]')
            .first()
            .click();

        getIssueDetailsModal().should('not.exist');
    })

});
