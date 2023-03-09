import BigNumber from 'bignumber.js'
import { 
    getDisplayValueForGewi, 
    roundedToLocaleString, 
    getDisplayAmount 
} from 'utils/currency-utils'

describe('Explorer: Latest block list and transaction list in C chain', { tags: ['@explorer'] }, () => {
    context('normal cases: ', { tags: ['@columbus', '@kopernikus'] }, () => {
        beforeEach(() => {
            cy.entryExplorer()
            cy.checkValidatorsTxsGasFee()
            
            // Latest Blocks
            cy.contains('Latest Blocks')
                .siblings('div')
                .parent()
                .find('>div')
                .filter('.MuiGrid-container')
                .as('latestBlocks')

            // Latest Transactions
            cy.get('button:contains(Show All)').eq(1).as('latestTxsButton')
        })

        it('verify latest block list and transaction list', () => {
            cy.intercept('GET', '**/v2/cblocks*', request => {
                request.reply({
                    statusCode: 200,
                    body: cblocksContainBlockAndTransactions,
                })
            }).as('cblocks')
            
            cy.wait('@cblocks').then((intercept) => {
                return intercept.response?.body
            }).then(({blocks}) => {
                cy.get('@latestBlocks').then((latestBlocks) => {
                    latestBlocks.each((index, $el) => {
                        cy.wrap($el).children().as('latestBlocksColumn')
                        cy.get('@latestBlocksColumn')
                            .eq(1)
                            .find('>a')
                            .should('have.text', parseInt(blocks[index].number, 16))

                        cy.get('@latestBlocksColumn')
                            .eq(2)
                            .find('>p')
                            .eq(1)
                            .should('have.text', blocks[index].hash)
                        
                        cy.get('@latestBlocksColumn')
                            .eq(3)
                            .find('h6')
                            .invoke('text')
                            .then((gasUsedText) => {
                                expect(parseInt(gasUsedText.replace(/\s/g, ''))).to.equal(parseInt(blocks[index].gasUsed, 16))
                            })
                    })
                })

                cy.intercept('GET', '**/v2/cblocks?limit=0*', request => {
                    request.reply({
                        statusCode: 200,
                        body: cblocksLimit,
                    })
                }).as('getShowAllCblocks')

                // click show all btn
                cy.get('@latestTxsButton').click()

                cy.wait('@getShowAllCblocks').then((intercept) => {
                    return intercept.response?.body.transactions
                }).then((transactions) => {
                    cy.get('.MuiTableContainer-root').find('tbody > tr').each(($el, index) => {
                        const tx = transactions[index]
                        const abbreviate = true
                        cy.wrap($el).eq(0).find('>td').as('moreTxsBlock')

                        // Block ID
                        cy.get('@moreTxsBlock').eq(0).should('have.text', parseInt(tx.block, 16))

                        // Address From
                        cy.get('@moreTxsBlock').eq(1).should('have.text', tx.from)

                        // Address To 
                        cy.get('@moreTxsBlock').eq(2).should('have.text', tx.to ? tx.to : '')

                        // Tx ID
                        cy.get('@moreTxsBlock').eq(3).should('have.text', tx.hash)

                        // Amount in Address
                        const txGasFee = roundedToLocaleString(
                            getDisplayAmount(
                                BigNumber(tx.gasUsed)
                                .multipliedBy(BigNumber(tx.effectiveGasPrice))
                                .toNumber()
                            ).value, abbreviate ? 4 : 20, abbreviate
                        )

                        cy.get('@moreTxsBlock')
                            .eq(6)
                            .find('h6')
                            .should('have.text', txGasFee)

                        // Value
                        cy.get('@moreTxsBlock')
                            .eq(7)
                            .find('h6')
                            .should('have.text', roundedToLocaleString(getDisplayAmount(parseInt(tx.value, 16)).value, abbreviate ? 4 : 20, abbreviate))
                    })
                })
            })
        })
    })
})
let cblocksContainBlockAndTransactions = {
    blocks: [
        {
            baseFeePerGas: "0x2e90edd000",
            blockGasCost: "0x0",
            difficulty: "0x1",
            evmTx: 1,
            extDataGasUsed: "0x0",
            gasLimit: "0x7a1200",
            gasUsed: "0xce22",
            hash: "0x139ba45e5bd26dc0a963732b04c5f12befe4f426bfafa98649979bfd7f6adc87",
            miner: "0x0100000000000000000000000000000000000000",
            number: "0x34",
            timestamp: "0x640868a4"
        }
    ],
    transactions: [
        {
            block: "0x34",
            effectiveGasPrice: "0x2f25f0c900",
            from: "0x9d6203fed4f1e2b6b71950515403c2b79b436186",
            gas: "0xcf99",
            gasUsed: "0xce22",
            hash: "0xff167abadc468f53aab26236ebb182d9a1a3887344bbc1f74ce4371d7afe302c",
            index: "0x0",
            maxFeePerGas: "0x5db6de9900",
            maxPriorityFeePerGas: "0x9502f900",
            nonce: "0x4",
            status: "0x1",
            timestamp: "0x640868a4",
            to: "0x010000000000000000000000000000000000000a",
            type: "0x2",
            value: "0x0"
        }
    ]
}
let cblocksLimit = {
    blocks: null,
    transactions: [
        {
            block: "0x34",
            effectiveGasPrice: "0x2f25f0c900",
            from: "0x9d6203fed4f1e2b6b71950515403c2b79b436186",
            gas: "0xcf99",
            gasUsed: "0xce22",
            hash: "0xff167abadc468f53aab26236ebb182d9a1a3887344bbc1f74ce4371d7afe302c",
            index: "0x0",
            maxFeePerGas: "0x5db6de9900",
            maxPriorityFeePerGas: "0x9502f900",
            nonce: "0x4",
            status: "0x1",
            timestamp: "0x640868a4",
            to: "0x010000000000000000000000000000000000000a",
            type: "0x2",
            value: "0x0"
        }
    ]
}