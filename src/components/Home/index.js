import {Link} from 'react-router-dom'
import Header from '../Header'

import './index.css'

const Home = () => {
  console.log('rama')
  return (
    <div>
      <Header />
      <div className="home-cont">
        <div className="home-content-cont">
          <h1 className="home-head">Find The Job That Fits Your Life</h1>
          <p className="home-para">
            Millions of people are searching for jobs, salary information,
            company reviews. Find the job that fits your abilities and
            potential.
          </p>
          <Link to="/jobs" className="home-link">
            <button type="button" className="home-find-jobs-btn">
              Find Jobs
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Home
