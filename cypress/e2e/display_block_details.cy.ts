import { expect } from 'chai'
import { changeNetwork, addKopernikusNetwork } from '../utils/utils'

describe('Wallet Creation', () => {
    before(() => {
        cy.visit('/')
    })

    it('open suite/create wallet', () => {
        addKopernikusNetwork(cy)
        cy.get(':nth-child(2) > .MuiGrid-grid-lg-2 > a > .MuiTypography-root').click()
    })

    it('get values', () => {
        cy.get(
            '#app > div > div.MuiBox-root.css-ymnp2l > div.MuiContainer-root.MuiContainer-maxWidthXl.MuiContainer-fixed.css-cv6u79-MuiContainer-root > div:nth-child(3) > div:nth-child(1) > div > div:nth-child(2) > div.MuiGrid-root.MuiGrid-item.MuiGrid-grid-xs-12.MuiGrid-grid-md-2.MuiGrid-grid-lg-2.MuiGrid-grid-xl-1.5.css-492k0i-MuiGrid-root > a > p',
        ).click()

        cy.get(
            '#app > div > div.MuiBox-root.css-ymnp2l > div.MuiContainer-root.MuiContainer-maxWidthXl.MuiContainer-fixed.css-cv6u79-MuiContainer-root > div > div > div > div.MuiBox-root.css-132heo9 > div.MuiBox-root.css-1o5bb7v > div > div.MuiGrid-root.MuiGrid-item.MuiGrid-zeroMinWidth.MuiGrid-grid-xs-12.MuiGrid-grid-md-true.css-tj4eer-MuiGrid-root > span',
        ).as('blockId')

        cy.log('@blockId')
    })
})
