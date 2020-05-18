import React, { Component } from 'react'
import { scaleLinear } from 'd3-scale'
import { select } from 'd3-selection'
import { line } from 'd3-shape'
import { axisLeft, axisBottom } from 'd3-axis';

import './LineChart.css'

class LineChart extends Component {
  constructor(props) {
    super(props)

    this.state = {
      focusOpacity: 0,
    }
    this.createLineChart = this.createLineChart.bind(this)
  }

  componentDidMount() {
    this.createLineChart()
  }

  componentDidUpdate() {
    this.createLineChart()
  }

  createLineChart() {

    const margin = {
      top: 5,
      bottom: 20,
      left: 30,
      right: 5
    }

    const node = this.node
    const data = this.props.data

    const yMax = Math.max.apply(Math, data.map(d => d.y))

    const xMin = Math.min.apply(Math, data.map(d => d.x))
    const xMax = Math.max.apply(Math, data.map(d => d.x))

    const height = this.props.size[1] - margin.top - margin.bottom
    const width = this.props.size[0] - margin.right - margin.left

    var chart = select(node)
      .attr("width", this.props.size[0])
      .attr("height", this.props.size[1])
      .append("g")
      .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")")
    chart.selectAll('*').remove()

    // Creating y axis
    const yScale = scaleLinear()
      .domain([0, yMax * 1.05])
      .range([height, 0])
    const yAxis = axisLeft()
      .scale(yScale)

    chart.append('g')
      .call(yAxis)

    // Creating X axis
    const xScale = scaleLinear()
      .domain([xMin, xMax])
      .range([0, width])
    const xAxis = axisBottom()
      .scale(xScale)

    chart.append('g')
      .attr('transform', 'translate(0, ' + (height) + ')')
      .call(xAxis)

    // Create the line 
    const l = line()
      .x(function (d) { return xScale(d.x) })
      .y(function (d) { return yScale(d.y) });

    chart.append('path')
      .datum(this.props.data)
      .attr('d', l)
      .attr('fill', 'none')
      .attr('stroke', 'black')

  }


  render() {
    return (
      <div className='main_div'
        style={{
          width: this.props.size[0] + 'px',
        }}
      >
        <div className='y_unit_lbl_div'>
          <small><b>{this.props.y_unit}</b></small>
        </div>
        <svg
          className='chart_svg'
          ref={node => this.node = node}
          width={this.props.size[0]}
          height={this.props.size[1]}>
        </svg>
        <br></br>
        <div className='x_unit_lbl_div'>
          <small><b>{this.props.x_unit}</b></small>
        </div>
      </div >
    );
  }
}

export default LineChart