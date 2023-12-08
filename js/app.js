let lives = 7;
let targetNumber = Math.floor(Math.random() * 100) + 1;
let guesses = [];

const tebakButton = document.getElementById("tebak")
const newGameButton = document.getElementById("startNewGame")

function checkGuess() {
  const userGuess = document.getElementById("guessInput").value;
  const guess = parseInt(userGuess);

  if (userGuess == "") {
    setMessage("Masukkan angka terlebih dahulu");
    return;
  }

  if (isNaN(guess) || guess < 1 || guess > 100) {
    setMessage("Masukkan angka antara 1 - 100!!!");
    return;
  }

  guesses.push(guess);
  displayGuesses();

  if (guess === targetNumber) {
    setMessage(`YEY ANGKA ${guess} BETUL!! SELAMATT YA!!!😁`);
    document.getElementById("clue").innerHTML = "GOOD DOG";
    resetGames();
    stopPouBacksound()
    playWinSound();
    playWinGif();
  } else {
    lives--;

    if (lives === 0) {
      setMessage(`YAH MATI KAU TOLOLLLLL WKWKKWKWKW`);
      document.getElementById("clue").innerHTML = "GOBLOK GOBLOK";
      resetGames();
      stopPouBacksound();
      playLoseSound();
    } else {
      setMessage("SALAH TOLOLLLLLL KWKWKWKWKWKW");
      updateLifeCount();
      playWrongSound();
      clue();
    }
  }

  function setMessage(message) {
    document.getElementById("message").innerText = message;
  }

  function getHeartIcons() {
    // return '❤️'.repeat(lives); //cara gampang

    // Pake algoritma
    let emot = "";
    for (i = 1; i <= lives; i++) {
      emot += "❤️";
    }
    return emot;
  }

  function updateLifeCount() {
    document.getElementById("lifeCount").innerHTML = getHeartIcons();
  }

  function clue() {
    if (guess > targetNumber) {
      document.getElementById("clue").innerHTML = "⬇️";
    } else {
      document.getElementById("clue").innerHTML = "⬆️";
    }
  }

  function playWrongSound() {
    var audio = document.getElementById('wrongSound')
    audio.volume = 1
    audio.play()
  }

  function playWinSound() {
    var audio = document.getElementById('winSound')
    audio.volume = 0.3
    audio.play()
  }

  function playLoseSound() {
    var audioLose = document.getElementById('loseSound')
    // audioLose.volume = 2
    audioLose.play()
  }

  function playWinGif() {
    const winGif = document.getElementById('joget');
    winGif.classList.remove("hidden")

    setTimeout(function(){
    winGif.classList.add("hidden")
    }, 20000)
  }

  function resetGames() {
    lives = 7;
    updateLifeCount();
    targetNumber = Math.floor(Math.random() * 100) + 1;
    clearGuesses()

    tebakButton.classList.add('hidden')
    newGameButton.classList.remove('hidden')
  }
}

function displayGuesses() {
  const guessesElement = document.getElementById('guesses')
  guessesElement.innerHTML = "";

  guesses.forEach((guess, index) => {
    const guessItem = document.createElement("span")
    guessItem.textContent = ` ${guess} |`

    if (guess === targetNumber) {
      guessItem.classList.add('text-green-500')
    } else {
      guessItem.classList.add('text-red-600')
    }

    guessesElement.appendChild(guessItem)
  })
}

function clearGuesses() {
  guesses = []
  displayGuesses()
}

function startNewGame() {
  newGameButton.classList.add('hidden')
  tebakButton.classList.remove('hidden')
  playPouBacksound()
}

// BACKSOUND
function playPouBacksound(){
  const backsound = document.getElementById("backsound")
  backsound.volume = 0.1
  backsound.loop = true
  backsound.play()
}

function stopPouBacksound() {
  const backsound = document.getElementById("backsound");
  backsound.pause();
  backsound.currentTime = 0;
}

document.addEventListener("DOMContentLoaded", function() {
  const playCheckbox = document.getElementById("sound")
  const labelCheckbox = document.getElementById("soundLabel")

  if (playCheckbox.checked) {
    playPouBacksound()
  }

  playCheckbox.addEventListener("change", function() {
    if (playCheckbox.checked) {
      playPouBacksound()
      labelCheckbox.innerHTML = "Musik On 🔊"
    } else {
      stopPouBacksound()
      labelCheckbox.innerHTML = "Musik Off 🔈"
    }
  });
});
