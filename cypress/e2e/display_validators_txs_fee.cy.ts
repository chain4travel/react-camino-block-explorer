describe('Explorer: display number of validator, number of txs, total gas fee in c chain', { tags: ['@explorer'] }, () => {
    context('normal cases: ', { tags: ['@columbus', '@kopernikus'] }, () => {
        beforeEach(() => {
            cy.entryExplorer()
        })

        it('verify display number of validator, number of txs, total gas fee', () => {
            cy.checkValidatorsTxsGasFee()
        })
    })
})