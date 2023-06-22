import React from 'react'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import ConfigLinearMeter from '../ChartConfig/ChartConfig'
import { IDataChart, IMeter } from 'types/statistics'

const LinearMeter = ({
    darkMode,
    titleText,
    data,
    typeStatistic,
    timeSeeAxis,
    firstLoad,
}: IMeter) => {
    let config = new ConfigLinearMeter(typeStatistic, titleText, data, timeSeeAxis, firstLoad)

    if (config.data !== undefined && config.data != null) {
        try {
            const options = {
                title: {
                    text: titleText,
                    style: {
                        display: 'none',
                    },
                },
                chart: {
                    zoomType: 'x',
                    backgroundColor: 'rgba(0,0,0,0)',
                },
                credits: {
                    enabled: false,
                },
                yAxis: {
                    gridLineColor: darkMode ? 'hsl(221, 0%, 20%)' : 'hsl(221, 0%, 80%)',
                    title: {
                        text: titleText,
                    },
                    labels: {
                        useHTML: true,
                        formatter: function (obj: IDataChart) {
                            return `<span style="text-align: center;color:${
                                darkMode === true ? 'white' : 'black'
                            }"> ${obj.value}</span>`
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
                    layout: 'horizontal',
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
                        name: titleText,
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
        } catch (e) {
            return <></>
        }
    } else {
        return <></>
    }
}

export default LinearMeter
