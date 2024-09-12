from random import choice
from math import inf# The Tic-Tac-Toe board
import time

board = [[0, 0, 0, 0],
         [0, 0, 0, 0],
         [0, 0, 0, 0],
         [0, 0, 0, 0]]

board_temp = [[0, 0, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0]]

playerScore_X = 0
playerScore_O = 0
playerScore_3 = 0
Td = 3
To = 2

testPlayers = {0:'X', 1:'O', 2:'Δ'}

gameType = {1:"One Game", 2:"Full Game"}

def Gameboard(board):
    for x in board:
        for y in x:
            ch = y
            print(f'| {ch} ', end='')
        print('|\n' + '_______________')
    print("")
    print('=================')
    print("")

# Function to clear the game board
def Clearboard(board):
    for x, row in enumerate(board):
        for y, col in enumerate(row):
            board[x][y] = ' '
            #board[x][y] = 0
            
# Function to check if a player has won
def winningPlayer(board, player):
    temp = 0
    winBool = False
    conditions = [[board[0][0], board[0][1], board[0][2]],#horizontális
                  [board[0][1], board[0][2], board[0][3]],
                  [board[1][0], board[1][1], board[1][2]],
                  [board[1][1], board[1][2], board[1][3]],
                  [board[2][0], board[2][1], board[2][2]],
                  [board[2][1], board[2][2], board[2][3]],
                  [board[3][0], board[3][1], board[3][2]],
                  [board[3][1], board[3][2], board[3][3]],
                  [board[0][0], board[1][0], board[2][0]],#vertikális
                  [board[1][0], board[2][0], board[3][0]],
                  [board[0][1], board[1][1], board[2][1]],
                  [board[1][1], board[2][1], board[3][1]],
                  [board[0][2], board[1][2], board[2][2]],
                  [board[1][2], board[2][2], board[3][2]],
                  [board[0][3], board[1][3], board[2][3]],
                  [board[1][3], board[2][3], board[3][3]],
                  [board[0][0], board[1][1], board[2][2]],#diagonális 1
                  [board[1][1], board[2][2], board[3][3]],
                  [board[1][0], board[2][1], board[3][2]],
                  [board[0][1], board[1][2], board[2][3]],
                  [board[0][3], board[1][2], board[2][1]],#diagonális 2
                  [board[1][2], board[2][1], board[3][0]],
                  [board[0][2], board[1][1], board[2][0]],
                  [board[1][3], board[2][2], board[3][1]]] #[23]
    
    for i in range(len(conditions)):
        if [player, " ", " "] == conditions[i]:
            temp = temp + 30
        if [" ", player, " "] == conditions[i]:
            temp = temp + 30
        if [" ", " ", player] == conditions[i]:
            temp = temp + 30
        if [player, player, " "] == conditions[i]:
            temp = temp + 60
        if [player, " ", player] == conditions[i]:
            temp = temp + 60
        if [" ", player, player] == conditions[i]:
            temp = temp + 60
        if [player, player, player] == conditions[i]:
            temp = temp + 1000
            winBool = True

    return [winBool, temp]
    
# Function to check if the game has been won
def gameWon(board):
    return winningPlayer(board, 'X')[0] or winningPlayer(board, 'O')[0] or winningPlayer(board, 'Δ')[0]


# Function to print the game result
def printResult(board):
    global playerScore_X, playerScore_O, playerScore_3
    if winningPlayer(board, 'X')[0]:
        playerScore_X += 1
    elif winningPlayer(board, 'O')[0]:
        playerScore_O += 1
    elif winningPlayer(board, 'Δ')[0]:
        playerScore_3 += 1
       
# Function to get the list of blank positions on the board
def blanks(board):
    blank = []
    for x, row in enumerate(board):
        for y, col in enumerate(row):
            if board[x][y] == ' ':
                blank.append([x, y])
    return blank

def boardTemp(board, player):
    for x, row in enumerate(board):
        for y, col in enumerate(row):
            board_temp[x][y] = board[x][y]
            if board[x][y] == '*':
                board_temp[x][y] = player

# Function to check if the board is full
def boardFull(board):
    if len(blanks(board)) == 0:
        return True
    return False
    
# Function to set a move on the board
def setMove(board, x, y, player):
    board[x][y] = player

def leadingEdgeCounter(playScore1, playScore2, playScore3):
    playEdgeDiffScore = [playScore1, playScore2, playScore3]
    playEdgeDiffScore.sort(reverse=True)
    leadingEdge = playEdgeDiffScore[0]-playEdgeDiffScore[1]
    leader = ' '
    if leadingEdge > 1: #1 ponttal vezet, To, Td
        if playEdgeDiffScore[0] == playScore1:
            leader = 'X'
        elif playEdgeDiffScore[0] == playScore2:
            leader = 'O'
        else:
            leader = 'Δ'
    return leader

def evaluate(board, searchAlgorythm):
    tmp_1 = winningPlayer(board, 'X')
    tmp_2 = winningPlayer(board, 'O')
    tmp_3 = winningPlayer(board, 'Δ')

    if searchAlgorythm == "paranoidX":
        #x elleni koalíció
        return tmp_1[1]-(tmp_2[1]+tmp_3[1])
    elif searchAlgorythm == "paranoidO":
        #O elleni koalíció
        return tmp_2[1]-(tmp_1[1]+tmp_3[1])
    elif searchAlgorythm == "paranoidΔ":
        #Δ elleni koalíció
        return tmp_3[1]-(tmp_1[1]+tmp_2[1])
    elif searchAlgorythm == 'maxn':
        return(tmp_1[1]-(tmp_2[1]+tmp_3[1]), tmp_2[1]-(tmp_1[1]+tmp_3[1]), tmp_3[1]-(tmp_1[1]+tmp_2[1]))
    elif searchAlgorythm == 'brs':
        tmp_X = winningPlayer(board, 'X')
        boardTemp(board, 'O')
        tmp_O = winningPlayer(board_temp, 'O')
        boardTemp(board, 'Δ')
        tmp_Δ = winningPlayer(board_temp, 'Δ')
        
        if tmp_X[1] - tmp_O[1] > tmp_X[1] - tmp_Δ[1]:
            return(tmp_X[1] - tmp_Δ[1], 'Δ')
        elif tmp_X[1] - tmp_O[1] < tmp_X[1] - tmp_Δ[1]:
            return(tmp_X[1] - tmp_O[1], 'O')
        else:
            return(tmp_X[1]-tmp_O[1], 'O') 
    elif searchAlgorythm == 'offensive':
        return(tmp_1[1]-(tmp_2[1]+tmp_3[1]), tmp_2[1]-(tmp_1[1]+tmp_3[1]), tmp_3[1]-(tmp_1[1]+tmp_2[1]))

# Heuristic function for the AI
def heuristic(board, searchAlgorythm):
    return evaluate(board, searchAlgorythm)

def brs(board, depth, alpha, beta, player, heuristicBool):
    row = -1
    col = -1
    if heuristicBool == True:
        if (depth == 0 and heuristicBool == True) or len(blanks(board)) < 3 and heuristicBool == True or gameWon(board):
            return [row, col, heuristic(board, "brs")]

    best_score = [-inf, ' '] if player == 'X' else [inf, ' '] 
    moves = blanks(board)
    for cell in moves:
        setMove(board, cell[0], cell[1], player) #cell- üres helyek  x,y  koordinátája
        if player == 'X':
            score = brs(board, depth - 1, alpha, beta, '*', True)
        elif player == '*':
            score = brs(board, depth - 1, alpha, beta, 'X', True)
        setMove(board, cell[0], cell[1], ' ')

        if player == 'X':
            if score[2][0] > best_score[0]:
                best_score = score[2]
                row = cell[0]
                col = cell[1]
                alpha = max(alpha, best_score[0])
                if alpha >= beta:
                    break
        else:
            if score[2][0] < best_score[0]:
                best_score = score[2]
                row = cell[0]
                col = cell[1]
                global bestScoreGlobal
                bestScoreGlobal = best_score[0]
                beta = min(beta, best_score[0])
                if alpha >= beta:
                    break

    return [row, col, best_score]   

def paranoid(board, depth, alpha, beta, player, rootPlayer,heuristicBool):
    row = -1
    col = -1
    if heuristicBool == True:
        if depth == 0  or boardFull(board) or gameWon(board):
            return [row, col, heuristic(board, "paranoid" + rootPlayer)]

    best_score = -inf if player == rootPlayer else inf 
    moves = blanks(board)
    for cell in moves:
        setMove(board, cell[0], cell[1], player) #cell- üres helyek  x,y  koordinátája
        if player == 'X':
            score = paranoid(board, depth - 1, alpha, beta, 'O', rootPlayer,True)
        elif player == 'O':
            score = paranoid(board, depth - 1, alpha, beta, 'Δ', rootPlayer,True)
        elif player == 'Δ':
            score = paranoid(board, depth - 1, alpha, beta, 'X', rootPlayer,True) 
        setMove(board, cell[0], cell[1], ' ')

        if player == rootPlayer:
            if score[2] > best_score:
                best_score = score[2]
                row = cell[0]
                col = cell[1]
                alpha = max(alpha, best_score)
                if alpha >= beta:
                    break
        else:
            if score[2] < best_score:
                best_score = score[2]
                row = cell[0]
                col = cell[1]
                beta = min(beta, best_score)
                if alpha >= beta:
                    break

    return [row, col, best_score]

def maxn(board, depth, player, heuristicBool):
    row = -1
    col = -1
    if heuristicBool == True:
        if depth == 0  or boardFull(board) or gameWon(board):
            return [row, col, heuristic(board, "maxn")]

    best_score = [-inf, -inf, -inf]
    moves = blanks(board)
    for cell in moves:
        setMove(board, cell[0], cell[1], player) #cell- üres helyek  x,y  koordinátája
        if player == 'X':
            score = maxn(board, depth - 1, 'O', True)
        elif player == 'O':
            score = maxn(board, depth - 1, 'Δ', True)
        elif player == 'Δ':
            score = maxn(board, depth - 1, 'X', True) 
        setMove(board, cell[0], cell[1], ' ')

        if player == 'X': 
            if score[2][0] > best_score[0]:
                best_score = score[2]
                row = cell[0]
                col = cell[1]
                if best_score[0] >= 900:
                    break
               
        elif player == 'O':
            if score[2][1] > best_score[1]:
                best_score = score[2]
                row = cell[0]
                col = cell[1]
                if best_score[1] >= 900:
                    break
                
        else:
             if score[2][2] > best_score[2]:
                best_score = score[2]
                row = cell[0]
                col = cell[1]
                if best_score[2] >= 900:
                    break

    return [row, col, best_score]

def offensive(board, depth, player, rootPlayer, leader, heuristicBool):
    row = -1
    col = -1
    if heuristicBool == True:
        if depth == 0  or boardFull(board) or gameWon(board):
            return [row, col, heuristic(board, "offensive")]

    best_score = [-inf, -inf, -inf]
    moves = blanks(board)
    for cell in moves:
        setMove(board, cell[0], cell[1], player) #cell- üres helyek  x,y  koordinátája
        if player == 'X':
            score = offensive(board, depth - 1, 'O', rootPlayer, leader ,True)
        elif player == 'O':
            score = offensive(board, depth - 1, 'Δ', rootPlayer, leader ,True)
        elif player == 'Δ':
            score = offensive(board, depth - 1, 'X',rootPlayer, leader ,True) 
        setMove(board, cell[0], cell[1], ' ')

        if player == rootPlayer and leader == 'X' and rootPlayer != leader:
            if best_score[0] == -inf:
                best_score[0] = inf
            if score[2][0] < best_score[0]:
                best_score = score[2]
                row = cell[0]
                col = cell[1]

        elif player == rootPlayer and leader == 'O' and rootPlayer != leader:
            if best_score[1] == -inf:
                best_score[1] = inf
            if score[2][1] < best_score[1]:
                best_score = score[2]
                row = cell[0]
                col = cell[1]

        elif player == rootPlayer and leader == 'Δ' and rootPlayer != leader:
            if best_score[2] == -inf:
                best_score[2] = inf
            if score[2][2] < best_score[2]:
                best_score = score[2]
                row = cell[0]
                col = cell[1]

        elif player != rootPlayer and player == 'X':
            if score[2][0] > best_score[0]:
                    best_score = score[2]
                    row = cell[0]
                    col = cell[1]
                    if best_score[0] >= 900: 
                        break
        elif player != rootPlayer and player == 'O':
            if score[2][1] > best_score[1]:
                    best_score = score[2]
                    row = cell[0]
                    col = cell[1]
                    if best_score[1] >= 900:
                        break
        elif player != rootPlayer and player == 'Δ':
            if score[2][2] > best_score[2]:
                    best_score = score[2]
                    row = cell[0]
                    col = cell[1]
                    if best_score[2] >= 900:
                        break

    return [row, col, best_score]

def MP_mix(rootPlayer, playerScore_X, playerScore_O, playerScore_3, Td, To):
    playEdgeDiffScore = [playerScore_X, playerScore_O, playerScore_3]
    playEdgeDiffScore.sort(reverse=True)
    leadingEdge = playEdgeDiffScore[0]-playEdgeDiffScore[1]
    leader = " "
    if leadingEdge >= 1: #1 ponttal vezet, To, Td
        if playEdgeDiffScore[0] == playerScore_X:
            leader = 'X'
        elif playEdgeDiffScore[0] == playerScore_O:
            leader = 'O'
        else:
            leader = 'Δ'

    if leader == rootPlayer:
        if leadingEdge >= Td:
            return ["paranoid", leader]
    else:
        if leadingEdge >= To:
            return ["offensive", leader]

    return ["maxn", leader]
    


def combined_comp(board):
    result = brs(board, depth_O, -inf, inf, '*', False)
    setMove(board, result[0], result[1], result[2][1])

# Function for the AI's move (playing as O)
def o_comp(board):
    start_time_O = time.time()
    if len(blanks(board)) == 16:
        x = choice([0, 1, 2, 3])
        y = choice([0, 1, 2, 3])
        setMove(board, x, y, 'O')
    else:
        if searchAlgorythm_O == 1:
            result = paranoid(board, depth_O, -inf, inf, 'O', 'O',False)
        elif searchAlgorythm_O == 2:
            result = maxn(board, depth_O, 'O', False)
        elif searchAlgorythm_O == 4:
            algorythmSelector = MP_mix('O', playerScore_X, playerScore_O, playerScore_3, Td, To)
            if algorythmSelector[0] == "paranoid":
                result = paranoid(board, depth_O, -inf, inf, 'O', 'O',False)
            elif algorythmSelector[0] == "offensive":
                result = offensive(board, depth_O, 'O', 'O', algorythmSelector[1], False)
            else:
                result = maxn(board, depth_O, 'O', False)
                
        setMove(board, result[0], result[1], 'O')
        end_time_O = time.time()
        elapsed_time_O = end_time_O - start_time_O
        print("elapsed_time_O", elapsed_time_O)

# Function for the AI's move (playing as X)
def x_comp(board, x_coord, y_coord):
    start_time_X = time.time()
    if len(blanks(board)) == 16:
        if gameType[oneOrFullGame] == "Full Game":
            x = x_coord
            y = y_coord
        else:    
            x = choice([0, 1, 2, 3])
            y = choice([0, 1, 2, 3])
        setMove(board, x, y, 'X')
    else:
        if searchAlgorythm_X == 1:
            result = paranoid(board, depth_X, -inf, inf, 'X', 'X',False)
        elif searchAlgorythm_X == 2:
            result = maxn(board, depth_X, 'X', False)
        elif searchAlgorythm_X == 3:
            algorythmSelector = MP_mix('X', playerScore_X, playerScore_O, playerScore_3, Td, To)
            if algorythmSelector[0] == "paranoid":
                result = paranoid(board, depth_X, -inf, inf, 'X', 'X',False)
            elif algorythmSelector[0] == "offensive":
                result = offensive(board, depth_X, 'X', 'X', algorythmSelector[1], False)
            else:
                result = maxn(board, depth_X, 'X', False)
        setMove(board, result[0], result[1], 'X')
        end_time_X = time.time()
        elapsed_time_X = end_time_X - start_time_X
        print("elapsed_time_X", elapsed_time_X)

def Δ_comp(board):
    start_time_3 = time.time()
    if len(blanks(board)) == 16:
        x = choice([0, 1, 2, 3])
        y = choice([0, 1, 2, 3])
        setMove(board, x, y, 'Δ')
    else:
        if searchAlgorythm_Δ == 1:
            result = paranoid(board, depth_Δ, -inf, inf, 'Δ', 'Δ',False)
        elif searchAlgorythm_Δ == 2:
            result = maxn(board, depth_Δ, 'Δ', False)
        elif searchAlgorythm_Δ == 3:
            algorythmSelector = MP_mix('Δ', playerScore_X, playerScore_O, playerScore_3, Td, To)
            if algorythmSelector[0] == "paranoid":
                result = paranoid(board, depth_Δ, -inf, inf, 'Δ', 'Δ',False)
            elif algorythmSelector[0] == "offensive":
                result = offensive(board, depth_Δ, 'Δ', 'Δ', algorythmSelector[1], False)
            else:
                result = maxn(board, depth_Δ, 'Δ', False)
        setMove(board, result[0], result[1], 'Δ')
        end_time_3 = time.time()
        elapsed_time_3 = end_time_3 - start_time_3
        print("elapsed_time_Δ", elapsed_time_3)
        
# Function for a player's move
def playerMove(board):
    valid_input = False
    while not valid_input:
        try:
            position = int(input("Enter the position (1-16): "))
            if position >= 1 and position <= 16:
                row = (position - 1) // 4
                col = (position - 1) % 4
                if board[row][col] == ' ':
                    setMove(board, row, col, 'X')
                    valid_input = True
                else:
                    print("Invalid move. The position is already occupied.")
            else:
                print("Invalid input. Please enter a number from 1 to 9.")
        except ValueError:
            print("Invalid input. Please enter a number from 1 to 9.")

    Gameboard(board)

def testPlayersMoves(board):
    valid_input = False
    testPlayer = 0
    while not valid_input:
        try:
            position = int(input("Enter the position (1-16): "))
            if position >= 1 and position <= 16:
                row = (position - 1) // 4
                col = (position - 1) % 4
                if board[row][col] == ' ':
                    setMove(board, row, col, testPlayers[testPlayer%3])
                    testPlayer += 1
                    Gameboard(board)
                    testSteps= input("Continue the test steps? y/n: ")
                    if testSteps == 'n':
                        valid_input = True

                else:
                    print("Invalid move. The position is already occupied.")
            else:
                print("Invalid input. Please enter a number from 1 to 9.")
        except ValueError:
            print("Invalid input. Please enter a number from 1 to 9.")
    
    return testPlayers[testPlayer % 3]

    
# Function for player vs. player mode
def pvp():
    Clearboard(board)
    currentPlayer = 'X'

    while not (boardFull(board) or gameWon(board)):
        if searchAlgorythm_O == 3:
            if currentPlayer == 'X':
                # print("The move of Player is: ")
                playerMove(board)
                currentPlayer = '*'
            elif currentPlayer == '*':
                # print("The move of * AI is: ")
                combined_comp(board)
                currentPlayer = 'X'
        else:
            if currentPlayer == 'X':
                # print("The move of Player is: ")
                playerMove(board)
                currentPlayer = 'O'
            elif currentPlayer == 'O':
                # print("The move of O AI is: ")
                o_comp(board)
                currentPlayer = 'Δ'
            else:
                # print("The move of Δ AI is: ")
                Δ_comp(board)
                currentPlayer = 'X'
            

    printResult(board)

    
# Function for AI vs. AI mode
def ai_vs_ai(x, y):
    Clearboard(board)
    currentPlayer = 'X'

    while not (boardFull(board) or gameWon(board)):
        if searchAlgorythm_O == 3:
            if currentPlayer == 'X':
                # print("The move of AI 1 is: ")
                x_comp(board, x, y)
                currentPlayer = '*'
            elif currentPlayer == '*':
                # print("The move of * AI is: ")
                combined_comp(board)
                currentPlayer = 'X'
        else:
            if currentPlayer ==  'X':
                # print("The move of AI 1 is: ")
                x_comp(board, x, y)
                currentPlayer = 'O'
            elif currentPlayer == 'O':
                # print("The move of AI 2 is: ")
                o_comp(board)
                currentPlayer = 'Δ'
            else:
                # print("The move of AI 3 is: ")
                Δ_comp(board)
                currentPlayer = 'X'

    printResult(board)

    
def testMode():
    Clearboard(board)
    currentPlayer = testPlayersMoves(board)
    while not (boardFull(board) or gameWon(board)):
        if searchAlgorythm_O == 3:
            if currentPlayer == 'X':
                print("The move of AI 1 is: ")
                x_comp(board, -1, -1)
                currentPlayer = '*'
            elif currentPlayer != 'X':
                print("The move of * AI is: ")
                combined_comp(board)
                currentPlayer = 'X'
        else:
            if currentPlayer == 'X':
                print("The move of Player is: ")
                x_comp(board, -1, -1)
                currentPlayer = 'O'
            elif currentPlayer == 'O':
                print("The move of O AI is: ")
                o_comp(board)
                currentPlayer = 'Δ'
            else:
                print("The move of Δ AI is: ")
                Δ_comp(board)
                currentPlayer = 'X'

    printResult(board)

    
print("__________________________________________________________________")
print("Three players TIC-TAC-TOE")
print("__________________________________________________________________")
boolVal = True
while boolVal:
    try:
        mode = int(input("Choose game mode: \n1. Player vs AI \n2. AI vs AI\n3. TestMode\n"))
        if mode == 1 or mode == 2 or mode == 3:
            boolVal = False
        else:
            print("Invalid input. Please enter a number between 1 and 3.\n")
    except ValueError:
        print("Invalid input. Please enter a number between 1 and 3.\n")
boolVal = True

if mode != 1:
    while boolVal:
        try:
            searchAlgorythm_X = int(input("Choose search algorythm for X: \n1. Paranoid \n2. MaxN \n3. MP-Mix\n"))
            if searchAlgorythm_X == 1 or searchAlgorythm_X == 2 or searchAlgorythm_X == 3:
                boolVal = False
            else:
                print("Invalid input. Please enter a number between 1 and 3.\n")
        except ValueError:
            print("Invalid input. Please enter a number between 1 and 3.\n")
boolVal = True

if mode != 1:
    while boolVal:
        try:
            depth_X = int(input("Search tree depth for X (recommended): 0-5\n"))
            if depth_X > 0 and depth_X < 7:
                boolVal = False
            else:
                print("Invalid input. Please enter a number between 0 and 6\n.")
        except ValueError:
            print("Invalid input. Please enter a number between 0 and 5.\n")
boolVal = True

while boolVal:
    try:
        searchAlgorythm_O = int(input("Choose search algorythm for O: \n1. Paranoid \n2. MaxN \n3. BRS(O,Δ)\n4. MP-Mix\n"))
        if searchAlgorythm_O > 0 and searchAlgorythm_O < 5:
            boolVal = False
        else:
            print("Invalid input. Please enter a number between 1 and 4.\n")
    except ValueError:
        print("Invalid input. Please enter a number between 1 and 4.\n")
boolVal = True

while boolVal:
    try:
        depth_O = int(input("Search tree depth for O (recommended): 0-5\n"))
        if depth_O > 0 and depth_O < 7:
            boolVal = False
        else:
            print("Invalid input. Please enter a number between 0 and 6.\n")
    except ValueError:
        print("Invalid input. Please enter a number between 0 and 5.\n")
boolVal = True

while boolVal:
    try:
        if searchAlgorythm_O != 3:
            searchAlgorythm_Δ = int(input("Choose search algorythm for Δ: \n1. Paranoid \n2. MaxN \n3. MP-Mix\n"))
            if searchAlgorythm_Δ > 0 and searchAlgorythm_Δ < 4:
                boolVal = False
            else:
                print("Invalid input. Please enter a number between 1 and 3.\n")
        else:
            searchAlgorythm_Δ = 0
            boolVal = False
    except ValueError:
        print("Invalid input. Please enter a number between 1 and 3.\n")
boolVal = True

if searchAlgorythm_O != 3:
    while boolVal:
        try:
            depth_Δ = int(input("Search tree depth for Δ (recommended): 0-5\n"))
            if depth_Δ > 0 and depth_Δ < 7:
                boolVal = False
            else:
                print("Invalid input. Please enter a number between 0 and 6.\n")
        except ValueError:
            print("Invalid input. Please enter a number between 0 and 5.\n")
boolVal = True

while boolVal:
    try:
        oneOrFullGame = int(input("Choose playing time: \n1. One game \n2. Full game\n"))
        if oneOrFullGame == 1 or oneOrFullGame == 2:
            boolVal = False
        else:
            print("Invalid input. Please enter a number between 1 and 2.\n")
    except ValueError:
        print("Invalid input. Please enter a number between 1 and 2.\n")

if mode == 1:
    if gameType[oneOrFullGame] == "Full Game":
        i = 0
        while i < 10:
             pvp()
             i += 1
    else:
        pvp()
elif mode == 2:
    if gameType[oneOrFullGame] == "Full Game":
        for x, row in enumerate(board):
            for y, col in enumerate(row):
                ai_vs_ai(x, y)
        end_time = time.time()
        print("X:", playerScore_X, " O:", playerScore_O, " Δ:", playerScore_3)
    else:
        ai_vs_ai(-1, -1)
        print("X:", playerScore_X, " O:", playerScore_O, " Δ:", playerScore_3)
elif mode == 3:
    testMode()
else:
    print("Invalid mode selected.")
