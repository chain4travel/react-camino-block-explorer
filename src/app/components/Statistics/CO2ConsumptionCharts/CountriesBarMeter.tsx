import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import dataTest from './testFlags.json';
import sortBy from 'lodash/sortBy';

const CountriesBarMeter = ({ darkMode, titleText }) => {

    const sortByAndLoadBar = (data) => {
        console.log("dataSort", data);
        let sortedData = sortBy(data, o => -o.Value);
        let dataChart = sortedData.map((dat, index) => {
            return {
                name: dat.Country,
                y: dat.Value,
                drilldown: dat.Country,
                color: `hsl(221, 48%, ${(index + 1) * (90/sortedData.length)}%)`,
                value: dat.Value,
                country: dat.Country
            }
        });

        console.log("dataChart",dataChart);
        return dataChart;
    }

    const getUrlFlag = index => {
        let sortedData = sortBy(dataTest.value, o => -o.Value);
        let objFlag = sortedData[index];
        let code = objFlag.country;
        let url = `/assets/flags/${code.toLowerCase()}.svg`;
        return url;
    };

    // <img width="15" height="15" style="position: relative; top: 2px" src="${getUrlFlag(
    //     index,
    // )}" />

    const options = {
        chart: {
            type: 'column',
            backgroundColor: 'rgba(0,0,0,0)',
        },
        title: {
            align: 'left',
            text: titleText,
            style: {
                color: darkMode ? 'white' : 'black'
            }
        },
        /*
        subtitle: {
            align: 'left',
            text: 'Click the columns to view versions. Source: <a href="http://statcounter.com" target="_blank">statcounter.com</a>'
        },
        */
        xAxis: {
            type: 'category',
            labels: {
                useHTML: true,
                formatter: function (obj) {
                    let index = obj.pos;
                    return `<div style="text-align: center;color:${darkMode == true ? 'white' : 'black'
                        }">
                        <br/> ${obj.value}</div>`;
                },
            }
        },
        yAxis: {
            title: {
                text: 'CO2',
                style: {
                    color: darkMode ? 'white' : 'black'
                }
            },
            labels: {
                useHTML: true,
                formatter: function (obj) {
                    let index = obj.pos;
                    return `<span style="color:${darkMode == true ? 'white' : 'black'}">${obj.value}</span>`;
                },
            }

        },
        legend: {
            enabled: false
        },

        tooltip: {
            enabled: false
        },
        credits: {
            enabled: false,
        },
        series: [
            {
                borderColor: 'transparent',
                name: "",
                //colorByPoint: true,
                color: '#41547C',
                data: sortByAndLoadBar(dataTest.value)
            }
        ]
    }


    return (
        <div>
            <br />
            <HighchartsReact type="" highcharts={Highcharts} options={options} />
        </div>
    );
};

export default CountriesBarMeter;
