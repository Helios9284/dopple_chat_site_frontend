import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const loc = useLocation();
  useEffect(() => {
    if (loc.pathname !== "/messages") {
      document.body.style.height = "100svh"
      document.body.style.overflow = "auto"
    }
    document.body.scrollTop = 0;
  }, [loc.pathname]);
  useEffect(() => {
    window.onbeforeunload = function () {
      document.body.scrollTop = 0;
    }
  }, [])
  return (null);
}

export default ScrollToTop;