describe('App Testing', () => {
    it('Opens the app', () => {
        cy.intercept('https://pokeapi.co/api/v2/pokemon/*', { fixture: 'pikachu.json' })
        cy.visit(Cypress.env('BASE_URL'))

        cy.contains('Counter 0')
        cy.get('[data-testid="plus-10"]').click()
        cy.contains('Counter 10')

        const waitTime = 500
        cy.wait(waitTime)
        cy.get('[data-testid="plus-1"]').click()
        cy.contains('Counter 11')

        cy.wait(waitTime)
        cy.get('[data-testid="minus-10"]').click()
        cy.contains('Counter 1')

        cy.wait(waitTime)
        cy.get('[data-testid="minus-1"]').click()
        cy.wait(waitTime)
        cy.get('[data-testid="minus-1"]').click()
        cy.contains('Counter -1')

        cy.wait(waitTime)
        cy.intercept('https://pokeapi.co/api/v2/pokemon/*', { fixture: 'pikachu2.json' })
        cy.get('[data-testid="random-pokemon-button"]').click()
    })
})

export {}
