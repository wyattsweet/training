# Bitwise operators in JavaScript

Bitwise treat their operands as binary numbers rather than decimal (base 10), hexadecimal (base 16) or octal (base 8) numbers.

## operators

### AND operator - `a & b`

This operator does the following:
- Converts each number to binary
- Compares each bit position in `a` to the same bit position in `b`
- returns `1` if both values are `1` otherwise it returns `0`

example: `5 & 3` would equal `1`

`5` in binary is `101`
`3` in binary is `011`
Results in----->`001`

You only get a `1` in the first position because that's where both binary numbers have a value.

### XOR `a ^ b` 

Returns a `1` where either value has a `1` in the bit position, but not both.

example: `5 ^ 3` would equal `6`


- `a | b` OR
- `~ a` NOT
- `a << b` Left shift
- `a >> b` sign-propagating right shift
- `a >>> b` zero fill right shift
