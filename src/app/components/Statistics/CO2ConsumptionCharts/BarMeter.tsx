import React from 'react'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import sortBy from 'lodash/sortBy'
import { IDataChart, Meter, Value } from 'types/statistics'

const BarMeter = ({ dataSeries, darkMode }: Meter) => {
    const sortByAndLoadBar = (data: Value) => {
        try {
            // @ts-ignore:next-line
            let sortedData: Value[] = sortBy(data, object => object && -object.value)
            let dataChart = sortedData.map((data, index) => {
                return {
                    name: data.chain,
                    y: data.value / 1000,
                    drilldown: data.chain,
                    color: `hsl(221, 48%, ${(index + 1) * (80 / sortedData.length)}%)`,
                }
            })
            return dataChart
        } catch (e) {
            return []
        }
    }

    const options = {
        chart: {
            type: 'column',
            backgroundColor: 'rgba(0,0,0,0)',
        },
        title: {
            align: 'center',
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
                    return `<span style="color:${darkMode === true ? 'white' : 'black'}">${
                        obj.value
                    }</span>`
                },
            },
        },
        yAxis: {
            type: 'logarithmic',
            min: 1,
            max: 1000000000,
            tickInterval: 1,
            title: {
                text: 'KgCO2',
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
            formatter: function (this: Highcharts.TooltipFormatterContextObject) {
                const header = `<span>
                    [<label style="color: blue">CO2 Emissions:</label> <b>${this.y} KgCO2</b>]
                    <br/>`
                return header
            },
        },
        credits: {
            enabled: false,
        },
        series: [
            {
                borderColor: 'transparent',
                name: '',
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

export default BarMeter
