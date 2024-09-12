let board = [[0, 0, 0, 0],
[0, 0, 0, 0],
[0, 0, 0, 0],
[0, 0, 0, 0]];

let board_temp = [[0, 0, 0, 0],
[0, 0, 0, 0],
[0, 0, 0, 0],
[0, 0, 0, 0]]

const testPlayers = { 0: "X", 1: "O", 2: "Δ" };
const gameType = { 1: "One Game", 2: "Full Game" };
let oneOrFullGame = 1;

let testPlayer = 0;

// let valtozo;

let playerScore_X = 0;
let playerScore_O = 0;
let playerScore_Δ = 0;
let Td = 0;
let To = 0;

//kiválaszt minden olyan elemet az oldalon, amelynek cell osztálya van, ezek mind TD elemek.
const cells = document.querySelectorAll('.cell'); //összes cella osztály lista


function Gameboard(board) {
  
  console.log(" ");
  console.log(' ' + (board[0][0]) + " | " + (board[0][1]) + " | " + (board[0][2]) + " | " + (board[0][3]));
  console.log("---------------");
  console.log(' ' + (board[1][0]) + " | " + (board[1][1]) + " | " + (board[1][2]) + " | " + (board[1][3]));
  console.log("---------------");
  console.log(' ' + (board[2][0]) + " | " + (board[2][1]) + " | " + (board[2][2]) + " | " + (board[2][3]));
  console.log("---------------");
  console.log(' ' + (board[3][0]) + " | " + (board[3][1]) + " | " + (board[3][2]) + " | " + (board[3][3]));
  console.log(" ");
}

function Clearboard(board) {
  for (let i = 0; i < cells.length; i++) { //végigfut a cellaszámon 0-16
    cells[i].innerText = " "; //törli a cella tartalmát    
  }
  for (let x = 0; x < board.length; x++) {
    for (let y = 0; y < board[x].length; y++) {
      board[x][y] = " ";
    }
  }
}

const compareArrays = (a, b) => {
  return JSON.stringify(a) === JSON.stringify(b);
};

function winningPlayer(board, player) {
  let conditions, temp, winBool;
  temp = 0;
  winBool = false;
  conditions = [[board[0][0], board[0][1], board[0][2]], //horizontális
  [board[0][1], board[0][2], board[0][3]],
  [board[1][0], board[1][1], board[1][2]],
  [board[1][1], board[1][2], board[1][3]],
  [board[2][0], board[2][1], board[2][2]],
  [board[2][1], board[2][2], board[2][3]],
  [board[3][0], board[3][1], board[3][2]],
  [board[3][1], board[3][2], board[3][3]],
  [board[0][0], board[1][0], board[2][0]], //vertikális
  [board[1][0], board[2][0], board[3][0]],
  [board[0][1], board[1][1], board[2][1]],
  [board[1][1], board[2][1], board[3][1]],
  [board[0][2], board[1][2], board[2][2]],
  [board[1][2], board[2][2], board[3][2]],
  [board[0][3], board[1][3], board[2][3]],
  [board[1][3], board[2][3], board[3][3]],
  [board[0][0], board[1][1], board[2][2]],  //#diagonális 1
  [board[1][1], board[2][2], board[3][3]],
  [board[1][0], board[2][1], board[3][2]],
  [board[0][1], board[1][2], board[2][3]],
  [board[0][3], board[1][2], board[2][1]], //diagonális 2
  [board[1][2], board[2][1], board[3][0]],
  [board[0][2], board[1][1], board[2][0]],
  [board[1][3], board[2][2], board[3][1]]];  //[23]
  
  
  for (let i = 0; i < conditions.length; i++) {
  	if (compareArrays([player, " ", " "], conditions[i])) { temp = temp + 30; }
    if (compareArrays([" ", player, " "], conditions[i])) { temp = temp + 30; }
    if (compareArrays([" ", " ", player], conditions[i])) { temp = temp + 30; }
  	if (compareArrays([player, player, " "], conditions[i])) { temp = temp + 60; }
    if (compareArrays([player, " ", player], conditions[i])) { temp = temp + 60; }
    if (compareArrays([" ", player, player], conditions[i])) { temp = temp + 60; }
    if (compareArrays([player, player, player], conditions[i])) { temp = temp + 1000; winBool = true; }
  }
  return [winBool, temp];
}


function gameWon(board) {
  return (winningPlayer(board, "X")[0] || winningPlayer(board, "O")[0]) || winningPlayer(board, "Δ")[0];
}

function printResult(board) {
  if (winningPlayer(board, "X")[0]) {
    //console.log('Player has won! ' + '\n');
    playerScore_X += 1;
  } else if (winningPlayer(board, "O")[0]) {
    //console.log('AI O has won! ' + '\n');
    playerScore_O += 1
  } else if (winningPlayer(board, "Δ")[0]) {
    //console.log('AI Δ has won! ' + '\n');
    playerScore_Δ += 1
  } else {
    //console.log('The game is over with the result of Draw' + '\n');
  }
  //console.log(playerScore_X, playerScore_O, playerScore_Δ);
  document.getElementById("score_X").value = playerScore_X;
  document.getElementById("score_O").value = playerScore_O;
  document.getElementById("score_Δ").value = playerScore_Δ;
}

function blanks(board) {
  let blank = [];
  for (let x = 0; x < board.length; x++) {
    for (let y = 0; y < board[x].length; y++) {
      if (board[x][y] == " ") {
        blank.push([x, y]);
      }
    }
  }
  return blank;
}

function boardTemp(board, player) {
  for (let x = 0; x < board.length; x++) {
    for (let y = 0; y < board[x].length; y++) {
      board_temp[x][y] = board[x][y];
      if (board[x][y] === "*") {
        board_temp[x][y] = player;
      }
    }
  }
}



function boardFull(board) {
  if (blanks(board).length === 0) {
    return true;
  }
  return false;
}

function setMove(board, x, y, player) {
  board[x][y] = player;
}

function leadingEdgeCounter(playScore1, playScore2, playScore3) {
  let playEdgeDiffScore = [playScore1, playScore2, playScore3];
  playEdgeDiffScore.sort(function (a, b) { return b - a; });
  let leadingEdge = playEdgeDiffScore[0] - playEdgeDiffScore[1];
  let leader = ' ';
  if (leadingEdge > 1) {
    if (playEdgeDiffScore[0] === playScore1) {
      leader = 'X';
    } else if (playEdgeDiffScore[0] === playScore2) {
      leader = 'O';
    } else {
      leader = 'Δ';
    }
  }
  return leader;
}

function evaluate(board, searchAlgorythm) {
  let tmp_1 = winningPlayer(board, 'X');
  let tmp_2 = winningPlayer(board, 'O');
  let tmp_3 = winningPlayer(board, 'Δ');

  if (searchAlgorythm == "paranoidX") {
    //x elleni koalíció
    return tmp_1[1] - (tmp_2[1] + tmp_3[1]);
  }
  else if (searchAlgorythm == "paranoidO") {
    //O elleni koalíció
    return tmp_2[1] - (tmp_1[1] + tmp_3[1]);
  }
  else if (searchAlgorythm == "paranoidΔ") {
    //Δ elleni koalíció
    return tmp_3[1] - (tmp_1[1] + tmp_2[1]);
  }
  else if (searchAlgorythm == "maxn") {
    return ([tmp_1[1] - (tmp_2[1] + tmp_3[1]), tmp_2[1] - (tmp_1[1] + tmp_3[1]), tmp_3[1] - (tmp_1[1] + tmp_2[1])]);
  }
  else if (searchAlgorythm == "brs") {
    let tmp_X = winningPlayer(board, "X");//alap első lépés
    boardTemp(board, "O");
    let tmp_O = winningPlayer(board_temp, "O");
    boardTemp(board, "Δ");
    let tmp_Δ = winningPlayer(board_temp, "Δ");

    if (tmp_X[1] - tmp_O[1] > tmp_X[1] - tmp_Δ[1]) {
      return ([tmp_X[1] - tmp_Δ[1], "Δ"]);
    }
    else if (tmp_X[1] - tmp_O[1] < tmp_X[1] - tmp_Δ[1]) {
      return ([tmp_X[1] - tmp_O[1], "O"]);
    }
    else {
      return ([tmp_X[1] - tmp_O[1], "O"]);
    }
  }
  else if (searchAlgorythm == "offensive") {
    return ([tmp_1[1] - (tmp_2[1] + tmp_3[1]), tmp_2[1] - (tmp_1[1] + tmp_3[1]), tmp_3[1] - (tmp_1[1] + tmp_2[1])]);
  }
}

function heuristic(board, searchAlgorythm) {
  return evaluate(board, searchAlgorythm);
}

function brs(board, depth, alpha, beta, player, heuristicBool) {
  let best_score, col, moves, row, score;
  row = -1;
  col = -1;
  if (heuristicBool == true) {
    if (depth === 0 || gameWon(board) || boardFull(board)) { 
      return [row, col, heuristic(board, "brs")];
    }
  }

  best_score = (player === 'X') ? [-Infinity, ' '] : [Infinity, ' '];
  moves = blanks(board);

  let cell = "";
  for (let cells in moves) {
    cell = moves[cells];
    setMove(board, cell[0], cell[1], player);
    if (player === "X") {
      score = brs(board, depth - 1, alpha, beta, "*", true);
    }
    else if (player === "*") {
      score = brs(board, depth - 1, alpha, beta, "X", true);
    }
    setMove(board, cell[0], cell[1], " ");

    if (player === "X") {
      if (score[2][0] > best_score[0]) {
        best_score = score[2];
        row = cell[0];
        col = cell[1];
        alpha = Math.max(alpha, best_score);
        if (alpha >= beta) {
          break;
        }

      }
    } else {
      if (score[2][0] < best_score[0]) {
        best_score = score[2];
        row = cell[0];
        col = cell[1];
        beta = Math.min(beta, best_score);
        if (alpha >= beta) {
          break;
        }
      }
    }
  }
  return [row, col, best_score];
}

function paranoid(board, depth, alpha, beta, player, rootPlayer, heuristicBool) {
  let best_score, col, moves, row, score;
  row = -1;
  col = -1;
  if (heuristicBool == true) {
    if (depth === 0 || gameWon(board) || boardFull(board)) { 
      return [row, col, heuristic(board, "paranoid" + rootPlayer)];
    }
  }

  best_score = player === rootPlayer ? -Infinity : Infinity;
  moves = blanks(board);

  let cell = "";
  for (let cells in moves) {
    cell = moves[cells];
    setMove(board, cell[0], cell[1], player);
    if (player === "X") {
      score = paranoid(board, depth - 1, alpha, beta, "O", rootPlayer, true);
    }
    else if (player === "O") {
      score = paranoid(board, depth - 1, alpha, beta, "Δ", rootPlayer, true);
    }
    else if (player === "Δ") {
      score = paranoid(board, depth - 1, alpha, beta, "X", rootPlayer, true);
    }
    setMove(board, cell[0], cell[1], " ");

    if (player === rootPlayer) {
      if (score[2] > best_score) {
        best_score = score[2];
        row = cell[0];
        col = cell[1];
        alpha = Math.max(alpha, best_score);
        if (alpha >= beta) {
          break;
        }
      }
    } else {
      if (score[2] < best_score) {
        best_score = score[2];
        row = cell[0];
        col = cell[1];
        beta = Math.min(beta, best_score);
        if (alpha >= beta) {
          break;
        }
      }
    }
  }
  return [row, col, best_score];
}

function maxn(board, depth, player, heuristicBool) {
  let best_score, col, moves, row, score;
  row = -1;
  col = -1;
  if (heuristicBool == true) {
    if (depth === 0 || gameWon(board) || boardFull(board)) { 
      return [row, col, heuristic(board, "maxn")];
    }
  }

  best_score = [-Infinity, -Infinity, -Infinity];
  moves = blanks(board);

  let cell = "";
  for (let cells in moves) {
    cell = moves[cells];
    setMove(board, cell[0], cell[1], player);
    if (player === "X") {
      score = maxn(board, depth - 1, "O", true);
    }
    else if (player === "O") {
      score = maxn(board, depth - 1, "Δ", true);
    }
    else if (player === "Δ") {
      score = maxn(board, depth - 1, "X", true);
    }
    setMove(board, cell[0], cell[1], " ");

    if (player === "X") {
      if (score[2][0] > best_score[0]) {
        best_score = score[2];
        row = cell[0];
        col = cell[1];
         if (best_score[0] >= 900) {
           break;
         } 

      }
    } else if (player === "O") {
      if (score[2][1] > best_score[1]) {
        best_score = score[2];
        row = cell[0];
        col = cell[1];
         if (best_score[1] >= 900) {
           break;
         }
      }
    } else {
      if (score[2][2] > best_score[2]) {
        best_score = score[2];
        row = cell[0];
        col = cell[1];
         if (best_score[2] >= 900) {
           break;
         }
      }
    }
  }
  return [row, col, best_score];
}

function offensive(board, depth, player, rootPlayer, leader, heuristicBool) {
  let best_score, col, moves, row, score;
  row = -1;
  col = -1;
  if (heuristicBool == true) {
    if (depth === 0 || gameWon(board) || boardFull(board)) { 
      return [row, col, heuristic(board, "offensive")];
    }
  }

  best_score = [-Infinity, -Infinity, -Infinity];
  moves = blanks(board);

  let cell = "";
  for (let cells in moves) {
    cell = moves[cells];
    setMove(board, cell[0], cell[1], player);
    if (player === "X") {
      score = maxn(board, depth - 1, "O", rootPlayer, leader, true);
    }
    else if (player === "O") {
      score = maxn(board, depth - 1, "Δ", rootPlayer, leader, true);
    }
    else if (player === "Δ") {
      score = maxn(board, depth - 1, "X", rootPlayer, leader, true);
    }
    setMove(board, cell[0], cell[1], " ");

    if (player === rootPlayer && leader === "X" && rootPlayer !== leader) {
      if (best_score[0] == -Infinity) {
        best_score[0] = Infinity;
      }
      if (score[2][0] < best_score[0]) {
        best_score = score[2];
        row = cell[0];
        col = cell[1];
        /* if(best_score[0] >= 900){
                    break;
        }  */

      }
    } else if (player === rootPlayer && leader === "O" && rootPlayer !== leader) {
      if (best_score[1] == -Infinity) {
        best_score[1] = Infinity;
      }
      if (score[2][1] < best_score[1]) {
        best_score = score[2];
        row = cell[0];
        col = cell[1];
        /* if(best_score[1] >= 900){
                    break;
        }  */
      }
    } else if (player === rootPlayer && leader === "Δ" && rootPlayer !== leader) {
      if (best_score[2] == -Infinity) {
        best_score[2] = Infinity;
      }
      if (score[2][2] < best_score[2]) {
        best_score = score[2];
        row = cell[0];
        col = cell[1];
        /* if(best_score[1] >= 900){
                    break;
        }  */
      }
    } else if (player !== rootPlayer && player === "X") {
      if (score[2][0] > best_score[0]) {
        best_score = score[2]
        row = cell[0]
        col = cell[1]
      }
    } else if (player !== rootPlayer && player === "O") {
      if (score[2][1] > best_score[1]) {
        best_score = score[2]
        row = cell[0]
        col = cell[1]
      }
    } else if (player !== rootPlayer && player === "Δ") {
      if (score[2][2] > best_score[2]) {
        best_score = score[2]
        row = cell[0]
        col = cell[1]
      }
    }
  }
  return [row, col, best_score];
}

function MP_mix(rootPlayer, playerScore_X, playerScore_O, playerScore_Δ, Td, To) {
  let playEdgeDiffScore = [playerScore_X, playerScore_O, playerScore_Δ];
  playEdgeDiffScore.sort(function (a, b) {
    return b - a;
  });
  let leadingEdge = playEdgeDiffScore[0] - playEdgeDiffScore[1];
  let leader = " ";
  if (leadingEdge >= 1) {
    if (playEdgeDiffScore[0] === playerScore_X) {
      leader = "X";
    } else if (playEdgeDiffScore[0] === playerScore_O) {
      leader = "O";
    } else {
      leader = "Δ";
    }
  }
  if (leader === rootPlayer) {
    if (leadingEdge >= Td) {
      return ["paranoid", leader];
    }
  } else {
    if (leadingEdge >= To) {
      return ["offensive", leader];
    }
  }
  return ["maxn", leader];
}


function converterBoardToCellIndex(x, y) {
  return ((x * 4) + y);
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function combined_comp(board) {
  let result;
  result = brs(board, depth_O, -Infinity, Infinity, '*', false);
  setMove(board, result[0], result[1], result[2][1])
  cells[converterBoardToCellIndex(result[0], result[1])].innerText = result[2][1];
  if (result[2][1] == "O") {
    cells[converterBoardToCellIndex(result[0], result[1])].style.color = "red";
  }
  else {
    cells[converterBoardToCellIndex(result[0], result[1])].style.color = "green";
  }
  //Gameboard(board);
}

 function timer(x, y, player, color) {
    cells[converterBoardToCellIndex(x, y)].innerText = player;
    cells[converterBoardToCellIndex(x, y)].style.color = color;
    }

function o_comp(board) {
  let result;

  if (blanks(board).length == 16) {
    let x = getRandomInt(4);
    let y = getRandomInt(4);
    setMove(board, x, y, "O");

    //Gameboard(board);
  } else {
    if (searchAlgorythm_O == 1) {
      result = paranoid(board, depth_O, -Infinity, Infinity, "O", "O", false);
    }
    else if (searchAlgorythm_O == 2) {
      result = maxn(board, depth_O, "O", false);
    }
    else if (searchAlgorythm_O == 4) {
      algorythmSelector = MP_mix("O", playerScore_X, playerScore_O, playerScore_Δ, Td_O, To_O);
      if (algorythmSelector[0] == "paranoid") {
        result = paranoid(board, depth_O, -Infinity, Infinity, "O", "O", false);
      }
      else if (algorythmSelector[0] == "offensive") {
        result = offensive(board, depth_O, "O", "O", algorythmSelector[1], false);
      }
      else {
        result = maxn(board, depth_O, 'O', false);
      }
    }
    setMove(board, result[0], result[1], "O");
    setTimeout(timer(result[0], result[1], "O", "red"), 1000);
    //Gameboard(board);
  }
}

function x_comp(board, x_coord, y_coord) {
  let result;
  let x;
  let y;
  if (blanks(board).length == 16) {
    if (gameType[oneOrFullGame] === "Full Game") {
      x = x_coord;
      y = y_coord;
    }
    else {
      x = getRandomInt(4);
      y = getRandomInt(4);
    }

    setMove(board, x, y, "X");

    cells[converterBoardToCellIndex(x, y)].innerText = "X";
    cells[converterBoardToCellIndex(x, y)].style.color = "blue";

    //Gameboard(board);
  }
  else {
  //Gameboard(board);
    if (searchAlgorythm_X == 1) {
      result = paranoid(board, depth_X, -Infinity, Infinity, "X", "X", false);
    }
    else if (searchAlgorythm_X == 2) {
      result = maxn(board, depth_X, 'X', false);
    }
    else if (searchAlgorythm_X == 3) {
      algorythmSelector = MP_mix("X", playerScore_X, playerScore_O, playerScore_Δ, Td_X, To_X);
      if (algorythmSelector[0] == "paranoid") {
        result = paranoid(board, depth_X, -Infinity, Infinity, "X", "X", false);
      }
      else if (algorythmSelector[0] == "offensive") {
        result = offensive(board, depth_X, "X", "X", algorythmSelector[1], false);
      }
      else {
        result = maxn(board, depth_X, 'X', false);
      }
    }
    setMove(board, result[0], result[1], "X");
    setTimeout(timer(result[0], result[1], "X", "blue"), 1000);
    //Gameboard(board);
  }
}

function Δ_comp(board) {
  let result;

  if (blanks(board).length == 16) {
    let x = getRandomInt(4);
    let y = getRandomInt(4);
    setMove(board, x, y, "Δ");

    //Gameboard(board);
  } else {
    if (searchAlgorythm_Δ == 1) {
      result = paranoid(board, depth_Δ, -Infinity, Infinity, "Δ", "Δ", false);
    }
    else if (searchAlgorythm_Δ == 2) {
      result = maxn(board, depth_Δ, "Δ", false);
    }
    else if (searchAlgorythm_Δ == 3) {
      algorythmSelector = MP_mix("Δ", playerScore_X, playerScore_O, playerScore_Δ, Td_Δ, To_Δ);
      if (algorythmSelector[0] == "paranoid") {
        result = paranoid(board, depth_Δ, -Infinity, Infinity, "Δ", "Δ", false);
      }
      else if (algorythmSelector[0] == "offensive") {
        result = offensive(board, depth_Δ, "Δ", "Δ", algorythmSelector[1], false);
      }
      else {
        result = maxn(board, depth_Δ, "Δ", false);
      }
    }
    setMove(board, result[0], result[1], "Δ");
  	setTimeout(timer(result[0], result[1], "Δ", "green"), 1000);
    //Gameboard(board);
  }
}

function isDelete() {
  new Clearboard(board);
  playerScore_X = 0;
  playerScore_O = 0;
  playerScore_Δ = 0;
  document.getElementById("score_X").value = playerScore_X;
  document.getElementById("score_O").value = playerScore_O;
  document.getElementById("score_Δ").value = playerScore_Δ;
}

function pvpPlayer() {
  new Clearboard(board);
  for (let i = 0; i < cells.length; i++) {//, és nem engedi többet lépni a játékosokat
    cells[i].removeEventListener('click', testClick, false);
  }
  for (let i = 0; i < cells.length; i++) { //végigfut a cellaszámon 0-16
    cells[i].addEventListener('click', turnClick, false);
  }
  
}
function testPlayersMoves() {
  new Clearboard(board);
  testPlayer = 0;
  for (let i = 0; i < cells.length; i++) {//, és nem engedi többet lépni a játékosokat
    cells[i].removeEventListener('click', turnClick, false);
  }
  for (let i = 0; i < cells.length; i++) { //végigfut a cellaszámon 0-16
    cells[i].addEventListener('click', testClick, false);
  }
}

function testClick(square) {
  let currentPlayer;
  if (board[Math.floor(square.target.id / 4)][square.target.id % 4] == " ") {
    cells[square.target.id].innerText = testPlayers[testPlayer % 3];
    if (testPlayer % 3 == 0) {
      cells[square.target.id].style.color = "blue";
    }
    else if (testPlayer % 3 == 1) {
      cells[square.target.id].style.color = "red";
    }
    else {
      cells[square.target.id].style.color = "green";
    }
    setMove(board, Math.floor(square.target.id / 4), square.target.id % 4, testPlayers[testPlayer % 3]);
    testPlayer += 1;
  }
}


function turnClick(square) {
  let currentPlayer;
  if (board[Math.floor(square.target.id / 4)][square.target.id % 4] == " ") {
    cells[square.target.id].innerText = "X";
    cells[square.target.id].style.color = "blue";
    setMove(board, Math.floor(square.target.id / 4), square.target.id % 4, "X");
    currentPlayer = "O";
    

    if (!gameWon(board) || !boardFull(board)) {
      if (searchAlgorythm_O == 3) {
        combined_comp(board);
      }
      else {
        if (currentPlayer == "O") {
          if (gameWon(board) || boardFull(board)) {
            //printResult(board);
            for (let i = 0; i < cells.length; i++) {//, és nem engedi többet lépni a játékosokat
              cells[i].removeEventListener('click', turnClick, false);
              currentPlayer = " ";
            }
          }
          else {
            for (let i = 0; i < cells.length; i++) {//, és nem engedi többet lépni a játékosokat
              cells[i].removeEventListener('click', turnClick, false);
              currentPlayer = "Δ";
            }
            o_comp(board);
          }
        }
        if (currentPlayer == "Δ") {
          if (gameWon(board) || boardFull(board)) {
            //printResult(board);
            for (let i = 0; i < cells.length; i++) {//, és nem engedi többet lépni a játékosokat
              cells[i].removeEventListener('click', turnClick, false);
              currentPlayer = " ";
            }
          }
          else {
            for (let i = 0; i < cells.length; i++) {//, és nem engedi többet lépni a játékosokat
              cells[i].removeEventListener('click', turnClick, false);

            }
            Δ_comp(board);
            currentPlayer = "X";
            for (let i = 0; i < cells.length; i++) { //végigfut a cellaszámon 0-16
              cells[i].addEventListener('click', turnClick, false);
            }
          }
        }
      }
    }
    printResult(board);
  }
}


function ai_vs_ai(x, y) {
  let currentPlayer;
  new Clearboard(board);
  currentPlayer = "X";
  while (!(boardFull(board) || gameWon(board))) {
    if (searchAlgorythm_O === 3) {
      if (currentPlayer == "X") {
        x_comp(board, x, y);
        currentPlayer = "*";
      }
      else if (currentPlayer == "*") {
        combined_comp(board)
        currentPlayer = "X";
      }
    }
    else {
      if (currentPlayer === "X") {
        //console.log("X")
        x_comp(board, x, y);
        currentPlayer = "O";
      } else if (currentPlayer === "O") {
        //console.log("O")
        o_comp(board);
        currentPlayer = "Δ";
      } else {
        //console.log("Δ");
        Δ_comp(board);
        currentPlayer = "X";
      }
    }
  }

  printResult(board);
}

function testMode() {
  for (let i = 0; i < cells.length; i++) {//, és nem engedi többet lépni a játékosokat
    cells[i].removeEventListener('click', testClick, false);
  }
  currentPlayer = testPlayers[testPlayer % 3];

  while (!(boardFull(board) || gameWon(board))) {
    if (searchAlgorythm_O === 3) {
      if (currentPlayer == "X") {
        x_comp(board, -1, -1);
        currentPlayer = "*";
      }
     else if (currentPlayer ==  "*") {
      combined_comp(board)
      currentPlayer = "X";
    	}
    }
    else {
      if (currentPlayer === "X") {
        //console.log("X")
        x_comp(board,-1,-1);
        currentPlayer = "O";
      } else if (currentPlayer === "O") {
        //console.log("O")
        o_comp(board);
        currentPlayer = "Δ";
      } else {
        //console.log("Δ");
        Δ_comp(board);
        currentPlayer = "X";
      }
    }
  }

  printResult(board);
}




//slider-ek
let slider_Td_X = document.getElementById("Td_X");
let output_Td_X = document.getElementById("Td_X_text");
let Td_X = slider_Td_X.value;
output_Td_X.innerHTML = slider_Td_X.value;
slider_Td_X.oninput = function () {
  output_Td_X.innerHTML = this.value;
  Td_X = slider_Td_X.value;
}

let slider_To_X = document.getElementById("To_X");
let output_To_X = document.getElementById("To_X_text");
let To_X = slider_To_X.value;
output_To_X.innerHTML = slider_To_X.value;
slider_To_X.oninput = function () {
  output_To_X.innerHTML = this.value;
  To_X = slider_To_X.value;
}

let slider_depth_X = document.getElementById("depth_X");
let output_depth_X = document.getElementById("depth_X_text");
let depth_X = slider_depth_X.value;
output_depth_X.innerHTML = slider_depth_X.value;
slider_depth_X.oninput = function () {
  output_depth_X.innerHTML = this.value;
  depth_X = slider_depth_X.value;
}

let slider_Td_O = document.getElementById("Td_O");
let output_Td_O = document.getElementById("Td_O_text");
let Td_O = slider_Td_O.value;
output_Td_O.innerHTML = slider_Td_O.value;
slider_Td_O.oninput = function () {
  output_Td_O.innerHTML = this.value;
  Td_O = slider_Td_O.value;
}

let slider_To_O = document.getElementById("To_O");
let output_To_O = document.getElementById("To_O_text");
let To_O = slider_To_O.value;
output_To_O.innerHTML = slider_To_O.value;
slider_To_O.oninput = function () {
  output_To_O.innerHTML = this.value;
  To_O = slider_To_O.value;
}

let slider_depth_O = document.getElementById("depth_O");
let output_depth_O = document.getElementById("depth_O_text");
let depth_O = slider_depth_O.value;
output_depth_O.innerHTML = slider_depth_O.value;
slider_depth_O.oninput = function () {
  output_depth_O.innerHTML = this.value;
  depth_O = slider_depth_O.value;
}

let slider_Td_Δ = document.getElementById("Td_Δ");
let output_Td_Δ = document.getElementById("Td_Δ_text");
let Td_Δ = slider_Td_Δ.value;
output_Td_Δ.innerHTML = slider_Td_Δ.value;
slider_Td_Δ.oninput = function () {
  output_Td_Δ.innerHTML = this.value;
  Td_Δ = slider_Td_Δ.value;
}

let slider_To_Δ = document.getElementById("To_Δ");
let output_To_Δ = document.getElementById("To_Δ_text");
let To_Δ = slider_To_Δ.value;
output_To_Δ.innerHTML = slider_To_Δ.value;
slider_To_Δ.oninput = function () {
  output_To_Δ.innerHTML = this.value;
  To_Δ = slider_To_Δ.value;
}

let slider_depth_Δ = document.getElementById("depth_Δ");
let output_depth_Δ = document.getElementById("depth_Δ_text");
let depth_Δ = slider_depth_Δ.value;
output_depth_Δ.innerHTML = slider_depth_Δ.value;
slider_depth_Δ.oninput = function () {
  output_depth_Δ.innerHTML = this.value;
  depth_Δ = slider_depth_Δ.value;
}
function start() {
  // //JÁTÉKMÓDOK:
  // if (document.getElementById("pvp").checked) {
  //   pvpPlayer();
  // }
  // else if (document.getElementById("aivsai").checked) {
  //   ai_vs_ai(-1, -1);
  // }
  // else if (document.getElementById("test").checked) {
  //   testPlayersMoves();
  // }
  //JÁTÉKIDŐ:
  if (document.getElementById("oneGame").checked) {
    oneOrFullGame = 1;
  }
  else if (document.getElementById("fullGame").checked) {
    oneOrFullGame = 2;
  }
  //TULAJDONSÁGOK:
  if (document.getElementById("Paranoid_X").checked) {
    searchAlgorythm_X = 1;
  }
  else if (document.getElementById("Maxn_X").checked) {
    searchAlgorythm_X = 2;
  }
  else if (document.getElementById("MP_Mix_X").checked) {
    searchAlgorythm_X = 3;
  }

  if (document.getElementById("Paranoid_O").checked) {
    searchAlgorythm_O = 1;
  }
  else if (document.getElementById("Maxn_O").checked) {
    searchAlgorythm_O = 2;
  }
  else if (document.getElementById("BRS").checked) {
    searchAlgorythm_O = 3;
  }
  else if (document.getElementById("MP_Mix_O").checked) {
    searchAlgorythm_O = 4;
  }

  if (document.getElementById("Paranoid_Δ").checked) {
    searchAlgorythm_Δ = 1;
  }
  else if (document.getElementById("Maxn_Δ").checked) {
    searchAlgorythm_Δ = 2;
  }
  else if (document.getElementById("MP_Mix_Δ").checked) {
    searchAlgorythm_Δ = 3;
  }
  //JÁTÉKMÓDOK:
  if (document.getElementById("pvp").checked) {
    pvpPlayer();
  }
  else if (document.getElementById("aivsai").checked) {
    if (gameType[oneOrFullGame] == "Full Game") {
      for (let x = 0; x < board.length; x++) {
        for (let y = 0; y < board[x].length; y++) {
          ai_vs_ai(x, y);
        }
      }
    }
    else {
      ai_vs_ai(-1, -1);
    }
  }
  else if (document.getElementById("test").checked) {
    testPlayersMoves();
  }
}

  