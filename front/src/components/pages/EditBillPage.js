import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { getBillById } from '../../api-calls/bills'


class EditBillPage extends React.Component {
  state = {
    description: ''

  }
  onComponentWillMount() {
    const id = this.props.location.hash.substring(1)
    const bill = getBillById(this.props.token, id)
    debugger
    console.log(bill)
    this.setState(() => ({...bill}))
  }
  handleFormSubmit = () => {
    console.log('SUBMITTED')
  }
  render() {
    console.log(`State ${this.state}`)
    if (!this.props.isAuthenticated) {
      return <Redirect to="/login" />
    }
    return (
      <div className="page">
        <h1>Bill Edit</h1>
        <form className="form" onSubmit={this.handleFormSubmit}>
          <input 
            className="input" 
            placeholder="description"
            type="text"
            name="description"
          />
          <input 
            className="input" 
            placeholder="description"
            type="text"
            name="description"
          />
          <button className="submit__button">save</button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.authentication.isAuthenticated,
    token: state.authentication.token
  }
}

export default connect(mapStateToProps)(EditBillPage)