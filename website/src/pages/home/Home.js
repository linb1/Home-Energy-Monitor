import React, { Component } from 'react'
import { box, box2, symbol, big, graph_rate } from './HomeStyle'
import { rate, rates, year, years, total, years_carbon, emissions } from './HomeQuery'
import lightning from '../../assets/lightning.png';
import CanvasJSReact from '../../assets/canvasjs.react';
import './Home.css'

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
const BU_usage = 199126547; //yearly usage for BU

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showhome: true
        }

    }
    render() {

        const chart1 = {
            animationEnabled: true,
            exportEnabled: true,
            theme: "dark2", // "light1", "dark1", "dark2"
            width: 500,
            height: 250,
            title: {
                text: "Yearly Retail Electricity Rate for MA"
            },
            axisY: {
                title: "Retail Rate (cents per KWh)",
            },
            axisX: {
                title: "Year",
                interval: 1,
                minimum: 0
            },
            data: [{
                type: "line",
                dataPoints: [
                    { label: years[10], y: rates[10] },
                    { label: years[9], y: rates[9] },
                    { label: years[8], y: rates[8] },
                    { label: years[7], y: rates[7] },
                    { label: years[6], y: rates[6] },
                    { label: years[5], y: rates[5] },
                    { label: years[4], y: rates[4] },
                    { label: years[3], y: rates[3] },
                    { label: years[2], y: rates[2] },
                    { label: years[1], y: rates[1] },
                    { label: years[0], y: rates[0] },
                ]
            }]
        }

        const chart2 = {
            animationEnabled: true,
            exportEnabled: true,
            theme: "dark2", // "light1", "dark1", "dark2"
            width: 500,
            height: 250,
            title: {
                text: "Yearly Carbon Dioxide Emissions for MA"
            },
            axisY: {
                title: "CO2 Emissions (million tons)",
            },
            axisX: {
                title: "Year",
                interval: 1,
                minimum: 0
            },
            data: [{
                type: "line",
                dataPoints: [
                    { label: years_carbon[10], y: emissions[10] },
                    { label: years_carbon[9], y: emissions[9] },
                    { label: years_carbon[8], y: emissions[8] },
                    { label: years_carbon[7], y: emissions[7] },
                    { label: years_carbon[6], y: emissions[6] },
                    { label: years_carbon[5], y: emissions[5] },
                    { label: years_carbon[4], y: emissions[4] },
                    { label: years_carbon[3], y: emissions[3] },
                    { label: years_carbon[2], y: emissions[2] },
                    { label: years_carbon[1], y: emissions[1] },
                    { label: years_carbon[0], y: emissions[0] },
                ]
            }]
        }

        return (
            <div className='home'>
                <div className='row-welcome'>
                <h1 className='welcome-text'>
                    Welcome Professor
                </h1>
                </div>

                <div className='row-grafana'>
                <iframe src="http://localhost:8989/d-solo/f-8LtqXGz/homepage-grafana?orgId=1&refresh=5s&panelId=4" width="500" height="250" frameborder="0"></iframe>
                <iframe src="http://localhost:8989/d-solo/f-8LtqXGz/homepage-grafana?orgId=1&refresh=5s&panelId=2" width="500" height="250" frameborder="0"></iframe>
                </div>

                <div className='row-hgraph'>
                        <CanvasJSChart options={chart1}/>

                        <CanvasJSChart options={chart2}/>
                </div>
                
                {/* <div className='row'>
                    <div className='box'>
                        <img src={lightning} style={symbol} className="greener-living-logo" alt="lightning" />
                        <text>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        For the year
                       <br />
                        </text>
                        <text style={big}>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        {year - 1}<br />
                        </text>
                        <text> <br />
                        The total residential retail electricity for Massachusetts was {total} million kWh <br /><br />

                        That's enough to power BU for {((total * 1000000) / BU_usage).toFixed(2)} school years!
                    </text>
                    </div>
                </div> */}

            </div>

        );
    }
}

export default Home;