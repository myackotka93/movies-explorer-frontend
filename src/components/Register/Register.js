import React, { useEffect, useState } from 'react';
import { useUser } from '../../services/User';
import Auth from '../Auth/Auth';
import { Form } from '../Form/Form';
import { Input } from '../Input/Input';

export const Register = (props) => {
	const formRef = React.useRef();
  const [form, setForm] = useState({name: '', email: '', password: ''});
  const [disabled, setDisabled] = useState(true);
  const { register } = useUser();
  const [isFormSender, setIsFormSender] = useState(false);

  function handleForm(e) {
    setForm(oldForm => ({...oldForm, [e.target.name]: e.target.value}));

    if (!e.target.validity.valid || !formRef.current.checkValidity()) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }

  function handleSubmit() {
    setIsFormSender(true);
    
    register(form).then(() => {
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
      title="Добро пожаловать!"
      typeLink="Войти"
      to="/signin"
      check="Уже зарегистрированы?"
    >
      <Form ref={formRef} typeButton="Зарегистрироваться" onSubmit={handleSubmit} disabled={disabled || isFormSender}>
        <div className="form__wrapper">
          <Input
            onChange={handleForm}
            value={form.name}
            name="name"
            className="form__input"
            classNameError="form__input_error"
            type="text"
            minLength="2"
            maxLength="30"
            isFormDisabled={isFormSender}
          />
          <label className="form__label">Имя</label>
        </div>
        <div className="form__wrapper">
          <Input
            onChange={handleForm}
            value={form.email}
            name="email"
            className="form__input"
            classNameError="form__input_error"
            type="email"
            minLength="2"
            maxLength="30"
            isFormDisabled={isFormSender}
          />
          <label className="form__label">Email</label>
        </div>
        <div className="form__wrapper">
          <Input
            onChange={handleForm}
            value={form.password}
            name="password"
            className="form__input"
            classNameError="form__input_error"
            type="password"
            minLength="4"
            maxLength="16"
            isFormDisabled={disabled}
          />
          <label className="form__label">Пароль</label>
        </div>
      </Form>
    </Auth>
  );
}