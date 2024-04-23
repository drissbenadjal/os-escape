import Window from './components/Window/Window';
import { useState } from 'react';

export default function Desktop() {
  const [windows, setWindows] = useState([]);
  const [setzIndex, setSetzIndex] = useState(1);

  const openWindow = (e, index) => {
    e.preventDefault();
    if (windows.includes(index)) return;
    setWindows([...windows, index]);
  };

  const closeWindow = (index) => {
    setWindows(windows.filter((item) => item !== index));
  };

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
      </ul>
      {windows.map((index) => (
        <Window
          key={index}
          index={index}
          indexWindow={index}
          closeWindow={closeWindow}
          setzIndex={setzIndex}
          setSetzIndex={setSetzIndex}
        />
      ))}
      <nav className="taskbar">
        <div className="app">
          <img src="./assets/images/logo.svg" alt="" />
          Start
        </div>
        <ul className="windows-active app">
          {windows.map((index) => (
            <li key={index}>
              <img
                src="./assets/images/computer.png"
                alt=""
                draggable="false"
              />
              <span>Window {index}</span>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
