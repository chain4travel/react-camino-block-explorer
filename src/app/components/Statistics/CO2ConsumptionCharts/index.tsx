import React, { useEffect, Fragment, useState } from 'react'
import { useAppDispatch, useAppSelector } from 'store/configureStore'
import { typesMeter } from '../../../../utils/statistics/ChartSelector'
import BarMeter from './BarMeter'
import TimeSeriesMeter from './TimeSeriesMeter'
import { Status } from 'types'
import CircularProgress from '@mui/material/CircularProgress'
import IconButton from '@mui/material/IconButton'
import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'
import useWidth from 'app/hooks/useWidth'
import DateRange from '../DateRange/DateRange'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import moment from 'moment'
import CountriesBarMeter from './CountriesBarMeter'
import '../../../../styles/custompicker.css'
import styled from 'styled-components'
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward'
import Icon from '@mdi/react'
import { mdiClose } from '@mdi/js'

const TooltipContainer = styled.div`
    display: flex;
    padding-top: 2rem;
`

const CardHeaderStyle = styled(CardHeader)`
    margin-bottom: 0rem;
    margin-left: 1.5rem;
`

const CO2ConsumptionCharts = ({
    utilSlice,
    typeMeter,
    darkMode,
    sliceGetter,
    sliceGetterLoader,
    titleText,
}) => {
    const { isDesktop } = useWidth()

    const [openModal, setOpenModal] = useState(false)
    const [startDate, setStartDate] = useState<Date>()
    const [endDate, setEndDate] = useState<Date>()

    const dispatch = useAppDispatch()

    useEffect(() => {
        if (startDate !== undefined && endDate !== undefined) {
            dispatch(
                utilSlice({
                    startDate: moment(startDate).toISOString(),
                    endDate: moment(endDate).toISOString(),
                }),
            )
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [startDate, endDate])

    useEffect(() => {
        setStartDate(new Date(moment().subtract(1, 'months').format()))
        setEndDate(new Date())
    }, [])

    const meterCO2 = useAppSelector(sliceGetter)

    const loader = useAppSelector(sliceGetterLoader)

    return (
        <Fragment>
            {loader === Status.LOADING ? (
                <>
                    <div style={{ textAlign: 'center' }}>
                        <CircularProgress color="secondary" />
                    </div>
                </>
            ) : (
                <>
                    {openModal === true ? (
                        <>
                            <Modal
                                open={openModal}
                                onClose={e => {
                                    setOpenModal(false)
                                }}
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                                disableScrollLock={true}
                            >
                                <Box
                                    sx={{
                                        backgroundColor: 'transparent',
                                        borderRadius: '7px',
                                        padding: '1.5rem',
                                        minWidth: isDesktop ? '1500px' : '0px',
                                    }}
                                >
                                    <Card
                                        style={{ backgroundColor: darkMode ? '#060F24' : 'white' }}
                                    >
                                        <CardHeader
                                            title={titleText}
                                            action={
                                                <IconButton
                                                    color="info"
                                                    component="label"
                                                    onClick={() => setOpenModal(false)}
                                                    style={{ cursor: 'default', color: 'white' }}
                                                >
                                                    <Icon path={mdiClose} size={1} />
                                                </IconButton>
                                            }
                                        />
                                        <CardContent>
                                            <Fragment>
                                                <DateRange
                                                    initialStartDate={startDate}
                                                    InitianEndDate={endDate}
                                                    setEndDate={setEndDate}
                                                    setStartDate={setStartDate}
                                                    darkMode={darkMode}
                                                />

                                                {typeMeter === typesMeter.BAR && (
                                                    <BarMeter
                                                        darkMode={darkMode}
                                                        dataSeries={meterCO2.value}
                                                    />
                                                )}
                                                {typeMeter === typesMeter.TIME_SERIES && (
                                                    <TimeSeriesMeter
                                                        darkMode={darkMode}
                                                        dataSeries={meterCO2.value}
                                                        titleText={titleText}
                                                    />
                                                )}
                                                {typeMeter === typesMeter.COUNTRIES_BAR && (
                                                    <CountriesBarMeter
                                                        darkMode={darkMode}
                                                        dataSeries={meterCO2.value}
                                                        titleText={titleText}
                                                    />
                                                )}
                                            </Fragment>
                                        </CardContent>
                                    </Card>
                                </Box>
                            </Modal>
                        </>
                    ) : (
                        <>
                            <Card style={{ backgroundColor: darkMode ? '#060F24' : 'white' }}>
                                <CardHeaderStyle
                                    title={titleText}
                                    action={
                                        <TooltipContainer>
                                            <IconButton
                                                color="info"
                                                component="label"
                                                onClick={() => setOpenModal(true)}
                                                style={{
                                                    cursor: 'default',
                                                    color: 'GrayText',
                                                }}
                                            >
                                                <ArrowOutwardIcon />
                                            </IconButton>
                                        </TooltipContainer>
                                    }
                                />
                                <CardContent>
                                    {typeMeter === typesMeter.BAR && (
                                        <BarMeter darkMode={darkMode} dataSeries={meterCO2.value} />
                                    )}
                                    {typeMeter === typesMeter.TIME_SERIES && (
                                        <TimeSeriesMeter
                                            darkMode={darkMode}
                                            dataSeries={meterCO2.value}
                                            titleText={titleText}
                                        />
                                    )}
                                    {typeMeter === typesMeter.COUNTRIES_BAR && (
                                        <CountriesBarMeter
                                            darkMode={darkMode}
                                            dataSeries={meterCO2.value}
                                            titleText={titleText}
                                        />
                                    )}
                                </CardContent>
                            </Card>
                        </>
                    )}
                </>
            )}
        </Fragment>
    )
}

export default CO2ConsumptionCharts
