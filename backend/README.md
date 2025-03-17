# Chess Piece Movement Functions

## Overview
This module provides functions to determine the possible moves of chess pieces on an 8x8 board. The board follows a coordinate system where:
- **(0,0) is the top-left corner**
- **x represents the row number, y represents the column number**
- **Lowercase letters represent black pieces, uppercase letters represent white pieces**
- **"0" represents an empty square**

## Functionality
Each function determines possible moves for a specific chess piece at a given position. It returns:
1. **Valid moves**: Squares where the piece can legally move.
2. **Capturable pieces**: Squares containing an opponent's piece that can be captured.

## Functions

### `isLowercase(piece: string) => boolean`
Checks if a given piece is a black piece.

#### Parameters:
- `piece: string` - The piece character.

#### Returns:
- `boolean` - `true` if the piece is lowercase (black), `false` otherwise.

---

### `rookMoves(board: string[][], pos: [number, number]) => [[number, number][], [number, number][]]`
Determines the valid moves and capture positions for a rook.

#### Parameters:
- `board: string[][]` - 8x8 chessboard representation.
- `pos: [number, number]` - Position `[x, y]` of the rook.

#### Returns:
- `possibleMoves: [number, number][]` - List of valid move positions.
- `cutpieces: [number, number][]` - List of capturable enemy pieces.

---

### `knightMoves(board: string[][], pos: [number, number]) => [[number, number][], [number, number][]]`
Determines the valid moves and capture positions for a knight.

#### Parameters:
- `board: string[][]`
- `pos: [number, number]`

#### Returns:
- `possibleMoves: [number, number][]`
- `cutpieces: [number, number][]`

---

### `bishopMoves(board: string[][], pos: [number, number]) => [[number, number][], [number, number][]]`
Determines the valid moves and capture positions for a bishop.

---

### `queenMoves(board: string[][], pos: [number, number]) => [[number, number][], [number, number][]]`
Determines the valid moves and capture positions for a queen.

---

### `kingMoves(board: string[][], pos: [number, number]) => [[number, number][], [number, number][]]`
Determines the valid moves and capture positions for a king.

---

### `pawnMoves(board: string[][], pos: [number, number]) => [[number, number][], [number, number][]]`
Determines the valid moves and capture positions for a pawn.

Special rules for pawns:
- Can move forward by 1 square if the destination is empty.
- Can move forward by 2 squares from the starting row.
- Can capture diagonally.
- En passant is not implemented.

---

### `nextPossibleMoves(board: string[][], pos: [number, number]) => [[number, number][], [number, number][]]`
Determines the possible moves for any given piece on the board.

#### Parameters:
- `board: string[][]` - 8x8 chessboard.
- `pos: [number, number]` - Position of the piece.

#### Returns:
- `possibleMoves: [number, number][]` - Possible movement positions.
- `cutpieces: [number, number][]` - Positions where an enemy piece can be captured.

## Example Usage
```javascript
const board = [
  ["R", "0", "0", "0", "K", "0", "0", "R"],
  ["P", "P", "P", "P", "P", "P", "P", "P"],
  ["0", "0", "0", "0", "0", "0", "0", "0"],
  ["0", "0", "0", "0", "0", "0", "0", "0"],
  ["0", "0", "0", "0", "0", "0", "0", "0"],
  ["0", "0", "0", "0", "0", "0", "0", "0"],
  ["p", "p", "p", "p", "p", "p", "p", "p"],
  ["r", "0", "0", "0", "k", "0", "0", "r"]
];

console.log(nextPossibleMoves(board, [0, 0])); // Rook moves
console.log(nextPossibleMoves(board, [1, 0])); // Pawn moves
```

## Notes
- The board should always be an 8x8 matrix.
- Pieces should be represented by their standard chess notation (lowercase for black, uppercase for white).
- Ensure correct indexing for `pos` values (0 ≤ x, y ≤ 7).

