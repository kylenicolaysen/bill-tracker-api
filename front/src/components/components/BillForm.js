import React from 'react'
import moment, { isMoment } from 'moment'
import 'react-dates/initialize'
import 'react-dates/lib/css/_datepicker.css'
import { SingleDatePicker } from 'react-dates'

export default class BillForm extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      description: '',
      amount: 0,
      dueDate: 0,
      calendarFocused: false,
      error: ''
    }
  }
  onFocusChange = ({ focused }) => {
    this.setState(() => ({ calendarFocused: focused }))
  }
  onDateChange = (dueDate) => {
    if (dueDate) {
      this.setState(() => ({ dueDate }))
    }
  }
  onFormSubmit = (e) => {
    e.preventDefault()
  }

  render() {
    return (
      <div>
        <form className="form" onSubmit={this.onFormSubmit}>
          <input 
            className="input" 
            placeholder="Description"
            // value={this.state.description === "New Bill" ? undefined : this.state.description}
            type="text"
            name="description"
          />
          <input 
            className="input" 
            // value={this.state.amount}
            type="text"
            name="amount"
          />
          <div className="input">
            <SingleDatePicker
              date={moment()}
              onDateChange={this.onDateChange}
              focused={this.state.calendarFocused}
              onFocusChange={this.onFocusChange}
              numberOfMonths={1}
            />
          </div>
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

