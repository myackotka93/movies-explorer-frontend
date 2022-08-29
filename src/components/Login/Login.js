import React, { useEffect, useRef, useState } from 'react';
import { useUser } from '../../services/User';
import Auth from '../Auth/Auth';
import { Form } from '../Form/Form';
import { Input } from '../Input/Input';

export const Login = (props) => {
  const formRef = useRef();
  const [form, setForm] = useState({ email: '', password: '' });
  const [disabled, setDisabled] = useState(true);
  const { login } = useUser();
  const [isFormSender, setIsFormSender] = useState(false);

  function handleForm(e) {
    setForm(oldForm => ({ ...oldForm, [e.target.name]: e.target.value }));

    if (!e.target.validity.valid || !formRef.current.checkValidity()) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }

  function handleSubmit(e) {
    setIsFormSender(true);

    login(form).then(() => {
      setIsFormSender(false);
    });
  }

  useEffect(() => {
    if (!formRef.current.checkValidity()) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [form]);

  return (
    <Auth
      title="Рады видеть!"
      typeLink="Регистрация"
      to="/signup"
      check="Еще не зарегистрированы?"
    >
      <Form
        ref={formRef}
        onSubmit={handleSubmit}
        disabled={disabled || isFormSender}
        typeButton="Войти"
      >
        <div className="form__wrapper">
          <Input
            onChange={handleForm}
            value={form.email}
            className="form__input"
            classNameError="form__input_error"
            type="email"
            minLength="2"
            maxLength="30"
            name="email"
            isFormDisabled={isFormSender}
          />
          <label className="form__label">Email</label>
        </div>
        <div className="form__wrapper form__wrapper_for_login">
          <Input
            onChange={handleForm}
            value={form.password}
            className="form__input"
            classNameError="form__input_error"
            type="password"
            minLength="4"
            name="password"
            maxLength="16"
            isFormDisabled={isFormSender}
          />
          <label className="form__label">Пароль</label>
        </div>
      </Form>
    </Auth>
  );
}