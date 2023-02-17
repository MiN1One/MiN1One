export const stringToBinaryString = (str: string): string => {
  let output = '';
  for (let i = 0; i < str.length; i++) {
    const char = str[i];
    output += char.charCodeAt(0).toString(2);
    if (i < str.length - 1) {
      output += ' ';
    }
  }
  return output;
};