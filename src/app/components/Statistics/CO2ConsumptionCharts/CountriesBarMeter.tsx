import React from 'react'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import sortBy from 'lodash/sortBy'

const CountriesBarMeter = ({ darkMode, titleText, dataSeries }) => {
    const sortByAndLoadBar = data => {
        let sortedData = sortBy(data, o => -o.Value)
        let dataChart = sortedData.map((dat, index) => {
            return {
                name: dat.Country.replace('_', ' '),
                y: dat.Value,
                drilldown: dat.Country.replace('_', ''),
                color: `hsl(221, 48%, ${(index + 1) * (90 / sortedData.length)}%)`,
                value: dat.Value,
                country: dat.Country.replace('_', ''),
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
                formatter: function (obj) {
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
                formatter: function (obj) {
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
