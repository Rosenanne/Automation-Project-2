import IssueModal from "../../pages/IssueModal";

describe('Issue delete', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.url().should('eq', `${Cypress.env('baseUrl')}project/board`).then((url) => {
    //open issue detail modal with title from line 16  
    cy.contains(issueTitle).click();
    });
  });

  //issue title, that we are testing with, saved into variable
  const issueTitle = 'This is an issue of type: Task.';

  it('Should delete issue successfully', () => {
    //Select delete issue 
    IssueModal.clickDeleteButton();
      
    //Assert that the issue is deleted and no longer displayed on the Jira board
    IssueModal.confirmDeletion(issueTitle);
    IssueModal.ensureIssueIsNotVisibleOnBoard(issueTitle);

  });


  it('Should cancel deletion process successfully', () => {
    //Select delete issue 
    IssueModal.clickDeleteButton()
  
    //Cancel the deletion
    IssueModal.cancelDeletion()
    
    //Click the close button to close the window
    IssueModal.closeDetailModal()

    //Assert that issue is visble on the Jira board 
    IssueModal.ensureIssueIsVisibleOnBoard(issueTitle)

  });
});
