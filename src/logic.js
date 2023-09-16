import axios from 'axios'

export const labels = ["Player N.", "Aces", "Twos", "Threes", "Fours", "Fives", "Sixes", "3 of a kind", "4 of a kind", "Full house", "Sm. Straight", "Lg. Straight", "Yathzee", "Chance", "Total"];
export const type = [0, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 2, 3]
export const multiplier = [0, 1, 1, 1, 1, 1, 1, 1, 1, 25, 30, 40, 50, 1, 0]
// 0 = player name, 1=button, 2=number, 3=total
export const rows = 15; //nome + 6 numeri + 7 speciali + score
export function initGame(players) {
    var game = []
    for (var i = 0; i < players; i++) {
        game.push([]);
        for (var j = 0; j < (6 + 7); j++) {
            game[i].push(-1)
        }
    }
    localStorage.setItem("game", JSON.stringify(game));
    axios.post('https://api.lolloandr.com/recordgame', {})
}

export function saveGame(game) {
    localStorage.setItem("game", JSON.stringify(game));
}
export function loadGame() {
    return JSON.parse(localStorage.getItem("game"))
}
//game -> players(array) -> punteggio (array)

export function saveNames(names) {
    localStorage.setItem("names", JSON.stringify(names));
}
export function loadNames() {
    return JSON.parse(localStorage.getItem("names"))
}
