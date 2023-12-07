let lives = 10
let targetNumber = Math.floor(Math.random() * 100) + 1

function checkGuess() {
    const userGuess = document.getElementById('guessInput').value
    const guess = parseInt(userGuess)
    console.log(targetNumber)

    if(userGuess == ''){
        setMessage('Masukkan angka terlebih dahulu')
        return
    }

    if(isNaN(guess) || guess < 1 || guess > 100){
        setMessage('Masukkan angka antara 1 - 100!!!')
        return
    }

    if(guess === targetNumber) {
        setMessage(`YEY ANGKA ${guess} BETUL!!`)
        resetGames()
    } else {
        lives--

        if(lives === 0){
            setMessage(`YAH MATI KAU TOLOLLLLL WKWKKWKWKW`)
            resetGames()
        } else {
            setMessage('SALAH TOLOLLLLLL KWKWKWKWKWKW')
            updateLifeCount()
            clue()
        }

    }

    function setMessage(message){
        document.getElementById('message').innerText = message
    }

    function getHeartIcons() {
        // return '❤️'.repeat(lives); //cara gampang

        // Pake algoritma
        let emot = ''
        for(i = 1; i <= lives; i++) {
            emot += '❤️'
        }
        return emot
      }

    function updateLifeCount() {
        document.getElementById('lifeCount').innerHTML = getHeartIcons()
    }

    function clue(){
        if(guess > targetNumber){
            document.getElementById('clue'). innerHTML = '< :p'
        } else {
            document.getElementById('clue'). innerHTML = '> :p'
        }
    }

    function resetGames() {
        lives = 10
        document.getElementById('clue'). innerHTML = 'GOOD DOG'
        updateLifeCount()
        targetNumber = Math.floor(Math.random() * 100) + 1;
    }
}