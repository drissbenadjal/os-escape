import { useEffect } from 'react';
import './Cursor.scss';

export const Cursor = () => {
    const cursorPath = ['./assets/images/cursor.png', './assets/images/cursor-hover.png'];
    
    useEffect(() => {
        const cursor = document.querySelector('.cursor');
        const cursorImg = cursor.querySelector('img');
        document.addEventListener('mousemove', (e) => {
            cursor.style.top = e.clientY + 'px';
            cursor.style.left = e.clientX + 'px';
        });
        document.addEventListener('mouseover', (e) => {
            if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON') {
                cursorImg.classList.add('cursor-hover');
                cursorImg.src = cursorPath[1];
            } else {
                cursorImg.classList.remove('cursor-hover');
                cursorImg.src = cursorPath[0];
            }
        });
    }, []);

    return (
        <div className="cursor">
            <img src="./assets/images/cursor.png" alt="cursor" draggable="false" />
        </div>
    )
}