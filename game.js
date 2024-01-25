let tog = 1;

let players = [];
let currentPlayer = 0;
let maxPlayers = 4

function createPlayer(id,playerName) {
    players.push({ id: id, playerName : playerName,posisi: 0 });
}

function play(index, num) {
    let posisi; // posisi player
    let player = players[index];
    player.posisi += num;

    if (player.posisi > 100) {
        player.posisi -= num;
    }

    posisi = player.posisi;
    document.getElementById(`${player.id}`).style.transition = `linear all .5s`;

    if (posisi < 10) {
        document.getElementById(`${player.id}`).style.left = `${(posisi - 1) * 62}px`;
        document.getElementById(`${player.id}`).style.top = `${-0 * 62}px`;
    } else if (posisi == 100) {
        alert(`${player.id} Won!`);
        location.reload();
    } else {
        numarr = Array.from(String(posisi));
        n1 = eval(numarr.shift());
        n2 = eval(numarr.pop());

        if (n1 % 2 != 0) {
            if (n2 == 0) {
                document.getElementById(`${player.id}`).style.left = `${(9) * 62}px`;
                document.getElementById(`${player.id}`).style.top = `${(-n1 + 1) * 62}px`;
            } else {
                document.getElementById(`${player.id}`).style.left = `${(9 - (n2 - 1)) * 62}px`;
                document.getElementById(`${player.id}`).style.top = `${-n1 * 62}px`;
            }
        } else if (n1 % 2 == 0) {
            if (n2 == 0) {
                document.getElementById(`${player.id}`).style.left = `${(0) * 62}px`;
                document.getElementById(`${player.id}`).style.top = `${(-n1 + 1) * 62}px`;
            } else {
                document.getElementById(`${player.id}`).style.left = `${(n2 - 1) * 62}px`;
                document.getElementById(`${player.id}`).style.top = `${-n1 * 62}px`;
            }
        }
    }
}

document.getElementById("diceBtn").addEventListener("click", function () {
    let num = Math.floor(Math.random() * (6 - 1 + 1) + 1);
    document.getElementById("dice").innerText = num;

    currentPlayer = (currentPlayer + 1) % players.length;

    document.getElementById('tog').innerText = `${players[currentPlayer].playerName}'s Turn : `;
    play(currentPlayer, num);
});

// prompt masukan nama
document.getElementById("addPlayerBtn").addEventListener("click", function () {
   
    
    if (players.length < maxPlayers) {
        let id = (players.length+1)
        let playerName = prompt("Enter Player Name:");
        if (playerName) {
            createPlayer(id,playerName); 
            alert(`${playerName} added as a player!`);
        }
    }else{
        alert("PENUH WOI")
    }
    
});
