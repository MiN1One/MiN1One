
export const getRandomInt = (max: number) => {
  return Math.floor(Math.random() * max) + 1;
};

export const getRandomElement = <T = string>(arr: T[]) => {
  return arr[getRandomInt(arr.length - 1)];
};

export const createTypingSequence = (str: string) => {
  const strChunks = str.split(' ');
  const sequence: (string | number)[] = [];
  let prevStr = '';
  for (let chunk of strChunks) {
    const randomMsToWait = getRandomInt(5) * 100;
    sequence.push(randomMsToWait);
    prevStr += ' ' + chunk;
    sequence.push(prevStr);
  }
  return sequence;
};