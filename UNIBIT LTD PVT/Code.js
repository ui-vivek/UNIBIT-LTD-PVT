// Function to find pairs that sum up to the target value (4) from the given array
function Combination_For_4(target, arr) {
  arr.sort((a, b) => a - b); // Sort the array in ascending order
  let num = Number.NEGATIVE_INFINITY; // Variable to track the previous number
  let pairs = []; // Array to store the pairs

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] !== num) {
      // Check if the current number is different from the previous number
      num = arr[i]; // Update the previous number
      let num2 = Number.NEGATIVE_INFINITY; // Variable to track the previous number in the inner loop

      for (let j = i + 1; j < arr.length; j++) {
        if (num2 === arr[j]) {
          continue; // Skip the iteration if the current number is the same as the previous number in the inner loop
        }

        let sum = arr[i] + arr[j]; // Calculate the sum of the current pair
        num2 = arr[j]; // Update the previous number in the inner loop

        if (Math.abs(sum) === target) {
          pairs.push([arr[i], arr[j]]); // Push the pairs that sum up to the target value into the array
        }
      }
    }
  }

  return pairs; // Return the array of pairs
}

// Function to concatenate the pairs into a single array and sort it in ascending order
function concatenatePairs(pairs) {
  let concatenatedArray = [];

  for (let pair of pairs) {
    concatenatedArray = concatenatedArray.concat(pair); // Concatenate each pair into the array
  }

  return concatenatedArray.sort((a, b) => a - b); // Return the concatenated array sorted in ascending order
}
// Function to find combinations of numbers from the given array that sum up to the target sum (8)
function Combination_For_8(arr, targetSum) {
  let result = []; // Array to store the combinations
  let n = arr.length;

  function backtrack(tempArr, currSum, start, used) {
    if (currSum === targetSum) {
      // Sort the subarray before comparing
      let sortedArr = tempArr.slice().sort((a, b) => a - b);
      if (!isDuplicate(sortedArr)) {
        let ans = [...tempArr];
        if (ans.length === 4) {
          result.push(ans); // Push the combination into the result array if it has a length of 4
        }
      }
    } else if (currSum > targetSum) {
      return; // Stop further exploration if the current sum exceeds the target sum
    } else {
      for (let i = start; i < n; i++) {
        if (used[i]) continue; // Skip already used indices
        tempArr.push(arr[i]); // Include the current number in the combination
        used[i] = true; // Mark the current number as used
        backtrack(tempArr, currSum + arr[i], i + 1, used); // Recursively explore the next numbers
        used[i] = false; // Mark the current number as unused for other combinations
        tempArr.pop(); // Remove the current number from the combination
      }
    }
  }

  // Function to check if a combination is duplicate in the result array
  function isDuplicate(arr) {
    for (let subArr of result) {
      // Sort the existing subarray before comparing
      let sortedSubArr = subArr.slice().sort((a, b) => a - b);
      if (arraysAreEqual(sortedSubArr, arr)) {
        return true; // Return true if the combination is duplicate
      }
    }
    return false; // Return false if the combination is not duplicate
  }

  // Function to check if two arrays are equal
  function arraysAreEqual(arr1, arr2) {
    if (arr1.length !== arr2.length) {
      return false; // Return false if the arrays have different lengths
    }
    for (let i = 0; i < arr1.length; i++) {
      if (arr1[i] !== arr2[i]) {
        return false; // Return false if any corresponding elements in the arrays are different
      }
    }
    return true; // Return true if the arrays are equal
  }

  backtrack([], 0, 0, {}); // Start the backtracking process
  return result; // Return the array of combinations
}

let arr = [1, 3, 2, 2, -4, -6, -2, 8]; // Given input array
let target = 4; // Given target value

const Combination_For_4_output = Combination_For_4(target, arr);
console.log("First Combination For '4':", Combination_For_4_output);

// Merge the pairs into a single array and sort it in ascending order
let Merge_Into_a_single_Array = concatenatePairs(Combination_For_4_output);
console.log("Merge Into a single Array:", Merge_Into_a_single_Array);

let Double_Target = target * 2; // Double the target value to find combinations for 8
let Combination_For_8_output = Combination_For_8(
  Merge_Into_a_single_Array,
  Double_Target
);

console.log("Second Combination For '8':", Combination_For_8_output);
