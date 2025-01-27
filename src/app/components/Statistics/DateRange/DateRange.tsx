import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import { FormControl, FormControlLabel, Radio, RadioGroup } from '@mui/material'
import TextField from '@mui/material/TextField'
import moment from 'moment'
import React, { ForwardedRef, forwardRef } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import styled from 'styled-components'
import { IDataRef, IDateRange } from 'types/statistics'
import { currentDateFormat } from 'utils/helpers/moment'
import '../../../../styles/custompicker.css'
import useWidth from '../../../hooks/useWidth'
import { seeTimeAxis as typeSeeTimeAxis } from '../ChartConfig/SeeTimeAxis'

const PickerContainer = styled.div`
    display: flex;
    width: 250px;
`
const Container = styled.div`
    display: flex;
    justify-content: space-around;

    @media only screen and (max-width: 700px) {
        flex-direction: column;
    }
`

const FilterContainerMobile = styled.div`
    display: flex;
    align-content: center;
    justify-content: center;
    margin-left: 5%;
`
const NewTextField = styled(TextField)`
    margin: 1rem;
    width: 125px;
`
const CustomInputContainer = styled.div`
    display: flex;
    align-content: center;
    align-items: baseline;
    cursor: pointer;
`

const DateRange = ({
    initialStartDate,
    InitianEndDate,
    setEndDate,
    setStartDate,
    darkMode,
    setSeeTimeAxis,
    disableFuture,
    seeTimeAxis,
    disableCurrentDay,
    firstLoad,
    setFirstLoad,
}: IDateRange) => {
    const { isWideScreenDown, isWidescreen } = useWidth()
    const handleClickOneDay = () => {
        setSeeTimeAxis('day')
        setStartDate(new Date(moment().subtract(1, 'day').format('YYYY-MM-DD HH:mm:ss')))
        setEndDate(new Date(moment().format('YYYY-MM-DD HH:mm:ss')))
    }

    const handleClickOneMonth = () => {
        setSeeTimeAxis('month')
        setStartDate(new Date(moment().subtract(1, 'months').format('YYYY-MM-DD HH:mm:ss')))
        setEndDate(new Date(moment().format('YYYY-MM-DD HH:mm:ss')))
    }

    const handleClickOneYear = () => {
        setSeeTimeAxis('year')
        setStartDate(new Date(moment().subtract(12, 'months').format('YYYY-MM-DD HH:mm:ss')))
        setEndDate(new Date(moment().format('YYYY-MM-DD HH:mm:ss')))
    }

    const handleClickOneAllTime = () => {
        setSeeTimeAxis('all')
        setStartDate(
            new Date(
                moment('01/01/2022', 'DD/MM/YYYY').startOf('day').format('YYYY-MM-DD HH:mm:ss'),
            ),
        )

        if (disableCurrentDay) {
            setEndDate(
                new Date(moment().add(-1, 'days').endOf('day').format('YYYY-MM-DD HH:mm:ss')),
            )
        } else {
            setEndDate(new Date(moment().endOf('day').format('YYYY-MM-DD HH:mm:ss')))
        }
    }

    const handleChangeStartDate = (date: Date) => {
        setSeeTimeAxis('custom')
        setStartDate(date)
    }

    const handleChangeEndDate = (date: Date) => {
        setSeeTimeAxis('custom')
        setEndDate(date)
    }

    const handleChangeRadioButtons = (value: string) => {
        switch (value) {
            case typeSeeTimeAxis.day:
                handleClickOneDay()
                break
            case typeSeeTimeAxis.month:
                handleClickOneMonth()
                break
            case typeSeeTimeAxis.year:
                handleClickOneYear()
                break
            case typeSeeTimeAxis.all:
                handleClickOneAllTime()
                break
        }
    }

    const CustomInput = React.forwardRef(
        ({ value, onClick, label }: IDataRef, ref: ForwardedRef<HTMLInputElement>) => (
            <CustomInputContainer style={{ cursor: 'default' }}>
                <NewTextField
                    id="standard-basic"
                    label={label}
                    variant="outlined"
                    value={value}
                    ref={ref}
                    onClick={onClick}
                    color="secondary"
                    style={{ cursor: 'default', width: 250 }}
                />
                <CalendarMonthIcon
                    onClick={onClick}
                    style={{ cursor: 'default', position: 'relative', top: 10 }}
                />
            </CustomInputContainer>
        ),
    )

    const getMaxDate = (isStartDate: boolean) => {
        if (InitianEndDate !== null && InitianEndDate !== undefined && isStartDate === true) {
            return InitianEndDate
        }

        if (disableCurrentDay) {
            let yesterday = moment().add(-1, 'days').toDate()
            return yesterday
        } else if (disableFuture) {
            return new Date()
        }
    }

    const CustomInputMobile = forwardRef(({ value, onClick, label }: IDataRef, refMobile: any) => (
        <CustomInputContainer style={{ cursor: 'default' }}>
            <TextField
                id="standard-basic"
                label={label}
                variant="outlined"
                value={value}
                ref={refMobile}
                onClick={onClick}
                color="secondary"
                style={{ cursor: 'default', width: '80%' }}
            />
            <CalendarMonthIcon
                onClick={onClick}
                style={{ cursor: 'default', position: 'relative', top: 10 }}
            />
        </CustomInputContainer>
    ))

    return (
        <Container>
            {isWidescreen && (
                <>
                    <FormControl>
                        <RadioGroup
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                            value={seeTimeAxis}
                            onChange={e => {
                                handleChangeRadioButtons(e.target.value)
                            }}
                        >
                            <FormControlLabel
                                key={0}
                                value={'day'}
                                style={{ display: disableCurrentDay ? 'none' : 'block' }}
                                control={
                                    <Radio
                                        sx={{
                                            '&.Mui-checked': {
                                                color: 'secondary.main',
                                            },
                                        }}
                                    />
                                }
                                label={'1 Day'}
                            />

                            <FormControlLabel
                                key={0}
                                value={'month'}
                                control={
                                    <Radio
                                        sx={{
                                            '&.Mui-checked': {
                                                color: 'secondary.main',
                                            },
                                        }}
                                    />
                                }
                                label={'1 Month'}
                            />
                            <FormControlLabel
                                key={0}
                                value={'year'}
                                control={
                                    <Radio
                                        sx={{
                                            '&.Mui-checked': {
                                                color: 'secondary.main',
                                            },
                                        }}
                                    />
                                }
                                label={'1 Year'}
                            />
                            <FormControlLabel
                                key={0}
                                value={'all'}
                                control={
                                    <Radio
                                        sx={{
                                            '&.Mui-checked': {
                                                color: 'secondary.main',
                                            },
                                        }}
                                    />
                                }
                                label={'All'}
                            />
                        </RadioGroup>
                    </FormControl>

                    <PickerContainer
                        className={darkMode ? 'picker-container' : ''}
                        style={{ position: 'relative', right: '6%', top: -25 }}
                    >
                        <DatePicker
                            dateFormat={currentDateFormat()}
                            selected={initialStartDate}
                            onChange={(date: Date) => handleChangeStartDate(date)}
                            selectsStart
                            startDate={initialStartDate}
                            endDate={InitianEndDate}
                            customInput={<CustomInput label="Initial Date" />}
                            maxDate={getMaxDate(true)}
                            // readOnly
                        />
                        <DatePicker
                            dateFormat={currentDateFormat()}
                            selected={InitianEndDate}
                            onChange={(date: Date) => handleChangeEndDate(date)}
                            selectsEnd
                            startDate={initialStartDate}
                            endDate={InitianEndDate}
                            minDate={initialStartDate}
                            customInput={<CustomInput label="End Date" />}
                            maxDate={getMaxDate(false)}
                            // readOnly
                        />
                    </PickerContainer>
                </>
            )}

            {isWideScreenDown && (
                <>
                    <FormControl>
                        <RadioGroup
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                            value={seeTimeAxis}
                            onChange={e => {
                                handleChangeRadioButtons(e.target.value)
                            }}
                        >
                            <FormControlLabel
                                key={0}
                                value={'day'}
                                control={
                                    <Radio
                                        sx={{
                                            '&.Mui-checked': {
                                                color: 'secondary.main',
                                            },
                                        }}
                                    />
                                }
                                label={'1 D'}
                            />
                            <FormControlLabel
                                key={0}
                                value={'month'}
                                control={
                                    <Radio
                                        sx={{
                                            '&.Mui-checked': {
                                                color: 'secondary.main',
                                            },
                                        }}
                                    />
                                }
                                label={'1 M'}
                            />
                            <FormControlLabel
                                key={0}
                                value={'year'}
                                control={
                                    <Radio
                                        sx={{
                                            '&.Mui-checked': {
                                                color: 'secondary.main',
                                            },
                                        }}
                                    />
                                }
                                label={'1 Y'}
                            />
                            <FormControlLabel
                                key={0}
                                value={'all'}
                                control={
                                    <Radio
                                        sx={{
                                            '&.Mui-checked': {
                                                color: 'secondary.main',
                                            },
                                        }}
                                    />
                                }
                                label={'All'}
                            />
                        </RadioGroup>
                    </FormControl>
                    <br />
                    <FilterContainerMobile className={darkMode ? 'picker-container' : ''}>
                        <DatePicker
                            dateFormat={currentDateFormat()}
                            selected={initialStartDate}
                            onChange={(date: Date) => setStartDate(date)}
                            selectsStart
                            startDate={initialStartDate}
                            endDate={InitianEndDate}
                            customInput={<CustomInputMobile label="Initial Date" />}
                            maxDate={getMaxDate(true)}
                            withPortal
                            // readOnly
                        />
                        <DatePicker
                            dateFormat={currentDateFormat()}
                            selected={InitianEndDate}
                            onChange={(date: Date) => setEndDate(date)}
                            selectsEnd
                            startDate={initialStartDate}
                            endDate={InitianEndDate}
                            minDate={initialStartDate}
                            customInput={<CustomInputMobile label="End Date" />}
                            maxDate={getMaxDate(false)}
                            withPortal
                            // readOnly
                        />
                    </FilterContainerMobile>
                </>
            )}
        </Container>
    )
}

export default React.memo(DateRange)
