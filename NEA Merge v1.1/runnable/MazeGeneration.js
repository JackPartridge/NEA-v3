let counter = 0;

function MazeGeneration() {

    resetValues();
    while (counter !== (rows * cols) - 1) {

        current.visited = true;
        //defines next cell to go to with adjacentNodes() function
        const next = current.adjacentNodes();

        //if next is found then mark it as visited and push it to the array of past moves
        if (next) {
            next.visited = true;

            if (current.adjacentNodes() !== undefined) { //optimisation
                openStack.push(current)
            }

            wallRemover(current, next);
            counter++;
            current = next;

        } else if (openStack.length > 0) {
            current = openStack.pop();
        }
    }
    stroke(0);
    strokeWeight(2);
    noFill();
}

function wallRemover(m, n) {
    const x = m.i - n.i;
    const y = m.j - n.j;
    //let rndNum = Math.floor(Math.random() * 100);
    const crypto = window.crypto;
    let array = new Uint32Array(1);
    let rndNum = crypto.getRandomValues(array);
    if (x === 1) {
        if (rndNum >= 50 && current.i !== rows - 1) {
            m.walls[1] = false;
        } else if (rndNum <= 50) {
            n.walls[3] = false;
        }
        m.walls[3] = false;
        n.walls[1] = false;
    } else if (x === -1) {
        if (rndNum >= 50 && current.i !== 0) {
            m.walls[3] = false;
        } else if (rndNum <= 50) {
            n.walls[1] = false;
        }
        m.walls[1] = false;
        n.walls[3] = false;
    }
    if (y === 1) {
        if (rndNum >= 50 && current.j !== cols - 1) {
            m.walls[2] = false;
        } else if (rndNum <= 50) {
            n.walls[0] = false;
        }
        m.walls[0] = false;
        n.walls[2] = false;
    } else if (y === -1) {
        if (rndNum >= 50 && current.j !== 0) {
            m.walls[0] = false;
        } else if (rndNum <= 50) {
            n.walls[2] = false;
        }
        m.walls[2] = false;
        n.walls[0] = false;
    }
    if (current.i === rows - 1) {
        current.walls[1] = true;
    }
    if (current.i === 0) {
        current.walls[3] = true;
    }
    if (current.j === cols - 1) {
        current.walls[2] = true;
    }
    if (current.j === 0) {
        current.walls[0] = true;
    }
}