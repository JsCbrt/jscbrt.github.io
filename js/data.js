/* ==========================================================================
   Bouncebyte Studios — game data
   --------------------------------------------------------------------------
   ⚠  Replace the `link` values below with your real store URLs.
   ⚠  To use real screenshots later, set `src` on any shot, e.g.:
        { src: 'img/fluxion-1.jpg', ratio: 'landscape' }
        { src: 'img/fluxion-3.jpg', ratio: 'portrait' }
      (CSS keeps real images sized correctly in the carousel too.)
   ⚠  To add a game in development, set status: 'in-development' —
      it will automatically appear in the landing-page hero.
   ========================================================================== */

const STATUS = {
  released:         { label: 'Released' },
  'in-development': { label: 'In Development' },
  planned:          { label: 'Planned' },
  cancelled:        { label: 'Cancelled' },
};

/* 5 placeholder screenshots per game; the 3rd one is portrait (9:16)
   so you can verify the carousel handles portrait images. */
const placeholderShots = (n = 1, portraitAt = 2) =>
  Array.from({ length: n }, (_, i) => ({
    src: null,
    ratio: i === portraitAt ? 'portrait' : 'landscape',
  }));

const GAMES = [
  {
    id: 'sjoelbak',
    title: 'Sjoelbak',
    tagline: 'Dutch Shuffleboard',
    genres: ['Arcade', 'Casual'],
    short: 'Replay the original dutch board game on the road!',
    description: 'Take the classic Dutch wooden board game anywhere with you! Master the physics, outsmart your friends, and climb the global leaderboards in this polished mobile port.',
    platform: 'Android',
    status: 'released',
    releaseDate: 'October 2021',
    progress: 100,
    link: 'https://bouncebyte.example/sjoelbak', // TODO: replace with real store URL
    accent: '#e3a457', accentDeep: '#4a2f12', motif: 'stripes',
    shots: [{src: "img/sjoelbak.jpg", ratio: 'landscape'},
        {src: "img/sj1.jpg", ratio: 'portrait'},
        {src: "img/sj2.jpg", ratio: 'portrait'},
        {src: "img/sj3.jpg", ratio: 'portrait'},
        {src: "img/sj4.jpg", ratio: 'portrait'}
    ],
  },
  {
    id: '360-arena',
    title: '360-Arena',
    tagline: 'Gravity-shifting 1v1 arena brawler',
    genres: ['Arcade', 'Local Multiplayer', 'Shooter'],
    short: 'Battle your friends in a gravity-changing arena',
    description: 'Battle your friend in a 1v1 arena where gravity shifts every 10 seconds. Adapt or fall as walls become floors and ceilings become traps.',
    platform: 'Web',
    status: 'released',
    releaseDate: 'November 2020',
    progress: 100,
    link: 'https://bouncebyte.example/360-arena', // TODO: replace with real store URL
    accent: '#43c6e8', accentDeep: '#0e3a52', motif: 'grid',
    shots: [{src: "img/360-arena.png", ratio: 'landscape'},
        {src: "img/360-arena2.png", ratio: 'landscape'}
    ],
  },
  {
    id: 'floor-is-lava',
    title: 'The Floor Is Lava',
    tagline: 'The ground is your enemy',
    genres: ['Arcade', 'Platformer', 'Casual'],
    short: 'Survive the floor becoming lava',
    description: 'An arcade experience where the ground is your enemy! Jump, dash, and survive as molten terrain rises relentlessly beneath your feet.',
    platform: 'Web',
    status: 'released',
    releaseDate: 'August 2024',
    progress: 100,
    link: 'https://bouncebyte.example/floor-is-lava', // TODO: replace with real store URL
    accent: '#ff7a3a', accentDeep: '#571a0b', motif: 'lava',
    shots: [{src: "img/tfil.png", ratio: 'landscape'},
        {src: "img/tfil2.png", ratio: 'landscape'},
        {src: "img/tfil3.png", ratio: 'landscape'},
        {src: "img/tfi4.png", ratio: 'landscape'}
    ],
  },
  {
    id: 'dungeon-survival',
    title: 'Dungeon Survival',
    tagline: 'Defend the last lights',
    genres: ['Arcade', 'Action', 'Tower Defense'],
    short: 'Are you afraid of the dark?',
    description: 'Are you afraid of the dark? Defend those lights! Place traps, upgrade defenses, and survive endless waves in this atmospheric tower defense hybrid.',
    platform: 'Web',
    status: 'released',
    releaseDate: 'September 2024',
    progress: 100,
    link: 'https://bouncebyte.example/dungeon-survival', // TODO: replace with real store URL
    accent: '#63d68c', accentDeep: '#0d3524', motif: 'dots',
    shots: [{src: "img/dungeonS.png", ratio: 'landscape'},
        {src: "img/dungeonS2.png", ratio: 'landscape'},
        {src: "img/dungeonS3.png", ratio: 'landscape'},
        {src: "img/dungeonS4.png", ratio: 'landscape'}
    ],
  },
  {
    id: 'elemals',
    title: 'Elemals',
    tagline: 'A pixel-art creature RPG',
    genres: ['Creature-Fighting', 'RPG'],
    short: 'Harness the elements from the Elemals and help save their dying land!',
    description: 'Capture and make friends with creatures with elemental powers and save their dying land! Explore biomes, battle trainers, and evolve your team in this pixel art world.',
    platform: 'PC',
    status: 'cancelled',
    releaseDate: null,
    progress: 23,
    link: null,
    accent: '#a3d94f', accentDeep: '#2b4512', motif: 'pixels',
    shots: [{src: "img/Elemals.png", ratio: 'landscape'},
        {src: "img/elem2.png", ratio: 'landscape'},
        {src: "img/elem3.png", ratio: 'landscape'},
        {src: "img/elem4.png", ratio: 'landscape'},
        {src: "img/elem5.png", ratio: 'landscape'}
    ],
  },
  {
    id: 'fluxion',
    title: 'Fluxion',
    tagline: 'A high-octane endless runner',
    genres: ['Arcade', 'Platformer', 'Endless Runner'],
    short: 'Can you outrun a blackhole?',
    description: 'Can you outrun a black hole? Dash through shifting dimensions, phase through barriers, and break speed records in this high-octane runner.',
    platform: 'Web',
    status: 'released',
    releaseDate: 'July 2026',
    progress: 100,
    link: 'https://bouncebyte.example/fluxion', // TODO: replace with real store URL
    accent: '#9b8cff', accentDeep: '#221a4e', motif: 'rings',
    shots: [{src: "img/fluxion.png", ratio: 'landscape'},
        {src: "img/fluxion2.png", ratio: 'landscape'},
        {src: "img/fluxion4.png", ratio: 'landscape'},
        {src: "img/fluxion5.png", ratio: 'landscape'},
        {src: "img/fluxion6.png", ratio: 'landscape'},
        {src: "img/fluxion7.png", ratio: 'landscape'},
        {src: "img/fluxion8.png", ratio: 'landscape'}
    ],
  },
  {
    id: 'blackout-protocol',
    title: 'Blackout Protocol',
    tagline: 'Horror puzzle — hide, find, reroute',
    genres: ['Horror', 'Puzzle'],
    short: 'What happens when the lights cut out?',
    description: 'Survive from room to room while hiding from a monster attracted by your every move! Find clues, use the terminal and reroute the power to chase the monster away!',
    platform: 'PC',
    status: 'planned',
    releaseDate: 'Q1 2027',
    progress: 2,
    link: null,
    accent: '#ffb454', accentDeep: '#33200a', motif: 'void',
    shots: placeholderShots(),//shots: [{src: "img/fluxion.png", ratio: 'landscape'}],
  },
  {
    id: 'data-thefter',
    title: 'Data Thefter',
    tagline: 'Infiltrate grab the tech, get out',
    genres: ['Infiltration', 'Stealth'],
    short: 'They upped the price of RAM, why not get it for free instead?',
    description: 'Infiltrate the newest innovative data centers and collect as much equipment as you possibly can. Watch out for the guards, they are roaming around and are not so eager to lose their job in this economy! They will do everything to catch you!',
    platform: 'PC',
    status: 'planned',
    releaseDate: 'Q4 2026',
    progress: 3,
    link: null,
    accent: '#177526', accentDeep: '#051c09', motif: 'pixels',
    shots: placeholderShots(),//shots: [{src: "img/fluxion.png", ratio: 'landscape'}],
  }
];

const getGame = (id) => GAMES.find((g) => g.id === id);