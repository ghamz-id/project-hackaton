let rollingSound = new Audio('asset/rpg-dice-rolling-95182.mp3')
let winSound = new Audio('asset/winharpsichord-39642.mp3')

let ketentuan = [
    tangga = {
        1:38, 4:14, 8:30, 21:42, 28:76, 50:67, 71:92, 80:99
    },
    ular = {
        32:10, 36:6, 48:26, 62:18, 88:24, 95:56, 97:78
    }
]

let p1_position = 0;
let p2_position = 0;

function play(player, correction, angka) {
    let tangga = ketentuan[0];
    let ular = ketentuan[1];
    let box = 0;
    
    if (player === 'P1') { //posisi player 1
        p1_position += angka;
        for (let i in tangga){ // ketentuan 1 (naik)
            let naik = tangga[i];
            if (p1_position === +i){
                p1_position = naik;
            }
        }
        for (let i in ular){ // ketentuan 2 (turun)
            let turun = ular[i];
            if (p1_position === +i){
                p1_position = turun;
            }
        }
        if (p1_position > 100) { // jika posisi + dadu > 100, posisi tetap
            p1_position -=angka;
        }
        box = p1_position;
    }

    if (player === 'P2') { //posisi player 2
        p2_position += angka;
        for (let i in tangga){ // ketentuan 1 (naik)
            let naik = tangga[i];
            if (p2_position === +i){
                p2_position = naik;
            }
        }
        for (let i in ular){ // ketentuan 2 (turun)
            let turun = ular[i];
            if (p2_position === +i){
                p2_position = turun;
            }
        }
        if (p2_position > 100) { // jika posisi + dadu > 100, posisi tetap
            p2_position -=angka;
        }
        box = p2_position;
    }

    // Posisi Player
    if (box === 100) {
        winSound.play()
        if (player === 'P1') {
            alert("Red Won !!")
        } else if (player === 'P2') {
            alert("Yellow Won !!")
        }
        location.reload()
    } else if (box < 10) {
        document.getElementById(`${player}`).style.left = `${(box - 1) * 63}px`
        document.getElementById(`${player}`).style.top = `${-0 * 63 - correction}px`
    } else {
        let numarr = Array.from(String(box)); // angka convert ke string dan diubah ke array per-string => 10 = ['1','0']
        let row = numarr.shift(); //['0'] => baris
        let col = numarr.pop(); //['1'] => kolom

        if (+row % 2 === 1) {
            if (+col === 0) {
                document.getElementById(`${player}`).style.left = `${(9) * 63}px`
                document.getElementById(`${player}`).style.top = `${(-row + 1) * 63 - correction}px`
            } else {
                document.getElementById(`${player}`).style.left = `${(9 - (col - 1)) * 63}px`
                document.getElementById(`${player}`).style.top = `${-row * 63 - correction}px`
            }
        } else if (+row % 2 === 0) {
            if (+col === 0) {
                document.getElementById(`${player}`).style.left = `${(0) * 63}px`
                document.getElementById(`${player}`).style.top = `${(-row + 1) * 63 - correction}px`
            } else {
                document.getElementById(`${player}`).style.left = `${(col - 1) * 63}px`;
                document.getElementById(`${player}`).style.top = `${-row * 63 - correction}px`
            }
        }
    }
}

// Fungsi Dadu
let turn = 1 // turn pertama
function dadu(){
    rollingSound.play();
    let angka = Math.floor(Math.random() * 6) + 1;
    document.getElementById("angka").innerText = angka;

    if (turn % 2 === 1) {
        document.getElementById('turn-player').innerText = `P2 : Yellow's`
        play('P1', -10, angka)
    }else if (turn % 2 === 0) {
        document.getElementById('turn-player').innerText = `P1 : Red's`
        play('P2', 35, angka)
    }
    turn++
}