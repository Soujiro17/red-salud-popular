/* eslint-disable prefer-template */
export function parseRUT(input) {
  const cleanInput = input.replace(/[^0-9]/g, ""); // Solo permitir números

  let numberPart;
  let checkDigit = "";

  if (cleanInput.length > 7) {
    numberPart = cleanInput.slice(0, -1);
    checkDigit = cleanInput.slice(-1);
  } else {
    numberPart = cleanInput;
  }

  let formattedNumber = "";
  while (numberPart.length > 3) {
    formattedNumber = "." + numberPart.slice(-3) + formattedNumber;
    numberPart = numberPart.slice(0, -3);
  }
  formattedNumber = numberPart + formattedNumber;

  return checkDigit ? `${formattedNumber}-${checkDigit}` : formattedNumber;
}
