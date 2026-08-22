
let box = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newbtn = document.querySelector("#new-btn");
let msgcontainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO = true;  // Player O starts
const winPatterns = [
    [0,1,2], [0,3,6], [0,4,8], [1,4,7],
    [2,5,8], [2,4,6], [3,4,5], [6,7,8]
];

const resetGame = () => {
    turnO = true;
    enableBoxes();
    msgcontainer.classList.add("hide");
};

box.forEach((box) => {
    box.addEventListener("click", () => {
        if (msgcontainer.classList.contains("hide") === false) return; // Stop clicks after win
        if (box.innerText !== "") return; // Prevent overwriting

        console.log("Box was clicked");
        box.innerText = turnO ? "O" : "X";
        turnO = !turnO;
        box.disabled = true;

        checkWinner();
    });
});

const enableBoxes = () => {
    box.forEach((b) => {
        b.disabled = false;
        b.innerText = "";
    });
};

const showWinner = (winner) => {
    msg.innerText = `Congratulations, Winner is ${winner}`;
    msgcontainer.classList.remove("hide");

    // Disable all boxes after a win
    box.forEach((b) => b.disabled = true);
};

const checkWinner = () => {
    for (let pattern of winPatterns) {
        let pos1val = box[pattern[0]].innerText;
        let pos2val = box[pattern[1]].innerText;
        let pos3val = box[pattern[2]].innerText;

        if (pos1val !== "" && pos1val === pos2val && pos2val === pos3val) {
            console.log("Winner:", pos1val);
            showWinner(pos1val);
            return;
        }
    }
};

newbtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);

