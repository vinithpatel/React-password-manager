import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import PasswordItem from '../PasswordItem'

import './index.css'

const colors = ['green', 'red', 'blue', 'orange']

class PasswordManager extends Component {
  state = {
    websiteInput: '',
    usernameInput: '',
    passwordInput: '',
    passwordsList: [],
    isPasswordShown: false,
    searchInput: '',
  }

  getFilteredPasswordsList = () => {
    const {searchInput, passwordsList} = this.state

    return passwordsList.filter(eachItem =>
      eachItem.website.toLowerCase().includes(searchInput.toLowerCase()),
    )
  }

  onChangeWebsiteName = event => {
    this.setState({
      websiteInput: event.target.value,
    })
  }

  onChangeUsername = event => {
    this.setState({
      usernameInput: event.target.value,
    })
  }

  onChangePassword = event => {
    this.setState({
      passwordInput: event.target.value,
    })
  }

  onChangeSearchText = event => {
    this.setState({
      searchInput: event.target.value,
    })
  }

  addPassword = event => {
    event.preventDefault()

    const {
      websiteInput,
      usernameInput,
      passwordInput,
      passwordsList,
    } = this.state

    const newPasswordItem = {
      id: uuidv4(),
      website: websiteInput,
      username: usernameInput,
      password: passwordInput,
      color: colors[Math.floor(Math.random() * colors.length)],
    }

    this.setState({
      passwordsList: [...passwordsList, newPasswordItem],
      websiteInput: '',
      usernameInput: '',
      passwordInput: '',
    })
  }

  onToggleShowPasswords = () => {
    this.setState(prevState => ({
      isPasswordShown: !prevState.isPasswordShown,
    }))
  }

  onDeletePassword = id => {
    this.setState(prevState => {
      const {passwordsList} = prevState

      const updatedPasswordsList = passwordsList.filter(
        eachItem => eachItem.id !== id,
      )

      return {
        passwordsList: updatedPasswordsList,
      }
    })
  }

  render() {
    const {
      websiteInput,
      usernameInput,
      passwordInput,
      isPasswordShown,
      searchInput,
    } = this.state

    const filteredPasswordsList = this.getFilteredPasswordsList()

    const noOfPasswords = filteredPasswordsList.length

    const isPasswordsPreset = noOfPasswords > 0

    return (
      <div className="bg-container">
        <div className="logo-card">
          <img
            className="app-logo"
            src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
            alt="app logo"
          />
        </div>
        <div className="add-new-password-container">
          <img
            className="password-manager-sm-img"
            src="https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png"
            alt="password manager"
          />
          <div className="add-new-password-card">
            <h1 className="add-new-password-heading">Add New Password</h1>
            <form className="add-new-password-form">
              <div className="input-card">
                <img
                  className="input-image"
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                  alt="website"
                />
                <input
                  type="text"
                  placeholder="Enter Website"
                  className="user-input"
                  value={websiteInput}
                  onChange={this.onChangeWebsiteName}
                />
              </div>
              <div className="input-card">
                <img
                  className="input-image"
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                  alt="username"
                />
                <input
                  type="text"
                  placeholder="Enter Username"
                  className="user-input"
                  value={usernameInput}
                  onChange={this.onChangeUsername}
                />
              </div>
              <div className="input-card">
                <img
                  className="input-image"
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                  alt="password"
                />
                <input
                  type="password"
                  placeholder="Enter Password"
                  className="user-input"
                  value={passwordInput}
                  onChange={this.onChangePassword}
                />
              </div>
              <button
                className="add-button"
                type="submit"
                onClick={this.addPassword}
              >
                Add
              </button>
            </form>
          </div>
          <img
            className="password-manager-lg-img"
            src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
            alt="password manager"
          />
        </div>
        <div className="passwords-container">
          <div className="passwords-container-top-sub-container">
            <div className="passwords-heading-card">
              <h1 className="your-passwords-heading">Your Passwords</h1>
              <p className="passwords-count">{noOfPasswords}</p>
            </div>
            <div className="search-input-card">
              <img
                className="input-image"
                src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                alt="search"
              />
              <input
                type="search"
                placeholder="Search"
                className="user-input"
                value={searchInput}
                onChange={this.onChangeSearchText}
              />
            </div>
          </div>
          <hr className="harizental-rule" />
          <div className="show-password-card">
            <input
              id="checkbox"
              type="checkbox"
              className="check-box"
              onClick={this.onToggleShowPasswords}
            />
            <label className="show-passwords-label" htmlFor="checkbox">
              Show Passwords
            </label>
          </div>
          <div className="passwords-card">
            {isPasswordsPreset && (
              <ul className="list-of-passwords">
                {filteredPasswordsList.map(eachItem => (
                  <PasswordItem
                    key={eachItem.id}
                    passwordDetails={eachItem}
                    onDeletePassword={this.onDeletePassword}
                    isPasswordShown={isPasswordShown}
                  />
                ))}
              </ul>
            )}
            {!isPasswordsPreset && (
              <div className="no-passwords-container">
                <img
                  className="no-passwords-image"
                  src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
                  alt="no passwords"
                />
                <p className="no-passwords-para">No Passwords</p>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }
}

export default PasswordManager
