import '../../components/ValidatorsMap/styles/NotoFont.css'

import { Box, Grid, Paper, TableCellProps, TableContainer, useTheme } from '@mui/material'
import { ComposableMap, Geographies, Geography, ZoomableGroup } from 'react-simple-maps'
import React, { FC, Fragment, useState } from 'react'
import {
    getSumNodesPerCity,
    getSumNodesPerCountry,
    getValidatorsStatus,
    selectAllValidators,
} from 'store/validatorsSlice'
import { useAppDispatch, useAppSelector } from 'store/configureStore'

import BackButton from 'app/components/BackButton'
import CircleMarker from 'app/components/ValidatorsMap/CircleMarker'
import CircularProgress from '@mui/material/CircularProgress'
import { GridViewItem } from './GridViewItem'
import { NodesPerCity } from 'types/locationNode'
import PageContainer from 'app/components/PageContainer'
import { RoutesConfig } from 'utils/route-paths'
import Statistics from 'app/components/ValidatorsMap/Statistics'
import SubPageTitle from 'app/components/SubPageTitle'
import Tab from '@mui/material/Tab'
import TableView from 'app/components/Table/TableView'
import { TableViewRow } from './TableViewRow'
import Tabs from '@mui/material/Tabs'
import { ValidatorType } from 'types/store'
import features from 'app/components/ValidatorsMap/json/features.json'
import { loadValidators } from 'store/validatorsSlice/utils'
import { useEffectOnce } from 'app/hooks/useEffectOnce'
import useWidth from 'app/hooks/useWidth'

const Validators: FC = () => {
    let routesConfig = RoutesConfig()
    const theme = useTheme()
    const { isDesktop, isWidescreen } = useWidth()

    const validators = useAppSelector(selectAllValidators)
    const nodesPerCountry = useAppSelector(getSumNodesPerCountry)
    const nodesPerCity = useAppSelector(getSumNodesPerCity)
    const loadingStatus = useAppSelector(getValidatorsStatus)

    const dispatch = useAppDispatch()

    const loading = loadingStatus === 'loading' ? true : false

    const [activeTab, setActiveTab] = useState(0)
    const [zoomValue] = useState(1.5)
    const [sizeCircle, setSizeCircle] = useState(10)
    const [sizeStroke, setSizeStroke] = useState(7)

    useEffectOnce(() => {
        dispatch(loadValidators())
    })

    const handleChangeTab = (event: React.SyntheticEvent, newValue: number) => {
        setActiveTab(newValue)
    }

    function a11yProps(index: number) {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        }
    }

    return (
        <PageContainer pageTitle="Validators" metaContent="validators">
            <Paper
                variant="outlined"
                square
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    minHeight: '544px',
                    width: 1,
                    flex: 1,
                    backgroundColor: 'primary.dark',
                    borderRadius: '12px',
                    borderWidth: '1px',
                    borderColor: 'primary.light',
                    borderStyle: 'solid',
                    p: '1rem 1.5rem 1rem 1.5rem',
                }}
            >
                <SubPageTitle
                    title="Validators"
                    backToLink={routesConfig.CCHAIN}
                    style={{ marginBottom: '20px' }}
                />

                <Fragment>
                    <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                        {loading && (
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    flex: 1,
                                }}
                            >
                                <CircularProgress color="secondary" />
                            </Box>
                        )}
                        {!loading && (
                            <>
                                <div>
                                    <Tabs
                                        variant="fullWidth"
                                        value={activeTab}
                                        onChange={handleChangeTab}
                                        textColor="secondary"
                                        indicatorColor="secondary"
                                    >
                                        <Tab
                                            className="tab"
                                            disableRipple
                                            label="List"
                                            {...a11yProps(0)}
                                        />
                                        <Tab
                                            className="tab"
                                            disableRipple
                                            label="Map"
                                            {...a11yProps(1)}
                                        />

                                        <Tab
                                            className="tab"
                                            disableRipple
                                            label="Countries"
                                            {...a11yProps(2)}
                                        />
                                    </Tabs>
                                </div>

                                {activeTab === 0 && (
                                    <>
                                        <TableContainer sx={{ minHeight: '400px' }}>
                                            {isWidescreen || isDesktop ? (
                                                <TableView columns={columns}>
                                                    {validators?.map((validator: ValidatorType) => (
                                                        <TableViewRow
                                                            key={validator.nodeID}
                                                            validator={validator}
                                                        />
                                                    ))}
                                                </TableView>
                                            ) : (
                                                <Grid item container alignItems="center">
                                                    {validators.map((validator: ValidatorType) => (
                                                        <GridViewItem
                                                            key={validator.nodeID}
                                                            validator={validator}
                                                        />
                                                    ))}
                                                </Grid>
                                            )}
                                        </TableContainer>
                                    </>
                                )}

                                {activeTab === 1 && (
                                    <>
                                        <ComposableMap
                                            style={{
                                                height: isWidescreen || isDesktop ? 700 : 'auto',
                                                width: '100%',
                                            }}
                                            projection={'geoMercator'}
                                        >
                                            <ZoomableGroup
                                                center={[0, 40]}
                                                zoom={zoomValue}
                                                onMove={(e: any) => {
                                                    if (e.zoom <= 3) {
                                                        setSizeCircle(10)
                                                        setSizeStroke(7)
                                                    }

                                                    if (e.zoom > 3 && e.zoom < 6) {
                                                        setSizeCircle(6)
                                                        setSizeStroke(4)
                                                    }

                                                    if (e.zoom > 6) {
                                                        setSizeCircle(3)
                                                        setSizeStroke(1.5)
                                                    }
                                                }}
                                            >
                                                <Geographies
                                                    geography={features}
                                                    pointerEvents={'none'}
                                                >
                                                    {({ geographies }) =>
                                                        geographies.map(
                                                            (geo: {
                                                                rsmKey: React.Key | null | undefined
                                                            }) => (
                                                                <Geography
                                                                    key={geo.rsmKey}
                                                                    geography={geo}
                                                                    fill="#41547C"
                                                                />
                                                            ),
                                                        )
                                                    }
                                                </Geographies>
                                                {nodesPerCity.map(
                                                    (
                                                        {
                                                            lng,
                                                            lat,
                                                            nodes,
                                                            country,
                                                            city,
                                                        }: NodesPerCity,
                                                        index: number,
                                                    ) => {
                                                        return (
                                                            <CircleMarker
                                                                key={index}
                                                                country={country}
                                                                city={city}
                                                                lng={lng}
                                                                lat={lat}
                                                                rValue={sizeCircle}
                                                                sValue={sizeStroke}
                                                                nodes={nodes}
                                                            />
                                                        )
                                                    },
                                                )}
                                            </ZoomableGroup>
                                        </ComposableMap>
                                    </>
                                )}

                                {activeTab === 2 && (
                                    <div className="noto-flags">
                                        {theme.palette.mode === 'light' ? (
                                            <Statistics
                                                nodesPerCountry={nodesPerCountry}
                                                darkMode={false}
                                            />
                                        ) : (
                                            <Statistics
                                                nodesPerCountry={nodesPerCountry}
                                                darkMode={true}
                                            />
                                        )}
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </Fragment>

                <Box sx={{ display: 'flex', width: '100%', paddingTop: '1rem' }}>
                    <BackButton backToLink={routesConfig.CCHAIN} />
                </Box>
            </Paper>
        </PageContainer>
    )
}

export default Validators

export interface ColumnType {
    name: string
    label: string
    field?: string
    align: TableCellProps['align']
    type?: string
    value?: string
}

const columns: ColumnType[] = [
    {
        name: 'Status',
        label: 'Status',
        field: 'Status',
        align: 'center',
    },
    {
        name: 'NodeID',
        label: 'NodeID',
        field: 'NodeID',
        align: 'center',
    },
    {
        name: 'StartTime',
        label: 'StartTime',
        field: 'StartTime',
        align: 'center',
    },
    {
        name: 'EndTime',
        label: 'EndTime',
        field: 'EndTime',
        align: 'center',
    },
    {
        name: 'UpTime',
        label: 'UpTime',
        field: 'UpTime',
        align: 'center',
    },
    {
        name: 'txID',
        label: 'txID',
        field: 'txID',
        align: 'center',
    },
]
