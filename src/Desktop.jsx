export default function Desktop() {
    return (
        <div className="desktop">
            <ul>
                <li>
                    <img src="./assets/images/computer.png" alt="" draggable="false" />
                    <span>My Computer</span>
                </li>
                <li>
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
            <nav className="taskbar">
            </nav>
        </div>
    )
}