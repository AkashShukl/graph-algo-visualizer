const container = document.querySelector(".graph-container");
var rows = 10;
var cols = 10;
var size = 40;
var startx = 0;
var starty = 0;
var endx = rows - 1;
var endy = cols - 1;


function generateGraph() {

    for (let r = 0; r < rows; r++) {
        const bparent = document.createElement("div");
        bparent.classList.add("block-parent");
        bparent.setAttribute('row', String(r));

        for (let c = 0; c < cols; c++) {

            const block = document.createElement("div");

            let block_id = String(String(r) + "-" + String(c));

            let block_obj = { "row": r, "col": c };
            var sfObj = JSON.stringify(block_obj)
            block.setAttribute("onClick", `markDisable(${sfObj})`);

            block.setAttribute("id", block_id);
            block.classList.add("block");
            block.setAttribute("blocked", "false");
            block.style.transform = `translateX(${c * 2}px)`;
            block.style.height = String(size) + "px";
            block.style.width = String(size) + "px";
            bparent.appendChild(block);
        }

        bparent.style.transform = `translateY(${r * 2}px)`;
        container.appendChild(bparent);

    }
    return container;

}
//Traversal logic one by one visiting
async function traverse() {

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {

            let temp = String(i) + "-" + String(j);
            var curr = document.getElementById(temp)
            curr.style.backgroundColor = "black";
            await new Promise((resolve) =>
                setTimeout(() => {
                    resolve();
                }, 300)
            );
            curr.style.backgroundColor = "white";
        }
    }
}

//BFS and DFS

///dfs logic
var dx = [0, 1, -1, 0];
var dy = [1, 0, 0, -1];



let isvalid = (vis, a, b) => {
    if (a >= rows || b >= cols || a < 0 || b < 0)
        return false;

    let block_id = String(a) + "-" + String(b);
    let block = document.getElementById(block_id);
    let isBlocked = block.getAttribute("blocked");

    if (isBlocked === "true")
        return false;
    console.log(vis);
    console.log("a,b=", a, b)
    if (vis[a][b])
        return false;

    return true;
}

async function bfs() {
    console.log(rows, cols)

    var vis = Array(rows);
    for (let i = 0; i < rows; i++)
        vis[i] = Array(cols).fill(false);

    root = { "r": startx, "c": starty };
    vis[startx][starty] = true;
    let queue = [root]
    let current;


    while (queue.length != 0) {

        current = queue.shift()


        let r = current['r'];
        let c = current['c'];

        //view
        let block_id = String(r) + "-" + String(c);
        let block = document.getElementById(block_id);
        block.style.backgroundColor = "green";
        await new Promise((resolve) =>
            setTimeout(() => {
                resolve();
            }, 300)
        );
        block.style.backgroundColor = "white";
        //endview

        if (r === endx && c === endy) {
            console.log(endx, endy)
            block.style.backgroundColor = "RED";
            console.log("Found");
            return;
        }

        for (let i = 0; i < 4; i++) {
            let next = { "r": current['r'] + dx[i], "c": current['c'] + dy[i] }

            let valid = isvalid(vis, current['r'] + dx[i], current['c'] + dy[i]);

            if (valid === true) {

                vis[r + dx[i]][c + dy[i]] = true;
                queue.push(next);
            }
        }

    }
}



async function dfs() {
    let stack = [];

    var vis = Array(rows);
    for (let i = 0; i < rows; i++)
        vis[i] = Array(cols).fill(false);


    let start = { 'r': startx, 'c': starty };
    stack.push(start);

    vis[startx][starty] = true;

    while (stack.length > 0) {

        let curr = stack.pop();
        let r = curr['r'];
        let c = curr['c'];
        //view
        let block_id = String(r) + "-" + String(c);
        let block = document.getElementById(block_id);
        block.style.backgroundColor = "green";
        await new Promise((resolve) =>
            setTimeout(() => {
                resolve();
            }, 300)
        );
        block.style.backgroundColor = "white";
        //endview

        if (r === endx && c === endy) {
            block.style.backgroundColor = "RED";
            console.log("Found");
            return;
        }

        console.log(curr);
        for (let i = 0; i < 4; i++) {
            let a = curr['r'] + dx[i];
            let b = curr['c'] + dy[i];
            let next = { 'r': a, 'c': b };
            let valid = isvalid(vis, a, b);
            if (valid) {
                vis[a][b] = true;
                stack.push(next)
            }
        }
    }


}


//main//
generateGraph();
function generate() {
    window.location.reload();
}
