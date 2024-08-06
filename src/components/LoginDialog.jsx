import React from 'react';

const LoginDialog = ({ isLoading, onClose, handleLogin, email, setEmail, password, setPassword }) => {

  return (
    <div className="login-dialog">
      <div className="login-dialog-content">
        <span className={`loader ${isLoading ? 'show' : 'hide'}`}>Please waith...</span>
        <button onClick={onClose} className="close-btn">X</button>
        <h3>Login</h3>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            name='email'
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            name='password'
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="login-btn">Login</button>
        </form>
      </div>
    </div>
  );
};

export default LoginDialog;