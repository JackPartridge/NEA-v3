let moves = 0;

function DepthFirstSearch() {

    resetValues()
    pathFinding = true;
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            grid[i][j].visited = false;
        }
    }
    let startTime = window.performance.now();
    while (current !== end) {

        current.visited = true;
        path.push(current)

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

            alertUser.push({
                title: "DFS",
                text: "TIME TAKEN: " + timeTaken.toPrecision(5) + " ms" + " || MOVES NEEDED: " + dsMoves,
                allowOutsideClick: false,
            });
        }
    }
}