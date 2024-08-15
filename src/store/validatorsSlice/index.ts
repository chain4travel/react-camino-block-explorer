import { createSlice } from '@reduxjs/toolkit'
import { RootState } from 'store/configureStore'
import { Status } from 'types'
import { initialValidatorsStateType, ValidatorType } from 'types/store'
import { loadValidators } from './utils'
import moment from 'moment'
import {
    LocationNode,
    NodesPerCountry,
    NodesPerCity,
    ValidatorReponse,
} from '../../types/locationNode'
import sortBy from 'lodash/sortBy'
import { orderBy } from 'lodash'

let initialState: initialValidatorsStateType = {
    percentageOfActiveValidators: 0,
    numberOfActiveValidators: 0,
    numberOfValidators: 0,
    validatorsLoading: Status.IDLE,
    validators: [],
    locationNodes: [],
    nodesPerCountry: [],
    nodesPerCity: [],
}

function mapToTableDataMagelland(item: ValidatorReponse): ValidatorType {
    return {
        status: item.connected ? 'Connected' : 'Disconnected',
        nodeID: item.nodeID,
        startTime: moment(item.startTime, 'YYYY-MM-DD HH:mm:ss'),
        endTime: moment(item.endTime, 'YYYY-MM-DD HH:mm:ss'),
        txID: item.txID,
        uptime: item.uptime,
        lng: item.lng,
        lat: item.lat,
        country: item.country,
        city: item.city,
        alpha2: item.countryISO,
        ip: item.IP,
        nodeIdentity: item.nodeID,
    }
}

function sumNodesPerCountry(info: LocationNode[]): NodesPerCountry[] {
    let dataCountry: NodesPerCountry[] = []
    for (let i = 0; i < info.length; i++) {
        if (dataCountry.some((dat: any) => dat.alpha2 === info[i].alpha2)) {
            let locationNode: LocationNode = info[i]
            let indexDataCountry = dataCountry.findIndex(
                (dat: any) => dat.alpha2 === info[i].alpha2,
            )
            dataCountry[indexDataCountry].nodes.push(locationNode.nodeIdentity)
        } else {
            let nodePerCountry: NodesPerCountry = {
                alpha2: info[i].alpha2,
                country: info[i].country,
                nodes: [info[i].nodeIdentity],
            }
            dataCountry.push(nodePerCountry)
        }
    }
    return sortBy(dataCountry, o => -o.nodes.length)
}

function sumNodesPerCity(info: LocationNode[]): NodesPerCity[] {
    let dataCity: NodesPerCity[] = []
    for (let i = 0; i < info.length; i++) {
        if (dataCity.some((dat: NodesPerCity) => dat.city === info[i].city)) {
            let locationNode: LocationNode = info[i]
            let indexdataCity: number = dataCity.findIndex(
                (dat: NodesPerCity) => dat.city === info[i].city,
            )
            dataCity[indexdataCity].nodes.push(locationNode.nodeIdentity)
        } else {
            let nodePerCountry: NodesPerCity = {
                alpha2: info[i].alpha2,
                country: info[i].country,
                nodes: [info[i].nodeIdentity],
                city: info[i].city,
                lng: info[i].lng,
                lat: info[i].lat,
            }
            dataCity.push(nodePerCountry)
        }
    }
    return sortBy(dataCity, (o: NodesPerCity) => -o.nodes.length)
}

const validatorsSlice = createSlice({
    name: 'validators',
    initialState,
    reducers: {
        resetValidatorsReducer: () => initialState,
        sortValidators: (state, { payload }) => {
            if (state.validators.length <= 1) return
            if (payload === 'UpTime') {
                state.validators = sortBy(state.validators, e => {
                    if (state.validators[0].uptime > state.validators[1].uptime) return -e.uptime
                    else return e.uptime
                })
            } else if (payload === 'EndTime')
                state.validators = sortBy(state.validators, e => {
                    if (
                        new Date(state.validators[0].endTime) -
                            new Date(state.validators[1].endTime) <=
                        0
                    )
                        return -new Date(e.endTime)
                    return new Date(e.endTime)
                })
            else if (payload === 'StartTime')
                state.validators = sortBy(state.validators, e => {
                    if (
                        new Date(state.validators[0].startTime) -
                            new Date(state.validators[1].startTime) <=
                        0
                    )
                        return -new Date(e.startTime)
                    return new Date(e.startTime)
                })
            else if (payload === 'NodeID') {
                let order = state.validators[0].nodeID > state.validators[1].nodeID ? 'desc' : 'asc'
                state.validators = orderBy(state.validators, ['nodeID'], [order as 'asc' | 'desc'])
            } else if (payload === 'Status')
                state.validators = sortBy(state.validators, e => {
                    if (state.validators[0].status === 'Connected') return e.status === 'Connected'
                    else return e.status !== 'Connected'
                })
            else if (payload === 'txID') {
                let order =
                    state.validators[0].txID.toLocaleLowerCase() >
                    state.validators[1].txID.toLocaleLowerCase()
                        ? 'asc'
                        : 'desc'
                state.validators = orderBy(state.validators, ['txID'], [order as 'asc' | 'desc'])
            }
        },
    },
    extraReducers(builder) {
        builder.addCase(loadValidators.pending, state => {
            state.validatorsLoading = Status.LOADING
        })
        builder.addCase(loadValidators.fulfilled, (state, { payload }) => {
            if (Array.isArray(payload)) {
                let responsePayload: ValidatorReponse[] = payload
                if (responsePayload !== null && responsePayload !== undefined) {
                    state.numberOfValidators = responsePayload.length
                    state.numberOfActiveValidators = responsePayload.filter(
                        (v: ValidatorReponse) => v.connected,
                    ).length
                    state.percentageOfActiveValidators = parseInt(
                        ((state.numberOfActiveValidators / state.numberOfValidators) * 100).toFixed(
                            0,
                        ),
                    )
                    state.validators = responsePayload.map(mapToTableDataMagelland)
                    state.locationNodes = state.validators.filter(
                        (v: ValidatorType) =>
                            v.status === 'Connected' && v.lng !== 0 && v.lat !== 0,
                    )
                    state.nodesPerCountry = sumNodesPerCountry(state.locationNodes)
                    state.nodesPerCity = sumNodesPerCity(state.locationNodes)
                    state.validatorsLoading = Status.SUCCEEDED
                } else {
                    state.validatorsLoading = Status.FAILED
                }
            } else {
                state.validatorsLoading = Status.FAILED
            }
        })
        builder.addCase(loadValidators.rejected, state => {
            state.validatorsLoading = Status.FAILED
        })
    },
})

// Select all Validators
export const selectAllValidators = (state: RootState) => state.validators.validators

// Select all Validators
export const getValidatorsStatus = (state: RootState) => state.validators.validatorsLoading

// Select Validators Chainoverreview
export const getValidatorsOverreview = (state: RootState) => {
    return {
        percentageOfActiveValidators: state.validators.percentageOfActiveValidators,
        numberOfActiveValidators: state.validators.numberOfActiveValidators,
        numberOfValidators: state.validators.numberOfValidators,
    }
}

export const getLocationsNodes = (state: RootState) => state.validators.locationNodes

export const getSumNodesPerCountry = (state: RootState) => state.validators.nodesPerCountry

export const getSumNodesPerCity = (state: RootState) => state.validators.nodesPerCity

export const { resetValidatorsReducer, sortValidators } = validatorsSlice.actions

export default validatorsSlice.reducer
