import { useAppSelector } from '../../store/configureStore'

export const useStore = () => {
    const state = useAppSelector(state => state)
    return { state }
}
