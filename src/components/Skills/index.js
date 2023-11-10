import './index.css'

const Skills = props => {
  const {eachobj} = props
  return (
    <li className="job-item-details-skills-item">
      <img
        src={eachobj.imageUrl}
        alt={eachobj.name}
        className="job-item-details-skills-logo"
      />
      <p className="job-item-details-title">{eachobj.name}</p>
    </li>
  )
}

export default Skills
