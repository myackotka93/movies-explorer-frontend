import React from 'react'
import { Link } from 'react-router-dom'

function Auth(props) {
  return (
    <div className="form">
      <Link to="/" className="logo" />
      <h1 className="form__title">{props.title}</h1>
      {props.children}
      <p className="form__check">{props.check} <Link to={props.to} className="form__link" >{props.typeLink}</Link></p>
    </div>
  )
}

export default Auth