function FindKing(board, color) {
    for (let x = 0; x < 8; x++) {
        for (let y = 0; y < 8; y++) {
            const piece = board[x][y].piece;
            if (piece && piece.type === 'king' && piece.color === color) {
                return {row: x, col: y};
            }
        }
    }
    return null;
}

export default FindKing