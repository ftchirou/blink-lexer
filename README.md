# LBPL Challenge 1: Build a lexer for Blink

Welcome to the first challenge in the [Let's Build a Programming Language series](https://hackernoon.com/lets-build-a-programming-language-2612349105c6). The goal of this challenge is to write a lexer for [Blink](https://hackernoon.com/lets-build-a-programming-language-2612349105c6#cc94).

## How to setup
Start by [forking](https://help.github.com/articles/fork-a-repo/) this repository to your own Github account.

Once the project is forked, make sure that you have the latest version of [Node.js](https://nodejs.org/en/) installed and run the following commands in a command line prompt to setup the challenge.

1. ```$ git clone https://github.com/<replace_with_your_github_username>/blink-lexer.git```
2. ```$ cd blink-lexer```
3. ```$ npm install```

## How to complete the challenge
The goal of this challenge is to write a lexer for Blink in [JavaScript (ES6)](http://es6-features.org/). For that purpose, in the [src/main/lexer](src/main/lexer) directory, you have been provided with a `Token` class, a `TokenType` enumeration, a basic skeleton for the `Lexer` class, as well as a test file in [src/test/lexer/lexer-test.js](src/test/lexer/lexer-test.js). Your job is to make all the tests pass by completing the `Lexer` class.

### Your starting point ...

- [tokentype.js](src/main/lexer/tokentype.js) contains all the types of token available in Blink.
- [token.js](src/main/lexer/token.js) contains a simple `Token` class.
- [lexer.js](src/main/lexer/lexer.js) contains a skeleton for a `Lexer` class with a empty `nextToken()` method. This is the file where all of your changes should be made.
- [lexer-test.js](src/test/lexer/lexer-test.js) contains the unit tests validating that your implementation of the `Lexer` class works as expected.
- [lexical-grammar.txt](lexical-grammar.txt) contains the regular expressions describing valid Blink lexemes. This will serve as guide when implementing the `nextToken()` method in the `Lexer` class.
- [A tour of Blink](https://hackernoon.com/lets-build-a-programming-language-2612349105c6#1d67). An overview of all the features in Blink.

### How to run the tests

Whenever you're ready to test your code

1. run `npm run build` at the root of the project to build
2. and `npm run test` to run the tests

## Reporting bugs and Suggestions
Please create a Github [issue](https://github.com/ftchirou/blink-lexer/issues) if you found something that needs to be fixed on this project or if you have a suggestion to improve it.

## Support and Help
Feel free to ping me on Twitter [@ftchirou](https://twitter.com/ftchirou) if you have any question or need a clarification while completing this challenge.

Have fun. 🙌
