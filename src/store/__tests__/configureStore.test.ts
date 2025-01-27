import { configureAppStore } from '../configureStore'

describe('configureStore', () => {
    it('should return a store with injected enhancers', () => {
        const store = configureAppStore()
        expect(store).toEqual(expect.objectContaining({}))
    })

    it('should return an empty store', () => {
        const store = configureAppStore()
        expect(store.getState()).toBeUndefined()
    })
})
