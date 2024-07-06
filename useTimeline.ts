import { useEffect, useRef, useState } from "react";
import isMobile from "../utils/isMobile";

export default function useTimeLine(){
    const timeLine = useRef<HTMLDivElement | null>(null);
    const [currentTime,setCurrentTime] = useState(0)
    const scrubbing = useRef(false);
    const touchInterval = useRef<NodeJS.Timeout | null>(null);
    useEffect(() => {
        attachListener(true);
        return () => {
          attachListener(false);
        };
      }, []);
      function attachListener(attach: boolean) {
        if (!timeLine.current) return;
        const listener = attach ? "addEventListener" : "removeEventListener";
        if (isMobile()) {
          timeLine?.current[listener]("touchstart", handleTouchStart);
          timeLine?.current[listener]("touchmove", handleTouchMove);
          timeLine?.current[listener]("touchend", handleTouchEnd);
          return;
        }
        timeLine?.current[listener]("mousemove", handleMouseMove);
        timeLine?.current[listener]("mousedown", handleMouseDown);
        document[listener]("mouseup", handleScrubbing);
        document[listener]("mouseleave", handleScrubbing);
        document[listener]("mousemove", handleScrubbing);
      }
      function updateTimeLine(x: number, timeLine): number {
        const rect = timeLine!.current!.getBoundingClientRect();
        const percent = Math.min(Math.max(0, x - rect.x), rect.width) / rect.width;
        timeLine?.current?.style?.setProperty(
          "--progress-position",
          String(percent)
        );
       setCurrentTime(percent)
      }
      function handleTouchMove(event: TouchEvent) {
        updateTimeLine(event?.touches[0]?.clientX, timeLine);
      }
      function handleTouchStart(event: TouchEvent) {
        updateTimeLine(event?.touches[0]?.clientX, timeLine);
      }
      function handleTouchEnd(event: TouchEvent) {
        touchInterval.current = setTimeout(() => {
        //   togglePlayer(true);
        }, 1000);
      }
    
      function handleScrubbing(event: MouseEvent) {
        if (scrubbing.current) handleMouseDown(event);
      }
      function handleMouseMove(event: MouseEvent) {
        // console.log("moving");
        // handleTimelineUpdate(event.nativeEvent);
      }
      function handleMouseDown(event: MouseEvent) {
        if (!timeLine.current) return;
        updateTimeLine(event.x, timeLine);
        const pressed = (event.buttons & 1) === 1;
        if (pressed) {
          scrubbing.current = true;
          return;
        }
        scrubbing.current = false;
      }
      return {timeLine,currentTime}
}