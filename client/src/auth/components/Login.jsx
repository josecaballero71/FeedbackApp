import './Login.css';
import { useNavigate } from 'react-router';

export default function Login() {
  const navigateTo = useNavigate();

  function handleLoginFormSubmit(event) {
    event.preventDefault();
    const username = document.form1.username.value;
    const password = document.form1.password.value;

    fetch('http://localhost:4000/auth', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => {
        localStorage.setItem('token', data.token);
        navigateTo('/' + data.redirectUrl )
      })
      .catch(error => console.error(error));
  }



  return (
    <div id="login-container">
      <div className="container">
        <form name="form1" className="box" onSubmit={handleLoginFormSubmit} method="POST">
          <div id="title-container">
            <h1>Feedback<span>App</span></h1>
          </div>

          <div className="input-container">
            <input
              type="text"
              name="username"
              placeholder="USER"
              autoComplete="off"
            />
            <i className="typcn typcn-eye" id="eye"></i>
            <input
              type="password"
              name="password"
              placeholder="PASSWORD"
              id="pwd"
              autoComplete="off"
            />
          </div>

          <input type="submit" value="SIGN IN" className="login-button" />
        </form>
      </div>
    </div>
  );
}