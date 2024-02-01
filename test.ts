function lengthOfLIS(nums: number[]): number {
  const result = [];

  for (let i = 1; i < nums.length; i++) {
    for (let j = 0; j < i; j++) {
      const nextElm = nums[i];
      const currentElm = nums[j];
      console.log('i:', i, 'j:', j);
      console.log('nextElm', nextElm);
      console.log('currentElm:', currentElm);
      if (nextElm > currentElm) {
        result.push(nextElm);
      }
    }
  }

  const result2 = new Set(result);
  console.log(result2);
  return result2.size;
}
console.log(lengthOfLIS([10, 9, 2, 5, 3, 7, 101, 18]));
