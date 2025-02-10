import { useState, useEffect } from 'react';

const getWindowDimensions = () => {
    const { innerWidth: width, innerHeight: height } = /iPhone|iPad|iPod/.test(window.navigator.userAgent) ? window.visualViewport : window;
    return {
        width,
        height,
    };
}

const useWindowDimensions = () => {
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

    useEffect(() => {
        function handleResize() {
            setWindowDimensions(getWindowDimensions());
        }

        (/iPhone|iPad|iPod/.test(window.navigator.userAgent) ? window.visualViewport : window).addEventListener('resize', handleResize);
        return () => (/iPhone|iPad|iPod/.test(window.navigator.userAgent) ? window.visualViewport : window).removeEventListener('resize', handleResize);
    }, []);

    return windowDimensions;
}

export default useWindowDimensions;