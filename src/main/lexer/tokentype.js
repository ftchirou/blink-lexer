import Dict from './Dict'

export const Operators = new Dict({
    // Dispatch operators
    Dot: '.',
    // Assignment operators
    LeftArrow: '<-',
    DivEqual: '/=',
    Equal: '=',
    MinusEqual: '-=',
    ModuloEqual: '%=',
    PlusEqual: '+=',
    RightArrow: '->',
    TimesEqual: '*=',
    // Arithmetic operators
    Div: '/',
    Modulo: '%',
    Minus: '-',
    Plus: '+',
    Times: '*',
    // Comparison operators
    DoubleEqual: '==',
    Greater: '>',
    GreaterOrEqual: '>=',
    Less: '<',
    LessOrEqual: '<=',
    NotEqual: '!=',
    // Boolean operators
    And: '&&',
    Not: '!',
    Or: '||',
    // Other operators
    Tilde: '~',
    TildeEqual: '~=',
    Dollar: '$',
    DollarEqual: '$=',
    Caret: '^',
    CaretEqual: '^=',
});

export const Delimiters = new Dict({
    // Delimiters
    Colon: ':',
    Comma: ',',
    LeftBrace: '{',
    LeftBracket: '[',
    LeftParen: '(',
    Newline: '\n',
    RightBrace: '}',
    RightBracket: ']',
    RightParen: ')',
});

export const Keywords = new Dict({
    // Keywords
    Abstract: 'abstract',
    As: 'as',
    Class: 'class',
    Else: 'else',
    Extends: 'extends',
    False: 'false',
    Final: 'final',
    Func: 'func',
    For: 'for',
    If: 'if',
    In: 'in',
    Lazy: 'lazy',
    Let: 'let',
    New: 'new',
    Null: 'null',
    Override: 'override',
    Private: 'private',
    Protected: 'protected',
    Return: 'return',
    Super: 'super',
    To: 'to',
    This: 'this',
    True: 'true',
    Var: 'var',
    While: 'while',
});

export const TokenType = Object.assign(
    {},
    Operators.object,
    Delimiters.object,
    Keywords.object,
    {


        // Identifier and Literals
        Identifier: 'identifier',
        Integer: 'integer',
        Decimal: 'decimal',
        String: 'string',

        // Special token types
        EndOfInput: 'EndOfInput',
        Unrecognized: 'Unrecognized'
    });
