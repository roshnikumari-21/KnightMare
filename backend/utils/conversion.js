// const board = [
//     ["B:R", "B:N", "B:B", "B:Q", "B:K", "B:B", "B:N", "B:R"],
//     ["B:P", "B:P", "B:P", "B:P", "B:P", "B:P", "B:P", "B:P"],
//     [0, 0, 0, 0, 0, 0, 0, 0],
//     [0, 0, 0, 0, 0, 0, 0, 0],
//     [0, 0, 0, 0, 0, 0, 0, 0],
//     [0, 0, 0, 0, 0, 0, 0, 0],
//     ["W:P", "W:P", "W:P", "W:P", "W:P", "W:P", "W:P", "W:P"],
//     ["W:R", "W:N", "W:B", "W:Q", "W:K", "W:B", "W:N", "W:R"]
// ]
export const convention = {
    "B:R": "r",
    "B:N": "n",
    "B:B": "b",
    "B:Q": "q",
    "B:K": "k",
    "B:P": "p",
    "W:R": "R",
    "W:N": "N",
    "W:B": "B",
    "W:Q": "Q",
    "W:K": "K",
    "W:P": "P",
    "r": "B:R",
    "n": "B:N",
    "b": "B:B",
    "q": "B:Q",
    "k": "B:K",
    "p": "B:P",
    "R": "W:R",
    "N": "W:N",
    "B": "W:B",
    "Q": "W:Q",
    "K": "W:K",
    "P": "W:P"
}
export const toFen = (board) =>{
    let fen = "";
    for(row of board){
        for(let i = 0; i < row.length; i++){
            let piece = row[i];
            if (piece != 0) fen += convention[piece]
            else{
                let count = 0;
                while(i < row.length && row[i] == 0){
                    count++;
                    i++;
                }
                fen += count;
                i--;
            }
        }
        fen += "/";
    }
    return fen.substring(0, fen.length - 1);
}

// const fenvalue = toFen(board);

export const fromFen = (fen) => {
    let board = [];
    let rows = fen.split("/");
    for(let row of rows){
        let newRow = [];
        for(char of row){
            if (isNaN(char)){
                newRow.push(convention[char]);
            }
            else{
                for(let i = 0; i < parseInt(char); i++){
                    newRow.push(0);
                }
            }
        }
        board.push(newRow);
    }
    return board;
}

// console.log(fromFen(fenvalue));