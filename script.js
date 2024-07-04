var playerRed="R";
var playerGreen="G";
var currPlayer=playerRed;

var gameOver=false;
var board;
var currcolumns;

var rows=6;
var columns=7;

window.onload=function(){
    resetGame();
}

function resetGame(){
    board=[];
    currcolumns=[5, 5, 5, 5, 5, 5, 5];
    for(let r=0;r<6;r++){
        let row = [];
        for(let c=0;c<7;c++){
            row.push(' ');
            let tile=document.createElement("div");
            tile.id=r.toString()+","+c.toString();
            tile.classList.add('tile');
            document.getElementById("board").append(tile);
            tile.addEventListener("click", setPiece);
        }
        board.push(row);
    }
}

function setPiece(){
    if(gameOver)
        return;
    let coords=this.id.split(",");
    let r=parseInt(coords[0]);
    let c=parseInt(coords[1]);
    r= currcolumns[c];
    if(r<0)
        return ;
    board[r][c]=currPlayer;
    let tile=document.getElementById(r.toString()+","+c.toString());
    if(currPlayer==playerRed){
        tile.classList.add("red");
        currPlayer=playerGreen;
    }
    else{
        tile.classList.add("green");
        currPlayer=playerRed;
    }

    r-=1;
    currcolumns[c]=r;

    checkWinner();
}

function checkWinner(){
    for(let r=0;r<rows;r++){
        for(let c=0;c<columns-3;c++){
            if(board[r][c] != ' '){
                if(board[r][c]==board[r][c+1] && board[r][c+1]==board[r][c+2] && board[r][c+2]==board[r][c+3]){
                    setWinner(r, c);
                    return;
                }
            }
        }
    }

    for(let c=0;c<columns;c++){
        for(let r=0;r<rows-3;r++){
            if(board[r][c] != ' '){
                if(board[r][c]==board[r+1][c] && board[r+1][c]==board[r+2][c] && board[r+2][c]==board[r+3][c]){
                    setWinner(r, c);
                    return;
                }
            }
        }
    }

    for(let r=0;r<rows-3;r++){
        for(let c=0;c<columns-3;c++){
            if(board[r][c] != ' '){
                if(board[r][c]==board[r+1][c+1] && board[r+1][c+1]==board[r+2][c+2] && board[r+2][c+2]==board[r+3][c+3]){
                    setWinner(r, c);
                    return;
                }
            }
        }
    }
    for(let r=3;r<rows;r++){
        for(let c=0;c<columns-3;c++){
            if(board[r][c] != ' '){
                if(board[r][c]==board[r-1][c+1] && board[r-1][c+1]==board[r-2][c+2] && board[r-2][c+2]==board[r-3][c+3]){
                    setWinner(r, c);
                    return;
                }
            }
        }
    }
}

function setWinner(r, c){
    let winner=document.getElementById("winner");
    if(board[r][c]==playerRed){
        winner.innerText="Red Wins";
    }else{
        winner.innerText="Green Wins";
    }

    gameOver=true;
}