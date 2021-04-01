p5.disableFriendlyErrors = true
let rows, cols, grid;
let sizeOfGrid = 10;
let s;
let current;
const cvsFrame = 1000; //LIMIT OF 16,368//

let openStack = [];
let closedStack = [];
let start, end;
let pathFinding = false
let searchToHappen = true;
let cvs;
let alertUser = [];
let djTimeTaken = 0;
let aTimeTaken = 0;
let timeTaken = 0;
let djMoves = 0;
let aMoves = 0;
let dsMoves = 0;
let userNode;
let backgroundMusic;

let r;

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function preload() {
    soundFormats('mp3');
    backgroundMusic = loadSound("assets/NGGUP8Bit");
    backgroundMusic.playMode('untilDone');
    backgroundMusic.setVolume(0.2);

}

function setup() {

    rows = sizeOfGrid;
    cols = sizeOfGrid;
    grid = new Array(rows)

    frameRate(-1)
    cvs = createCanvas(cvsFrame + 16, cvsFrame + 16);
    let x = (windowWidth - cvsFrame) / 2;
    let y = (windowHeight - cvsFrame) / 2;
    cvs.position(x, y);

    s = cvsFrame / cols;
    //2D array
    for (let i = 0; i < rows; i++) {
        grid[i] = new Array(cols);
    }

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            grid[i][j] = new Cell(i, j)
        }
    }

    start = grid[0][0];
    end = grid[rows - 1][cols - 1];

    background(220)

    MazeGeneration();
    checkIfAllVisited();

    end.walls[1] = true
    end.walls[2] = true;

    //player implementation
    //userNode = null;
    userNode = new UserNode();
    loop();
}

function draw() {
    frameRate(-1)
    background(220)
    //noLoop();
    //if(!isLooping()){
    //}
    //player implementation
    if (searchToHappen) {
        let table = document.getElementById('GeneratedTable');
        AStar();
        if (sizeOfGrid <= 100) {
            DepthFirstSearch()
            Dijkstras();
        }
        //Swal.queue(alertUser)
        table.style.opacity = 100
        searchToHappen = false;
    }
    strokeWeight(s - 2)
    stroke(220);
    fill(220);
    line(0, s, 0 + s + 4, s);

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            grid[i][j].showWalls();
        }
    }
    //start and end aesthetics
    strokeWeight(2);
    stroke(220)
    line(8, 10, 8, 6 + s);
    line(rows * s + 8, cols * s - s + 8, rows * s + 8, cols * s + 8);

    //player implementation
    frameRate(s + 10);
    nodeMethods();
    current.aHighlight(color(220, 20, 180, 127));
}

function resetValues() {
    openStack = [];
    closedStack = [];
    current = start;
    openStack.push(current);
}

function resetLevel() {
    noLoop()
    if (playerFinishedLevel) {
        sizeOfGrid += 10;
    }
    pathFinding = false;
    path = [];
    aPath = [];
    djPath = [];
    counter = 0;
    gameTimer = 0;
    startTime = 0;
    searchToHappen = true;
    alertUser = [];
    djTimeTaken = 0;
    aTimeTaken = 0;
    timeTaken = 0;
    djMoves = 0;
    aMoves = 0;
    dsMoves = 0;
    playerFinishedLevel = false;
    resetValues()

    setup();
}

function checkIfAllVisited() {
    for (let i = 0; i < sizeOfGrid; i++) {
        for (let j = 0; j < sizeOfGrid; j++) {
            if (grid[i][j].visited === false) {
                grid[i][j].walls[0] = false
                grid[i][j].walls[1] = false
                grid[i][j].walls[2] = false
                grid[i][j].walls[3] = false
            }
        }
    }
}

function gameFinished() {

    swal.fire({
        title: "YOU WON!",
        allowOutsideClick: false,
        timer: 5000
    });
    quit();
}

