import React, { useState } from "react";
import "../style/form.scss";
import "../../shared/global.scss";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth";

const Login = () => {
  const { user, loading, handleLogin } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");


  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();

    await handleLogin(username,password)

    navigate('/')

  };


  if(loading){
    return(
      <main>
        <h1>Loading...</h1>
      </main>
    )
  }

  return (
    <main>
      <div className="form-container">
        <h1>Login</h1>
        <form action="" onSubmit={handleSubmit}>
          <input
            onInput={(e) => {setUsername(e.target.value)}}
            type="text"
            name="username"
            id="username"
            placeholder="enter username"
          />
          <input
          onInput={(e) => setPassword(e.target.value)}
            type="password"
            name="password"
            id="password"
            placeholder="enter password"
          />
          <button type="submit" className="button primary-button">Login</button>
        </form>
        <p>
          Don't have an account? <Link to={"/register"}>Register</Link>
        </p>
      </div>
    </main>
  );
};

export default Login;
