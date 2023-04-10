import './index.css'

const PasswordItem = props => {
  const {passwordDetails, onDeletePassword, isPasswordShown} = props
  const {id, website, username, password, color} = passwordDetails

  const onClickDeleteButton = () => {
    onDeletePassword(id)
  }

  return (
    <li className="password-item">
      <div className="password-card">
        <div className={`website-logo-container ${color}`}>
          <p className="website-logo">{website[0]}</p>
        </div>
        <div className="password-info-card">
          <p className="password-details">{website}</p>
          <p className="password-details">{username}</p>

          {isPasswordShown && <p className="password-details">{password}</p>}
          {!isPasswordShown && (
            <img
              className="stars-image"
              src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
              alt="stars"
            />
          )}
        </div>
      </div>
      <button
        className="delete-button"
        type="button"
        onClick={onClickDeleteButton}
        data-testid="delete"
      >
        <img
          className="delete-image"
          src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
          alt="delete"
        />
      </button>
    </li>
  )
}

export default PasswordItem
