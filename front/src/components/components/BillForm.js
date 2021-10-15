import React from 'react'
import moment from 'moment'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import 'react-dates/initialize'
import 'react-dates/lib/css/_datepicker.css'
import { SingleDatePicker } from 'react-dates'
import { addNewBill } from '../../api-calls/bills'
import { addBill } from '../../actions/bills'

class BillForm extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      description: '',
      amount: 0,
      date: 456456456,
      frequency: 'monthly',
      calendarFocused: false,
      error: ''
    }
  }
  onDescriptionChange = (e) => {
    const description = e.target.value
    this.setState(() => ({description}))
  }
  onAmountChange = (e) => {
    const amount = e.target.value
    if(!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)) {
      this.setState(() => ({ amount }))
    }
  }
  onDateChange = (date) => {
    console.log(date)
    if (date) {
      this.setState(() => ({ date }))
    }
  }
  onFocusChange = ({ focused }) => {
    this.setState(() => ({ calendarFocused: focused }))
  }
  onFrequencyChange = (e) => {
    this.setState(() => ({ frequency: e.target.value}))
  }
  onFormSubmit = (e) => {
    e.preventDefault()
    const newBill = {
      description: this.state.description,
      amount: parseFloat(this.state.amount, 10) * 100,
      date: this.state.date,
      frequency: this.state.frequency
    }
    addNewBill(this.props.token, newBill)
    this.props.dispatch(addBill(newBill))
    return <Redirect to="/bills-dashboard" />
  }

  render() {
    const date = moment()
    return (
      <div>
        {this.state.error && <p>{this.state.error}</p>}
        <form className="form">
          <label htmlFor="description">
            Title
            <input 
              className="input" 
              placeholder="Title"
              onChange={this.onDescriptionChange}
              type="text"
              name="description"
            />
          </label>
          <label htmlFor="amount">
            Amount
            <input 
              type="text"
              className="input" 
              name="Amount"
              value={this.state.amount}
              onChange={this.onAmountChange}
            />
          </label>
          <label htmlFor="Next Due Date">
            Next Due Date
            <div className="input">
              <SingleDatePicker
                date={date}
                onDateChange={this.onDateChange}
                focused={this.state.calendarFocused}
                onFocusChange={this.onFocusChange}
                numberOfMonths={1}
              />
            </div>
          </label>
          <label htmlFor="frequency">
            Due Every
            <select 
              className="input"
              onChange={this.onFrequencyChange}
              name="frequency"
              defaultValue="month"
            >
              <option value="year">Year</option>
              <option value="month">Month</option>
              <option value="two months">Two Months</option>
              <option value="week">Week</option>
              <option value="two weeks">Two Weeks</option>
            </select>
          </label>
          <button className="submit__button" onClick={this.onFormSubmit}>save</button>
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

export default connect(mapStateToProps)(BillForm)