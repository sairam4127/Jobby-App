const SalaryRangeList = props => {
  const {eachobj, onClicked} = props
  const onChangedSalary = event => {
    onClicked(event)
  }
  return (
    <li className="jobs-employment-list-item">
      <input
        type="radio"
        className="check-box-input-circle"
        id={eachobj.salaryRangeId}
        value={eachobj.salaryRangeId}
        onChange={onChangedSalary}
      />
      <label
        htmlFor={eachobj.salaryRangeId}
        className="jobs-employment-list-item-label"
      >
        {eachobj.label}
      </label>
    </li>
  )
}

export default SalaryRangeList
