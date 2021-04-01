let startTime = 0;
let playerMoves = 0;
let playerFinishedLevel;
let gameTimer = 0;
let subtraction = 0;
let additionX = 0;
let additionY = 0;
let keyCounter = 0;
let colliding = false;
let criticalTime = 0;
let criticalTimeElement;
let nodeSpeed = 5;

class UserNode {

    constructor() {
        try {
            criticalTimeElement.remove();
        } catch {

        }
        playerFinishedLevel = false;
        this.x = 0;
        this.y = 0;
        this.i = Math.round(this.x / (s) + s);
        this.j = Math.round(this.y / (s) + s);
        this.dir = null;
        startTime = performance.now();
        subtraction = performance.now();
        criticalTimeElement = createElement('h1', '0:00');
        criticalTimeElement.style('font-size', '18px');
        criticalTimeElement.style('color', '#fff');
        criticalTimeElement.style('white-space', 'nowrap');
        criticalTimeElement.position(windowWidth - 400, 50)
    }

    collisions() {
        switch (this.dir) {
            case "right":
                if (this.i > rows - 1) {
                    this.dir = null;
                    colliding = true;
                } else {
                    colliding = false;
                }
                break;
            case "up":
                if (this.j < 0) {
                    this.dir = null;
                    colliding = true;
                } else {
                    colliding = false;
                }
                break;
            case "down":
                if (this.j > cols - 1) {
                    this.dir = null;
                    colliding = true;
                } else {
                    colliding = false;
                }
                break;
            case "left":
                if (this.i < 0) {
                    this.dir = null;
                    colliding = true;
                } else {
                    colliding = false;
                }
                break;
        }
    }


    update() {
        try {
            gameTimer = performance.now() - subtraction;
            backgroundMusic.play();
            switch (this.dir) {
                case "right":
                    this.collisions();
                    if (!grid[this.i][this.j].walls[1] && !grid[this.i + 1][this.j].walls[3]) {
                        this.x += (nodeSpeed);
                    } else {
                        colliding = true;
                    }
                    break;
                case "up":
                    this.collisions();
                    if (!grid[this.i][this.j].walls[0] && !grid[this.i][this.j - 1].walls[2]) {
                        this.y -= (nodeSpeed);
                    } else {
                        colliding = true;
                    }
                    break;
                case "down":
                    this.collisions();
                    if (!grid[this.i][this.j].walls[2] && !grid[this.i][this.j + 1].walls[0]) {
                        this.y += (nodeSpeed);
                    } else {
                        colliding = true;
                    }
                    break;
                case "left":
                    this.collisions();
                    if (!grid[this.i][this.j].walls[3] && !grid[this.i - 1][this.j].walls[1]) {
                        this.x -= (nodeSpeed);
                    } else {
                        colliding = true;
                    }
                    break;
            }
        } catch {
            //doesn't matter
        }

        try {
            if (colliding) {
                this.centralise();
            }
        } catch {
            //doesn't matter
        }

        playerMoves++;
        this.i = Math.round(this.x / s);
        this.j = Math.round(this.y / s);
        //console.log(gameTimer)
        let highestSearch = Math.max(aTimeTaken, timeTaken, djTimeTaken)
        //LEVEL FAILURE
        criticalTime = Math.floor(highestSearch * 700 * sizeOfGrid / 2);

        if (criticalTime < 8000 * (sizeOfGrid / 10)) {
            criticalTime = 8000 * (sizeOfGrid / 10);
        } else if (criticalTime > 50000) {
            criticalTime = 50000;
        }
        let formattedNum = (criticalTime - gameTimer) / 1000
        criticalTimeElement.html("Time remaining: " + (formattedNum).toPrecision(3));


        if (this.i === rows - 1 && this.j === cols - 1) {
            let endTime = performance.now();
            playerFinishedLevel = true;
            let totalTime = endTime - startTime;

            swal.fire({
                title: "You were " + ((((highestSearch - totalTime) / totalTime) / -1) * 100).toPrecision(6) + "% slower than the slowest algorithm",
                text: "TIME TAKEN: " + totalTime.toPrecision(8),
                allowOutsideClick: false,
                timer: 6000
            });

            if (playerFinishedLevel === true) {
                current.djHighlight(color(180, 220, 20, 127));
                current.highlight(color(20, 180, 220, 127));
                current.aHighlight(color(220, 20, 180, 127));
            }

            noLoop();

            //player implementation
            setTimeout(() => {
                resetLevel();
            }, 5000);

            //player implementation
            if (sizeOfGrid + 10 > 50) {
                //noLoop()
                gameFinished();
            }
        }

        if (gameTimer >= criticalTime && !playerFinishedLevel) {
            swal.fire({
                title: "Level failed",
                text: "Restarting...",
                timer: 1000
            });

            sleep(1000);
            resetLevel();
        }
    }

    show() {
        //player implementation
        fill(40, 40, 180);
        if (playerFinishedLevel) {
            noStroke();
            noFill();
        }
        ellipse((this.x + (s / 2)) + 8 + additionX, (this.y + (s / 2)) + 8 + additionY, (s) / 4, (s) / 4);
    }

    centralise() {
        this.x = this.i * (s);
        this.y = this.j * (s);
        fill(40, 40, 180);
        ellipse(((this.x + (s / 2))) + 8, ((this.y + (s / 2))) + 8, (s) / 4, (s) / 4);
    }


}

function nodeMethods() {
    userNode.update();
    userNode.show();
}

//for WASD
document.onkeypress = keyPressFunction;

function keyPressFunction(e) {
    let s = String.fromCharCode(e.which);
    switch (s) {
        case 'w':
            userNode.dir = 'up';
            keyCounter++;
            break;
        case 'a':
            userNode.dir = 'left';
            keyCounter++;
            break;
        case 's':
            userNode.dir = 'down';
            keyCounter++;
            break;
        case 'd':
            userNode.dir = 'right';
            keyCounter++;
            break;
        default:
            userNode.dir = null;
    }
}

//for arrow keys
function keyPressed() {
    switch (keyCode) {
        case UP_ARROW:
            userNode.dir = 'up';
            keyCounter++;
            break;
        case LEFT_ARROW:
            userNode.dir = 'left';
            keyCounter++;
            break;
        case DOWN_ARROW:
            userNode.dir = 'down';
            keyCounter++;
            break;
        case RIGHT_ARROW:
            userNode.dir = 'right';
            keyCounter++;
            break;
        default:
            userNode.dir = null;

    }
}