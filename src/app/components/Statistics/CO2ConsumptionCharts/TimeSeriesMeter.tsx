import React from 'react'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import ChartConfig from '../ChartConfig/ChartConfig'
import { typeChartData } from '../../../../utils/statistics/ChartSelector'
import { IDataChart, Meter } from 'types/statistics'

const TimeSeriesMeter = ({ dataSeries, darkMode, titleText, seeTimeAxis }: Meter) => {
    let config = new ChartConfig(
        typeChartData.CO2_EMISSIONS,
        (titleText = ''),
        dataSeries,
        (seeTimeAxis = ''),
    )

    if (config.data !== undefined && config.data) {
        const options = {
            chart: {
                zoomType: 'x',
                backgroundColor: 'rgba(0,0,0,0)',
            },
            title: {
                text: titleText,
                style: {
                    display: 'none',
                },
            },
            yAxis: {
                gridLineColor: darkMode ? 'hsl(221, 0%, 20%)' : 'hsl(221, 0%, 80%)',
                title: {
                    text: 'gCO2',
                    style: {
                        color: darkMode ? 'white' : 'black',
                    },
                },
                labels: {
                    style: {
                        fontSize: '14px',
                        color: darkMode ? 'white' : 'black',
                    },
                },
            },
            xAxis: {
                accessibility: {
                    rangeDescription: 'Range',
                },
                categories: config.getCategories(),

                labels: {
                    useHTML: true,
                    formatter: function (obj: IDataChart) {
                        return `<span style="text-align: center;color:${
                            darkMode === true ? 'white' : 'black'
                        }"> ${obj.value}</span>`
                    },
                },
            },
            legend: {
                enabled: false,
                align: 'center',
                verticalAlign: 'bottom',
                itemStyle: {
                    color: darkMode ? 'white' : 'black',
                },
                itemHoverStyle: {
                    color: darkMode ? 'white' : 'black',
                },
            },
            plotOptions: {
                area: {
                    color: '#41547C',
                    fillColor: {
                        linearGradient: {
                            x1: 0,
                            y1: 0,
                            x2: 0,
                            y2: 1,
                        },
                        stops: [
                            [0, '#41547C'],
                            [
                                1,
                                // @ts-ignore:next-line
                                Highcharts.color(Highcharts.getOptions().colors[0])
                                    .setOpacity(0)
                                    .get('rgba'),
                            ],
                        ],
                    },
                    marker: {
                        radius: 2,
                    },
                    lineWidth: 1,
                    states: {
                        hover: {
                            lineWidth: 1,
                        },
                    },
                    threshold: null,
                },
                series: {
                    label: {
                        connectorAllowed: false,
                    },
                    marker: {
                        states: {
                            hover: {
                                radius: 3,
                            },
                        },
                    },
                },
            },
            credits: {
                enabled: false,
            },

            tooltip: {
                formatter: function (this: Highcharts.TooltipFormatterContextObject) {
                    let indexData = this.point.index
                    return config.getTooltip(indexData)
                },
            },

            series: [
                {
                    type: 'area',
                    name: 'CO2',
                    data: config.getMappedSeries(),
                    color: 'hsl(221, 48%, 75%)',
                },
            ],
            responsive: {
                rules: [
                    {
                        condition: {
                            maxWidth: 500,
                        },
                        chartOptions: {
                            legend: {
                                layout: 'horizontal',
                                align: 'center',
                                verticalAlign: 'bottom',
                            },
                        },
                    },
                ],
            },
        }

        return (
            <div>
                <br />
                <HighchartsReact type="" highcharts={Highcharts} options={options} />
            </div>
        )
    } else {
        return <></>
    }
}

export default TimeSeriesMeter
