import {AiFillStar} from 'react-icons/ai'
import {HiLocationMarker} from 'react-icons/hi'
import {RiSuitcaseFill} from 'react-icons/ri'

import './index.css'

const SimilarJob = props => {
  const {eachobj} = props
  return (
    <li className="job-item-details-similar-job-item">
      <div className="job-item-details-logo-cont">
        <img
          src={eachobj.companyLogoUrl}
          alt="similar job company logo"
          className="job-item-details-logo"
        />
        <div>
          <h1 className="job-item-details-title">{eachobj.title}</h1>
          <div className="job-card-rating-cont">
            <AiFillStar size="30" className="star-icon" />
            <p className="job-card-title">{eachobj.rating}</p>
          </div>
        </div>
      </div>
      <h1 className="job-item-details-title">Description</h1>
      <p className="job-item-details-description">{eachobj.jobDescription}</p>
      <div className="job-item-details-job-type-cont">
        <div className="job-item-details-loc-type-cont">
          <p className="job-item-details-location-cont">
            <HiLocationMarker size="30" />
            <p> {eachobj.location}</p>
          </p>
          <p className="job-card-location-cont">
            <RiSuitcaseFill size="27" />
            <p> {eachobj.employmentType}</p>
          </p>
        </div>
      </div>
    </li>
  )
}

export default SimilarJob
