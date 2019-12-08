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

//main//
generateGraph();
function generate() {
    window.location.reload();
}
