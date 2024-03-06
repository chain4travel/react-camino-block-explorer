import 'react-datepicker/dist/react-datepicker.css'
import '../../../../styles/scrollbarModal.css'

import {
    Box,
    Card,
    CardContent,
    CardHeader,
    CircularProgress,
    IconButton,
    Modal,
    Tooltip,
    Typography,
} from '@mui/material'
import { ConsumptionCharts, Emissions, TextProps } from 'types/statistics'
import { Fragment, useEffect, useState } from 'react'
import { Grid, useTheme } from '@mui/material'
import { mdiArrowExpand, mdiClose, mdiInformationOutline } from '@mdi/js'
import { useAppDispatch, useAppSelector } from 'store/configureStore'

import DateRange from '../DateRange/DateRange'
import Icon from '@mdi/react'
import LinearMeter from './LinearMeter'
import React from 'react'
import { Status } from 'types'
import TextBlockchainDatachart from '../../../../utils/statistics/TextBlockchainDatachart'
import moment from 'moment'
import styled from 'styled-components'
import useWidth from 'app/hooks/useWidth'

const TooltipContainer = styled.div`
    display: flex;
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

const Text = styled('p')<TextProps>`
    margin-left: 3rem;
    margin-right: 1rem;
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
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
}: ConsumptionCharts) => {
    const theme = useTheme()

    const isDark = theme.palette.mode === 'dark'
    const [openModal, setOpenModal] = React.useState(false)
    const [startDate, setStartDate] = useState<Date>()
    const [endDate, setEndDate] = useState<Date>(new Date())
    const [seeTimeAxis, setSeeTimeAxis] = useState<string>('month')
    const [firstLoad, setFirstLoad] = useState<boolean>(true)
    const { isTablet, isSmallMobile, isWidescreen } = useWidth()

    const dispatch = useAppDispatch()

    useEffect(() => {
        let startDateObject = moment(startDate)
        let endDateObject = moment(endDate)
        if (startDate !== undefined && endDate !== undefined) {
            dispatch(
                utilSlice({
                    startDate: `${moment(startDate).format('YYYY-MM-DD')}T00:00:00Z`,
                    endDate: `${moment(endDate).format('YYYY-MM-DD')}T23:59:59Z`,
                    limit: endDateObject.diff(startDateObject, 'days'),
                }),
            )
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [startDate, endDate])

    useEffect(() => {
        setStartDate(new Date(moment().subtract(1, 'months').format('YYYY-MM-DD HH:mm:ss')))
        setEndDate(new Date(moment().format('YYYY-MM-DD HH:mm:ss')))
    }, [])

    const dataStatistics: Emissions = useAppSelector(sliceGetter)
    const loader = useAppSelector(sliceGetterLoader)

    const onOpenModal = () => {
        document.body.style.overflow = 'hidden'
        setOpenModal(true)
    }

    const onCloseModal = () => {
        document.body.style.overflow = 'initial'
        setOpenModal(false)
    }

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
                    <Card
                        sx={{
                            backgroundColor: 'card.background',
                            boxShadow: 0,
                            backgroundImage: 'none',
                            borderRadius: '12px',
                            borderWidth: '1px',
                            borderColor: 'primary.light',
                            borderStyle: 'solid',
                        }}
                    >
                        <CardHeader
                            title={
                                <Typography
                                    variant="h5"
                                    component="span"
                                    sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
                                >
                                    {titleText}
                                    <Tooltip title={tooltipTitle} placement="top">
                                        <Icon path={mdiInformationOutline} size={1} />
                                    </Tooltip>
                                </Typography>
                            }
                            action={
                                <TooltipContainer>
                                    <IconButton
                                        color="info"
                                        component="label"
                                        onClick={onOpenModal}
                                        sx={{
                                            color: `var(--camino-too-blue-to-be-true)`,
                                            padding: '0.5rem',
                                            border: '1px solid var(--camino-too-blue-to-be-true)',
                                        }}
                                    >
                                        <Icon path={mdiArrowExpand} size={0.7} />
                                    </IconButton>
                                </TooltipContainer>
                            }
                            sx={{ '& .MuiCardHeader-action': { alignSelf: 'center' } }}
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
                                        firstLoad={firstLoad}
                                    />
                                </>
                            ) : null}
                        </CardContent>
                    </Card>
                </>
            )}

            <Modal
                open={openModal}
                onClose={onCloseModal}
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    '& .MuiPaper-root': { backgroundImage: 'none' },
                }}
                disableScrollLock={true}
            >
                <Box
                    sx={{
                        backgroundColor: 'transparent',
                        borderRadius: '7px',
                        padding: 0,
                        width: isWidescreen ? '1300px' : '80%',
                    }}
                    style={{
                        maxHeight: isSmallMobile ? 550 : '90%',
                        overflowY: 'auto',
                    }}
                >
                    <Card
                        style={{
                            backgroundColor: darkMode ? '#060F24' : 'white',
                            position: 'relative',
                            width: '100%',
                        }}
                    >
                        <CardHeader
                            title={titleText}
                            action={
                                <IconButton
                                    color="info"
                                    component="label"
                                    onClick={onCloseModal}
                                    style={{ cursor: 'default', color: isDark ? 'white' : 'black' }}
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
                            <Fragment>
                                <Grid
                                    container
                                    spacing={2}
                                    justifyContent="center"
                                    alignItems="center"
                                >
                                    <Grid item xs={12}>
                                        <Typography
                                            variant="body1"
                                            component="p"
                                            sx={{
                                                my: 2,
                                                mx: 1,
                                                border: 1,
                                                borderColor: 'primary.light',
                                                borderRadius: 1,
                                                backgroundColor: 'card.background',
                                                p: 2,
                                            }}
                                        >
                                            {tooltipTitle}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <TextBlockchainDatachart
                                            Text={Text}
                                            dataStatistics={dataStatistics}
                                            endDate={endDate}
                                            startDate={startDate}
                                            typeStatistic={typeStatistic}
                                            isDescriptionOfHighest={true}
                                            timeSeeAxis={seeTimeAxis}
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
                                            timeSeeAxis={seeTimeAxis}
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
                                        disableCurrentDay={false}
                                        firstLoad={firstLoad}
                                        setFirstLoad={setFirstLoad}
                                    />
                                </DateRangeContainer>
                                <LinearMeterContainer style={{ marginTop: isTablet ? 20 : 0 }}>
                                    <LinearMeter
                                        darkMode={darkMode}
                                        titleText={titleText}
                                        data={dataStatistics}
                                        typeStatistic={typeStatistic}
                                        timeSeeAxis={seeTimeAxis}
                                        firstLoad={firstLoad}
                                    />
                                </LinearMeterContainer>
                            </Fragment>
                        </CardContent>
                    </Card>
                </Box>
            </Modal>
        </Fragment>
    )
}

export default BlockchainCharts
