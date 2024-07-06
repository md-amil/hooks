import { useEffect, useState } from "react";

export default function useOrientation() {
  const [isFullScreen, setIsFullScreen] = useState(false);
  function exitFullscreen(document) {
    if (!document?.fullscreenElement) {
      return;
    }
    if (document) {
      if (document?.exitFullscreen) {
        document?.exitFullscreen();
      } else if (document?.mozCancelFullScreen) {
        document?.mozCancelFullScreen();
      } else if (document?.webkitExitFullscreen) {
        document?.webkitExitFullscreen();
      }
    }
  }

  function enterFullScreen(element) {
    if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if (element.mozRequestFullScreen) {
      element.mozRequestFullScreen(); // Firefox
    } else if (element.webkitRequestFullscreen) {
      element.webkitRequestFullscreen(); // Safari
    } else if (element.msRequestFullscreen) {
      element.msRequestFullscreen(); // IE/Edge
    }
  }
  useEffect(() => {
    const element = document?.getElementById("video-container");
    if (document) {
      if (isFullScreen) {
        enterFullScreen(element);
        return;
      }
      exitFullscreen(document);
    }
  }, [isFullScreen]);

  return {isFullScreen, setIsFullScreen};
}
