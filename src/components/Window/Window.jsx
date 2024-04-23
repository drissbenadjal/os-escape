import './Window.scss';
import { useEffect, useRef, useState } from 'react';
import { XTerm } from 'xterm-for-react';
import { io } from 'socket.io-client';

// eslint-disable-next-line react/prop-types
const Window = ({ indexWindow, closeWindow, setzIndex, setSetzIndex }) => {
  const socket = io('http://localhost:3001');
  const window = useRef(null);
  const [write, setWrite] = useState('');

  useEffect(() => {
    if (indexWindow === 1) {
      socket.on('receive-pc-message', (message) => {
        xtermRef.current.terminal.writeln(message);
      });
    }
  }, [indexWindow]);

  const changeZIndex = () => {
    setSetzIndex(setzIndex + 1);
    window.current.style.zIndex = setzIndex + 1;
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

  const xtermRef = useRef(null);
  useEffect(() => {
    if (!xtermRef.current) return;
    // You can call any method in XTerm.js by using 'xterm xtermRef.current.terminal.[What you want to call]
    xtermRef.current.terminal.writeln('Ask me anything about Tim Berners-Lee');
    //mettre un retour à la ligne
    xtermRef.current.terminal.writeln('');
  }, []);

  const onWrite = (data) => {
    console.log(data);
    console.log(write);
    //quand c'est enter on envoie le message
    if (data === '\r') {
      if (write === '/clear') {
        setWrite('');
        setTimeout(() => {
          //supprimermeme la ligne de la commande
          xtermRef.current.terminal.write('\b \b \b \b \b \b');
          xtermRef.current.terminal.clear();
          xtermRef.current.terminal.writeln(
            'Ask me anything about Tim Berners-Lee'
          );
          xtermRef.current.terminal.writeln('');
        }, 50);
        return;
      } else {
        socket.emit('send-pc-message', write);
        setWrite('');
        xtermRef.current.terminal.writeln('');
      }
      return;
    }
    //si c'est /clear on efface tout
    //quand on appuie sur backspace on supprime le dernier caractère
    else if (data === '\x7f') {
      xtermRef.current.terminal.write('\b \b');
      return;
    } else {
      setWrite((prev) => prev + data);
      xtermRef.current.terminal.write(data);
      return;
    }
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
          {/* <h1>Tim BERNERS-LEE Chat</h1> */}
          <XTerm
            ref={xtermRef}
            onData={(data) => onWrite(data)}
            options={{ width: '100%', height: '100%' }}
            onResize={(size) => console.log(size)}
            className="terminalChat"
          />
        </div>
      )}
    </div>
  );
};

export default Window;
