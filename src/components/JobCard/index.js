import {Link} from 'react-router-dom'
import {AiFillStar} from 'react-icons/ai'
import {HiLocationMarker} from 'react-icons/hi'
import {RiSuitcaseFill} from 'react-icons/ri'

import './index.css'

const JobCard = props => {
  const {eachobj} = props
  const {
    id,
    companyLogoUrl,
    location,
    employmentType,
    rating,

    packagePerAnnum,
    jobDescription,
  } = eachobj

  return (
    <Link to={`/jobs/${id}`} className="job-card-link">
      <li className="job-card-item">
        <div className="job-card-logo-cont">
          <img
            src={companyLogoUrl}
            alt="company logo"
            className="job-card-logo"
          />
          <div>
            <h1 className="job-card-title">{eachobj.title}</h1>
            <div className="job-card-rating-cont">
              <AiFillStar size="30" className="star-icon" />
              <p className="job-card-title">{rating}</p>
            </div>
          </div>
        </div>
        <div className="job-card-job-type-cont">
          <div className="job-card-loc-type-cont">
            <p className="job-card-location-cont">
              <HiLocationMarker size="30" />
              <p>{location}</p>
            </p>
            <p className="job-card-location-cont">
              <RiSuitcaseFill size="27" />
              <p> {employmentType}</p>
            </p>
          </div>
          <p className="job-card-location-cont">{packagePerAnnum}</p>
        </div>
        <hr className="job-card-line" />
        <h1 className="job-card-title">Description</h1>
        <p className="job-card-description">{jobDescription}</p>
      </li>
    </Link>
  )
}

export default JobCard
