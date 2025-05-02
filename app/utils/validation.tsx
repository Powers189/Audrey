// src/utils/validation.ts

export function isPositiveInteger(input: string): boolean {
  return /^\d+$/.test(input);
}

export function isIntegerInRange(
  input: string,
  min: number,
  max: number
): boolean {
  if (/^\d+$/.test(input)) {
    //regex for only digits submitted
    const num = parseInt(input, 10); //convert to base 10 number
    return !isNaN(num) && num >= min && num <= max; //test if between valid range
  } else {
    return false;
  }
}

export function isSingleLetter(input: string): boolean {
  return /^[a-zA-Z]$/.test(input);
}
