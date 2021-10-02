import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { getBillById } from '../../api-calls/bills'


class EditBillPage extends React.Component {
  state = {}
  async componentDidMount() {
    const id = this.props.location.hash.substring(1)
    const bill = await getBillById(this.props.token, id)
    console.log(bill)
    this.setState(() => (bill))
  }
  async componentWillUnmount() {
    
  }

  handleFormSubmit = () => {
    console.log('SUBMITTED')
  }
  render() {
    if (!this.props.isAuthenticated) {
      return <Redirect to="/login" />
    }
    return (
      <div className="page">
        <h1>Bill Edit</h1>
        <form className="form" onSubmit={this.handleFormSubmit}>
          <input 
            className="input" 
            placeholder="Description"
            value={this.state.description === "New Bill" ? undefined : this.state.description}
            type="text"
            name="description"
          />
          <input 
            className="input" 
            value={this.state.amount}
            type="text"
            name="amount"
          />
          <p className="input">Date Input</p>
          <select className="input">
            <option>Annually</option>
            <option>Monthly</option>
            <option>Weekly</option>
          </select>
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