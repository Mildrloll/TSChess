const input = document.getElementById("fenIn")! as HTMLInputElement;
function SetFen() {
    ParseFen(input.value);
    PrintBoard();
}