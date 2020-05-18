import React from 'react'


export default class Speedtest extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showModel: false
    }

    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }
  handleOpenModal() {
    this.setState({ showModal: true });
  }

  handleCloseModal() {
    this.setState({ showModal: false });
  }

  render() {
    return (
      <div>

      </div>
    );
  }
}