import Cookies from 'js-cookie'
import {Component} from 'react'
import {AiOutlineSearch} from 'react-icons/ai'
import Loader from 'react-loader-spinner'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import JobCard from '../JobCard'
import Header from '../Header'

import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const profileApiConst = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  inprogress: 'IN_PROGRESS',
  initial: 'INITIAL',
}

class Jobs extends Component {
  state = {
    profileStatus: profileApiConst.initial,
    profile: {},
    jobsStatus: profileApiConst.inprogress,
    jobs: {},
  }

  componentDidMount() {
    this.getProfile()
    this.getJobs()
  }

  getJobs = async () => {
    this.setState({jobsStatus: profileApiConst.inprogress})

    const apiUrl =
      'https://apis.ccbp.in/jobs?employment_type=&minimum_package=&search='
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    console.log(response)
    console.log(data)
    if (response.ok) {
      this.setState({
        jobsStatus: profileApiConst.success,
        jobs: data.jobs,
      })
    } else {
      this.setState({jobsStatus: profileApiConst.failure})
    }
  }

  getProfile = async () => {
    this.setState({profileStatus: profileApiConst.inprogress})

    const apiUrl = 'https://apis.ccbp.in/profile'
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    console.log(response)
    console.log(data)
    if (response.ok) {
      this.setState({
        profileStatus: profileApiConst.success,
        profile: data.profile_details,
      })
    } else {
      this.setState({profileStatus: profileApiConst.failure})
    }
  }

  jobsProgressView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  jobsSuccessView = () => {
    const {jobs} = this.state
    return (
      <ul className="jobs-items-list-cont">
        {jobs.map(eachobj => (
          <JobCard eachobj={eachobj} />
        ))}
      </ul>
    )
  }

  salaryOptions = () => (
    <ul className="jobs-employment-items-cont">
      <h1 className="jobs-employment-list-item-head">Salary Range</h1>
      {salaryRangesList.map(eachobj => (
        <li className="jobs-employment-list-item">
          <input
            type="checkbox"
            className="check-box-input-circle"
            id={eachobj.salaryRangeId}
            value={eachobj.label}
          />
          <label
            htmlFor={eachobj.salaryRangeId}
            className="jobs-employment-list-item-label"
          >
            {eachobj.label}
          </label>
        </li>
      ))}
    </ul>
  )

  employmentOptions = () => (
    <ul className="jobs-employment-items-cont">
      <h1 className="jobs-employment-list-item-head">Type of Employment</h1>
      {employmentTypesList.map(eachobj => (
        <li className="jobs-employment-list-item">
          <input
            type="checkbox"
            className="check-box-input"
            id={eachobj.employmentTypeId}
            value={eachobj.label}
          />
          <label
            htmlFor={eachobj.employmentTypeId}
            className="jobs-employment-list-item-label"
          >
            {eachobj.label}
          </label>
        </li>
      ))}
    </ul>
  )

  profileProgressView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  profileFailureView = () => (
    <div className="jobs-profile-failure-view">
      <button type="button" className="retry-btn">
        Retry
      </button>
    </div>
  )

  profileSuccessView = () => {
    const {profile} = this.state
    return (
      <div className="jobs-profile-success-view">
        <img
          src={profile.profile_image_url}
          alt={profile.name}
          className="jobs-profile-img"
        />
        <h1>{profile.name}</h1>
        <p>{profile.short_bio}</p>
      </div>
    )
  }

  allJobs = () => {
    const {jobsStatus} = this.state
    switch (jobsStatus) {
      case profileApiConst.success:
        return this.jobsSuccessView()
      case profileApiConst.failure:
        return this.jobsFailureView()
      case profileApiConst.inprogress:
        return this.jobsProgressView()

      default:
        return null
    }
  }

  profileView = () => {
    const {profileStatus} = this.state
    switch (profileStatus) {
      case profileApiConst.success:
        return this.profileSuccessView()
      case profileApiConst.failure:
        return this.profileFailureView()
      case profileApiConst.inprogress:
        return this.profileProgressView()

      default:
        return null
    }
  }

  searchInput = () => (
    <div className="search-ele-cont">
      <input type="search" className="search-input" placeholder="Search" />
      <button type="button" className="search-icon-btn">
        {}
        <AiOutlineSearch size="30" className="search-icon" />
      </button>
    </div>
  )

  render() {
    return (
      <>
        <Header />
        <div className="jobs-cont">
          <div className="search-cont">{this.searchInput()}</div>
          <div className="jobs-filter-cont">
            {this.profileView()}
            <hr className="jobs-filter-line" />
            {this.employmentOptions()}
            <hr className="jobs-filter-line" />
            {this.salaryOptions()}
          </div>
          <div className="job-items-cont">{this.allJobs()}</div>
        </div>
      </>
    )
  }
}

export default Jobs
