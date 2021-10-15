import React from 'react'
import { Link } from 'react-router-dom'

const NotFoundPage = () => (
  <div className="page">
    <Link to="/">404 Go Home Web-Surfer! You Are Lost</Link>
  </div>
)

export default NotFoundPage

// import React from 'react'
// import { Redirect } from 'react-router-dom'

// class NotFoundPage extends React.Component {  
//   state = {
//     redirect: false
//   }  
//   setRedirect = () => {
//     this.setState({
//       redirect: true
//     })
//   }  
//   renderRedirect = () => {
//     if (this.state.redirect) {
//       return <Redirect to='/login' />
//     }
//   }  
//   render () {
//     return (
//        <div>
//         {this.renderRedirect()}
//         <button onClick={this.setRedirect}>Redirect</button>
//        </div>
//     )
//   }
// }

//   export default NotFoundPage
