import './Window.scss';
import { useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';

// eslint-disable-next-line react/prop-types
const Window = ({ indexWindow, closeWindow, zIndex, setZIndex }) => {
  const window = useRef(null);
  const [write, setWrite] = useState('');
  const formchat = useRef(null);
  const socket = io('http://localhost:3001');

  useEffect(() => {
    if (indexWindow === 1) {
      formchat.current?.querySelector('input').focus();
      socket.on('receive-pc-message', (message) => {
        formchat.current.insertAdjacentHTML(
          'beforebegin',
          `<p class="message-receive">${message}</p>`
        );
      });
    }
  }, [indexWindow]);

  const changeZIndex = () => {
    if (indexWindow === 1) {
      formchat.current?.querySelector('input').focus();
    }

    setZIndex(zIndex + 1);
    window.current.style.zIndex = zIndex + 1;
  };

  useEffect(() => {
    if (!window.current) return;
    var fenetre = window.current;
    move(fenetre);

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
            var fenetre = window.current;
            fenetre.style.zIndex = fenetre.style.zIndex - 1 < 1 ? 0 : 1;
          }

          // div.style.zIndex = 2;

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
  }, [window]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (write === 'exit') {
      closeWindow(1);
      return;
    } else if (write === '/clear') {
      //supprimer les messages et les réponses
      if (formchat.current.querySelectorAll('.message')) {
        formchat.current.querySelectorAll('.message').forEach((message) => {
          message.remove();
        });
      }
      if (formchat.current.querySelectorAll('.message-receive')) {
        formchat.current
          .querySelectorAll('.message-receive')
          .forEach((message) => {
            message.remove();
          });
      }
      formchat.current.querySelector('input').value = '';
      setWrite('');
      return;
    }
    socket.emit('send-pc-message', write);
    formchat.current.insertAdjacentHTML(
      'beforebegin',
      `<p class="message">${write}</p>`
    );
    formchat.current.querySelector('input').value = '';
    setWrite('');
  };

  return (
    <div
      className="window"
      ref={window}
      onClick={changeZIndex}
      onMouseDownCapture={changeZIndex}
    >
      <div className="window__header">
        <p>{indexWindow === 0 && 'World Wide Web'}</p>
        <p>{indexWindow === 1 && 'Tim Berners-Lee Chat'}</p>
        <button
          className="closeButton"
          onClick={() => {
            closeWindow(indexWindow);
          }}
        >
          X
        </button>
      </div>
      {indexWindow === 0 && (
        <form action="">
          <label htmlFor="password">Password</label>
          <input type="text" placeholder="•••••••" name="password" />
        </form>
      )}
      {indexWindow === 1 && (
        <div className="window__content">
          <div className="terminalChat">
            <div className="terminalChat__content">
              <p>Ask me anything about Tim Berners-Lee</p>
              <form onSubmit={handleSubmit} ref={formchat}>
                <input type="text" onChange={(e) => setWrite(e.target.value)} />
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Window;
