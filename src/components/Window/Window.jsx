import './Window.scss';
import { useEffect, useRef, useState } from 'react';
const audio = new Audio('/assets/audios/message.mp3');

// eslint-disable-next-line react/prop-types
const Window = ({
  indexWindow,
  closeWindow,
  zIndex,
  setZIndex,
  socket,
  windows,
  setWindows,
  note,
  setNote,
  setWin,
}) => {
  const window = useRef(null);
  const [write, setWrite] = useState('');
  const formchat = useRef(null);

  useEffect(() => {
    if (indexWindow === 1) {
      formchat.current?.querySelector('input').focus();
      socket.on('receive-pc-message', (message) => {
        formchat.current.insertAdjacentHTML(
          'beforebegin',
          `<p class="message-receive">$ ${message}</p>`
        );
        audio.play();

        // scroll to bottom
        const chat = document.querySelector('.terminalChat__content');
        chat.scrollTop = chat.scrollHeight;
      });
    }
    if (indexWindow === 3) {
      socket.on('tim-message-received', (message) => {
        document
          .querySelector('.message-admin')
          .insertAdjacentHTML(
            'beforeend',
            `<p class="message-receive">player: ${message}</p>`
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
    changeZIndex();

    const video = document.getElementById('video');
    //mettre la camera du pc
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: false })
      .then((stream) => {
        video.srcObject = stream;
      });
  }, []);

  useEffect(() => {
    if (windows.includes(2)) {
      const winTitle = document.getElementById('win__title');
      const video = document.getElementById('video');
      const videofin = document.getElementById('videofin');
      setWin(true);
      setTimeout(() => {
        winTitle.style.display = 'none';
        videofin.style.opacity = 1;
        videofin.play();

        //attendre 23s
        setTimeout(() => {
          video.style.opacity = 1;
        }, 22500);

        setTimeout(() => {
          video.style.opacity = 0;
        }, 38200);
        //attendre 39s
        setTimeout(() => {
          videofin.style.opacity = 0;
          winTitle.style.display = 'block';
          videofin.pause();
          videofin.currentTime = 0;
          video.play();
        }, 39000);
      }, 1800);
    }
  }, [windows]);

  useEffect(() => {
    console.log('windows');
    if (windows.includes(10)) {
      if (indexWindow === 0) {
        changeZIndex();
        setWindows([...windows.filter((item) => item !== 10)]);
      }
    } else if (windows.includes(11)) {
      if (indexWindow === 1) {
        changeZIndex();
        setWindows([...windows.filter((item) => item !== 11)]);
      }
    } else if (windows.includes(12)) {
      if (indexWindow === 2) {
        changeZIndex();
        setWindows([...windows.filter((item) => item !== 12)]);
      }
    } else if (windows.includes(14)) {
      if (indexWindow === 4) {
        changeZIndex();
        setWindows([...windows.filter((item) => item !== 14)]);
      }
    }
  }, [windows]);

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

  const handleChat = (e) => {
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
      `<p class="message">> ${write}</p>`
    );
    formchat.current.querySelector('input').value = '';
    setWrite('');
  };

  const passwordSubmit = (e) => {
    e.preventDefault();
    const password = e.target.querySelector('input').value.toLowerCase();
    if (password === 'http://project.html') {
      setWindows([...windows.filter((item) => item !== 0), 2]);
      setWin(true);
    }
  };

  const handleAdminChat = (e) => {
    e.preventDefault();
    const message = e.target.querySelector('input').value;
    socket.emit('send-admin-message', message);
    //mettre le message dans la fenetre
    document
      .querySelector('.message-admin')
      .insertAdjacentHTML(
        'beforeend',
        `<p class="message">admin: ${message}</p>`
      );
    e.target.querySelector('input').value = '';
  };

  return (
    <div
      className="window"
      ref={window}
      onClick={changeZIndex}
      onMouseDownCapture={changeZIndex}
    >
      <div className="window__header">
        {indexWindow === 0 && <p>The project</p>}
        {indexWindow === 1 && <p>Tim Berners-Lee Chat</p>}
        {indexWindow === 2 && <p>World Wide Web</p>}
        {indexWindow === 3 && <p>Admin Chat</p>}
        {indexWindow === 4 && <p>Bloc-note</p>}
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
        <form className="window__web" onSubmit={passwordSubmit}>
          <label htmlFor="password">Enter the code : </label>
          <input
            type="text"
            placeholder="••••••••••"
            name="password"
            autoComplete="off"
          />
          <button className="window__web__input btn">Validate</button>
        </form>
      )}
      {indexWindow === 1 && (
        <div className="window__content">
          <div className="terminalChat">
            <div className="terminalChat__content">
              <p className="first">You need some help ? Talk to Tim !</p>
              <form
                onSubmit={handleChat}
                ref={formchat}
                className="terminalChat__inputContainer"
              >
                <span>{`>`}</span>
                <input
                  type="text"
                  className="terminalChat__input"
                  onChange={(e) => setWrite(e.target.value)}
                />
              </form>
            </div>
          </div>
        </div>
      )}
      {indexWindow === 2 && (
        <div className="window__content">
          <div className="search_bar">
            <div className="search_bar__buttons">
              <button className="btn" disabled>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                  <path
                    fill="#000000"
                    d="M177.5 414c-8.8 3.8-19 2-26-4.6l-144-136C2.7 268.9 0 262.6 0 256s2.7-12.9 7.5-17.4l144-136c7-6.6 17.2-8.4 26-4.6s14.5 12.5 14.5 22l0 72 288 0c17.7 0 32 14.3 32 32l0 64c0 17.7-14.3 32-32 32l-288 0 0 72c0 9.6-5.7 18.2-14.5 22z"
                  />
                </svg>
              </button>
              <button className="btn" disabled>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                  <path d="M334.5 414c8.8 3.8 19 2 26-4.6l144-136c4.8-4.5 7.5-10.8 7.5-17.4s-2.7-12.9-7.5-17.4l-144-136c-7-6.6-17.2-8.4-26-4.6s-14.5 12.5-14.5 22l0 72L32 192c-17.7 0-32 14.3-32 32l0 64c0 17.7 14.3 32 32 32l288 0 0 72c0 9.6 5.7 18.2 14.5 22z" />
                </svg>
              </button>
            </div>
            <input
              type="text"
              placeholder="Search or enter website name"
              defaultValue="http://project.html"
              readOnly
            />
          </div>
          <div className="internet">
            <h1 id="win__title">Félicitations ! Vous avez sauvé le web !</h1>
            <video src="" id="video" autoPlay muted></video>
            <video src="./assets/videos/videofin.mp4" id="videofin"></video>
          </div>
        </div>
      )}
      {indexWindow === 3 && (
        <div className="window__content admin-chat">
          <div className="message-admin"></div>
          <form onSubmit={(e) => handleAdminChat(e)}>
            <input type="text" placeholder="Message" />
          </form>
        </div>
      )}
      {indexWindow === 4 && (
        <div className="window__content note">
          <textarea
            className="note__area"
            name=""
            id=""
            autoFocus
            value={note}
            onChange={(e) => setNote(e.target.value)}
          ></textarea>
        </div>
      )}
    </div>
  );
};

export default Window;
