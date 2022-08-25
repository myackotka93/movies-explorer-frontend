import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import InfoToolTip from "../components/InfoToolTip/InfoToolTip.js";
import * as mainApi from "../utils/MainApi.js";

const UserContext = React.createContext({});

function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuthCkecked, setIsAuthChecked] = useState(false);
  const [isOpenFail, setIsOpenFail] = useState(false);
  const [isOpenSuccess, setIsOpenSuccess] = useState(false);
  const navigate = useNavigate();

  function modalClose() {
    setIsOpenFail(false);
    setIsOpenSuccess(false);
  }

  function handleTokenCheck() {
    if (localStorage.getItem('token')) {
      mainApi.checkToken()
        .then((res) => {
          setUser(res)
        })
        .catch((err) => {
          console.error(err);
          localStorage.removeItem('token');
        })
        .finally(() => {
          setIsAuthChecked(true);
        })
    } else {
      setIsAuthChecked(true);
    }
  }

  useEffect(() => {
    handleTokenCheck();
  }, []);


  function login({ email, password }) {
    return mainApi.authorize(email, password)
      .then(handleAuth)
      .catch((err) => {
        setIsOpenFail(true);
        console.log(err);
      });
  }

  function register({ name, email, password }) {
    return mainApi.register(name, email, password)
      .then(handleAuth)
      .catch((err) => {
        setIsOpenFail(true);
        console.log(err);
      });
  }

  function handleAuth({ data, token }) {
    localStorage.setItem('token', token);
    setUser(data);
    navigate('/movies');
    // setIsAuth(true)
  }

  function updateUser({ name, email }) {
    mainApi.setUserInfo(name, email)
      .then((res) => {
        setUser(res);
        setIsOpenSuccess(true);
      })
      .catch((err) => {
        setIsOpenFail(true)
        console.log(err);
      });
  }

  function logout() {    
    localStorage.removeItem('token');
    localStorage.removeItem('movies');
    localStorage.removeItem('savedMovies');
    localStorage.removeItem('keyValueSavedMovies');
    localStorage.removeItem('keyValueMovies');
    setUser(null);
    navigate('/');
  }

  return (
    <UserContext.Provider value={{ user, isAuthCkecked, login, register, updateUser, logout }}>
      {children}

      <InfoToolTip
        title="Произошла ошибка"
        isOpen={isOpenFail}
        onClose={modalClose}
      />

      <InfoToolTip
        title="Редактирование профиля прошло успешно"
        isOpen={isOpenSuccess}
        onClose={modalClose}
      />
    </UserContext.Provider>
  )
}


export function useUser() {
  return useContext(UserContext)
}

export default UserProvider;

