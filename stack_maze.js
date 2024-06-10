class Maze {
    constructor(xSize = 10, ySize = 10) {
        this.xSize = xSize;
        this.ySize = ySize;
        this.maze = [];
        this.stack = [];
        
        for (i=0; i < xSize * ySize; i++) {
            this.maze[i] = this.Cell(i);
        }

        // initialX = this.getRndInteger(0, this.xSize);
        // initialy = this.getRndInteger(0, this.ySize);
        // this.current = {x: initialX, y:initialy};
        // this.maze[this.getIndex(this.current.x, this.current.y)].visited = true

        this.current = this.getRndListElement(this.maze);
        this.current.visited = true;

        this.stack.push(this.current); // Dont know if this is right. Maybe should copy or extract x,y
    }

    // Structure for each cell
    Cell(i) {
        //   walls = [up,   right, down, left]
        this.index = i;
        this.x = i % this.xSize;
        this.y = Math.floor(i,this.xSize);
        this.walls = [true, true,  true, true]
        this.visited = false;
    }

    mazeGenerator() {
        while (this.stack.length != 0) {
            this.current = this.stack.pop();

            // if any unvisited neighbours
            unvisitedNeighbours = this.neighbours();
            if (unvisitedNeighbours.length != 0) {
                // Push the current cell to the stack
                this.stack.push(this.current);

                // Choose one of the unvisited neighbours
                chosen = this.getRndListElement(unvisitedNeighbours);

                // Remove the wall between the current cell and the chosen cell
                dir = this.getDirection(this.current, chosen);
                this.removeWalls(dir, this.current)

                // Mark the chosen cell as visited and push it to the stack
                chosen.visited = true;
                this.stack.push(chosen);
            }
        }
    }

    // Assumes dir has not been visited
    // Missing handling edge coordinates
    removeWalls(dir, x, y){
        // currentIndex = this.getIndex(this.current.x, this.current.y) // Not needed if refrences work
        switch(dir){
            case "up":
                neighbour = this.getIndex(this.current.x, this.current.y-1) // Cant if y = 0
                this.maze[currentIndex].walls[0] = false
                this.maze[neighbour].walls[2]    = false
            case "right":
                neighbour = this.getIndex(this.current.x+1, this.current.y) // Cant if x = xSize
                this.maze[currentIndex].walls[1] = false
                this.maze[neighbour].walls[3]    = false
            case "down":
                neighbour = this.getIndex(this.current.x, this.current.y+1) // Cant if y = ySize-1
                this.maze[currentIndex].walls[2] = false
                this.maze[neighbour].walls[0]    = false
            case "left":
                neighbour = this.getIndex(this.current.x-1, this.current.y) // Cant if x = 0
                this.maze[currentIndex].walls[3] = false
                this.maze[neighbour].walls[1]    = false
        }
    }

    // Returns the direction between the current cell and the neighbouring cell
    // Dosent handle any error case if cell isnt directly neighbouring. 
    getDirection(c_cell, n_cell) {
        y = n_cell.y - c_cell.y; // -1=up - 1=down
        x = n_cell.x - c_cell.x; // -1=left - 1=right

        if (y == 1) {
            return "down";
        } if (y==-1) {
            return "up";
        } if (x == 1) {
            return "right";
        } if (x == -1) {
            return "left";
        }
    }


    // Translates 2d coordinates into list index
    getIndex(x,y) {
        return this.xSize * y + x 
    }

    // Gets random integer in range min-max (excluding max)
    getRndInteger(min, max) {
        return Math.floor( Math.random() * (max-min)) + min;
    }

    getRndListElement(array) {
        const size = array.length;
        const rnd = this.getRndInteger(0, size);
        return array[rnd];
    }

    // Checks if neighbours are visited
    // returns list of unvisited indexes
    // Missing: edges
    neighbours() { 
        unvisitedNeighbours = [];
 
        // up
        n = this.getIndex(this.current.x, this.current.y-1);
        if (!this.maze[n].visited) {unvisitedNeighbours.push(this.maze[n].index)}
        // right
        n = this.getIndex(this.current.x+1, this.current.y);
        if (!this.maze[n].visited) {unvisitedNeighbours.push(this.maze[n].index)}
        // down
        n = this.getIndex(this.current.x, this.current.y+1);
        if (!this.maze[n].visited) {unvisitedNeighbours.push(this.maze[n].index)}
        // left
        n = this.getIndex(this.current.x-1, this.current.y);
        if (!this.maze[n].visited) {unvisitedNeighbours.push(this.maze[n].index)}

        return unvisitedNeighbours
    }
}