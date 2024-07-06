export default function useThrottle<T>(
  fn: (...args: T[]) => void,
  delay = 500
) {
  let prev = 0;
  return function (...args: T[]) {
    const now = new Date().getTime();
    if (now - prev < delay) return;
    prev = now;
    fn(...args);
  };
}
