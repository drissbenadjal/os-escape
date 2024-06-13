import Window from './components/Window/Window';
import { Popup } from './components/Popup/Popup';
import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
const audio = new Audio('/assets/audios/windows-error.mp3');

export default function Desktop() {
  const [windows, setWindows] = useState([]);
  const [zIndex, setZIndex] = useState(1);
  const [time, setTime] = useState(new Date());
  const [note, setNote] = useState('');
  const [room, setRoom] = useState(null);
  const [win, setWin] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [looseWindow, setLooseWindow] = useState(false);

  const socket = io('https://apimmievent.alwaysdata.net/');

  const uuid = 'ebfa90e8-20b7-48fe-a586-929c0ae51323';

  const getRoom = async () => {
    const response = await fetch(
      `https://apimmievent.alwaysdata.net/api/room/${uuid}`
    );
    const data = await response.json();
    setRoom(data[0]);
  };

  useEffect(() => {
    if (!uuid) return;
    getRoom();

    socket.on(`room-update-status-${uuid}`, (updatedRoom) => {
      console.log('updatedRoom', updatedRoom);
      setRoom(updatedRoom);
      setCountdown(0);
    });

    return () => {
      socket.off(`room-update-status-${uuid}`);
    };
  }, [uuid]);

  useEffect(() => {
    if (!room) return;
    if (room.room_status != 1) return;

    let interval;
    let timeout;

    //ajouter 15 min à la date de début
    const dateStart = new Date(room.room_start);
    const dateEnd = new Date(dateStart.getTime() + 10 * 60000 * 1.5);

    //date actuelle -1h
    interval = setInterval(() => {
      let dateNow = new Date();
      // dateNow.setHours(dateNow.getHours() - 1);
      const dateDiff = dateEnd - dateNow;

      //convertir en secondes
      const seconds = Math.floor(dateDiff / 1000);
      setCountdown(seconds);
    }, 1000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [room]);

  useEffect(() => {
    if (countdown === 1) {
      if (win) return;
      setLooseWindow(true);
      audio.play();
    }
  }, [countdown]);

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
          <span>Need help ?</span>
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
          setWin={setWin}
        />
      ))}
      <Popup zIndex={zIndex} />
      {looseWindow && (
        <div className="looseWindow">
          <img src="/assets/images/time.png" width="64" alt="" />
          <h1>Temps écoulé. </h1>
          <p>
            Je croyais pouvoir compter sur vous, vous n'avez pas réussi à sauver
            le web...
          </p>
        </div>
      )}
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
                {index === 1 && 'Need help ?'}
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
