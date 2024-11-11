if ('VKIDSDK' in window) {
  const VKID = window.VKIDSDK;

  VKID.Config.init({
    app: 52663007,
    redirectUrl: 'https://drazic-webdev.dev/',
    responseMode: VKID.ConfigResponseMode.Callback,
    source: VKID.ConfigSource.LOWCODE,
  });

  const oneTap = new VKID.OneTap();

  oneTap.render({
    container: document.currentScript.parentElement,
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
    // Обработка полученного результата
  }

  function vkidOnError(error) {
    // Обработка ошибки
  }
}
