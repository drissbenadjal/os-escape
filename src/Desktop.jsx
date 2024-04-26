import Window from './components/Window/Window';
import { useState, useEffect } from 'react';

export default function Desktop() {
  const [windows, setWindows] = useState([]);
  const [zIndex, setZIndex] = useState(1);
  const [time, setTime] = useState(new Date());

  const openWindow = (e, index) => {
    e.preventDefault();
    if (windows.includes(index)) return;
    setWindows([...windows, index]);
  };

  const closeWindow = (index) => {
    setWindows(windows.filter((item) => item !== index));
  };

  useEffect(() => {
    console.log(windows);
  }, [windows]);

  useEffect(() => {
    setInterval(() => {
      setTime(new Date());
    }, 1000);
  }, []);

  return (
    <div className="desktop">
      <ul className="desktopApps">
        <li onDoubleClick={(e) => openWindow(e, 0)}>
          <img src="./assets/images/web.png" alt="" draggable="false" />
          <span>Web</span>
        </li>
        <li onDoubleClick={(e) => openWindow(e, 1)}>
          <img src="./assets/images/terminal.png" alt="" draggable="false" />
          <span>Tim Chat</span>
        </li>
        {/* <li onDoubleClick={(e) => openWindow(e, 2)}>
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
        />
      ))}
      <nav className="taskbar">
        <div className="nav-link cursor-hover">
          <img src="./assets/images/logo.svg" alt="" />
          Start
        </div>
        <ul className="windows-active">
          {windows.map((index) => (
            <li key={index} className="nav-link cursor-hover">
              <img
                src={`./assets/images/${index === 0 ? 'web' : 'terminal'}.png`}
                alt=""
                draggable="false"
              />
              <span>
                {index === 0 && 'Web'}
                {index === 1 && 'Tim Chat'}
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
