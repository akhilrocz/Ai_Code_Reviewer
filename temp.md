AI Review
Here is the review for your sum function:

Strengths
The syntax is clean, valid JavaScript, and the function name clearly describes the intended behavior.
Issues & Suggestions
[Major] Function uses hardcoded values instead of accepting parameters
The Problem: The function hardcodes 1 + 1 and returns 2 unconditionally, regardless of how it is called.
Why it matters: A utility function like sum should be reusable across different inputs. In its current form, it cannot sum any numbers provided by the caller.
Solution 1: Accept two arguments (Simplest)
If you only need to add two numbers together:

function sum(a, b) {
return a + b;
}

// Usage:
sum(1, 1); // 2
sum(5, 10); // 15
Solution 2: Accept arbitrary numbers using rest parameters (More flexible)
If you want the function to handle any quantity of numbers (e.g., sum(1, 2, 3, 4)):

function sum(...numbers) {
return numbers.reduce((total, n) => total + n, 0);
}

// Usage:
sum(1, 1); // 2
sum(1, 2, 3, 4); // 10
sum(); // 0
Recommendation: Use Solution 1 if your use case is strictly binary addition. Go with Solution 2 if you are building a general-purpose math utility.
