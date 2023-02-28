import React, { Fragment, useEffect, useState } from 'react'

import { useAppDispatch, useAppSelector } from 'store/configureStore'
import { Status } from 'types'
import CircularProgress from '@mui/material/CircularProgress'
import LinearMeter from './LinearMeter'
import IconButton from '@mui/material/IconButton'
import Icon from '@mdi/react'
import { mdiClose } from '@mdi/js'
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward'
import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'
import useWidth from 'app/hooks/useWidth'
import 'react-datepicker/dist/react-datepicker.css'
import DateRange from '../DateRange/DateRange'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import Tooltip from '@mui/material/Tooltip'
import InfoIcon from '@mui/icons-material/Info'
import styled from 'styled-components'
import { Grid, useTheme } from '@mui/material'
import moment from 'moment'
import { TextBlockchainDatachart } from '../../../../utils/statistics/TextBlockchainDatachart'

const TooltipContainer = styled.div`
    display: flex;
    padding-top: 2rem;
`
const LinearMeterContainer = styled.div`
    margin-top: -3rem;
`
const DateRangeContainer = styled.div`
    margin-top: 2rem;

    @media only screen and (min-width: 1200px) {
        margin-left: 5rem;
        margin-right: 11rem;
    }
`
interface TextProps {
    backgroundColor: string
}

const Text = styled('p')<TextProps>`
    margin-left: 3rem !important;
    margin-right: 1rem !important;
    margin-top: 0.5rem !important;
    margin-bottom: 0.5rem !important;
    border-radius: 0.5rem;
    background: ${({ backgroundColor }) => backgroundColor};
    padding: 0.5rem;
`

const BlockchainCharts = ({
    darkMode,
    titleText,
    utilSlice,
    sliceGetter,
    sliceGetterLoader,
    typeStatistic,
    tooltipTitle,
}) => {
    const theme = useTheme()

    const isDark = theme.palette.mode === 'dark'
    const [openModal, setOpenModal] = useState(false)
    const [startDate, setStartDate] = useState<Date>()
    const [endDate, setEndDate] = useState<Date>(new Date())
    const [seeTimeAxis, setSeeTimeAxis] = useState<String>('month')
    const [firstLoad, setFirstLoad] = useState(false)

    const { isTablet, isSmallMobile, isWidescreen } = useWidth()

    const dispatch = useAppDispatch()

    useEffect(() => {
        if (startDate !== undefined && endDate !== undefined) {
            dispatch(
                utilSlice({
                    startDate: moment(startDate).toISOString(true).replace('.000-05:00', 'Z'),
                    endDate: moment(endDate).toISOString(true).replace('.000-05:00', 'Z'),
                }),
            )
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [startDate, endDate])

    useEffect(() => {
        setStartDate(new Date(moment().startOf('month').format('YYYY-MM-DD HH:mm:ss')))
        setEndDate(new Date(moment().endOf('month').format('YYYY-MM-DD HH:mm:ss')))
    }, [])

    const dataStatistics: any = useAppSelector(sliceGetter)
    const loader = useAppSelector(sliceGetterLoader)

    useEffect(() => {
        if (firstLoad === false && dataStatistics !== null && dataStatistics !== undefined) {
            setFirstLoad(true)
        }
    }, [dataStatistics])

    return (
        <Fragment>
            {loader === Status.LOADING && firstLoad === false ? (
                <>
                    <div style={{ textAlign: 'center' }}>
                        <CircularProgress color="secondary" />
                    </div>
                </>
            ) : (
                <>
                    <Card style={{ backgroundColor: darkMode ? '#060F24' : 'white' }}>
                        <CardHeader
                            title={
                                <span>
                                    {titleText}
                                    <Tooltip title={tooltipTitle} placement="top">
                                        <IconButton>
                                            <InfoIcon />
                                        </IconButton>
                                    </Tooltip>
                                </span>
                            }
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
                            {dataStatistics !== undefined && dataStatistics !== null ? (
                                <>
                                    <LinearMeter
                                        darkMode={darkMode}
                                        titleText={titleText}
                                        data={dataStatistics}
                                        typeStatistic={typeStatistic}
                                        timeSeeAxis={seeTimeAxis}
                                    />
                                </>
                            ) : null}
                        </CardContent>
                    </Card>
                </>
            )}

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
                        width: isWidescreen ? '1300px' : '80%',
                    }}
                    style={{
                        maxHeight: isSmallMobile ? 550 : '80%',
                        overflowY: 'auto',
                    }}
                >
                    <Card style={{ backgroundColor: darkMode ? '#060F24' : 'white' }}>
                        <CardHeader
                            title={titleText}
                            action={
                                <IconButton
                                    color="info"
                                    component="label"
                                    onClick={() => setOpenModal(false)}
                                    style={{
                                        cursor: 'default',
                                        color: isDark ? 'white' : 'black',
                                    }}
                                >
                                    <Icon path={mdiClose} size={1} />
                                </IconButton>
                            }
                            style={{
                                marginBottom: '0rem',
                                marginLeft: '0.5rem',
                            }}
                        />
                        <CardContent>
                            {firstLoad === true && (
                                <Fragment>
                                    <Grid
                                        container
                                        spacing={2}
                                        justifyContent="center"
                                        alignItems="center"
                                    >
                                        <Grid item xs={12}>
                                            <Text backgroundColor={isDark ? '#0f172a' : '#F5F6FA'}>
                                                {tooltipTitle}
                                            </Text>
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <TextBlockchainDatachart
                                                Text={Text}
                                                dataStatistics={dataStatistics}
                                                endDate={endDate}
                                                startDate={startDate}
                                                typeStatistic={typeStatistic}
                                                isDescriptionOfHighest={true}
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <TextBlockchainDatachart
                                                Text={Text}
                                                dataStatistics={dataStatistics}
                                                endDate={endDate}
                                                startDate={startDate}
                                                typeStatistic={typeStatistic}
                                                isDescriptionOfHighest={false}
                                            />
                                        </Grid>
                                    </Grid>
                                    <DateRangeContainer>
                                        <DateRange
                                            initialStartDate={startDate}
                                            InitianEndDate={endDate}
                                            setEndDate={setEndDate}
                                            setStartDate={setStartDate}
                                            darkMode={darkMode}
                                            setSeeTimeAxis={setSeeTimeAxis}
                                            disableFuture={false}
                                            seeTimeAxis={seeTimeAxis}
                                        />
                                    </DateRangeContainer>
                                    <LinearMeterContainer style={{ marginTop: isTablet ? 20 : 0 }}>
                                        <LinearMeter
                                            darkMode={darkMode}
                                            titleText={titleText}
                                            data={dataStatistics}
                                            typeStatistic={typeStatistic}
                                            timeSeeAxis={seeTimeAxis}
                                        />
                                    </LinearMeterContainer>
                                </Fragment>
                            )}
                        </CardContent>
                    </Card>
                </Box>
            </Modal>
        </Fragment>
    )
}

export default BlockchainCharts
