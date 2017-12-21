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

data PositionStatistic = PositionStatistic Position Integer Integer Integer deriving Show

emptyPositionStatistic = PositionStatistic (Position 0 0) 0 0 0 

calculateStatistic:: Board -> Position -> Direction -> [PositionStatistic]
calculateStatistic board startPosition direction = go emptyPositionStatistic [] startPosition
    where go (PositionStatistic _ red blue empty) statistics position 
                | not (validPosition position) = statistics
                | otherwise                    = go statistic (statistic:statistics) (move position direction 1)
                  where maybePlayer         = get board position
                        maybePlayerMinus4   = get board (move position direction (-4))
                        statistic           = (PositionStatistic position 
                                               (red  + count Red   maybePlayer   - count Red   maybePlayerMinus4)
                                               (blue + count Blue  maybePlayer   - count Blue  maybePlayerMinus4)
                                               (empty+ count Empty maybePlayer   - count Empty maybePlayerMinus4))
                        count player1 Nothing = 0
                        count player1 (Just player2) 
                            | player1==player2    = 1
                            | otherwise           = 0


-- score from statistic

score:: (Integer,Integer,Integer) -> Player -> Integer
score (red,blue,empty) player = _score own empty
    where 
        own 
            | player==Red  = red
            | player==Blue = blue
        _score own empty 
            | own==0 = 0
            | own+empty/=4 = 0
            | own==1 = 1
            | own==2 = 2
            | own==3 = 3
            | own==4 = 1000

totalScore board =
  map calcScore (calculateStatistic board startPosition direction)
  where calcScore startPosition direction = foldl 

-- calculate list of start positions and directions
positionsAndDirections = horizontalPositionsAndDirections ++ 
                         verticalPositionsAndDirections ++
                         leftTopToRightBottomPositionsAndDirections ++
                         rightTopToLeftBottomPositionsAndDirections

horizontalPositionsAndDirections = [((Position 1 row),(Direction 1 0))|row <-[1..numberRows]]
verticalPositionsAndDirections =  [((Position column 1),(Direction 0 1))|column <-[1..numberColumns]]

leftTopToRightBottomPositionsAndDirections = [((Position 1 row),(Direction 1 1))|row <-[1..numberRows]] ++
                                             [((Position column 1),(Direction 1 1))| column <- [2..numberColumns]]

rightTopToLeftBottomPositionsAndDirections = [((Position numberColumns row),(Direction (-1) 1))|row <-[1..numberRows]] ++
                                             [((Position column 1),(Direction (-1) 1))|column <-[(numberColumns-1),(numberColumns-2)..1]]
-- main
main = do
    let board = emptyBoard `set` (Position 2 3,Red)
    print board
    let statistic = calculateStatistic board (Position 1 3) (Direction 1 0)    
    print statistic

    --print "====="
    --print horizontalPositionsAndDirections
    --print "====="
    --print verticalPositionsAndDirections
    --print "====="
    --print leftTopToRightBottomPositionsAndDirections
    --print "====="
    --print rightTopToLeftBottomPositionsAndDirections
