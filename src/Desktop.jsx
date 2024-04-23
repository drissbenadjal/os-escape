import Window from "./components/Window/Window";
import { useState, useEffect } from "react";

export default function Desktop() {
    const [windows, setWindows] = useState([]);
    
    const openWindow = (e, index) => {
        e.preventDefault();
        if (windows.includes(index)) return;
        setWindows([...windows, index]);
    }

    useEffect(() => {
        console.log(windows);
    }, [windows]);

    return (
        <div className="desktop">
            <ul>
                <li onClick={(e) => openWindow(e, 0)}>
                    <img src="./assets/images/computer.png" alt="" draggable="false" />
                    <span>My Computer</span>
                </li>
                <li onClick={(e) => openWindow(e, 1)}>
                    <img src="./assets/images/computer.png" alt="" draggable="false" />
                    <span>My Documents</span>
                </li>
                <li>
                    <img src="./assets/images/computer.png" alt="" draggable="false" />
                    <span>Internet Project</span>
                </li>
                <li>
                    <img src="./assets/images/computer.png" alt="" draggable="false" />
                    <span>Recycle Bin</span>
                </li>
            </ul>
            {windows.map((index) => (
                console.log(index),
                <Window key={index} index={index} indexWindow={index} />
            ))}
            <nav className="taskbar">
                <div className="start-btn">
                    <img src="./assets/images/logo.svg" alt="" />
                    Start
                </div>
                <ul className="windows-active">
                    {
                        windows.map((index) => (
                            <li key={index}>
                                <img src="./assets/images/computer.png" alt="" draggable="false" />
                                <span>Window {index}</span>
                            </li>
                        ))
                    }
                </ul>
            </nav>
        </div>
    )
}