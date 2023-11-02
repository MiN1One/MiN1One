export const getRandomInt = (max: number) => {
  return Math.floor(Math.random() * max) + 1;
};

export const getRandomIntBetween = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const randomUniqueIntBetween = () => {
  let previousNum: number;

  const getUniqeRandomNum = (min: number, max: number): Promise<number> => {
    return new Promise(async (resolve) => {
      const newNum = getRandomIntBetween(min, max);
      if (newNum === previousNum) {
        resolve(getUniqeRandomNum(min, max));
        return;
      }
      previousNum = newNum;
      resolve(newNum);
    });
  };

  return getUniqeRandomNum;
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
