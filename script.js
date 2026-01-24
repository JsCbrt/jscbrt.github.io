const games = [
    {
      title: "Sjoelbak - Dutch Shuffleboard",
      status: "Completed",
      progress: 100,
      shortDescription: "A faithful recreation of the Dutch classic",
      description: "Sitting in public transport, waiting for a meeting or perhaps you just want to take a little time to yourself? This game is for you! <br><br> This arcade recreation of the popular dutch game Sjoelbak, or commonly known as dutch shuffleboard will bring you quick and easy fun in a moment's notice! <br><br> Offering easily accessible gameplay that simulates the real world feel of play, it is simple to use and appealing to both newcomers and real life experts alike! <br><br> Reach for the highscore, unlock new skins as you progress, or simply pass some time, it's always a great time to play a few quick games!",
      features: ["Single-player", "Mobile Game", "Leaderboard", "Highscore"],
      controls: ["Swipe Up – Throw", "Pull To Side – Aim"],
      steamLink: "https://play.google.com/store/apps/details?id=com.JsCbrt.Sjoelbak&hl=en-us",
      screenshots: [
        "sjoelbak.jpg",
        "sj1.jpg",
        "sj2.jpg",
        "sj3.jpg",
        "sj4.jpg"
      ]
    },
    {
      title: "360 Arena",
      status: "Completed",
      progress: 100,
      shortDescription: "A fast-paced arena shooter with changing gravity",
      description: "This is a 2 player arena local multiplayer game where the players battle in a gravity-changing arena.",
      features: ["Local Multiplayer", "Changing Gravity", "Multiple Levels", "Shooter"],
      controls: ["WASD – Move P1", "LShift – Shoot P1", "C – Jump P1", ],
      steamLink: "https://jscbrt.itch.io/360-arena",
      screenshots: [
        "360-arena.png",
        "360-arena2.png"
      ]
    },
    {
      title: "The Floor Is Lava",
      status: "Completed",
      progress: 100,
      shortDescription: "A fast-paced platforming game",
      description: "In this game, you play as a kid playing in his backyard as the floor becomes lava at an increasingly fast pace. Every round, objects will randomly spawn inside the terrain to be able to jump away from danger. <br><br>The goal is to survive as many rounds as possible which can be compared to other players through the online leaderboard.",
      features: ["Single-player", "Highscore", "Leaderboard"],
      controls: ["WASD – Move", "Mouse – Aim", "Space – Jump"],
      steamLink: "https://jscbrt.itch.io/the-floor-is-lava",
      screenshots: [
        "tfil.png",
        "tfil2.png",
        "tfil3.png",
        "tfil4.png",
      ]
    },
    {
      title: "Dungeon Survival",
      status: "Completed",
      progress: 100,
      shortDescription: "A fast-paced tower-defense & survival hybrid",
      description: "This is a game about a knight getting lost in a dungeon and getting trapped inside of a room with endless zombies coming through the gate. <br><br>The player's goal is to survive and protect the torches lighting up the room.",
      features: ["Single-player", "Controller Support", "Multiple Levels"],
      controls: ["WASD – Move", "Mouse – Aim", "LMB - Shoot"],
      steamLink: "https://jscbrt.itch.io/dungeon-survival",
      screenshots: [
        "dungeonS.png",
        "dungeonS2.png",
        "dungeonS3.png",
        "dungeonS4.png",
      ]
    },
    {
      title: "Elemals",
      status: "In Development",
      progress: 8,
      shortDescription: "An RPG about Elemental Animals",
      description: "This is a game where you capture and train Elemental Animals on your journey to restore the Elements of the land!",
      features: ["RPG", "Controller Support", "Creature Collection", "Turn-Based Combat"],
      controls: ["WASD/LS/Dpad – Move/Select", "Enter/A – Select", "BackSpace/B – Cancel"],
      steamLink: "",
      screenshots: [
        "Elemals.png",
        "elem2.png",
        "elem3.png",
        "elem4.png",
        "elem5.png",
      ]
    }
  ];

  const store = document.getElementById('store');
  const carouselImage = document.getElementById('carouselImage');
  let currentGame = null;
  let currentShot = 0;
  const gamePage = document.getElementById('gamePage');

  function loadStore() {
    store.innerHTML = '';
    store.style.display = 'grid';
    gamePage.style.display = 'none';

    games.forEach((game, index) => {
      const card = document.createElement('div');
      card.className = 'game-card';
      card.onclick = () => openGame(index);

      card.innerHTML = `
        <img src="img/Screenshots/${game.screenshots[0]}" />
        <div class="game-card-content">
          <span class="status-badge ${game.status === 'Completed' ? '' : 'dev'}">${game.status} (${game.progress}%)</span>
          <h2>${game.title}</h2>
          <p>${game.shortDescription}</p>
        </div>
      `;

      store.appendChild(card);
    });
  }

  function openGame(index) {
    const game = games[index];

    store.style.display = 'none';
    gamePage.style.display = 'grid';

    document.getElementById('gameTitle').textContent = game.title;
    document.getElementById('gameDescription').innerHTML = game.description;

    const statusEl = document.getElementById('gameStatus');
    statusEl.innerHTML = `${game.status} (${game.progress}%)<span class='tooltip'>${game.status === 'Completed' ? 'This project is finished and no longer in development' : 'This project is still in active development'}</span>`;
    statusEl.className = `status-badge ${game.status === 'Completed' ? '' : 'dev'}`;

    currentGame = game;
    currentShot = 0;
    carouselImage.src = "img/Screenshots/" + game.screenshots[0];

    const thumbs = document.getElementById('thumbnails');
    thumbs.innerHTML = game.screenshots.map((s, i) =>
      `<img src="img/Screenshots/${s}" class="${i === 0 ? 'active' : ''}" onclick="jumpToShot(${i})">`
    ).join('');

    document.getElementById('features').innerHTML = game.features
      .map(f => `<li>${f}</li>`).join('');

    document.getElementById('controls').innerHTML = game.controls
      .map(c => `<li>${c}</li>`).join('');

    if (game.steamLink != "") document.getElementById('steamLink').href = game.steamLink;
    else {
      document.getElementById('steamLink').innerText = "No Store Link";
      document.getElementById('steamLink').href = ""
      document.getElementById('steamLink').onclick = NoStoreLink;
    }
  }

  function NoStoreLink(){
    alert("This game is still in development and has no store page!");
    return false;
  }

  function changeShot(newIndex) {
    carouselImage.classList.add('fade-out');

    setTimeout(() => {
      currentShot = newIndex;
      carouselImage.src = "img/Screenshots/" + currentGame.screenshots[currentShot];

      document.querySelectorAll('.thumbnails img').forEach((img, i) => {
        img.classList.toggle('active', i === currentShot);
      });

      carouselImage.classList.remove('fade-out');
    }, 150);
  }

  function nextShot() {
    if (!currentGame) return;
    changeShot((currentShot + 1) % currentGame.screenshots.length);
  }

  function prevShot() {
    if (!currentGame) return;
    changeShot((currentShot - 1 + currentGame.screenshots.length) % currentGame.screenshots.length);
  }

  function jumpToShot(index) {
    if (!currentGame || index === currentShot) return;
    changeShot(index);
  }

  function prevShot() {
    if (!currentGame) return;
    currentShot = (currentShot - 1 + currentGame.screenshots.length) % currentGame.screenshots.length;
    carouselImage.src = "img/Screenshots/" + currentGame.screenshots[currentShot];
  }

  function goBack() {
    loadStore();
  }

  loadStore();