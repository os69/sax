import Data.Array
import Data.Maybe
import Data.List

-- generic
createArray size value = array (1,size) [(i,value)|i<-[1..size]]

unpack:: Maybe a -> a
unpack (Just value) = value

-- global fields
numberColumns = 5
numberRows    = 4

-- player
data Player = Red | Blue | Empty deriving Eq

instance Show Player where
    show Red   = "Red  "
    show Blue  = "Blue "
    show Empty = "---- "

-- column
newtype Column = Column (Array Integer Player)

instance Show Column where
    show (Column playerArray) = unwords (map show [playerArray!i|i<-[1..numberRows]])

emptyColumn = Column (createArray numberRows Empty)

columnGet:: Column -> Integer -> Maybe Player
columnGet (Column playerArray) playerIndex
     | playerIndex>=1 && playerIndex<=numberRows = Just (playerArray!playerIndex)
     | otherwise                                 = Nothing

columnSet (Column playerArray) (playerIndex, player) = Column (array (1,numberRows) [(i,calcPlayer i)|i<-[1..numberRows]])
        where calcPlayer index
                | index == playerIndex = player
                | otherwise            = playerArray!index

-- board
newtype Board = Board (Array Integer Column)

instance Show Board where
    show board = intercalate "\n" [assembleRow row|row<-[1..numberRows]]
                 where assembleRow row = unwords [getPlayer column row | column<-[1..numberColumns]]
                       getPlayer row col = show (unpack (get board (Position row col)))

emptyBoard = Board (createArray numberColumns emptyColumn)

get:: Board -> Position -> Maybe Player
get (Board columnArray) (Position columnIndex rowIndex)
    | not (validPosition (Position columnIndex rowIndex)) = Nothing
    | otherwise                                           = let (Column playerArray) = columnArray!columnIndex
                                                            in Just (playerArray!rowIndex)

set:: Board -> (Position,Player) -> Board
set (Board columnArray) (Position columnIndex rowIndex, player)
    = Board (array (1,numberColumns) [(i,calcColumn i)|i<-[1..numberColumns]])
      where calcColumn i
                | i == columnIndex = column `columnSet` (rowIndex,player)
                | otherwise        = column
                where column = columnArray!i

-- position
data Position = Position Integer Integer deriving Show

validPosition (Position columnIndex rowIndex)
    | columnIndex<1             = False
    | columnIndex>numberColumns = False
    | rowIndex<1                = False
    | rowIndex>numberRows       = False
    | otherwise                 = True

-- direction
data Direction = Direction Integer Integer deriving Show

invertDirection (Direction deltaColumn deltaRow) = Direction (-deltaColumn) (-deltaRow)

move (Position column row) (Direction deltaColumn deltaRow) steps = Position (column+steps*deltaColumn) (row+steps*deltaRow)

-- statistic
calculateStatistic:: Board -> Position -> Direction -> [(Integer,Integer,Integer)]
calculateStatistic board startPosition direction = go (0,0,0) [] startPosition
    where go (red,blue,empty) statistics position 
                | not (validPosition position) = statistics
                | otherwise                    = go statistic (statistic:statistics) (move position direction 1)
                  where maybePlayer         = get board position
                        maybePlayerMinus4   = get board (move position direction (-4))
                        statistic           = (red + count Red maybePlayer   - count Red maybePlayerMinus4,
                                               blue+count Blue maybePlayer   - count Blue maybePlayerMinus4,
                                               empty+count Empty maybePlayer - count Empty maybePlayerMinus4)
                        count player1 Nothing = 0
                        count player1 (Just player2) 
                            | player1==player2    = 1
                            | otherwise           = 0

-- main
main = do
    let board = emptyBoard `set` (Position 2 3,Red)
    print board
    let statistic = calculateStatistic board (Position 1 3) (Direction 1 0)
    print statistic
