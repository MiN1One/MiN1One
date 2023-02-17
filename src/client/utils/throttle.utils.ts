export const debounce = (
  cb: (...args: any[]) => void, 
  delay: number = 300
) => {
  let timer: NodeJS.Timeout;
  return (...args: any[]) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      cb(...args);
      timer = undefined;
    }, delay);
  }
};