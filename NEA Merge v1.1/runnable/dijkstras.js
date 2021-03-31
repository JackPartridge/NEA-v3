
function dijkstras(){

    resetValues();
    pathFinding = true;
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            grid[i][j].checkNeighbours();
        }
    }
    let startTime = window.performance.now();

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
                        neighbour.f = neighbour.g
                        neighbour.previous = current;
                    }
                }
            }
            if (current === end) {
                let endTime = window.performance.now();
                djTimeTaken = endTime - startTime
                document.getElementById('djTimeTaken').innerHTML = djTimeTaken.toPrecision(5);
                document.getElementById('djSizeOfGrid').innerHTML = sizeOfGrid;
                djPath = [];
                let tempCurrent = current;
                djPath.push(tempCurrent);
                while (tempCurrent.previous) {
                    djPath.push(tempCurrent.previous);
                    tempCurrent = tempCurrent.previous;
                }
                djMoves = djPath.length
                document.getElementById('djMoves').innerHTML = djMoves;

                //COMMENT OUT IF GENERATION NOT REQUIRED INSTANTLY
                //current.highlight(color(20, 220, 180, 200));
                for (let i = 0; i < closedStack.length; i++) {
                    noStroke();
                    closedStack[i].show(color(220));
                }
                alertUser.push({
                    title: "Dijkstra's",
                    text: "TIME TAKEN: " + djTimeTaken.toPrecision(5) + " ms" + " || MOVES NEEDED: " + djMoves,
                    allowOutsideClick: false,
                });
                //`console.log(`"DJ: " + djTimeTaken.toPrecision(5) + " ms" + " || MOVES NEEDED: " + djMoves)
                //COMMENT OUT IF GENERATION NOT REQUIRED INSTANTLY
                //break;
            }
        } else {
            console.log("Error! No solution. Should not reach here (DJ)");
            //COMMENT OUT IF GENERATION NOT REQUIRED INSTANTLY
            //current.highlight(color(20, 220, 180, 200));
            //COMMENT OUT IF GENERATION NOT REQUIRED INSTANTLY
            //break;
        }
    }
}