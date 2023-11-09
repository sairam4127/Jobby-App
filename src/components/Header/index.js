import {Link, withRouter} from 'react-router-dom'
import {RiSuitcaseFill} from 'react-icons/ri'
import {AiFillHome} from 'react-icons/ai'
import {FiLogOut} from 'react-icons/fi'
import Cookies from 'js-cookie'
import './index.css'

const Header = props => {
  console.log('rama')
  const onClickedLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/')
  }

  return (
    <nav className="nav-cont">
      <Link to="/" className="logo-link">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
          className="header-logo"
        />
      </Link>
      <div className="header-h-j-cont">
        <Link to="/" className="header-home-link">
          Home
        </Link>
        <Link to="/jobs" className="header-home-link">
          Jobs
        </Link>
      </div>
      <button
        type="button"
        className="header-logout-btn"
        onClick={onClickedLogout}
      >
        Logout
      </button>
      <div className="header-icons-cont">
        <Link to="/" className="header-home-link">
          <AiFillHome size="30" />
        </Link>
        <Link to="/jobs" className="header-home-link">
          <RiSuitcaseFill size="30" />
        </Link>
        <button
          type="button"
          className="header-logout-icon-btn"
          onClick={onClickedLogout}
        >
          {}
          <FiLogOut size="30" />
        </button>
      </div>
    </nav>
  )
}

export default withRouter(Header)
