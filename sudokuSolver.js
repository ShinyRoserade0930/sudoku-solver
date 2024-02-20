let sudokuBoard = []
let subDimension
let rowCount
let cellCount

export function insertValues(subDimensionCount = 3)
{
    sudokuBoard = []
    subDimension = subDimensionCount
    rowCount = subDimension * subDimension
    cellCount = rowCount * rowCount

    const cells = document.querySelectorAll("input");
    cells.forEach((cell) => {
        if (cell.value)
        {
            sudokuBoard.push(parseInt(cell.value))
        }
        else
        {
            sudokuBoard.push(0)
            cell.classList.add("emptyCell")
        }
    })
}

function indexToRowCol(index)
{
    return {row: Math.floor(index / rowCount), col: index % rowCount}
}

function rowColToIndex(row, col)
{
    return row * rowCount + col
}

function hasNoDuplicates(index, value)
{
    let {row, col} = indexToRowCol(index)

    // check row
    for (let r = 0; r < rowCount; ++r)
    {
        if (sudokuBoard[rowColToIndex(r, col)] == value) return false
    }

    // check column
    for (let c = 0; c < rowCount; ++c)
    {
        if (sudokuBoard[rowColToIndex(row, c)] == value) return false
    }

    // check section
    let r1 = Math.floor(row / subDimension) * subDimension
    let c1 = Math.floor(col / subDimension) * subDimension
    for (let r = r1; r < r1 + subDimension; ++r)
    {
        for (let c = c1; c < c1 + subDimension; ++c)
        {
            if (sudokuBoard[rowColToIndex(r, c)] == value) return false
        }
    }
    return true
}

export function isValid()
{
    for (let i = 0; i < cellCount; ++i)
    {
        if (!Number.isInteger(sudokuBoard[i])) return false
        if (sudokuBoard[i] < 0 || sudokuBoard[i] > rowCount) return false

        if (sudokuBoard[i] > 0)
        {
            // hasNoDuplicates() assumes the cell is 0
            let temp = sudokuBoard[i]
            sudokuBoard[i] = 0
            if (!hasNoDuplicates(i, temp)) return false
            sudokuBoard[i] = temp
        }
    }
    return true
}

function getChoices(index)
{
    let choices = []
    for (let value = 1; value <= rowCount; ++value)
    {
        if (hasNoDuplicates(index, value))
        {
            choices.push(value)
        }
    }
    return choices
}

// Start with cells that have the least possibilities
function bestBet()
{
    let bestLen = Number.MAX_SAFE_INTEGER, index, moves
    for (let i = 0; i < cellCount; ++i)
    {
        if (!sudokuBoard[i])
        {
            let choices = getChoices(i)
            if (choices.length < bestLen)
            {
                bestLen = choices.length
                moves = choices
                index = i
                if (bestLen == 0) break
            }
        }
    }
    return {index, moves}
}

export function solve()
{
    let {index, moves} = bestBet()
    if (index == null) return true
    for (let m of moves)
    {
        sudokuBoard[index] = m
        if (solve()) return true
    }
    sudokuBoard[index] = 0
    return false
}

export function populateValues()
{
    const cells = document.querySelectorAll("input");
    cells.forEach((cell, i) => cell.value = sudokuBoard[i])
    cells.forEach((cell) => {
        cell.setAttribute("readonly", true)
    })

    const emptyCells = document.querySelectorAll(".emptyCell");
    emptyCells.forEach((cell) => {
        cell.setAttribute("style", "color: #ff0000")
    })
}
