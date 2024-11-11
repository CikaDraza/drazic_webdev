import React, { useEffect, useRef } from 'react';

const LoginDialog = ({ isLoading, onClose, handleLogin, email, setEmail, password, setPassword }) => {
  const vkLoginContainerRef = useRef(null); // Ref for the VK login button container

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
        // Handle successful login, e.g., setting user context, redirecting, etc.
        console.log('Login success:', data);
      }

      function vkidOnError(error) {
        // Handle login errors
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