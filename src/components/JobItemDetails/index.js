import {Component} from 'react'
import Cookies from 'js-cookie'
import {AiFillStar} from 'react-icons/ai'
import {HiLocationMarker} from 'react-icons/hi'
import {RiSuitcaseFill} from 'react-icons/ri'
import {BsBoxArrowUpRight} from 'react-icons/bs'

import './index.css'
import Header from '../Header'

const profileApiConst = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  inprogress: 'IN_PROGRESS',
  initial: 'INITIAL',
}

class JobItemDetails extends Component {
  state = {
    jobDetails: {},
    apiStatus: profileApiConst.initial,
  }

  componentDidMount() {
    this.getjobDetails()
  }

  getjobDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const apiUrl = `https://apis.ccbp.in/jobs/${id}`
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
      jobDetails: {
        companyLogoUrl: data.job_details.company_logo_url,
        companyWebsiteUrl: data.job_details.company_website_url,
        employmentType: data.job_details.employment_type,
        id: data.job_details.id,
        jobDescription: data.job_details.job_description,
        skills: data.job_details.skills.map(eachobj => ({
          imageUrl: eachobj.image_url,
          name: eachobj.name,
        })),
        title: data.job_details.title,
        lifeAtCompany: {
          description: data.job_details.life_at_company.description,
          imageUrl: data.job_details.life_at_company.image_url,
        },
        location: data.job_details.location,
        packagePerAnnum: data.job_details.package_per_annum,
        rating: data.job_details.rating,
      },
      similarJobs: data.similar_jobs.map(eachobj => ({
        companyLogoUrl: eachobj.company_logo_url,
        employmentType: eachobj.employment_type,
        id: eachobj.id,
        jobDescription: eachobj.job_description,
        location: eachobj.location,
        rating: eachobj.rating,
        title: eachobj.title,
      })),
    }
    console.log(updatedData)
    console.log(response)
    console.log(data)
    if (response.ok) {
      this.setState({
        jobDetails: updatedData,
        apiStatus: profileApiConst.success,
      })
    } else {
      this.setState({apiStatus: profileApiConst.failure})
    }
  }

  successView = () => {
    console.log('rama')
    const {jobDetails} = this.state
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      title,
      rating,
      location,
      employmentType,
      packagePerAnnum,
      jobDescription,
      skills,
    } = jobDetails.jobDetails
    return (
      <div className="job-item-details">
        <div className="job-item-details-first-cont">
          <div className="job-item-details-logo-cont">
            <img
              src={companyLogoUrl}
              alt={title}
              className="job-item-details-logo"
            />
            <div>
              <h1 className="job-item-details-title">{title}</h1>
              <div className="job-card-rating-cont">
                <AiFillStar size="30" className="star-icon" />
                <p className="job-card-title">{rating}</p>
              </div>
            </div>
          </div>
          <div className="job-item-details-job-type-cont">
            <div className="job-item-details-loc-type-cont">
              <p className="job-item-details-location-cont">
                <HiLocationMarker size="30" />
                {location}
              </p>
              <p className="job-card-location-cont">
                <RiSuitcaseFill size="27" />
                {employmentType}
              </p>
            </div>
            <p className="job-card-location-cont">{packagePerAnnum}</p>
          </div>
          <hr className="job-item-details-line" />
          <div className="job-item-details-des-link-cont">
            <h1 className="job-item-details-title">Description</h1>
            <div className="company-link-cont">
              <a href={companyWebsiteUrl} className="company-link">
                Visit
              </a>
              <BsBoxArrowUpRight size="20" className="company-link-icon" />
            </div>
          </div>
          <p className="job-item-details-description">{jobDescription}</p>
          <h1 className="job-item-details-title">Skills</h1>
          <ul className="job-item-details-skills-cont">
            {skills.map(eachobj => (
              <li className="job-item-details-skills-item">
                <img
                  src={eachobj.imageUrl}
                  alt={eachobj.name}
                  className="job-item-details-skills-logo"
                />
                <p className="job-item-details-title">{eachobj.name}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
  }

  jobItemDetailsView = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case profileApiConst.success:
        return this.successView()

      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        {this.jobItemDetailsView()}
      </>
    )
  }
}

export default JobItemDetails
