let neighbours;
let neighbour;

function aStar() {

    resetValues();
    pathFinding = true;
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            grid[i][j].checkNeighbours();
        }
    }
    let startTime = window.performance.now();
    //COMMENT OUT IF GENERATION NOT REQUIRED INSTANTLY
    while (current !== end) {
        if (openStack.length > 0) {
            let lowestIndex = 0;

            for (let i = 0; i < openStack.length; i++) {
                if (openStack[i].f < openStack[lowestIndex].f) {
                    lowestIndex = i;
                }
            }
            current = openStack[lowestIndex];

            //remove current from available moves
            const index = openStack.indexOf(current);
            if (index > -1) {
                openStack.splice(index, 1);
            }
            //
            closedStack.push(current)

            neighbours = current.neighbours;
            for (let i = 0; i < neighbours.length; i++) {
                neighbour = neighbours[i];
                let pathFound = false;
                if (!(closedStack.includes(neighbour))) {
                    let tempG = current.g + 1;

                    if (openStack.includes(neighbour)) {
                        if (tempG < neighbour.g) {
                            neighbour.g = tempG;
                            pathFound = true;
                        }
                    } else {
                        neighbour.g = tempG
                        pathFound = true;
                        openStack.push(neighbour)
                    }
                    if (pathFound) {
                        neighbour.h = heuristicCurrentToEnd(neighbour, end);
                        neighbour.f = neighbour.g + neighbour.h;
                        neighbour.previous = current;
                    }
                }
            }
            if (current === end) {
                let endTime = window.performance.now();
                aTimeTaken = endTime - startTime
                document.getElementById('aTimeTaken').innerHTML = aTimeTaken.toPrecision(5);
                document.getElementById('aSizeOfGrid').innerHTML = sizeOfGrid;
                aPath = [];
                let tempCurrent = current;
                aPath.push(tempCurrent);
                while (tempCurrent.previous) {
                    aPath.push(tempCurrent.previous);
                    tempCurrent = tempCurrent.previous;
                }
                aMoves = aPath.length;
                document.getElementById('aMoves').innerHTML = aMoves;

                //COMMENT OUT IF GENERATION NOT REQUIRED INSTANTLY
                //current.highlight(color(20, 220, 180, 200));
                for (let i = 0; i < closedStack.length; i++) {
                    noStroke();
                    closedStack[i].show(color(220));
                }
                alertUser.push({
                    title: "A*",
                    text: "TIME TAKEN: " + aTimeTaken.toPrecision(5) + " ms" + " || MOVES NEEDED: " + aMoves,
                    allowOutsideClick: false,
                });
                //console.log("A Star: " + aTimeTaken.toPrecision(5) + " ms" + " || MOVES NEEDED: " + aMoves)
                //COMMENT OUT IF GENERATION NOT REQUIRED INSTANTLY
                //break;
            }
        } else {
            console.log("Error! No solution. Should not reach here (A*)");
        }

        function heuristicCurrentToEnd(a, b) {
            return Math.abs(a.i - b.i) + Math.abs(a.j - b.j);
        }
    }
}