import Window from './components/Window/Window';
import { Popup } from './components/Popup/Popup';
import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

export default function Desktop() {
  const [windows, setWindows] = useState([]);
  const [popup, setPopup] = useState(true);
  const [zIndex, setZIndex] = useState(1);
  const [time, setTime] = useState(new Date());
  const [note, setNote] = useState('');
  const socket = io('https://apimmievent.alwaysdata.net/');

  const openWindow = (e, index) => {
    e.preventDefault();
    if (windows.includes(index)) {
      if (index === 0) {
        setWindows([...windows, 10]);
      } else if (index === 1) {
        setWindows([...windows, 11]);
      } else if (index === 2) {
        setWindows([...windows, 12]);
      } else if (index === 4) {
        setWindows([...windows, 14]);
      }
      return;
    }
    setWindows([...windows, index]);
  };

  const closeWindow = (index) => {
    setWindows(windows.filter((item) => item !== index));
  };

  useEffect(() => {
    console.log(windows);
  }, [windows]);

  const openWindowAdmin = () => {
    setWindows([...windows, 3]);
  };

  useEffect(() => {
    setInterval(() => {
      setTime(new Date());
    }, 1000);

    //quand on fait shift + i + a
    window.addEventListener('keydown', (e) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'A') {
        openWindowAdmin();
      } else if (e.ctrlKey && e.shiftKey && e.key === 'a') {
        openWindowAdmin();
      } else {
        return;
      }
    });
  }, []);

  const getIcon = (index) => {
    switch (index) {
      case 0:
        return 'web';
      case 1:
        return 'terminal';
      case 2:
        return 'web';
      case 4:
        return 'note';
      default:
        return 'web';
    }
  };

  return (
    <div className="desktop">
      <ul className="desktopApps">
        <li onDoubleClick={(e) => openWindow(e, 0)}>
          <img src="./assets/images/web.png" alt="" draggable="false" />
          <span>The project</span>
        </li>
        <li onDoubleClick={(e) => openWindow(e, 1)}>
          <img src="./assets/images/terminal.png" alt="" draggable="false" />
          <span>Tim Chat</span>
        </li>
        <li onDoubleClick={(e) => openWindow(e, 4)}>
          <img src="./assets/images/note.png" alt="" draggable="false" />
          <span>Bloc-note</span>
        </li>
        {/* <li onDoubleClick={(e) => openWindow(e, 3)}>
          <img src="./assets/images/terminal.png" alt="" draggable="false" />
          <span> test</span>
        </li> */}
      </ul>
      {windows.map((index) => (
        <Window
          key={index}
          index={index}
          indexWindow={index}
          closeWindow={closeWindow}
          zIndex={zIndex}
          setZIndex={setZIndex}
          socket={socket}
          windows={windows}
          setWindows={setWindows}
          note={note}
          setNote={setNote}
        />
      ))}
      <Popup zIndex={zIndex} />
      <nav className="taskbar">
        <div className="nav-link cursor-hover">
          <img src="./assets/images/logo.svg" alt="" />
          Start
        </div>
        <ul className="windows-active">
          {windows.map((index) => (
            <li
              key={index}
              className="nav-link cursor-hover"
              onClick={(e) => openWindow(e, index)}
            >
              <img
                src={`./assets/images/${getIcon(index)}.png`}
                alt=""
                draggable="false"
              />
              <span>
                {index === 0 && 'The project'}
                {index === 1 && 'Tim Chat'}
                {index === 2 && 'Web'}
                {index === 4 && 'Bloc-note'}
              </span>
            </li>
          ))}
        </ul>
        <div className="time">
          {time.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: 'numeric',
            hour12: true,
          })}
        </div>
      </nav>
    </div>
  );
}
