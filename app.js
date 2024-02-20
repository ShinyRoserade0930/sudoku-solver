import {insertValues, isValid, solve, populateValues} from "./sudokuSolver.js"

function drawBoard(subDimension)
{
    const sudokuBoard = document.querySelector(".sudokuBoard")
    const rowCount = subDimension * subDimension
    
    for (let r = 0; r < rowCount; ++r)
    {
        const row = document.createElement("tr")
        sudokuBoard.appendChild(row)

        for (let c = 0; c < rowCount; ++c)
        {
            const cell = document.createElement("td")
            row.appendChild(cell)

            const input = document.createElement("input")
            cell.appendChild(input)

            input.setAttribute("type", "text")
            input.setAttribute("inputmode", "numeric")
            input.setAttribute("pattern", "[0-9]*")

            // Add styling for subgrids
            if (r % subDimension == 0 && r > 0)
            {
                cell.classList.add("subgridTop")
            }

            if (c % subDimension == 0 && c > 0)
            {
                cell.classList.add("subgridLeft")
            }
        }
    }
}

let subDimension = 3
window.onload = drawBoard(subDimension)

const message = document.querySelector(".message")
const solveButton = document.querySelector(".solveButton")
const clearButton = document.querySelector(".clearButton")

solveButton.addEventListener("click", () => {
    insertValues(subDimension)

    if (isValid())
    {
        if (solve())
        {
            populateValues()
        }
        else
        {
            message.innerHTML = "Unsolvable"
        }
    }
    else
    {
        message.innerHTML = "Invalid input"
    }
})
clearButton.addEventListener('click', () => window.location.reload(true))
