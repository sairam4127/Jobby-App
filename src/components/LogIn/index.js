import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import './index.css'

class LogIn extends Component {
  state = {
    username: '',
    password: '',
    showerrorstatus: false,
    errormsg: '',
  }

  onLoginSuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 3})
    const {history} = this.props
    history.replace('/')
  }

  onLoginFailure = errormsg => {
    this.setState({showerrorstatus: true, errormsg})
  }

  onSubmit = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const apiUrl = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    if (response.ok) {
      console.log(response)
      this.onLoginSuccess(data.jwt_token)
    } else {
      console.log(data)
      this.onLoginFailure(data.error_msg)
    }
  }

  onChangedPassword = event => {
    this.setState({password: event.target.value})
  }

  onChangedUser = event => {
    this.setState({username: event.target.value})
  }

  passwordDetails = () => {
    const {password} = this.state
    return (
      <div className="user-details">
        <label className="user-head" htmlFor="passid">
          PASSWORD
        </label>
        <input
          id="passid"
          type="password"
          placeholder="Password"
          className="user-input"
          value={password}
          onChange={this.onChangedPassword}
        />
      </div>
    )
  }

  userDetails = () => {
    const {username} = this.state
    return (
      <div className="user-details">
        <label className="user-head" htmlFor="userid">
          USERNAME
        </label>
        <input
          id="userid"
          type="text"
          value={username}
          placeholder="Username"
          className="user-input"
          onChange={this.onChangedUser}
        />
      </div>
    )
  }

  render() {
    const {showerrorstatus, errormsg} = this.state
    if (Cookies.get('jwt_token') !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="app-js">
        <div className="login-cont">
          <div className="login-logo-cont">
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
              className="logo"
            />
          </div>
          <form onSubmit={this.onSubmit}>
            {this.userDetails()}
            {this.passwordDetails()}
            <button type="submit" className="login-btn">
              Login
            </button>
            {showerrorstatus && <p className="error-msg">*{errormsg}</p>}
          </form>
        </div>
      </div>
    )
  }
}

export default LogIn
