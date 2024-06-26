const {clampToRange} = require('./index')



const testCases = [
    [0.1, 1],
    ['not a number', 1],
    [10, 5],
    ['19', 5],
    [4, 4],
    ['3', 3],
    [5, 5],
    [1, 1],
    [4,4],
    [2,2],
    [3,3],
    [2.2,1]
  ];

  test.each(testCases)(
    'when input is %p, should return %p',
    (input, expected) => {
      expect(clampToRange(input)).toEqual(expected);
    }
  );
