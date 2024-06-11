import './popup.scss';
import { useState, useEffect } from 'react';
import { socket } from '../../utils/socket';
const audio = new Audio('/assets/audios/windows-error.mp3');

export const Popup = ({ zIndex }) => {
  const uuid = 'ebfa90e8-20b7-48fe-a586-929c0ae51323';
  const [countdown, setCountdown] = useState(0);
  const [room, setRoom] = useState(null);
  const [display, setDisplay] = useState(false);
  const [popupZIndex, setPopupZIndex] = useState(0);

  useEffect(() => {
    setPopupZIndex(zIndex + 1);
  }, [zIndex]);

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

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  useEffect(() => {
    if (countdown === 300 || countdown === 600 || countdown === 60) {
      setDisplay(true);
      audio.play();
    }
  }, [countdown]);

  if (display) {
    return (
      <div
        className="window__popup"
        style={{
          zIndex: popupZIndex,
        }}
      >
        <div className="window__header">
          <p>Message système</p>
          <button
            className="closeButton"
            onClick={() => {
              setDisplay(false);
            }}
          >
            X
          </button>
        </div>
        <div className="window__content">
          <div className="message">
            <img
              src="./assets/images/alert.png"
              width="32"
              height="32"
              alt=""
            />
            <p>Il vous reste {formatTime(countdown)} minutes</p>
          </div>
          <button
            className="btn"
            onClick={() => {
              setDisplay(false);
            }}
          >
            D'accord
          </button>
        </div>
      </div>
    );
  } else {
    return null;
  }
};
