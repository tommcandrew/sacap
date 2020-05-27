import React, { useState, useEffect } from "react"

const LanguageContext = React.createContext()

const LanguageProvider = props => {
  const [language, setLanguage] = useState("en")

  useEffect(() => {
    retrieveSavedLanguage()
  }, [])

  const changeLanguage = language => {
    setLanguage(language)
    localStorage.setItem("language", JSON.stringify(language))
  }

  const retrieveSavedLanguage = () => {
    const savedLanguage = JSON.parse(localStorage.getItem("language"))
    if (savedLanguage) {
      setLanguage(savedLanguage)
    } else {
      setLanguage("en")
    }
  }

  return (
    <LanguageContext.Provider
      value={{
        language,
        changeLanguage,
      }}
    >
      {props.children}
    </LanguageContext.Provider>
  )
}

export default LanguageContext

export { LanguageProvider }
