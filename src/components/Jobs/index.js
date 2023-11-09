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
    searchInput: '',
    employmentType: [],
    salaryRange: [],
  }

  componentDidMount() {
    this.getProfile()
    this.getJobs()
  }

  getJobs = async () => {
    this.setState({jobsStatus: profileApiConst.inprogress})
    const {searchInput, employmentType, salaryRange} = this.state

    const employTypeStr = employmentType.join(',')

    console.log(employTypeStr)

    const apiUrl = `https://apis.ccbp.in/jobs?employment_type=${employTypeStr}&minimum_package=${salaryRange}&search=${searchInput}`
    console.log(apiUrl)
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    const updatedData = data.jobs.map(eachobj => ({
      id: eachobj.id,
      companyLogoUrl: eachobj.company_logo_url,
      employmentType: eachobj.employment_type,
      jobDescription: eachobj.job_description,
      location: eachobj.location,
      packagePerAnnum: eachobj.package_per_annum,
      rating: eachobj.rating,
      title: eachobj.title,
    }))
    console.log(response)
    console.log(data)
    if (response.ok) {
      this.setState({
        jobsStatus: profileApiConst.success,
        jobs: updatedData,
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
    const updatedData = {
      name: data.profile_details.name,
      profileImageUrl: data.profile_details.profile_image_url,
      shortBio: data.profile_details.short_bio,
    }

    if (response.ok) {
      this.setState({
        profileStatus: profileApiConst.success,
        profile: updatedData,
      })
    } else {
      this.setState({profileStatus: profileApiConst.failure})
    }
  }

  onChangeSalaryRange = event => {
    this.setState({salaryRange: event.target.value}, this.getJobs)
  }

  onChangedEmploymentType = event => {
    const {employmentType} = this.state
    const updatedList = employmentType.filter(
      eachstr => eachstr !== event.target.value,
    )
    if (employmentType.includes(event.target.value)) {
      this.setState({employmentType: [...updatedList]}, this.getJobs)
    } else {
      this.setState(
        {employmentType: [...updatedList, event.target.value]},
        this.getJobs,
      )
    }
  }

  onClickSearchIcon = () => {
    const {searchInput} = this.state
    this.setState({searchInput}, this.getJobs)
  }

  onChangedInput = event => {
    this.setState({searchInput: event.target.value})
  }

  jobsFailureView = () => (
    <div className="jobs-jobs-failure-view">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="jobs-failure-view"
      />
      <button type="button" className="retry-btn" onClick={this.getJobs}>
        Retry
      </button>
    </div>
  )

  jobsProgressView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  jobsSuccessView = () => {
    const {jobs} = this.state
    if (jobs.length === 0) {
      return (
        <div className="jobs-jobs-failure-view">
          <img
            src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
            alt="no jobs"
            className="jobs-failure-view"
          />
          <h1 className="jobs-employment-list-item-head">No Jobs Found</h1>
          <p className="jobs-profile-success-para">
            We couls not find any jobs, Try other filters
          </p>
        </div>
      )
    }
    return (
      <ul className="jobs-items-list-cont">
        {jobs.map(eachobj => (
          <JobCard eachobj={eachobj} key={eachobj.id} />
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
            value={eachobj.salaryRangeId}
            onClick={this.onChangeSalaryRange}
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
            value={eachobj.employmentTypeId}
            onClick={this.onChangedEmploymentType}
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
      <button type="button" className="retry-btn" onClick={this.getProfile}>
        Retry
      </button>
    </div>
  )

  profileSuccessView = () => {
    const {profile} = this.state
    return (
      <div className="jobs-profile-success-view">
        <img
          src={profile.profileImageUrl}
          alt={profile.name}
          className="jobs-profile-img"
        />
        <h1 className="jobs-profile-success-head">{profile.name}</h1>
        <p className="jobs-profile-success-para">{profile.shortBio}</p>
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
      <input
        type="search"
        className="search-input"
        placeholder="Search"
        onChange={this.onChangedInput}
      />
      <button
        type="button"
        className="search-icon-btn"
        onClick={this.onClickSearchIcon}
      >
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
          <div className="jobs-second-cont">
            <div className="search-cont-2">{this.searchInput()}</div>
            <div className="job-items-cont-2">{this.allJobs()}</div>
          </div>
        </div>
      </>
    )
  }
}

export default Jobs
