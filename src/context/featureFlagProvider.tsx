import React, {
    ReactNode,
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
} from 'react'
import axios from 'axios'
import { useAppSelector } from 'store/configureStore'
import { getActiveNetwork } from 'store/app-config'

interface FeatureFlagsContextType {
    initialized: boolean
    nodeVersion?: string
    checkNodeVersionFlag?: (version: string) => boolean
}

interface FeatureFlagsProviderProps {
    nodeBaseUrl?: string
    children: ReactNode
}

const FeatureFlagsContext = createContext<FeatureFlagsContextType>({
    initialized: false,
})

export const FeatureFlagsProvider = ({ children }: FeatureFlagsProviderProps): JSX.Element => {
    const [initialized, setInitialized] = useState(false)
    const [nodeVersion, setNodeVersion] = useState<string | undefined>()

    const activeNetwork = useAppSelector(getActiveNetwork)

    useEffect(() => {
        // Fetch the current node version
        // TODO integrate to CaminoJS
        if (activeNetwork?.url) {
            axios
                .post(activeNetwork?.url + '/ext/info', {
                    jsonrpc: '2.0',
                    id: 1,
                    method: 'info.getNodeVersion',
                })
                .then(res => res.data)
                .then(data => {
                    if (data) {
                        setNodeVersion(data?.result?.gitVersion?.slice(1)) // remove v
                    }
                })
                .finally(() => {
                    setInitialized(true)
                })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeNetwork?.url])

    /* ==================================================================== */
    /*                           Exported state                             */
    /* ==================================================================== */
    const checkNodeVersionFlag = useCallback(
        (targetVersion: string) => {
            if (!initialized) {
                throw new Error('Provider not initialized yet')
            }

            if (!nodeVersion) {
                throw new Error('Node version not exists, function uncallable')
            }

            // Check if valid version provided
            const versionRegex = /^\d+\.\d+\.\d+(-rc\d+)?$/
            if (!versionRegex.test(targetVersion)) {
                throw new Error(
                    `Invalid version format: ${targetVersion}. Correct version is of type major.minor.path e.g 1.2.3-rc2`,
                )
            }

            const [coreTargetVersion, targetVariant] = targetVersion?.split('-')
            const [coreNodeVersion, nodeVariant] = nodeVersion?.split('-')

            const [targetMajor, targetMinor, targetPatch] = coreTargetVersion.split('.').map(Number)
            const [nodeMajor, nodeMinor, nodePatch] = coreNodeVersion.split('.').map(Number)

            if (targetMajor !== nodeMajor) {
                return targetMajor < nodeMajor
            }

            if (targetMinor !== nodeMinor) {
                return targetMinor < nodeMinor
            }

            if (targetPatch !== nodePatch) {
                return targetPatch < nodePatch
            }

            if (nodeVariant) {
                return !targetVariant || targetVariant <= nodeVariant
            }

            return !targetVariant
        },
        [initialized, nodeVersion],
    )

    const memoedValue = useMemo(
        () => ({
            initialized,
            nodeVersion,
            checkNodeVersionFlag,
        }),
        [initialized, nodeVersion, checkNodeVersionFlag],
    )

    return (
        <FeatureFlagsContext.Provider value={memoedValue}>
            {initialized ? children : <div />}
        </FeatureFlagsContext.Provider>
    )
}

export default function useFeatureFlags() {
    return useContext(FeatureFlagsContext)
}
