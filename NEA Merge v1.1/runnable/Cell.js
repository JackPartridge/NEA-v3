let path = [];
let aPath = [];
let djPath = [];
let top1 = undefined;
let right1 = undefined;
let bottom1 = undefined;
let left1 = undefined;
let adjacent = [];

function Cell(i, j) {
    //General
    this.i = i;
    this.j = j;
    if (i === 0 && j === 0) {
        this.walls = [true, true, true, false];
    } else {
        this.walls = [true, true, true, true];
    }
    //Path finding A*
    this.f = 0; // total cost
    this.g = 0; //estimated guess
    this.h = 0; //heuristic estimates the cost of the cheapest path from n to the goal
    //Keeps track of own neighbours
    this.neighbours = [];
    this.previous = null; // Where the current cell came from
    //Visited by maze generation
    this.visited = false;

    this.adjacentNodes = function () {

        adjacent = [];

        try {
            top1 = grid[i][j - 1];
        } catch {
        }
        try {
            right1 = grid[i + 1][j];
        } catch {
        }
        try {
            bottom1 = grid[i][j + 1];
        } catch {
        }
        try {
            left1 = grid[i - 1][j];
        } catch {
        }

        try {
            if (bottom1 && !bottom1.visited) {
                if (pathFinding) {
                    if (current.walls[2] === false && bottom1.walls[0] === false) {
                        adjacent.push(bottom1);
                    }
                } else {
                    adjacent.push(bottom1);
                }
            }
        } catch {

        }
        try {
            if (right1 && !right1.visited) {
                if (pathFinding) {
                    if (current.walls[1] === false && right1.walls[3] === false) {
                        adjacent.push(right1);
                    }
                } else {
                    adjacent.push(right1);
                }
            }
        } catch {

        }
        try {
            if (left1 && !left1.visited) {
                if (pathFinding) {
                    if (current.walls[3] === false && left1.walls[1] === false) {
                        adjacent.push(left1);
                    }
                } else {
                    adjacent.push(left1);
                }
            }
        } catch {

        }
        try {
            if (top1 && !top1.visited) {
                if (pathFinding) {
                    if (current.walls[0] === false && top1.walls[2] === false) {
                        adjacent.push(top1);
                    }
                } else {
                    adjacent.push(top1);
                }
            }
        } catch {

        }

        if (adjacent.length > 0) {
            r = Math.floor(random(0, adjacent.length));
            return adjacent[r];
        } else {
            return undefined;
        }

    }

    this.checkNeighbours = function () {
        i = this.i;
        j = this.j;

        if (i < rows - 1) {
            if (pathFinding) {
                if (grid[i + 1][j].walls[3] === false && this.walls[1] === false) {
                    this.neighbours.push(grid[i + 1][j])
                }
            } else {
                this.neighbours.push(grid[i + 1][j])
            }
        }
        if (i > 0) {
            if (pathFinding) {
                if (grid[i - 1][j].walls[1] === false && this.walls[3] === false) {
                    this.neighbours.push(grid[i - 1][j])
                }
            } else {
                this.neighbours.push(grid[i - 1][j])
            }
        }
        if (j < cols - 1) {
            if (pathFinding) {
                if (grid[i][j + 1].walls[0] === false && this.walls[2] === false) {
                    this.neighbours.push(grid[i][j + 1])
                }
            } else {
                this.neighbours.push(grid[i][j + 1])
            }
        }
        if (j > 0) {
            if (pathFinding) {
                if (grid[i][j - 1].walls[2] === false && this.walls[0] === false) {
                    this.neighbours.push(grid[i][j - 1])
                }
            } else {
                this.neighbours.push(grid[i][j - 1])
            }
        }
    }

    this.showWalls = function () {
        if (this.j === 0) {
            this.walls[0] = true;
        } else if (this.j === cols - 1) {
            this.walls[2] = true;
        }
        if (this.i === 0) {
            this.walls[3] = true;
        } else if (this.i === rows - 1) {
            this.walls[1] = true;
        }

        stroke(0);

        let x = (this.i * s + 8);
        let y = (this.j * s + 8);

        strokeWeight(2);

        if (this.walls[0]) {
            line(x, y, x + s, y); //top line
        }
        if (this.walls[1]) {
            line(x + s, y, x + s, y + s); // right line
        }
        if (this.walls[2]) {
            line(x + s, y + s, x, y + s); // bottom line
        }
        if (this.walls[3]) {
            line(x, y + s, x, y); // left line
        }
    }

    this.highlight = function (col) {
        noFill();
        stroke(col);
        strokeWeight(s / 2)
        beginShape();
        for (let i in path) {
            vertex(path[i].i * s + s / 2 + 8, path[i].j * s + s / 2 + 8);
        }
        endShape();

    }

    this.aHighlight = function (col) {
        noFill();
        stroke(col);
        strokeWeight(s / 2)
        beginShape();
        for (let i in aPath) {
            vertex(aPath[i].i * s + s / 2 + 8, aPath[i].j * s + s / 2 + 8);
        }
        endShape();

    }

    this.djHighlight = function (col) {
        noFill();
        stroke(col);
        strokeWeight(s / 2)
        beginShape();
        for (let i in djPath) {
            vertex(djPath[i].i * s + s / 2 + 8, djPath[i].j * s + s / 2 + 8);
        }
        endShape();

    }

    this.show = function (col) {
        fill(col)
        noStroke();
        let x = (this.i * s + 8);
        let y = (this.j * s + 8);
        rect(x, y, s, s)
    }
}