let moves = 0;

function depthFirstSearch() {

    resetValues()
    pathFinding = true;
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            grid[i][j].visited = false;
        }
    }
    let startTime = window.performance.now();
    //COMMENT OUT IF GENERATION NOT REQUIRED INSTANTLY
    while (current !== end) {

        current.visited = true;
        path.push(current)

        //COMMENT OUT IF GENERATION REQUIRED INSTANTLY
        //current.highlight(color(201, 50, 181));

        const next = current.adjacentNodes();

        if (next) {
            next.visited = true;
            openStack.push(current);
            current = next;

        } else if (openStack.length > 0) {
            current = openStack.pop();

            const index = path.indexOf(current);
            if (index > -1) {
                path.splice(index, 2);
            }
        }

        //path.push(current);

        if (current === end) {

            for (let i = 0; i < rows; i++) {
                for (let j = 0; j < cols; j++) {
                    grid[i][j].visited = true;
                }
            }

            dsMoves = path.length;
            document.getElementById('dsMoves').innerHTML = dsMoves;
            document.getElementById('dsSizeOfGrid').innerHTML = sizeOfGrid;
            path.push(current);
            let endTime = window.performance.now();
            timeTaken = endTime - startTime;
            document.getElementById('timeTaken').innerHTML = timeTaken.toPrecision(5);

            //current.highlight(color(201, 50, 181));
            alertUser.push({
                title: "DFS",
                text: "TIME TAKEN: " + timeTaken.toPrecision(5) + " ms" + " || MOVES NEEDED: " + dsMoves,
                allowOutsideClick: false,
            });
            //console.log("DFS: " + timeTaken.toPrecision(5) + " ms" + " || MOVES NEEDED: " + dsMoves)
        }
        //COMMENT OUT IF GENERATION NOT REQUIRED INSTANTLY
    }
}