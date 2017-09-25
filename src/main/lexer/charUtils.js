export const isDigit = x => /[0-9]+/.test(x)
export const isLetter = x => /[a-z]+/i.test(x)
export const isOperator = x => /[+-*\/]+/i.test(x)
export const isWhitespaceOrNewLine = x => /[ \n]/.test(x)
export const isNewLine = x => x === '\n'