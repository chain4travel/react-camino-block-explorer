import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import React from 'react'
import { IStatistics } from 'types/statistics'
import flags from './json/flags.json'

const Statistics = ({ nodesPerCountry, darkMode }: IStatistics) => {
    const getUrlFlag = (index: string) => {
        let objFlag = nodesPerCountry[parseInt(index)]
        let code = flags.find(flag => flag.code === objFlag.alpha2)
        let url = `/assets/flags/${code?.code.toLowerCase()}.svg`
        return url
    }

    const options = {
        chart: {
            type: 'bar',
            backgroundColor: 'rgba(0,0,0,0)',
        },
        title: {
            text: '',
            display: 'none',
        },
        yAxis: {
            lineColor: 'transparent',
            gridLineColor: '#666666',
            title: '',
            allowDecimals: false,
        },
        xAxis: {
            lineColor: 'transparent',
            gridLineColor: '#666666',
            categories: nodesPerCountry.map(value => value.country),
            labels: {
                useHTML: true,
                formatter: function (obj: { pos: string; value: string }) {
                    let index = obj.pos
                    return `<span style="color:${
                        darkMode === true ? 'white' : 'black'
                    }"><img width="15" height="15" style="position: relative; top: 2px" src="${getUrlFlag(
                        index,
                    )}" /> ${obj.value}</span>`
                },
            },
            allowDecimals: false,
        },

        legend: {
            itemStyle: {
                color: darkMode ? 'white' : 'black',
                cursor: 'default',
            },
            itemHoverStyle: {
                opacity: 1,
                color: darkMode ? 'white' : 'black',
                cursor: 'default',
            },
        },
        series: [
            {
                borderColor: 'transparent',
                name: 'Nodes',
                color: '#41547C',
                data: nodesPerCountry.map(value => value.nodes.length),
                lineColor: 'transparent', // make the line invisible
                showInLegend: true,
                events: {
                    legendItemClick: function () {
                        return false
                    },
                },
            },
        ],
        credits: {
            enabled: false,
        },
        tooltip: {
            useHTML: true,
            formatter: function (obj: string) {
                let objData: any = this
                return '<b>' + objData.x + ':</b>' + objData.y
            },
        },
    }

    return (
        <div>
            <br />
            <HighchartsReact type="" highcharts={Highcharts} options={options} />
        </div>
    )
}

export default React.memo(Statistics)
