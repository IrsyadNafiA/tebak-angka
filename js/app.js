let lives = 7;
let targetNumber = Math.floor(Math.random() * 100) + 1;
let guesses = [];

function checkGuess() {
  const userGuess = document.getElementById("guessInput").value;
  const guess = parseInt(userGuess);
  console.log(targetNumber);

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
    resetGames();
    playWinSound();
    playWinGif();
  } else {
    lives--;

    if (lives === 0) {
      setMessage(`YAH MATI KAU TOLOLLLLL WKWKKWKWKW`);
      resetGames();
    } else {
      setMessage("SALAH TOLOLLLLLL KWKWKWKWKWKW");
      updateLifeCount();
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
      document.getElementById("clue").innerHTML = "< :p";
    } else {
      document.getElementById("clue").innerHTML = "> :p";
    }
  }

  function playWinSound() {
    var audio = document.getElementById('winSound')
    audio.volume = 0.3
    audio.play()
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
    document.getElementById("clue").innerHTML = "GOOD DOG";
    updateLifeCount();
    targetNumber = Math.floor(Math.random() * 100) + 1;
    clearGuesses()
  }
}

function displayGuesses() {
  const guessesElement = document.getElementById('guesses')
  guessesElement.innerHTML = "";

  guesses.forEach((guess, index) => {
    const guessItem = document.createElement("span")
    guessItem.textContent = `| ${guess} |`

    if (guess === targetNumber) {
      guessItem.classList.add('text-green-500')
    } else {
      guessItem.classList.add('text-red-600')
    }

    guessesElement.appendChild(guessItem)
  })
}

function clearGuesses() {
  const guessesElement = document.getElementById("guesses");
  guessesElement.innerHTML = "";
}
