// MEDIA
let rollingSound = new Audio('asset/dadu.mp3')
let winSound = new Audio('asset/win.mp3')

// ADD PLAYER
let players = [];
let maxPlayers = 4
function createPlayer(id, playerName) {
    players.push({ id: id, playerName: playerName});
    positions.push(0)
}

document.getElementById("addPlayerBtn").addEventListener("click", function () {
    if (players.length < maxPlayers) {
        let id = "P" + (players.length + 1);
        let playerName = prompt("Enter Player Name:");
        if (playerName) {
            createPlayer(id, playerName);
            alert(`${playerName} added as a player!`);
        }
    } else {
        alert("PENUH WOI")
        let button = document.getElementById("addPlayerBtn")
        button.disabled = true
    }
});

// ROLE PLAY
let positions = []
let ketentuan = [
    tangga = {
        1: 38, 4: 14, 8: 30, 21: 42, 28: 76, 50: 67, 71: 92, 80: 99
    },
    ular = {
        32: 10, 36: 6, 48: 26, 62: 18, 88: 24, 95: 56, 97: 78
    }
]

// FUNGSI PLAYER
function play(playerIndex, correction, angka) {
    let tangga = ketentuan[0];
    let ular = ketentuan[1];
    let box = 0;

    positions[playerIndex] += angka;

    for (let i in tangga) {
        let naik = tangga[i];
        if (positions[playerIndex] === +i) {
            positions[playerIndex] = naik;
        }
    }

    for (let i in ular) {
        let turun = ular[i];
        if (positions[playerIndex] === +i) {
            positions[playerIndex] = turun;
        }
    }

    if (positions[playerIndex] > 100) {
        positions[playerIndex] -= angka;
    }
    box = positions[playerIndex];

    // KETENTUAN BOX
    if (box === 100) {
        winSound.play()
        alert(`${players[playerIndex].playerName} Won!!`)
        location.reload()
    } else if (box < 10) {
        document.getElementById(`${players[playerIndex].id}`).style.top = `${-0 * 62 - correction}px`
        document.getElementById(`${players[playerIndex].id}`).style.left = `${(box - 1) * 60.5}px`
    } else {
        let numarr = Array.from(String(box)); // angka convert ke string dan diubah ke array per-string => 10 = ['1','0']
        let row = numarr.shift(); //['0'] => baris
        let col = numarr.pop(); //['1'] => kolom

        if (+row % 2 === 1) {
            if (+col === 0) {
                document.getElementById(`${players[playerIndex].id}`).style.left = `${(9) * 60.5}px`
                document.getElementById(`${players[playerIndex].id}`).style.top = `${(-row + 1) * 62 - correction}px`
            } else {
                document.getElementById(`${players[playerIndex].id}`).style.left = `${(9 - (col - 1)) * 60.5}px`
                document.getElementById(`${players[playerIndex].id}`).style.top = `${-row * 62 - correction}px`
            }
        } else if (+row % 2 === 0) {
            if (+col === 0) {
                document.getElementById(`${players[playerIndex].id}`).style.left = `${(0) * 60.5}px`
                document.getElementById(`${players[playerIndex].id}`).style.top = `${(-row + 1) * 62 - correction}px`
            } else {
                document.getElementById(`${players[playerIndex].id}`).style.left = `${(col - 1) * 60.5}px`;
                document.getElementById(`${players[playerIndex].id}`).style.top = `${-row * 62 - correction}px`
            }
        }
    }
}

// FUNGSI DADU
let turn = 0;
function dadu() {
    if (players.length === 0) { // must input player
        alert('Silahkan tambahkan pemain!')
    } else { // playing
        rollingSound.play();
        let angka = Math.floor(Math.random() * 6) + 1;
        document.getElementById("angka").innerText = angka; // Display angka dadu di HTML

        document.getElementById('turn-player').innerText = `${players[turn].id} : ${players[turn].playerName}'s`; // "P1"
        play(turn, turn * 45, angka);
        turn++;

        if (turn >= players.length) {
            turn = 0;
        }
    }
    if (players.length > 0) { // disable add player
        let button = document.getElementById("addPlayerBtn")
        button.disabled = true;
    }
}