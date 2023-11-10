const EmploymentTypelist = props => {
  const {eachobj, onClicked} = props
  const onChangeEmploymentType = event => {
    onClicked(event)
  }
  return (
    <li className="jobs-employment-list-item">
      <input
        type="checkbox"
        className="check-box-input"
        id={eachobj.employmentTypeId}
        value={eachobj.employmentTypeId}
        onChange={onChangeEmploymentType}
      />
      <label
        htmlFor={eachobj.employmentTypeId}
        className="jobs-employment-list-item-label"
      >
        {eachobj.label}
      </label>
    </li>
  )
}

export default EmploymentTypelist
