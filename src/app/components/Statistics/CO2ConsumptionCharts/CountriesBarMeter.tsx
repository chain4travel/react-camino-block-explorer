import React from 'react'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import sortBy from 'lodash/sortBy'
import { Data, IDataChart, Meter, Value } from 'types/statistics'

const CountriesBarMeter = ({ darkMode, titleText, dataSeries }: Meter) => {
    const sortByAndLoadBar = (data: Value): Data[] => {
        // @ts-ignore:next-line
        let sortedData: Value[] = sortBy(data, object => object && -object.Value)
        let dataChart = sortedData.map((data, index): Data => {
            const country = data.Country || ''
            return {
                name: country.replace('_', ' '),
                y: data.Value,
                drilldown: country.replace('_', ''),
                color: `hsl(221, 48%, ${(index + 1) * (90 / sortedData.length)}%)`,
                value: data.Value,
                country: country.replace('_', ''),
            }
        })
        return dataChart
    }

    const options = {
        chart: {
            type: 'column',
            backgroundColor: 'rgba(0,0,0,0)',
        },
        title: {
            align: 'left',
            text: '',
            style: {
                color: darkMode ? 'white' : 'black',
            },
        },
        xAxis: {
            type: 'category',
            labels: {
                useHTML: true,
                formatter: function (obj: IDataChart) {
                    return `<div style="text-align: center;color:${
                        darkMode === true ? 'white' : 'black'
                    }">
                        <br/> ${obj.value}</div>`
                },
            },
        },
        yAxis: {
            title: {
                text: 'CO2',
                style: {
                    color: darkMode ? 'white' : 'black',
                },
            },
            labels: {
                useHTML: true,
                formatter: function (obj: IDataChart) {
                    return `<span style="color:${darkMode === true ? 'white' : 'black'}">${
                        obj.value
                    }</span>`
                },
            },
        },
        legend: {
            enabled: false,
        },

        tooltip: {
            enabled: false,
        },
        credits: {
            enabled: false,
        },
        series: [
            {
                borderColor: 'transparent',
                name: '',
                color: '#41547C',
                data: sortByAndLoadBar(dataSeries),
            },
        ],
    }

    return (
        <div>
            <br />
            <HighchartsReact type="" highcharts={Highcharts} options={options} />
        </div>
    )
}

export default CountriesBarMeter
