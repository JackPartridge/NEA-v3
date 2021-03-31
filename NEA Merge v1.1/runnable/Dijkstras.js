function Dijkstras() {

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
            MostEfficientPath(false);
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
                for (let i in closedStack) {
                    noStroke();
                    closedStack[i].show(color(220));
                }
                alertUser.push({
                    title: "Dijkstra's",
                    text: "TIME TAKEN: " + djTimeTaken.toPrecision(5) + " ms" + " || MOVES NEEDED: " + djMoves,
                    allowOutsideClick: false,
                });
            }
        }
    }
}