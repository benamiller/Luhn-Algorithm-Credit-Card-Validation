// All valid credit card numbers
const valid1 = [4, 5, 3, 9, 6, 7, 7, 9, 0, 8, 0, 1, 6, 8, 0, 8];
const valid2 = [5, 5, 3, 5, 7, 6, 6, 7, 6, 8, 7, 5, 1, 4, 3, 9];
const valid3 = [3, 7, 1, 6, 1, 2, 0, 1, 9, 9, 8, 5, 2, 3, 6];
const valid4 = [6, 0, 1, 1, 1, 4, 4, 3, 4, 0, 6, 8, 2, 9, 0, 5];
const valid5 = [4, 5, 3, 9, 4, 0, 4, 9, 6, 7, 8, 6, 9, 6, 6, 6];

// All invalid credit card numbers
const invalid1 = [4, 5, 3, 2, 7, 7, 8, 7, 7, 1, 0, 9, 1, 7, 9, 5];
const invalid2 = [5, 7, 9, 5, 5, 9, 3, 3, 9, 2, 1, 3, 4, 6, 4, 3];
const invalid3 = [3, 7, 5, 7, 9, 6, 0, 8, 4, 4, 5, 9, 9, 1, 4];
const invalid4 = [6, 0, 1, 1, 1, 2, 7, 9, 6, 1, 7, 7, 7, 9, 3, 5];
const invalid5 = [5, 3, 8, 2, 0, 1, 9, 7, 7, 2, 8, 8, 3, 8, 5, 4];

// Can be either valid or invalid
const mystery1 = [3, 4, 4, 8, 0, 1, 9, 6, 8, 3, 0, 5, 4, 1, 4];
const mystery2 = [5, 4, 6, 6, 1, 0, 0, 8, 6, 1, 6, 2, 0, 2, 3, 9];
const mystery3 = [6, 0, 1, 1, 3, 7, 7, 0, 2, 0, 9, 6, 2, 6, 5, 6, 2, 0, 3];
const mystery4 = [4, 9, 2, 9, 8, 7, 7, 1, 6, 9, 2, 1, 7, 0, 9, 3];
const mystery5 = [4, 9, 1, 3, 5, 4, 0, 4, 6, 3, 0, 7, 2, 5, 2, 3];

// An array of all the arrays above
const batch = [valid1, valid2, valid3, valid4, valid5, invalid1, invalid2, invalid3, invalid4, invalid5, mystery1, mystery2, mystery3, mystery4, mystery5];


// Checks if credit card number is valid according to
// the Luhn algorithm
// Parameters (1): array of integers that make up a credit card number
// Returns: a boolean, whether or not the credit card number is valid
const validateCred = (array) => {
  let sum = 0;
  let oddEven = 1;
  let newArray = array.slice().reverse();
  //console.log(newArray);
  let check = newArray[0];
  for (let i = 1; i < newArray.length; i++) {
    if (oddEven === 0) {
      sum += newArray[i];
      oddEven = 1;
    } else {
      let addToSum = newArray[i] * 2;
      oddEven = 0;
      if (addToSum > 9) {
        sum += addToSum - 9;
      } else {
        sum += addToSum;
      }
    }
  }
  sum += check;
  //console.log(sum);
  return sum % 10 === 0 || sum === 0 ? true : false;
}

// Passed a nested array of credit card numbers, 
// returns a list of invalid cards
// Parameters: array of arrays of credit card integers
// Returns: array of invalid credit card numbers
const findInvalidCards = (nestedArray) => {
  let resultArray = [];
  for (let i = 0; i < nestedArray.length; i++) {
    if (validateCred(nestedArray[i])) {
      resultArray.push(nestedArray[i]);
    }
  }
  return resultArray;
}

//console.log(findInvalidCards(batch));

// Passed an array of invalid credit card numbers,
// returns an array of companies that issued those cards
// Parameters: an array of arrays of invalid credit card numbers
// Returns: companies which produced invalid cards.
const idInvalidCardCompanies = (nestedArray) => {
  let result = [];
  for (let i = 0; i < nestedArray.length; i++) {
    let sequence = nestedArray[i];
    //console.log(sequence);
    //console.log(sequence[0]);
    switch (sequence[0]) {
      case 3:
        if (!result.includes('Amex (American Express)')) {
          result.push('Amex (American Express)');
        }
        break;
      case 4:
        if (!result.includes('Visa')) {
          result.push('Visa');
        }
        //console.log('HERE');
        break;
      case 5:
        if (!result.includes('Mastercard')) {
          result.push('Mastercard');
        }
        break;
      case 6:
        if (!result.includes('Discover')) {
          result.push('Discover');
        }
        break;
      default:
        console.log('Company not found');
    }
  }
  return result;
}
//console.log(idInvalidCardCompanies(findInvalidCards(batch)));


