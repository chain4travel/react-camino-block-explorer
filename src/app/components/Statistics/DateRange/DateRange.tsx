import React, { forwardRef } from 'react'
import DatePicker from 'react-datepicker'
import '../../../../styles/custompicker.css'
import styled from 'styled-components'
import moment from 'moment'
import TextField from '@mui/material/TextField'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import 'react-datepicker/dist/react-datepicker.css'
import useWidth from '../../../hooks/useWidth'
import { Radio, RadioGroup, FormControlLabel, FormControl } from '@mui/material'
import { seeTimeAxis as typeSeeTimeAxis } from '../DateRange/SeeTimeAxis'

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
}) => {
    const { isWideScreenDown, isWidescreen } = useWidth()

    const handleClickOneDay = () => {
        setSeeTimeAxis('day')
        setStartDate(new Date(moment().startOf('day').format('YYYY-MM-DD HH:mm:ss')))
        setEndDate(new Date(moment().endOf('day').format('YYYY-MM-DD HH:mm:ss')))
    }

    const handleClickOneMonth = () => {
        setSeeTimeAxis('month')
        setStartDate(new Date(moment().startOf('month').format('YYYY-MM-DD HH:mm:ss')))

        if (disableCurrentDay) {
            setEndDate(
                new Date(moment().add(-1, 'days').endOf('day').format('YYYY-MM-DD HH:mm:ss')),
            )
        } else if (disableFuture) {
            setEndDate(new Date(moment().endOf('day').format('YYYY-MM-DD HH:mm:ss')))
        } else {
            setEndDate(new Date(moment().endOf('month').format('YYYY-MM-DD HH:mm:ss')))
        }
    }

    const handleClickOneYear = () => {
        setSeeTimeAxis('year')
        setStartDate(new Date(moment().startOf('year').format('YYYY-MM-DD HH:mm:ss')))

        if (disableCurrentDay) {
            setEndDate(
                new Date(moment().add(-1, 'days').endOf('day').format('YYYY-MM-DD HH:mm:ss')),
            )
        } else if (disableFuture) {
            setEndDate(new Date(moment().endOf('day').format('YYYY-MM-DD HH:mm:ss')))
        } else {
            setEndDate(new Date(moment().endOf('year').format('YYYY-MM-DD HH:mm:ss')))
        }
    }

    const handleClickOneAllTime = () => {
        setSeeTimeAxis('all')
        setStartDate(
            new Date(
                moment('01/01/2000', 'DD/MM/YYYY').startOf('day').format('YYYY-MM-DD HH:mm:ss'),
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

    const handleChangeStartDate = (date: any) => {
        setSeeTimeAxis('custom')
        setStartDate(date)
    }

    const handleChangeEndDate = (date: any) => {
        setSeeTimeAxis('custom')
        setEndDate(date)
    }

    const handleChangeRadioButtons = (value: any) => {
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

    const CustomInput = forwardRef(({ value, onClick, label }: any, ref: any) => (
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
    ))

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

    const CustomInputMobile = forwardRef(({ value, onClick, label }: any, refMobile: any) => (
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
                            selected={initialStartDate}
                            onChange={(date: any) => handleChangeStartDate(date)}
                            selectsStart
                            startDate={initialStartDate}
                            endDate={InitianEndDate}
                            customInput={<CustomInput label="Initial Date" />}
                            maxDate={getMaxDate(true)}
                            // readOnly
                        />
                        <DatePicker
                            selected={InitianEndDate}
                            onChange={(date: any) => handleChangeEndDate(date)}
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
                            selected={initialStartDate}
                            onChange={date => setStartDate(date)}
                            selectsStart
                            startDate={initialStartDate}
                            endDate={InitianEndDate}
                            customInput={<CustomInputMobile label="Initial Date" />}
                            maxDate={getMaxDate(true)}
                            withPortal
                            // readOnly
                        />
                        <DatePicker
                            selected={InitianEndDate}
                            onChange={date => setEndDate(date)}
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

export default DateRange
