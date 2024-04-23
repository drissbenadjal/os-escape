import './Window.scss'
import { useEffect, useRef } from 'react'

// eslint-disable-next-line react/prop-types
const Window = ({ indexWindow }) => {

    const window = useRef(null);

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


            div.addEventListener('mousedown', function (e) {
                isDown = true;
                if (div != stock) {
                    stock = div;
                    var fenetre = window.current;
                    fenetre.style.zIndex = (fenetre.style.zIndex - 1) < 1 ? 0 : 1;
                }


                div.style.zIndex = 2;
                offset = [
                    div.offsetLeft - e.clientX,
                    div.offsetTop - e.clientY
                ];
            }, true);

            document.addEventListener('mouseup', function () {
                isDown = false;
            }, true);

            document.addEventListener('mousemove', function (event) {
                if (isDown) {
                    mousePosition = {

                        x: event.clientX,
                        y: event.clientY

                    };
                    div.style.left = (mousePosition.x + offset[0]) + 'px';
                    div.style.top = (mousePosition.y + offset[1]) + 'px';
                }
            }, true);
        }
    }, [window]);

    return (
        <div className="window" ref={window}>
            <div className="window__header">
                <div>
                    {
                        indexWindow && indexWindow === 0 && 'Tim BERNERS-LEE Chat'
                    }
                </div>
            </div>
            <div className='window__content'>
                {
                    indexWindow && indexWindow === 0 && (
                        <div>
                            <h1>Tim BERNERS-LEE Chat</h1>
                            <p>
                                Tim BERNERS-LEE Chat
                            </p>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default Window