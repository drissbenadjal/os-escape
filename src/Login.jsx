import { useEffect, useRef, useState } from 'react';

// eslint-disable-next-line react/prop-types
export default function Login({ setIsLoggedIn }) {
  const [errorLogin, setErrorLogin] = useState(false);
  const windowLogin = useRef(null);
  const error = useRef(null);

  useEffect(() => {
    if (!windowLogin.current) return;
    if (!error.current) return;
    var fenetre = windowLogin.current;
    var errorFenetre = error.current;
    move(fenetre);
    move(errorFenetre);

    var stock;
    function move(window) {
      if (!stock) {
        stock = window;
      }
      var mousePosition;
      var offset = [0, 0];
      var div;
      var isDown = false;
      div = window;

      div.addEventListener(
        'mousedown',
        function (e) {
          isDown = true;
          if (div != stock) {
            stock = div;
            var fenetre = windowLogin.current;
            fenetre.style.zIndex = fenetre.style.zIndex - 1 < 1 ? 0 : 1;
          }

          div.style.zIndex = 2;
          offset = [div.offsetLeft - e.clientX, div.offsetTop - e.clientY];
        },
        true
      );

      document.addEventListener(
        'mouseup',
        function () {
          isDown = false;
        },
        true
      );

      document.addEventListener(
        'mousemove',
        function (event) {
          if (isDown) {
            mousePosition = {
              x: event.clientX,
              y: event.clientY,
            };
            div.style.left = mousePosition.x + offset[0] + 'px';
            div.style.top = mousePosition.y + offset[1] + 'px';
          }
        },
        true
      );
    }
  }, [windowLogin, error]);

  const Login = (e) => {
    e.preventDefault();
    //si le password est bon
    if (document.getElementById('password').value === '1955') {
      setIsLoggedIn(true);
    } else {
      setErrorLogin(true);
    }
  };

  const Cancel = (e) => {
    e.preventDefault();
    return false;
  };

  return (
    <>
      <div className="login">
        <form
          className="window-login"
          ref={windowLogin}
          onSubmit={(e) => Login(e)}
        >
          <div className="window-login__header">
            <div>Welcome to windows</div>
            <div></div>
          </div>
          <div className="window-login__content">
            <div className="window-login__content__left">
              <img src="./assets/images/key.png" alt="key" draggable="false" />
            </div>
            <div className="window-login__content__center">
              <h3>Type a user name and password to log on to Windows.</h3>
              <div className="window-login__content__center__group">
                <label htmlFor="username">User name:</label>
                <input
                  type="text"
                  placeholder="User name"
                  id="username"
                  defaultValue={`Tim Berners-Lee`}
                  readOnly
                />
              </div>
              <div className="window-login__content__center__group">
                <label htmlFor="password" style={{ marginRight: '6px' }}>
                  Password:
                </label>
                <input
                  type="password"
                  placeholder="••••"
                  id="password"
                  autoComplete="off"
                  // defaultValue={`************`}
                  // readOnly
                />
              </div>
            </div>
            <div className="window-login__content__right">
              <button type="submit" className="btn">
                OK
              </button>
              <button className="btn" onClick={(e) => Cancel(e)}>
                Cancel
              </button>
            </div>
          </div>
        </form>
        {errorLogin && (
          <div className="error-message" ref={error}>
            <div className="window-login__header">
              <div>Incorrect password.</div>
              <div></div>
            </div>
            <p>Incorrect password. Try again.</p>
            <button className="btn" onClick={() => setErrorLogin(false)}>
              Fermé
            </button>
          </div>
        )}
      </div>
    </>
  );
}
