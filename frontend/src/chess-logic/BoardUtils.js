export function initialBoard() {
    return Array(8).fill().map((_, row) =>
        Array(8).fill().map((_, col) => {
            const isLight = (row + col) % 2 === 0;
            let piece = null;
            const color = row < 2 ? 'black' : row > 5 ? 'white' : null;

            if (row === 1 || row === 6) piece = { type: 'pawn', color };
            if (row === 0 || row === 7) {
                const pieces = ['rook', 'knight', 'bishop', 'queen', 'king', 'bishop', 'knight', 'rook'];
                piece = { type: pieces[col], color };
            }

            return {
                row,
                col,
                piece,
                isLight,
                isSelected: false,
                isLegalMove: false
            };
        })
    );
}


export function pieceSymbol(type, color) {
  let symbol = '';
  switch (type) {
    case 'king': symbol = 'k'; break;
    case 'queen': symbol = 'q'; break;
    case 'rook': symbol = 'r'; break;
    case 'bishop': symbol = 'b'; break;
    case 'knight': symbol = 'n'; break;
    case 'pawn': symbol = 'p'; break;
    default: return '';
  }
  return color === 'white' ? symbol.toUpperCase() : symbol;
}



