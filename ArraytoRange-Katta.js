/* ----------------from codewars.com----------------------
 solved by -------------------s3sivaram------------on 22-Jul-21--------------
Your task is to take arrays of numbers and compress them into ranges.

For example,
The numbers 5, 6, 7, 8 and 9 would be displayed as "5_9"
The number 6 would just be "6"
The numbers 3,4,5,6,9 would be "3_6,9"

Using the above system, you should write two functions:
toRange - convert an array of numbers to a range string
toArray - convert a range string back to an array

Warnings
The numbers could arrive all jumbled up so you'll need to sort them Sometimes the same number may appear
 more than once, duplicates should be discarded.

Edge cases
An empty array should become an empty string if passed to toRange and vise versa for the toArray function. 
Also, ranges of 2 digits will take the same space whether they are represented as a sequence or a range. 
I.e. "5,6,8,9".length === "5_6,8_9".length so there will be no compression, but represent them as a range
 anyway for consistency.
*/

function toRange(array) {
  // ---------------------- torange() MAIN part--------------------------

  function sanitize(array) {
    // to remove duplicate entries and sort the array in ascending order
    let uniquelist = Array.from(new Set(array));
    let sortedarray = uniquelist.sort((a, b) => a - b);
    return sortedarray;
  }

  // ----------------------

  function breakPoints(sanitizedarray) {
    //   find the breakpoints and their positions in the array
    let breakpointarray = [];
    let breakpositionarray = [];
    let breakpointer = 0;
    let len = sanitizedarray.length;
    let breakflag = false;

    for (let i = 0; i <= len; i++) {
      let splitpoints = sanitizedarray[i + 1] - sanitizedarray[i];
      if (splitpoints > 1) {
        breakpointarray.push(splitpoints);
        breakpositionarray.push(i);
        breakpointer = breakpointer + 1;
        breakflag = true;
      }
    }
    return [breakflag, breakpointarray, breakpositionarray];
  }
  // ----------------------
  function getArrayrange(array, pos1, pos2) {
    //  return a new array at the range of pos1 to pos2 of array
    let rangedarray = [];
    for (let i = pos1; i <= pos2; i++) {
      rangedarray.push(array[i]);
    }
    return rangedarray;
  }
  // ----------------------

  function chunkintoarray() {
    // chunk each range into an array

    const sanitizedarray = sanitize(array);
    const [breakflag, breakpointsarray, breakpositionarray] =
      breakPoints(sanitizedarray);
    console.log("breakflag=", breakflag);
    let startposition = 0;
    let chunkedarray = [];
    let pos1;
    let pos2;
    if (breakflag) {
      for (let i = 0; i <= breakpositionarray.length - 1; i++) {
        pos1 = startposition;
        pos2 = breakpositionarray[i];
        chunkedarray.push(getArrayrange(sanitizedarray, pos1, pos2));
        startposition = breakpositionarray[i] + 1;
        // console.log("start pos=", startposition);
      }
      if (pos2 < sanitizedarray.length - 1) {
        pos1 = pos2 + 1;
        pos2 = sanitizedarray.length - 1;
        chunkedarray.push(getArrayrange(sanitizedarray, pos1, pos2));
      }
    } else {
      // chunkedarray = [...sanitizedarray];
      chunkedarray.push(
        getArrayrange(sanitizedarray, 0, sanitizedarray.length - 1)
      );
    }
    console.log("sanitized array=", sanitizedarray);
    return chunkedarray;

    // console.log("breakposition=", breakpositionarray);
    // console.log("chunked array=", chunkedarray);
  }

  function toRangefinal(chunkedarray) {
    // convert an chunked array to a pure range array
    let result = chunkedarray.reduce((acc, chunk) => {
      return chunk.length > 1
        ? `${acc}${chunk[0]}_${chunk[chunk.length - 1]},`
        : `${acc}${chunk[0] || chunk},`;
    }, "");
    result = result.substr(0, result.length - 1);
    return result;
  }

  // ---main flow inside the torange()-----
  let chunkedarray = chunkintoarray();
  console.log("chunked array=", chunkedarray);
  let answer = toRangefinal(chunkedarray);
  return answer;
}

// -------------Main Module-------------------
let torange_sample = [
  1, 2, 2, 2, 11, 6, 9, 5, 5, 6, 7, 8, 8, 10, 15, 17, 20, 21, 22,
];
// let torange_sample = [6, 7, 8, 10, 20, 21, 22, 23];
// let torange_sample = [1, 2, 3];
// console.log(torange_sample);
console.log(toRange(torange_sample));

// -------------/Main Module-------------------
