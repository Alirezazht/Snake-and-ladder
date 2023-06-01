var i = 0;
var text = "Snake And Ladders Game Developed by Alireza_j";
var speed=50;
function mytext(){
    if (i<text.length){
        document.getElementById("type").innerHTML += text.charAt(i)
        i++;
        setTimeout(mytext,speed)
    }
}



// craete players
var players = [{
  name:"Alireza",
  position: 0,
  color: "black"
},{
  name:"Sami",
  position: 0,
  color: "Blue"
}];


// Ladders
const ladders = [{
  start:  Math.floor(Math.random() * 100 + 1),
  end:  Math.floor(Math.random() * 100 + 1)
},{
  start: Math.floor(Math.random() * 100 + 1),
  end: Math.floor(Math.random() * 100 + 1)
},{
  start: Math.floor(Math.random() * 100 + 1),
  end: Math.floor(Math.random() * 100 + 1)
},{
  start: Math.floor(Math.random() * 100 + 1),
  end: Math.floor(Math.random() * 100 + 1)
},{
  start: Math.floor(Math.random() * 100 + 1),
  end: Math.floor(Math.random() * 100 + 1)
}];


let currentPlayerTurn = 0;

var width = 10;
var height = 10;
var board = [];
var position = 0;
var blackSquare = false;



var hasWon = false;
window.rollDice = ()=>{
  if (hasWon) {
    return;
  }
// roll dice
  var roll = Math.ceil(Math.random() * 6);


  var currentPlayer = players[currentPlayerTurn];
  currentPlayer.position += roll;
  ladders.forEach(ladder=>{
    if (ladder.start === currentPlayer.position) {
      currentPlayer.position = ladder.end;
    }
  });
  
  if (currentPlayer.position === position) {
    hasWon = true;
  }
  if (currentPlayer.position === position) {
    var diff = currentPlayer.position - position;
    currentPlayerPosition = position - diff;
  }
  
  currentPlayerTurn ++;
  if (currentPlayerTurn >= players.length) {
    currentPlayerTurn = 0;
  }
  renderBoard();
}

for (var y = height; y >= 0; y--) {
  var row = [];
  
  board.push(row);
  for (var x = 0; x < width; x++) {
    
    row.push({x,y,occupied:null,position,color: blackSquare ? "orange" : "red"});
    blackSquare = !blackSquare;
    position ++;
  }
}

const boardSizeConst = 50;
const renderBoard = ()=>{
  let boardHTML = ``;
  board.forEach(row=>{
    row.forEach(square=>{
      boardHTML += `<div class=square style="top:${square.y * boardSizeConst}px; left:${square.x * boardSizeConst}px; background-color:${square.color}"></div>`
    });
  });
  
  players.forEach(player=>{
    let square = null;
    board.forEach(row=>{
    row.forEach(square=>{
          if (square.position === player.position) {
            boardHTML += `<div class=player style="top:${square.y * boardSizeConst + 5}px; left:${square.x * boardSizeConst + 5}px;background-color:${player.color}"></div>`;
          }
      });
    });
  });
  
  ladders.forEach(ladder=>{
    
    let startPos = {x:0,y:0};
    let endPos = {x:0,y:0};
    
    board.forEach(row=>{
      row.forEach(square=>{
        if (square.position === ladder.start) {
          startPos.x = square.x * boardSizeConst;
          startPos.y = square.y * boardSizeConst;
        }
        
        if (square.position === ladder.end) {
          endPos.x = square.x * boardSizeConst;
          endPos.y = square.y * boardSizeConst;
        }
      });
    });
    
    const isLadder = ladder.end > ladder.start;
    
    drawLine({color : isLadder ? "yellow" : "yellow",startPos,endPos});
  });
  document.getElementById("board").innerHTML = boardHTML;
}

function drawLine({color,startPos,endPos}){
  
  var c = document.getElementById("canvas");
  var ctx= c.getContext("2d");
  ctx.beginPath();
  ctx.moveTo(startPos.x + 25 , startPos.y + 25);
  ctx.lineTo(endPos.x + 25 , endPos.y + 25 ,fill=color);
 
  ctx.lineWidth = 15;
  ctx.strokeStyle = color;
  ctx.stroke();
}


        
renderBoard();

