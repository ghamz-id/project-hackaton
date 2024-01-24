let rollingSound = new Audio('rpg-dice-rolling-95182.mp3')
let winSound = new Audio('winharpsichord-39642.mp3')

let ketentuan = [
    tangga = {
        1:38, 4:14, 8:30, 21:42, 28:76, 50:67, 71:92, 80:99
    },
    ular = {
        32:10, 36:6, 48:26, 62:18, 88:24, 95:56, 97:78
    }
]

let P1 = 0
let P2 = 0

function play(player, position, correction, angka) {
    let tangga = ketentuan[0]
    let ular = ketentuan[1]
    
    let sum = 0
    //posisi player
    if (position === 'P1') {
        P1 += angka
        if (P1 > 100) {
            P1 -=angka
        }

        // ketentuan 1 (naik)
        for (let i in tangga){
            let naik = tangga[i]
            if (P1 === +i){
                P1 = naik;
            }
        }
        // ketentuan 2 (turun)
        for (let i in ular){
            let turun = ular[i]
            if (P1 === +i){
                P1 = turun;
            }
        }
        sum = P1
    }

    if (position == 'P2') {

        P2 += angka

        if (P2 > 100) {
            P2 -=angka
        }
        
        for (let i in tangga){
            let naik = tangga[i]
            if (P2 === +i){
                P2 = naik;
            }
        }
        for (let i in ular){
            let turun = ular[i]
            if (P2 === +i){
                P2 = turun;
            }
        }
        sum = P2
    }

    document.getElementById(`${player}`).style.transition = `linear all .5s`

    if (sum < 10) {

        document.getElementById(`${player}`).style.left = `${(sum - 1) * 62}px`
        document.getElementById(`${player}`).style.top = `${-0 * 62 - correction}px`


    }

    else if (sum === 100) {
        winSound.play()
        if (player === 'P1') {
            alert("Red Won !!")
        }
        else if (player === 'P2') {
            alert("Yellow Won !!")
        }
        location.reload()
    }

    else {

        numarr = Array.from(String(sum))
        n1 = eval(numarr.shift())
        n2 = eval(numarr.pop())
        // console.log(n1, n2)

        if (n1 % 2 != 0) {

            if (n2 == 0) {
                document.getElementById(`${player}`).style.left = `${(9) * 62}px`
                document.getElementById(`${player}`).style.top = `${(-n1 + 1) * 62 - correction}px`
            }
            else {
                document.getElementById(`${player}`).style.left = `${(9 - (n2 - 1)) * 62}px`
                document.getElementById(`${player}`).style.top = `${-n1 * 62 - correction}px`

            }

        }
        else if (n1 % 2 == 0) {
            if (n2 == 0) {

                document.getElementById(`${player}`).style.left = `${(0) * 62}px`
                document.getElementById(`${player}`).style.top = `${(-n1 + 1) * 62 - correction}px`
            }
            else {

                document.getElementById(`${player}`).style.left = `${(n2 - 1) * 62}px`
                document.getElementById(`${player}`).style.top = `${-n1 * 62 - correction}px`
            }

        }



    }
}

// Fungsi Dadu
let turn = 1 //Pemain Pertama
function dadu(){
    let angka = Math.floor(Math.random() * 6) + 1;
    document.getElementById("angka").innerText = angka;

    if (turn % 2 !== 0) {
        document.getElementById('turn-player').innerText = `P1 : Yellow's`
        play('P1', 'P1', 0, angka)
    }else if (turn % 2 === 0) {
        document.getElementById('turn-player').innerText = `P2 : Red's`
        play('P2', 'P2', 55, angka)
    }
    turn = turn + 1
}