export const problems = [
  {
    id: "single-number",
    title: "Single Number",
    description: "Given a non-empty array of integers where every element appears twice except for one, find that single one.",
    difficulty: "Easy",
    examples: [
      { input: "[2,2,1]", output: "1" },
      { input: "[4,1,2,1,2]", output: "4" }
    ],
    testcases: [
      { input: "[1]", expected_output: "1" },
      { input: "[1,3,1,3,2]", expected_output: "2" }
    ]
  },
  {
    id: "happy-number",
    title: "Happy Number",
    description: "Determine if a number is happy (replacing the number by the sum of the squares of its digits eventually reaches 1).",
    difficulty: "Easy",
    examples: [
      { input: "19", output: "true" } // 1² + 9² = 82 → 8² + 2² = 68 → 6² + 8² = 100 → 1² + 0² + 0² = 1
    ],
    testcases: [
      { input: "2", expected_output: "false" },
      { input: "7", expected_output: "true" }
    ]
  },
  {
    id: "maximum-subarray",
    title: "Maximum Subarray",
    description: "Find the contiguous subarray with the largest sum.",
    difficulty: "Easy",
    examples: [
      { input: "[-2,1,-3,4,-1,2,1,-5,4]", output: "6" } // [4,-1,2,1]
    ],
    testcases: [
      { input: "[1]", expected_output: "1" },
      { input: "[5,4,-1,7,8]", expected_output: "23" }
    ]
  },
  {
    id: "move-zeroes",
    title: "Move Zeroes",
    description: "Move all zeroes to the end of the array while maintaining the relative order of non-zero elements.",
    difficulty: "Easy",
    examples: [
      { input: "[0,1,0,3,12]", output: "[1,3,12,0,0]" }
    ],
    testcases: [
      { input: "[0]", expected_output: "[0]" },
      { input: "[1,0,2,0,3]", expected_output: "[1,2,3,0,0]" }
    ]
  },
  {
    id: "symmetric-tree",
    title: "Symmetric Tree",
    description: "Check if a binary tree is a mirror of itself.",
    difficulty: "Easy",
    examples: [
      { input: "[1,2,2,3,4,4,3]", output: "true" }
    ],
    testcases: [
      { input: "[1,2,2,null,3,null,3]", expected_output: "false" },
      { input: "[]", expected_output: "true" }
    ]
  },
  {
    id: "missing-number",
    title: "Missing Number",
    description: "Find the missing number in an array containing n distinct numbers from 0 to n.",
    difficulty: "Easy",
    examples: [
      { input: "[3,0,1]", output: "2" }
    ],
    testcases: [
      { input: "[0,1]", expected_output: "2" },
      { input: "[9,6,4,2,3,5,7,0,1]", expected_output: "8" }
    ]
  },
  {
    id: "find-all-duplicates-in-an-array",
    title: "Find All Duplicates in an Array",
    description: "Return an array of all duplicates in an array where elements are between 1 and n (inclusive).",
    difficulty: "Medium",
    examples: [
      { input: "[4,3,2,7,8,2,3,1]", output: "[2,3]" }
    ],
    testcases: [
      { input: "[1,1,2]", expected_output: "[1]" },
      { input: "[1]", expected_output: "[]" }
    ]
  },
  {
    id: "longest-consecutive-sequence",
    title: "Longest Consecutive Sequence",
    description: "Find the length of the longest consecutive elements sequence in an unsorted array.",
    difficulty: "Medium",
    examples: [
      { input: "[100,4,200,1,3,2]", output: "4" } // 1, 2, 3, 4
    ],
    testcases: [
      { input: "[0,0]", expected_output: "1" },
      { input: "[1,3,5,7]", expected_output: "1" }
    ]
  },
  {
    id: "word-search",
    title: "Word Search",
    description: "Given a 2D board and a word, determine if the word exists by moving adjacent horizontally or vertically.",
    difficulty: "Medium",
    examples: [
      { input: `[["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]],"ABCCED"`, output: "true" }
    ],
    testcases: [
      { input: `[["a","b"],["c","d"]],"abcd"`, expected_output: "false" },
      { input: `[["A"]],"A"`, expected_output: "true" }
    ]
  },
  {
    id: "subarray-sum-equals-k",
    title: "Subarray Sum Equals K",
    description: "Find the total number of continuous subarrays whose sum equals to k.",
    difficulty: "Medium",
    examples: [
      { input: "[1,1,1],2", output: "2" } // [1,1] and [1,1] (indices 0-1 and 1-2)
    ],
    testcases: [
      { input: "[1,2,3],3", expected_output: "2" },
      { input: "[1],1", expected_output: "1" }
    ]
  },
  {
    id: "palindrome-partitioning",
    title: "Palindrome Partitioning",
    description: "Partition a string such that every substring is a palindrome.",
    difficulty: "Medium",
    examples: [
      { input: `"aab"`, output: `[["a","a","b"],["aa","b"]]` }
    ],
    testcases: [
      { input: `"a"`, expected_output: `[["a"]]` },
      { input: `"ab"`, expected_output: `[["a","b"]]` }
    ]
  },
  {
    id: "queue-reconstruction-by-height",
    title: "Queue Reconstruction by Height",
    description: "Reconstruct a queue based on people's height and the number of people taller in front.",
    difficulty: "Medium",
    examples: [
      { input: "[[7,0],[4,4],[7,1],[5,0],[6,1],[5,2]]", output: "[[5,0],[7,0],[5,2],[6,1],[4,4],[7,1]]" }
    ],
    testcases: [
      { input: "[[6,0],[5,0],[4,0]]", expected_output: "[[4,0],[5,0],[6,0]]" },
      { input: "[[1,0]]", expected_output: "[[1,0]]" }
    ]
  },
  {
    id: "task-scheduler",
    title: "Task Scheduler",
    description: "Given tasks and a cooldown period, find the least number of intervals to complete all tasks.",
    difficulty: "Medium",
    examples: [
      { input: `["A","A","A","B","B","B"],2`, output: "8" } // A -> B -> idle -> A -> B -> idle -> A -> B
    ],
    testcases: [
      { input: `["A","A","A","A","A","B","B","B"],2`, expected_output: "10" },
      { input: `["A","B","C","D"],2`, expected_output: "4" }
    ]
  },
  {
    id: "minimum-window-substring",
    title: "Minimum Window Substring",
    description: "Find the smallest substring in s that contains all characters of t.",
    difficulty: "Hard",
    examples: [
      { input: `"ADOBECODEBANC","ABC"`, output: `"BANC"` }
    ],
    testcases: [
      { input: `"a","a"`, expected_output: `"a"` },
      { input: `"a","aa"`, expected_output: `""` }
    ]
  },
  {
    id: "edit-distance",
    title: "Edit Distance",
    description: "Find the minimum number of operations (insert, delete, replace) to convert word1 to word2.",
    difficulty: "Hard",
    examples: [
      { input: `"horse","ros"`, output: "3" } // horse -> rorse -> rose -> ros
    ],
    testcases: [
      { input: `"intention","execution"`, expected_output: "5" },
      { input: `"","a"`, expected_output: "1" }
    ]
  },
  {
    id: "largest-rectangle-in-histogram",
    title: "Largest Rectangle in Histogram",
    description: "Find the largest rectangle area under a histogram.",
    difficulty: "Hard",
    examples: [
      { input: "[2,1,5,6,2,3]", output: "10" } // 5 and 6 (width 2, height 5)
    ],
    testcases: [
      { input: "[2,4]", expected_output: "4" },
      { input: "[1]", expected_output: "1" }
    ]
  },
  {
    id: "maximal-rectangle",
    title: "Maximal Rectangle",
    description: "Find the largest rectangle containing only 1's in a binary matrix.",
    difficulty: "Hard",
    examples: [
      { input: `[["1","0","1","0","0"],["1","0","1","1","1"],["1","1","1","1","1"],["1","0","0","1","0"]]`, output: "6" }
    ],
    testcases: [
      { input: `[["0"]]`, expected_output: "0" },
      { input: `[["1"]]`, expected_output: "1" }
    ]
  },
  {
    id: "best-time-to-buy-and-sell-stock-iv",
    title: "Best Time to Buy and Sell Stock IV",
    description: "Find the maximum profit with at most k transactions.",
    difficulty: "Hard",
    examples: [
      { input: "2,[3,2,6,5,0,3]", output: "7" } // Buy 2, sell 6; buy 0, sell 3
    ],
    testcases: [
      { input: "2,[1,2,4]", expected_output: "3" },
      { input: "1,[1,2]", expected_output: "1" }
    ]
  },
  {
    id: "shortest-palindrome",
    title: "Shortest Palindrome",
    description: "Transform a string into a palindrome by adding characters in front.",
    difficulty: "Hard",
    examples: [
      { input: `"aacecaaa"`, output: `"aaacecaaa"` }
    ],
    testcases: [
      { input: `"abcd"`, expected_output: `"dcbabcd"` },
      { input: `"a"`, expected_output: `"a"` }
    ]
  },
  {
    id: "alien-dictionary-ii",
    title: "Alien Dictionary II",
    description: "Given a list of words in an alien language, return its character order (if valid).",
    difficulty: "Hard",
    examples: [
      { input: `["wrt","wrf","er","ett","rftt"]`, output: `"wertf"` }
    ],
    testcases: [
      { input: `["z","x","z"]`, expected_output: `""` },
      { input: `["z","z"]`, expected_output: `"z"` }
    ]
  }
];