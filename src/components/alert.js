import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faCheckCircle,
  faTimesCircle,
  faExclamationCircle,
  faLightbulb,
} from "@fortawesome/free-solid-svg-icons"

import "../styles/alert.scss"

const getIcon = message => {
  let icon
  if (message.type === "success") {
    icon = faCheckCircle
  } else if (message.type === "failure") {
    icon = faTimesCircle
  } else if (message.type === "info") {
    icon = faLightbulb
  } else {
    icon = faExclamationCircle
  }
  return icon
}

const Alert = ({ messages }) => {
  return (
    <div className="alert__wrapper">
      {messages.map((message, index) => (
        <div
          className={`alert__content alert--${message.type}`}
          key={"alert" + index}
        >
          <span className="alert__icon">
            <FontAwesomeIcon icon={getIcon(message)} />
          </span>
          <span className="alert__text">{message.text}</span>
        </div>
      ))}
    </div>
  )
}

export default Alert
