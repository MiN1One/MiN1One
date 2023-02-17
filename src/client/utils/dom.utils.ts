export const getCssVariable = (varName: string, element?: any): string => {
  if (element) {
    return (typeof element === 'object' 
      ? element 
      : document.querySelector(element)
    ).style.getPropertyValue(varName);
  }
  return document.documentElement.style.getPropertyValue(varName);
};

export const setCssVariable = (
  varName: string,
  value: any,
  unit?: string,
) => {
  if (typeof value !== 'string') {
    value = value.toString();
  }
  if (unit) {
    value = value + unit;
  }
  document.documentElement.style.setProperty(varName, value);
};