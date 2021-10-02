import React from 'react'
import { Link } from 'react-router-dom'
import { format, add, sub, parse, startOfWeek, endOfWeek, startOfMonth, endOfMonth, isSameDay, isSameMonth } from 'date-fns'
import ActionBar from '../components/ActionBar'

export default class Calendar extends React.Component {
  state = {
    currentMonth: new Date(),
    selectedDate: new Date()
  }
  // constructor(props) {
  //   super(props)
  //   this.state = { 
  //     currentMonth: new Date(),
  //     selectedDate: new Date()
  //   }
  // }
  //handle what happens when a date is clicked
  onDateClick = (day) => {
    this.setState({
      selectedDate: day
    })
  }
  //change to next month
  nextMonth = () => {
    this.setState({
      currentMonth: add(this.state.currentMonth, {months: 1})
    })
  }
  //change to previous month
  prevMonth = () => {
    this.setState({
      currentMonth: sub(this.state.currentMonth, {months: 1})
    })
  }
  renderActionBar() {
    return (
      <ActionBar />
    )
  }
  //renders current month name and prev/next month buttons
  renderCalendarHeader() {
    const dateFormat = 'MMMM yyyy'
    return (
      <div className="header row flex-middle">
        <div className="col col-start">
          <div className="icon" onClick={this.prevMonth}>
            chevron_left
          </div>
        </div>
        <div className="col col-center">
          <span>
            {format(this.state.currentMonth, dateFormat)}
          </span>
        </div>
        <div className="col col-end" onClick={this.nextMonth}>
          <div className="icon">
            chevron_right
          </div>
        </div>
      </div>
    )
  }
  //render day names at the top of calendar
  renderDays() {
    const dateFormat = 'eeee'
    const days = []

    let startDate = startOfWeek(this.state.currentMonth)

    for (let i=0; i<7; i++) {
      days.push (
        <div className="col col-center" key={i}>
          {format(add(startDate, {days: i}), dateFormat)}
        </div>
      )
    }

    return <div className="days row">{days}</div>
  }
  //render each day
  renderCells() {
    //sets up beginning and end date to show
    const { currentMonth, selectedDate } = this.state
    const monthStart = startOfMonth(currentMonth)
    const monthEnd = endOfMonth(monthStart)
    const startDate = startOfWeek(monthStart)
    const endDate = endOfWeek(monthEnd)
    //iterate throug each day and add it to 'rows' array
    //also sets proper className for days outside of the month and selected day
    const dateFormat = 'd'
    const rows = []

    let days = []
    let day = startDate
    let formattedDate = ''
    let c = 0
    while (day <= endDate) {
      c++
      for (let i = 0; i < 7; i++) {
        formattedDate = format(day, dateFormat)
        const cloneDay = day
        days.push(
          <div  
            className={`col cell ${
              !isSameMonth(day, monthStart)
                ? "disabled"
                : isSameDay(day, selectedDate) ? "selected" : ""
            }`}
            key={day}
            onClick={ () => this.onDateClick(cloneDay) }
          >
            <span className="number">{formattedDate}</span>
            <span className="bg">{formattedDate}</span>
            <span>+</span>
          </div>
        )
        day = add(day, {days: 1})
      }
      rows.push(
        <div className="row" key={day}>
          {days}
        </div>
        )
        days = []
    }
    return <div className="body">{rows}</div>
  }

  render() {
    return (
      <div className="calendar">
        {this.renderActionBar()}
        {this.renderCalendarHeader()}
        {this.renderDays()}
        {this.renderCells()}
      </div>
    )
  } 
}
