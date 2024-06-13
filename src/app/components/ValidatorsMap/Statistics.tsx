import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import React from 'react'
import { IStatistics } from 'types/statistics'
import flags from './json/flags.json'
import { CircleFlag } from 'react-circle-flags'
import { renderToStaticMarkup } from 'react-dom/server'

const Statistics: React.FC<IStatistics> = ({ nodesPerCountry, darkMode }) => {
    const formatXAxisLabel = (obj: { pos: string; value: string }) => {
        const index = parseInt(obj.pos)
        const countryIdentifier = nodesPerCountry[index].alpha2
        const flagCode = getUrlFlag(index) ?? '' // Provide a default value for flagCode
        const flagSVG = renderToStaticMarkup(<CircleFlag countryCode={flagCode} height={15} />) // Render CircleFlag to SVG
        return `
            <div class="formatXAxisLabel" style="color: ${darkMode ? 'white' : 'black'}">
                <span>${flagSVG}</span>
                <span>${obj.value}</span>
            </div>
        `
    }

    const getUrlFlag = (index: number) => {
        const objFlag = nodesPerCountry[index]
        const code = flags.find(flag => flag.code === objFlag.alpha2)
        return code?.code.toLowerCase()
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
                formatter: formatXAxisLabel,
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
                    legendItemClick: () => false,
                },
            },
        ],
        credits: {
            enabled: false,
        },
        tooltip: {
            useHTML: true,
            formatter: function (this: any) {
                return `<b>${this.x}:</b>${this.y}`
            },
        },
    }

    return (
        <div>
            <br />
            <HighchartsReact highcharts={Highcharts} options={options} />
        </div>
    )
}

export default React.memo(Statistics)
