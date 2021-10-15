import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { getAllBills } from '../../api-calls/bills'
import { setBillsList } from '../../actions/bills'
import Calendar from '../components/Calendar'

class CalendarPage extends React.Component {
  componentDidMount() {
    if(this.props.token) {
      this._asyncRequest = getAllBills(this.props.token).then(
        externalData => {
          this._asyncRequest = null
          console.log(externalData)
          this.props.dispatch(setBillsList(externalData))
          // this.setState({ billList: externalData})
        }
      )
    }
    
  }

  componentWillUnmount() {
    if (this._asyncRequest) {
      this._asyncRequest.cancel()
    }
  }
  render() {
    if (this.props.isAuthenticated) {
      return (<Calendar />)
    }
    else {
      return <Redirect to="/login" />
    }
  } 
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.authentication.isAuthenticated,
    token: state.authentication.token,
    billsList: state.bills
  }
}

export default connect(mapStateToProps)(CalendarPage)