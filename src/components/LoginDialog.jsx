import React, { useEffect, useRef } from 'react';
import { loginUserWithVK } from '../utils/api/login_user_whit_vk/loginUserWhitVK';

const LoginDialog = ({ isLoading, onClose, handleLogin, email, setEmail, password, setPassword }) => {
  const vkLoginContainerRef = useRef(null);

  useEffect(() => {
    if (window.VKIDSDK) {
      const VKID = window.VKIDSDK;

      VKID.Config.init({
        app: 52663007,
        redirectUrl: 'https://drazic-webdev.dev/',
        responseMode: VKID.ConfigResponseMode.Callback,
        source: VKID.ConfigSource.LOWCODE,
      });

      const oneTap = new VKID.OneTap();

      oneTap.render({
        container: vkLoginContainerRef.current, // Mount VK login button here
        showAlternativeLogin: true
      })
      .on(VKID.WidgetEvents.ERROR, vkidOnError)
      .on(VKID.OneTapInternalEvents.LOGIN_SUCCESS, function (payload) {
        const code = payload.code;
        const deviceId = payload.device_id;

        VKID.Auth.exchangeCode(code, deviceId)
          .then(vkidOnSuccess)
          .catch(vkidOnError);
      });

      function vkidOnSuccess(data) {
        console.log("Login Success Data:", data);
        if (data) {
          console.log("Storing userData to sessionStorage", data);
          sessionStorage.setItem('userData', data);
          console.log("Stored userData:", sessionStorage.getItem('userData'));
        } else {
          console.log("No token received:", data);
        }
      }

      function vkidOnError(error) {
        console.error('VK login error:', error);
      }
    }
  }, []);

  return (
    <div className="login-dialog">
      <div className="login-dialog-content">
        <span className={`loader ${isLoading ? 'show' : 'hide'}`}>Please wait...</span>
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
        <div className='vk-btn' ref={vkLoginContainerRef}></div>
      </div>
    </div>
  );
};

export default LoginDialog;