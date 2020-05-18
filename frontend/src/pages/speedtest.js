import React from 'react';
import Plot from 'react-plotly.js';
import { DatePicker, Modal, Button } from 'antd';
import moment from 'moment';

import './speedtest.css'

var path = require('path');
const protocol = 'http://'
const BASE_URL = 'localhost:5000/spdtest/'
const DATA_URL = path.join(BASE_URL, 'both')

export default class Speedtest extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      date: new Date(),
      showDownloadModal: false,
      showUploadModal: false,
      isDataReady: false,
      download_data: {
        title: null,
        x: {
          unit: null,
          values: []
        },
        y: {
          unit: null,
          values: []
        }
      },
      upload_data: {
        title: null,
        x: {
          unit: null,
          values: [],
        },
        y: {
          unit: null,
          values: [],
        }
      }
    }

    this.fetchDataAndSetState = this.fetchDataAndSetState.bind(this)
    this.dateChange = this.dateChange.bind(this)
  }

  dateChange(moment, strDate) {
    this.setState(
      {
        date: moment.toDate(),
        isDataReady: false,
        showDownloadModal: false,
        showUploadModal: false,
        download_data: {
          title: null,
          x: {
            unit: null,
            values: []
          },
          y: {
            unit: null,
            values: []
          }
        },
        upload_data: {
          title: null,
          x: {
            unit: null,
            values: [],
          },
          y: {
            unit: null,
            values: [],
          }
        }
      },
      this.fetchDataAndSetState
    )
  }

  fetchDataAndSetState() {
    const year = String(this.state.date.getFullYear())
    const month = String(this.state.date.getMonth() + 1)
    const day = String(this.state.date.getDate())

    const target_url = path.join(DATA_URL, year, month, day)

    fetch(protocol + target_url)
      .then(res => res.json())
      .then((data) => {
        this.setState({
          download_data: data.download,
          upload_data: data.upload,
          isDataReady: true
        })
      })
  }

  openModal(mode) {
    if (!this.state.isDataReady) {
      return
    }

    if (mode == 'download') {
      this.setState({
        showDownloadModal: true
      })
    } else if (mode == 'upload') {
      this.setState({
        showUploadModal: true
      })
    }
  }

  componentDidMount() {
    this.fetchDataAndSetState()
  }

  render() {
    const modal_width = window.innerWidth * 0.6

    const average = arr => arr.reduce((sume, el) => sume + el, 0) / arr.length;

    var avg_download, avg_upload
    if (this.state.isDataReady) {
      avg_download = average(this.state.download_data.y.values)
      avg_download = Number((avg_download).toFixed(2))

      avg_upload = average(this.state.upload_data.y.values)
      avg_upload = Number((avg_upload).toFixed(2))

    } else {
      avg_download = '...'
      avg_upload = '...'
    }

    return (
      <div className='entire_space'>
        <h1>Pick date to check data: </h1>
        <DatePicker
          onChange={this.dateChange}
          defaultValue={moment()}
        />
        <br></br>
        <br></br>

        <div className='badges_row'>
          <div className='badge_space'>
            <div className='avg_spd_badge'
              onClick={() => this.openModal('download')}>
              <div className='text_box'>
                <center>
                  <p>Avg. Speed:</p>
                  <h1>{avg_download}</h1>
                  <p>{this.state.download_data.y.unit}</p>
                </center>
              </div>
            </div>
          </div>
          <div className='badge_space'>
            <div className='avg_spd_badge'
              onClick={() => this.openModal('upload')}>
              <div className='text_box'>
                <center>
                  <p>Avg. Speed:</p>
                  <h1>{avg_upload}</h1>
                  <p>{this.state.download_data.y.unit}</p>
                </center>
              </div>
            </div>
          </div>
        </div>

        <Modal
          width={modal_width}
          visible={this.state.showDownloadModal}
          onCancel={() => this.setState({ showDownloadModal: false })}
          footer={[
            <Button onClick={() => this.setState({ showDownloadModal: false })}>
              Close
            </Button>
          ]}
        >
          <Plot
            data={[{
              x: this.state.download_data.x.values,
              y: this.state.download_data.y.values,
              name: "",
              hovertemplate: "Speed: %{y} " + this.state.download_data.y.unit
            }
            ]}
            layout={{
              width: modal_width * 0.95,
              title: this.state.download_data.title,
              xaxis: {
                title: this.state.download_data.x.unit,
              },
              yaxis: {
                title: this.state.download_data.y.unit
              },
            }}
          />
        </Modal>

        <Modal
          width={modal_width}
          visible={this.state.showUploadModal}
          onCancel={() => this.setState({ showUploadModal: false })}
          footer={[
            <Button onClick={() => this.setState({ showUploadModal: false })}>
              Close
            </Button>
          ]}
        >
          <Plot
            data={[{
              x: this.state.upload_data.x.values,
              y: this.state.upload_data.y.values,
              name: "",
              hovertemplate: "Speed: %{y} " + this.state.upload_data.y.unit
            }
            ]}
            layout={{
              width: modal_width * 0.95,
              title: this.state.upload_data.title,
              xaxis: {
                title: this.state.upload_data.x.unit,
              },
              yaxis: {
                title: this.state.upload_data.y.unit
              },
            }}
          />
        </Modal>
      </div>
    );
  }
}