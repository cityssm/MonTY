import { testAdmin } from '../../../test/_globals.js';
import { logout, login } from '../../support/index.js';
describe('Admin - Employee Maintenance', () => {
    beforeEach(() => {
        logout();
        login(testAdmin);
        cy.visit('/admin/employees');
    });
    afterEach(logout);
    it('Has no detectable accessibility issues', () => {
        cy.visit('/admin/employees');
        cy.location('pathname').should('equal', '/admin/employees');
        cy.injectAxe();
        cy.checkA11y();
    });
});