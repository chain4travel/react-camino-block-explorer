import { getActiveNetwork } from 'store/app-config'
import { useAppSelector } from 'store/configureStore'

export const RoutesConfig = () => {
    const activeNetwork = useAppSelector(getActiveNetwork)

    const BASE_PATH = activeNetwork ? `/explorer/${activeNetwork.name.toLowerCase()}` : ''

    const CCHAIN = `${BASE_PATH}/c-chain`
    const XCHAIN = `${BASE_PATH}/x-chain`
    const PCHAIN = `${BASE_PATH}/p-chain`
    const MAINNET = `${BASE_PATH}/mainnet`
    const TRANSACTION = '/tx'
    const BLOCK = '/block'
    const ADDRESS = '/address'
    const DETAILS = '/details'
    const BLOCKS = '/blocks'
    const TRANSACTIONS = '/txs'
    const CTRANSACTION = CCHAIN + TRANSACTION
    const CTRANSACTIONS = CCHAIN + TRANSACTIONS
    const CBLOCKS = CCHAIN + BLOCK
    const CADDRESS = CCHAIN + ADDRESS
    const XTRANSACTION = XCHAIN + TRANSACTION
    const XTRANSACTIONS = XCHAIN + TRANSACTIONS
    const XBLOCKS = XCHAIN + BLOCK
    const XADDRESS = XCHAIN + ADDRESS
    const PTRANSACTION = PCHAIN + TRANSACTION
    const PTRANSACTIONS = PCHAIN + TRANSACTIONS
    const PBLOCKS = PCHAIN + BLOCK
    const PADDRESS = PCHAIN + ADDRESS
    const VALIDATORS = `${BASE_PATH}/validators`
    const DOCS = 'https://docs.camino.network/'
    const DISCORD = 'https://discord.gg/K5THjAweFB'
    const TWITTER = 'https://twitter.com/CaminoFndtn'
    const TELEGRAM = 'https://t.me/caminochain'
    const GITHUB = 'https://github.com/chain4travel/camino-docs'
    const STATISTICS = `${BASE_PATH}/statistics`

    return {
        BASE_PATH,
        CCHAIN,
        XCHAIN,
        PCHAIN,
        MAINNET,
        TRANSACTION,
        BLOCK,
        ADDRESS,
        DETAILS,
        BLOCKS,
        TRANSACTIONS,
        CTRANSACTION,
        CTRANSACTIONS,
        CBLOCKS,
        CADDRESS,
        XTRANSACTION,
        XTRANSACTIONS,
        XBLOCKS,
        XADDRESS,
        PTRANSACTION,
        PTRANSACTIONS,
        PBLOCKS,
        PADDRESS,
        VALIDATORS,
        DOCS,
        DISCORD,
        TWITTER,
        TELEGRAM,
        GITHUB,
        STATISTICS,
    }
}
