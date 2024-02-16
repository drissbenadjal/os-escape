import './Loader.scss'
import { useEffect, useState } from 'react'

export const Loader = () => {
    const [loader, setLoader] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setLoader(false);
        }, 2000);
    }, []);

    return (
        <>
            {
                loader ? 
                <div className="loader">
                    <img src="./assets/images/loader.jpg" alt="loader" draggable="false" />
                </div> : null
            }
        </>
    )
}