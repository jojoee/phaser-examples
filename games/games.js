/*
id: game no.
name: string (folder name (lower case only))
title: string
description: string
phaserVersion: string
isPlayable: boolean
screenshots: array
references: array
tags: array (lowercase except particular name)
inspirations: array
demos: array (game play and video)
*/

var games = [
  {
    id: 1,
    name: '2048',
    title: '2048',
    description: '2048 Game',
    phaserVersion: '2.4.4',
    isPlayable: true,
    screenshots: [
      '2048.jpg'
    ],
    references: [
      'http://www.emanueleferonato.com/2014/04/04/how-to-create-a-complete-html5-2048-game-with-phaser',
      'http://www.emanueleferonato.com/tag/2048/',
      'http://www.emanueleferonato.com/tag/hero-slide/'
    ],
    tags: [],
    inspirations: [],
    demos: []
  },
  {
    id: 2,
    name: '10000000',
    title: '10000000',
    description: 'Drag-and-match',
    phaserVersion: '2.4.4',
    isPlayable: true,
    screenshots: [
      '10000000.jpg'
    ],
    references: [
      'http://www.emanueleferonato.com/2014/07/24/html5-drag-and-match-engine-made-with-phaser/',
      'http://www.emanueleferonato.com/tag/drag-and-match/'
    ],
    tags: [],
    inspirations: [
      'https://itunes.apple.com/en/app/10000000/id544385071'
    ],
    demos: []
  },
  {
    id: 3,
    name: 'angry-birds-space',
    title: 'Angry Birds Space',
    description: '',
    phaserVersion: '2.4.4',
    isPlayable: true,
    screenshots: [
      'angry-birds-space.jpg'
    ],
    references: [
      'http://www.emanueleferonato.com/2015/06/19/simulate-planet-gravity-with-phaser-box2d-as-seen-on-angry-birds-space/',
      'http://www.emanueleferonato.com/tag/angry-birds-space/'
    ],
    tags: [],
    inspirations: [
      'http://space.angrybirds.com/launch/'
    ],
    demos: []
  },
  {
    id: 4,
    name: 'ascii-roguelike',
    title: 'ASCII Roguelike',
    description: '',
    phaserVersion: '1.1.2',
    isPlayable: true,
    screenshots: [
      'ascii-roguelike.jpg'
    ],
    references: [
      'http://gamedevelopment.tutsplus.com/tutorials/how-to-make-your-first-roguelike--gamedev-13677'
    ],
    tags: [],
    inspirations: [],
    demos: []
  },
  {
    id: 5,
    name: 'boids-flocking',
    title: 'Boids Flocking',
    description: '',
    phaserVersion: '2.4.4',
    isPlayable: true,
    screenshots: [
      'boids-flocking.jpg'
    ],
    references: [
      'http://www.red3d.com/cwr/boids/',
      'http://www.kfish.org/boids/pseudocode.html',
      'http://www.emanueleferonato.com/2016/01/12/how-to-simulate-flocking-behavior-with-boids-using-html5-and-phaser/',
      'http://www.emanueleferonato.com/tag/boids/'
    ],
    tags: [
      'boids algorithm'
    ],
    inspirations: [],
    demos: []
  },
  {
    id: 6,
    name: 'boids-steering',
    title: 'Boids Steering',
    description: '',
    phaserVersion: '2.4.4',
    isPlayable: true,
    screenshots: [
      'boids-steering.jpg'
    ],
    references: [
      'http://www.red3d.com/cwr/boids/',
      'http://www.kfish.org/boids/pseudocode.html',
      'http://www.emanueleferonato.com/2016/02/01/understanding-steering-behavior-html5-example-using-phaser/'
    ],
    tags: [
      'boids algorithm'
    ],
    inspirations: [],
    demos: []
  },
  {
    id: 7,
    name: 'boom-dots',
    title: 'Boom Dots',
    description: '',
    phaserVersion: '2.4.4',
    isPlayable: true,
    screenshots: [
      'boom-dots.jpg'
    ],
    references: [
      'http://www.emanueleferonato.com/2015/04/16/create-an-html5-game-like-boom-dots-in-less-than-100-lines-of-code-with-phaser/',
      'http://www.emanueleferonato.com/tag/boom-dots/'
    ],
    tags: [],
    inspirations: [
      'https://itunes.apple.com/us/app/boom-dots/id975047985'
    ],
    demos: []
  },
  {
    id: 8,
    name: 'bouncing-menu',
    title: 'Bouncing Menu',
    description: '',
    phaserVersion: '2.4.4',
    isPlayable: true,
    screenshots: [
      'bouncing-menu.jpg'
    ],
    references: [
      'http://www.emanueleferonato.com/2015/10/06/give-your-html5-game-menu-a-nice-bounce-effect-with-phaser/'
    ],
    tags: [],
    inspirations: [],
    demos: []
  },
  {
    id: 9,
    name: 'box-jump',
    title: 'Box Jump',
    description: '',
    phaserVersion: '2.4.4',
    isPlayable: false,
    screenshots: [
      'box-jump.jpg'
    ],
    references: [
      'http://www.lessmilk.com/games/3/'
    ],
    tags: [],
    inspirations: [],
    demos: []
  },
  {
    id: 10,
    name: 'box2d',
    title: 'Box2D',
    description: '',
    phaserVersion: '2.4.4',
    isPlayable: true,
    screenshots: [
      'box2d.jpg'
    ],
    references: [
      'http://www.emanueleferonato.com/2015/06/16/introducing-phaser-box2d/',
      'http://phaser.io/shop/plugins/box2d'
    ],
    tags: [],
    inspirations: [],
    demos: []
  },
  {
    id: 11,
    name: 'breakout',
    title: 'Breakout',
    description: '',
    phaserVersion: '2.4.4',
    isPlayable: false,
    screenshots: [
      'breakout.jpg'
    ],
    references: [
      'http://codepen.io/K_Cuma/pen/emaJBd'
    ],
    tags: [],
    inspirations: [],
    demos: []
  },
  {
    id: 12,
    name: 'bresenham-light',
    title: 'Bresenham Light',
    description: '',
    phaserVersion: '2.4.4',
    isPlayable: true,
    screenshots: [
      'bresenham-light.jpg'
    ],
    references: [
      'http://www.emanueleferonato.com/2015/12/15/calculating-dynamic-light-and-shadows-in-tile-based-roguelike-games-part-3-let-there-be-bresenham-light/',
      'http://deepnight.net/bresenham-magic-raycasting-line-of-sight-pathfinding/'
    ],
    tags: [],
    inspirations: [],
    demos: []
  },
  {
    id: 13,
    name: 'brick',
    title: 'Brick',
    description: '',
    phaserVersion: '2.4.4',
    isPlayable: false,
    screenshots: [
      'brick.jpg'
    ],
    references: [
      'http://dailyjs.com/2014/09/16/phaser-tutorial/'
    ],
    tags: [],
    inspirations: [],
    demos: []
  },
  {
    id: 14,
    name: 'bulletpool',
    title: 'Bulletpool',
    description: '',
    phaserVersion: '2.4.4',
    isPlayable: true,
    screenshots: [
      'bulletpool.jpg'
    ],
    references: [
      'http://phaser.io/tutorials/coding-tips-007'
    ],
    tags: [],
    inspirations: [],
    demos: []
  },
  {
    id: 15,
    name: 'car',
    title: 'Car',
    description: '',
    phaserVersion: '2.4.4',
    isPlayable: true,
    screenshots: [
      'car.jpg'
    ],
    references: [
      'http://phaser.io/tutorials/coding-tips-005'
    ],
    tags: [],
    inspirations: [],
    demos: []
  },
  {
    id: 16,
    name: 'character-selection',
    title: 'Character Selection',
    description: 'Character selection like Crossy Road',
    phaserVersion: '2.4.4',
    isPlayable: true,
    screenshots: [
      'character-selection.jpg'
    ],
    references: [
      'http://www.emanueleferonato.com/2016/01/20/phaser-tutorial-creation-of-a-html5-character-selection-screen-like-the-one-in-crossy-road-ios-smash-hit/'
    ],
    tags: [
      'Crossy Road',
      'character selection'
    ],
    inspirations: [],
    demos: []
  },
  {
    id: 17,
    name: 'christmas-quest',
    title: 'Christmas Quest',
    description: '',
    phaserVersion: '2.1.1',
    isPlayable: true,
    screenshots: [
      'christmas-quest.jpg'
    ],
    references: [
      'http://www.emanueleferonato.com/2014/11/18/upcoming-html5-christmas-game-christmas-quest/'
    ],
    tags: [
      'game title'
    ],
    inspirations: [],
    demos: []
  },
  {
    id: 18,
    name: 'clocks',
    title: 'Clocks',
    description: '',
    phaserVersion: '2.4.4',
    isPlayable: true,
    screenshots: [
      'clocks.jpg'
    ],
    references: [
      'http://www.emanueleferonato.com/2016/01/07/clocks-the-game-html5-prototype-step-3-actually-playing-the-game/',
      'http://www.emanueleferonato.com/tag/clocks-the-game/'
    ],
    tags: [],
    inspirations: [],
    demos: []
  },
  {
    id: 19,
    name: 'connected',
    title: 'Connected',
    description: '',
    phaserVersion: '2.4.4',
    isPlayable: false,
    screenshots: [
      'connected.jpg'
    ],
    references: [
      'http://www.lessmilk.com/games/7/'
    ],
    tags: [],
    inspirations: [],
    demos: []
  },
  {
    id: 20,
    name: 'crack-alien-code',
    title: 'Crack Alien Code',
    description: '',
    phaserVersion: '2.4.4',
    isPlayable: false,
    screenshots: [
      'crack-alien-code.jpg'
    ],
    references: [
      'http://www.emanueleferonato.com/2015/05/28/play-crack-alien-code-an-html5-speed-memory-game-you-are-about-to-learn-how-to-code/'
    ],
    tags: [
      'sound control'
    ],
    inspirations: [],
    demos: [
      'http://www.emanueleferonato.com/wp-content/uploads/2015/05/cac/'
    ]
  },
  {
    id: 21,
    name: 'crazy-snake',
    title: 'Crazy Snake',
    description: '',
    phaserVersion: '2.4.4',
    isPlayable: true,
    screenshots: [
      'crazy-snake.jpg'
    ],
    references: [
      'http://www.lessmilk.com/games/12/'
    ],
    tags: [],
    inspirations: [],
    demos: []
  },
  {
    id: 22,
    name: 'cube-jump',
    title: 'Cube Jump',
    description: '',
    phaserVersion: '2.4.4',
    isPlayable: true,
    screenshots: [
      'cube-jump.jpg'
    ],
    references: [
      'http://www.emanueleferonato.com/2015/08/18/creation-of-the-engine-behind-cube-jump-ios-game-with-phaser/',
      'http://www.emanueleferonato.com/wp-content/uploads/2015/08/cubejump/',
      'http://www.emanueleferonato.com/tag/cube-jump/'
    ],
    tags: [],
    inspirations: [
      'https://itunes.apple.com/us/app/cube-jump/id1015137537'
    ],
    demos: []
  },
  {
    id: 23,
    name: 'dark-blue',
    title: 'Dark Blue',
    description: '',
    phaserVersion: '2.4.4',
    isPlayable: false,
    screenshots: [
      'dark-blue.jpg'
    ],
    references: [
      'http://www.lessmilk.com/games/10/'
    ],
    tags: [],
    inspirations: [],
    demos: []
  },
  {
    id: 24,
    name: 'dashy-panda',
    title: 'Dashy Panda',
    description: '',
    phaserVersion: '2.4.4',
    isPlayable: true,
    screenshots: [
      'dashy-panda.jpg'
    ],
    references: [
      'http://www.emanueleferonato.com/2016/01/15/phaser-tutorial-create-a-html5-prototype-of-the-ios-game-dashy-panda/',
      'http://www.emanueleferonato.com/tag/dashy-panda/'
    ],
    tags: [],
    inspirations: [
      'https://itunes.apple.com/us/app/dashy-panda-and-friends/id989937013'
    ],
    demos: []
  },
  {
    id: 25,
    name: 'diamond-digger',
    title: 'Diamond Digger',
    description: '',
    phaserVersion: '2.4.4',
    isPlayable: true,
    screenshots: [
      'diamond-digger.jpg'
    ],
    references: [
      'http://www.emanueleferonato.com/2014/09/23/html5-diamond-diger-saga-prototype-made-with-phaser-adding-dirt-and-water/',
      'http://www.emanueleferonato.com/2014/09/18/html5-diamond-digger-saga-prototype-made-with-phaser/',
      'http://www.emanueleferonato.com/tag/diamond-digger-saga/'
    ],
    tags: [],
    inspirations: [],
    demos: [
      'https://king.com/#!/play/diamonddigger'
    ]
  },
  {
    id: 26,
    name: 'digger',
    title: 'Digger',
    description: '',
    phaserVersion: '2.0.7',
    isPlayable: false,
    screenshots: [
      'digger.jpg'
    ],
    references: [
      'https://gamedevacademy.org/make-a-quick-phaser-compatible-game-using-mightyeditor/'
    ],
    tags: [
      'MightyEditor'
    ],
    inspirations: [],
    demos: []
  },
  {
    id: 27,
    name: 'doodle-jump',
    title: 'Doodle Jump',
    description: '',
    phaserVersion: '2.4.4',
    isPlayable: true,
    screenshots: [
      'doodle-jump.jpg'
    ],
    references: [
      'http://phaser.io/tutorials/coding-tips-003/'
    ],
    tags: [],
    inspirations: [],
    demos: []
  },
  {
    id: 28,
    name: 'down-the-mountain',
    title: 'Down The Mountain',
    description: '',
    phaserVersion: '2.4.4',
    isPlayable: true,
    screenshots: [
      'down-the-mountain.jpg'
    ],
    references: [
      'http://www.emanueleferonato.com/2015/08/11/html5-down-the-mountain-game-prototype-made-with-phaser-actually-going-down-the-mountain/',
      'http://www.emanueleferonato.com/tag/down-the-mountain/'
    ],
    tags: [],
    inspirations: [
      'https://itunes.apple.com/us/app/down-the-mountain/id992730639'
    ],
    demos: []
  },
  {
    id: 29,
    name: 'draggable-and-scrollable-with-inertia',
    title: 'Draggable and Scrollable with Inertia',
    description: '',
    phaserVersion: '2.4.4',
    isPlayable: true,
    screenshots: [
      'draggable-and-scrollable-with-inertia.jpg'
    ],
    references: [
      'http://www.emanueleferonato.com/2016/01/18/how-to-create-a-html-draggable-and-scrollable-map-with-inertia-using-phaser-framework/',
      'http://www.emanueleferonato.com/2015/01/21/create-an-html5-level-selection-screen-using-a-scrollable-map-like-in-hero-emblems-game-using-phaser/'
    ],
    tags: [],
    inspirations: [
      'https://itunes.apple.com/vn/app/id645797558'
    ],
    demos: []
  },
  {
    id: 30,
    name: 'drop-wizard',
    title: 'Drop Wizard',
    description: '',
    phaserVersion: '2.4.4',
    isPlayable: true,
    screenshots: [
      'drop-wizard.jpg'
    ],
    references: [
      'http://www.emanueleferonato.com/2015/03/05/create-an-html5-game-like-drop-wizard-with-phaser-patrolling-enemies/',
      'http://www.emanueleferonato.com/2015/03/03/create-an-html5-game-like-drop-wizard-with-phaser-player-fire-by-extending-sprite-class/',
      'http://www.emanueleferonato.com/2015/01/15/create-an-html5-game-like-drop-wizard-with-phaser-player-movement/',
      'http://www.emanueleferonato.com/tag/drop-wizard/'
    ],
    tags: [],
    inspirations: [
      'https://itunes.apple.com/us/app/drop-wizard/id834955398'
    ],
    demos: []
  },
  {
    id: 31,
    name: 'easystarjs',
    title: 'Easystarjs',
    description: '',
    phaserVersion: '2.4.4',
    isPlayable: true,
    screenshots: [
      'easystarjs.jpg'
    ],
    references: [
      'http://www.emanueleferonato.com/2015/07/03/pure-javascript-a-maze-solving-with-a-bit-of-magic-thanks-to-phaser/',
      'https://github.com/appsbu-de/phaser_plugin_pathfinding',
      'http://www.easystarjs.com/'
    ],
    tags: [],
    inspirations: [],
    demos: []
  },
  {
    id: 32,
    name: 'endless-scale',
    title: 'Endless Scale',
    description: '',
    phaserVersion: '2.4.4',
    isPlayable: true,
    screenshots: [
      'endless-scale.jpg'
    ],
    references: [
      'http://www.emanueleferonato.com/2015/03/25/quick-tip-how-to-scale-your-html5-endless-runner-game-to-play-it-on-mobile-devices/'
    ],
    tags: [
      'scale'
    ],
    inspirations: [],
    demos: []
  },
  {
    id: 33,
    name: 'fill-the-holes',
    title: 'Fill the Holes',
    description: '',
    phaserVersion: '2.4.4',
    isPlayable: false,
    screenshots: [
      'fill-the-holes.jpg'
    ],
    references: [
      'http://www.lessmilk.com/games/5/'
    ],
    tags: [],
    inspirations: [],
    demos: []
  },
  {
    id: 34,
    name: 'first-game',
    title: 'First Game',
    description: '',
    phaserVersion: '2.4.4',
    isPlayable: true,
    screenshots: [
      'first-game.jpg'
    ],
    references: [
      'http://phaser.io/tutorials/making-your-first-phaser-game'
    ],
    tags: [],
    inspirations: [],
    demos: []
  },
  {
    id: 35,
    name: 'flappy-bird',
    title: 'Flappy bird',
    description: '',
    phaserVersion: '2.4.4',
    isPlayable: true,
    screenshots: [
      'flappy-bird.jpg'
    ],
    references: [
      'https://developer.amazon.com/public/community/post/Tx1NQ9QEA4MWGTY/Intro-To-Phaser-Part-1-Setting-Up-Your-Dev-Environment-and-Phaser'
    ],
    tags: [],
    inspirations: [],
    demos: []
  },
  {
    id: 36,
    name: 'flappy-bird-2',
    title: 'Flappy bird 2',
    description: '',
    phaserVersion: '2.4.4',
    isPlayable: true,
    screenshots: [
      'flappy-bird-2.jpg'
    ],
    references: [
      'http://blog.lessmilk.com/how-to-make-flappy-bird-in-html5-2/'
    ],
    tags: [],
    inspirations: [],
    demos: []
  },
  {
    id: 37,
    name: 'flappy-bird-reborn',
    title: 'Flappy Bird Reborn',
    description: '',
    phaserVersion: '2.4.4',
    isPlayable: true,
    screenshots: [
      'flappy-bird-reborn.jpg'
    ],
    references: [
      'https://github.com/codevinsky/flappy-bird-reborn'
    ],
    tags: [],
    inspirations: [],
    demos: [
      'http://flappy-bird-reborn.herokuapp.com/'
    ]
  },
  {
    id: 38,
    name: 'flood-fill',
    title: 'Flood Fill',
    description: '',
    phaserVersion: '2.4.4',
    isPlayable: true,
    screenshots: [
      'flood-fill.jpg'
    ],
    references: [
      'http://www.emanueleferonato.com/2014/09/10/the-basics-behind-diamond-digger-saga-flood-fill-algorithm/',
      'http://www.emanueleferonato.com/2008/06/06/flash-flood-fill-implementation/'
    ],
    tags: [],
    inspirations: [],
    demos: []
  },
  {
    id: 39,
    name: 'fruit-ninja',
    title: 'Fruit Ninja',
    description: '',
    phaserVersion: '2.4.4',
    isPlayable: true,
    screenshots: [
      'fruit-ninja.jpg'
    ],
    references: [
      'http://codepen.io/labdev/pen/sCAKe'
    ],
    tags: [],
    inspirations: [],
    demos: []
  },
  {
    id: 40,
    name: 'fruit-ninja-2',
    title: 'Fruit Ninja 2',
    description: '',
    phaserVersion: '2.0.3',
    isPlayable: true,
    screenshots: [
      'fruit-ninja-2.jpg'
    ],
    references: [
      'http://codepen.io/codevinsky/pen/mgwdv'
    ],
    tags: [],
    inspirations: [],
    demos: []
  },
  {
    id: 41,
    name: 'goat-rider',
    title: 'Goat Rider',
    description: '',
    phaserVersion: '2.4.4',
    isPlayable: true,
    screenshots: [
      'goat-rider.jpg'
    ],
    references: [
      'http://www.emanueleferonato.com/2015/12/02/html5-game-prototype-like-goat-rider-powered-by-phaser-and-arcade-physics/',
      'http://www.emanueleferonato.com/tag/goat-rider/'
    ],
    tags: [
      'https://itunes.apple.com/us/app/goat-rider/id1045358578'
    ],
    inspirations: [],
    demos: [
      'https://www.youtube.com/watch?v=Mc2rtBDgzkw'
    ]
  },
  {
    id: 42,
    name: 'gyro.js',
    title: 'gyro.js',
    description: '',
    phaserVersion: '2.4.4',
    isPlayable: true,
    screenshots: [
      'gyro.js.jpg'
    ],
    references: [
      'http://www.emanueleferonato.com/2015/01/10/playing-with-phaser-and-accelerometer-with-gyro-js/',
      'https://github.com/tomgco/gyro.js'
    ],
    tags: [],
    inspirations: [],
    demos: []
  },
  {
    id: 43,
    name: 'hexagonal-tiles',
    title: 'Hexagonal Tiles',
    description: '',
    phaserVersion: '2.4.4',
    isPlayable: false,
    screenshots: [
      'hexagonal-tiles.jpg'
    ],
    references: [
      'http://www.emanueleferonato.com/2015/02/12/how-to-find-adjacent-tiles-in-hexagonal-maps-all-and-every-case-explained/',
      'http://www.emanueleferonato.com/tag/hexagonal-tiles/'
    ],
    tags: [],
    inspirations: [],
    demos: []
  },
  {
    id: 44,
    name: 'hi-low',
    title: 'Hi Low',
    description: '',
    phaserVersion: '2.0.7',
    isPlayable: true,
    screenshots: [
      'hi-low.jpg'
    ],
    references: [
      'http://www.emanueleferonato.com/2014/08/28/phaser-tutorial-understanding-phaser-states/'
    ],
    tags: [],
    inspirations: [],
    demos: []
  },
  {
    id: 45,
    name: 'horror',
    title: 'Horror',
    description: '',
    phaserVersion: '2.1.2',
    isPlayable: true,
    screenshots: [
      'horror.jpg'
    ],
    references: [
      'http://www.emanueleferonato.com/2014/10/21/phaser-tutorial-how-to-create-an-html5-survival-horror-game-in-6-easy-steps/',
      'http://www.emanueleferonato.com/2014/10/10/a-quick-html5-survival-horror-prototype-made-with-phaser/',
      'http://www.emanueleferonato.com/tag/survival-horror/'
    ],
    tags: [],
    inspirations: [],
    demos: [
      'http://www.emanueleferonato.com/wp-content/uploads/2014/10/survival/'
    ]
  },
  {
    id: 46,
    name: 'horror-ray-casting',
    title: 'Horror Ray Casting',
    description: '',
    phaserVersion: '2.4.4',
    isPlayable: true,
    screenshots: [
      'horror-ray-casting.jpg'
    ],
    references: [
      'https://github.com/byronknoll/visibility-polygon-js',
      'http://www.byronknoll.com/visibility.html',
      'http://www.emanueleferonato.com/2015/02/03/play-with-light-and-dark-using-ray-casting-and-visibility-polygons/'
    ],
    tags: [],
    inspirations: [],
    demos: []
  },
  {
    id: 47,
    name: 'i-hate-rabbits',
    title: 'I Hate Rabbits',
    description: '',
    phaserVersion: '2.4.4',
    isPlayable: true,
    screenshots: [
      'i-hate-rabbits.jpg'
    ],
    references: [
      'http://www.lessmilk.com/games/9/'
    ],
    tags: [],
    inspirations: [],
    demos: []
  },
  {
    id: 48,
    name: 'infinite-runner',
    title: 'Infinite Runner',
    description: '',
    phaserVersion: '2.4.4',
    isPlayable: true,
    screenshots: [
      'infinite-runner.jpg'
    ],
    references: [
      'http://codepen.io/ebrewe/pen/MamqXM'
    ],
    tags: [],
    inspirations: [],
    demos: []
  },
  {
    id: 49,
    name: 'iromeku',
    title: 'Iromeku',
    description: '',
    phaserVersion: '2.4.4',
    isPlayable: true,
    screenshots: [
      'iromeku.jpg'
    ],
    references: [
      'http://www.emanueleferonato.com/2015/06/10/html5-prototype-of-the-iromeku-game-engine-made-with-phaser/',
      'http://www.emanueleferonato.com/2013/03/20/prototype-of-the-iromeku-game-engine/',
      'http://www.emanueleferonato.com/tag/iromeku/'
    ],
    tags: [],
    inspirations: [],
    demos: []
  },
  {
    id: 50,
    name: 'level-selection',
    title: 'Level Selection',
    description: '',
    phaserVersion: '2.4.4',
    isPlayable: true,
    screenshots: [
      'level-selection.jpg'
    ],
    references: [
      'http://www.emanueleferonato.com/2016/01/25/create-a-html5-level-select-screen-controlled-by-swipe-without-actually-checking-for-swipes/',
      'http://www.emanueleferonato.com/2016/02/04/create-a-html5-level-select-screen-controlled-by-swipe-new-feature-actually-selecting-a-level/',
      'http://www.emanueleferonato.com/2016/04/08/create-a-html5-level-select-screen-controlled-by-swipe-new-feature-navigation-with-page-thumbnails/',
      'http://www.emanueleferonato.com/2016/09/09/apply-transitions-between-your-phaser-states-with-a-single-line-of-code-thanks-to-state-transition-plugin/'
    ],
    tags: [],
    inspirations: [],
    demos: []
  },
  {
    id: 51,
    name: 'level-selection-with-locked-and-stars',
    title: 'Level Selection With Locked and Stars',
    description: '',
    phaserVersion: '2.4.4',
    isPlayable: true,
    screenshots: [
      'level-selection-with-locked-and-stars.jpg'
    ],
    references: [
      'http://www.emanueleferonato.com/2014/12/05/html5-phaser-tutorial-how-to-create-a-level-selection-screen-with-locked-levels-and-stars-finished-prototype/',
      'http://www.emanueleferonato.com/2014/11/21/html5-phaser-tutorial-how-to-create-a-level-selection-screen-with-locked-levels-and-stars/'
    ],
    tags: [],
    inspirations: [],
    demos: []
  },
  {
    id: 52,
    name: 'lighting',
    title: 'Lighting',
    description: '',
    phaserVersion: '2.4.4',
    isPlayable: true,
    screenshots: [
      'lighting.jpg'
    ],
    references: [
      'http://codepen.io/jdnic'
    ],
    tags: [],
    inspirations: [],
    demos: []
  },
  {
    id: 53,
    name: 'magick',
    title: 'Magick',
    description: '',
    phaserVersion: '2.4.4',
    isPlayable: true,
    screenshots: [
      'magick.jpg'
    ],
    references: [
      'http://www.emanueleferonato.com/2015/05/12/phaser-tutorial-html5-player-movement-as-seen-in-ipad-magick-game-using-mostly-tile-maps/',
      'http://www.emanueleferonato.com/tag/magick/'
    ],
    tags: [
      'player movement'
    ],
    inspirations: [
      'https://itunes.apple.com/us/app/magick/id657336338'
    ],
    demos: [
      'https://www.youtube.com/watch?v=WGeKW8gA3WM',
      'https://www.youtube.com/watch?v=gGRohOMgvDY'
    ]
  },
  {
    id: 54,
    name: 'man-vs-penguins',
    title: 'Man vs Penguins',
    description: '',
    phaserVersion: '2.4.4',
    isPlayable: false,
    screenshots: [
      'man-vs-penguins.jpg'
    ],
    references: [
      'http://www.lessmilk.com/games/4/'
    ],
    tags: [],
    inspirations: [],
    demos: []
  },
  {
    id: 55,
    name: 'mass-attack',
    title: 'Mass Attack',
    description: '',
    phaserVersion: '2.0.7',
    isPlayable: true,
    screenshots: [
      'mass-attack.jpg'
    ],
    references: [
      'http://www.emanueleferonato.com/2014/08/05/create-an-html5-game-like-mass-attack-with-phaser-just-using-tweens-well-almost/',
      'http://www.emanueleferonato.com/2017/09/19/mass-attack-html5-game-made-with-phaser-3-code-optimized-by-richard-davey/'
    ],
    tags: [],
    inspirations: [],
    demos: []
  },
  {
    id: 56,
    name: 'maze',
    title: 'Maze',
    description: '',
    phaserVersion: '2.4.4',
    isPlayable: true,
    screenshots: [
      'maze.jpg'
    ],
    references: [
      'http://www.emanueleferonato.com/2015/06/30/pure-javascript-perfect-tile-maze-generation-with-a-bit-of-magic-thanks-to-phaser/'
    ],
    tags: [],
    inspirations: [],
    demos: []
  },
  {
    id: 57,
    name: 'mikey-hooks',
    title: 'Mikey Hooks',
    description: '',
    phaserVersion: '2.4.4',
    isPlayable: true,
    screenshots: [
      'mikey-hooks.jpg'
    ],
    references: [
      'http://www.emanueleferonato.com/2015/09/29/html5-box2d-hook-like-the-one-seen-on-ios-mikey-hooks-game/',
      'http://www.emanueleferonato.com/2015/10/13/play-and-get-the-source-code-of-hookpod-a-flash-game-i-never-released/',
      'http://www.emanueleferonato.com/tag/mikey-hooks/'
    ],
    tags: [],
    inspirations: [
      'https://play.google.com/store/apps/details?id=com.noodlecake.mikeyhooks'
    ],
    demos: [
      'https://www.youtube.com/watch?v=aBsOanrh3Jk',
      'https://www.youtube.com/watch?v=yqdPRkMsroA'
    ]
  },
  {
    id: 58,
    name: 'monster-wants-candy',
    title: 'Monster Wants Candy',
    description: '',
    phaserVersion: '2.0.6',
    isPlayable: true,
    screenshots: [
      'monster-wants-candy.jpg'
    ],
    references: [
      'http://gamedevelopment.tutsplus.com/tutorials/getting-started-with-phaser-building-monster-wants-candy--cms-21723',
      'https://github.com/tutsplus/Monster-Wants-Candy-demo'
    ],
    tags: [],
    inspirations: [],
    demos: [
      'http://candy.enclavegames.com/'
    ]
  },
  {
    id: 59,
    name: 'one-plus-two-equal-three',
    title: '1 + 2 = 3',
    description: '',
    phaserVersion: '2.4.4',
    isPlayable: true,
    screenshots: [
      'one-plus-two-equal-three.jpg'
    ],
    references: [
      'http://www.emanueleferonato.com/2015/02/23/123-html5-game-made-in-100-lines-of-code-brackets-included-using-phaser/'
    ],
    tags: [],
    inspirations: [
      'https://itunes.apple.com/us/app/1+2-3/id953831664'
    ],
    demos: []
  },
  {
    id: 60,
    name: 'one-tap-rpg',
    title: 'One Tap RPG',
    description: '',
    phaserVersion: '2.0.7',
    isPlayable: true,
    screenshots: [
      'one-tap-rpg.jpg'
    ],
    references: [
      'http://www.emanueleferonato.com/2014/08/13/how-to-create-an-html5-rpg-physics-driven-game-with-phaser/',
      'http://www.emanueleferonato.com/tag/one-tap-rpg/'
    ],
    tags: [],
    inspirations: [
      'https://itunes.apple.com/it/app/id891234532'
    ],
    demos: []
  },
  {
    id: 61,
    name: 'orbital-debris',
    title: 'Orbital Debris',
    description: '',
    phaserVersion: '1.1.6',
    isPlayable: true,
    screenshots: [
      'orbital-debris.jpg'
    ],
    references: [
      'http://www.allworkallplay.org/blog/orbital-debris-making-an-html5-game-with-phaser'
    ],
    tags: [],
    inspirations: [],
    demos: []
  },
  {
    id: 62,
    name: 'pacman',
    title: 'Pacman',
    description: '',
    phaserVersion: '2.4.4',
    isPlayable: true,
    screenshots: [
      'pacman.jpg'
    ],
    references: [
      'http://phaser.io/tutorials/coding-tips-005'
    ],
    tags: [],
    inspirations: [],
    demos: []
  },
  {
    id: 63,
    name: 'pacman-2',
    title: 'Pacman 2',
    description: '',
    phaserVersion: '2.4.4',
    isPlayable: true,
    screenshots: [
      'pacman-2.jpg'
    ],
    references: [
      'https://github.com/plissken2013es/phaserPacmanClone',
      'http://gameinternals.com/post/2072558330/understanding-pac-man-ghost-behavior',
      'http://phaser.io/tutorials/coding-tips-005'
    ],
    tags: [],
    inspirations: [],
    demos: [
      'http://luisquin.com/lq/phaserPacman/index.html'
    ]
  },
  {
    id: 64,
    name: 'particle-storm',
    title: 'Particle Storm',
    description: '',
    phaserVersion: '2.4.4',
    isPlayable: true,
    screenshots: [
      'particle-storm.jpg'
    ],
    references: [
      'http://www.emanueleferonato.com/2015/10/08/create-stunning-html5-particle-effects-with-phaser-particle-storm/',
      'http://www.emanueleferonato.com/wp-content/uploads/2015/10/particle01/',
      'http://phaser.io/shop/plugins/particlestorm'
    ],
    tags: [],
    inspirations: [],
    demos: []
  },
  {
    id: 65,
    name: 'particle-to-sprite',
    title: 'Particle To Sprite',
    description: '',
    phaserVersion: '2.4.4',
    isPlayable: true,
    screenshots: [
      'particle-to-sprite.jpg'
    ],
    references: [
      'http://codepen.io/codevinsky/pen/aocsr'
    ],
    tags: [],
    inspirations: [],
    demos: []
  },
  {
    id: 66,
    name: 'paths-aliens',
    title: 'Paths - Aliens',
    description: '',
    phaserVersion: '2.4.4',
    isPlayable: true,
    screenshots: [
      'paths-aliens.jpg'
    ],
    references: [],
    tags: [],
    inspirations: [],
    demos: []
  },
  {
    id: 67,
    name: 'paths-face',
    title: 'Paths - Face',
    description: '',
    phaserVersion: '2.4.4',
    isPlayable: true,
    screenshots: [
      'paths-face.jpg'
    ],
    references: [],
    tags: [],
    inspirations: [],
    demos: []
  },
  {
    id: 68,
    name: 'paths-paths',
    title: 'Paths - Paths',
    description: '',
    phaserVersion: '2.4.4',
    isPlayable: true,
    screenshots: [
      'paths-paths.jpg'
    ],
    references: [],
    tags: [],
    inspirations: [],
    demos: []
  },
  {
    id: 69,
    name: 'phshare',
    title: 'Phshare',
    description: 'Sorry, I can not remember the source',
    phaserVersion: '2.4.4',
    isPlayable: true,
    screenshots: [
      'phshare.jpg'
    ],
    references: [],
    tags: [],
    inspirations: [],
    demos: []
  },
  {
    id: 70,
    name: 'pixel-war',
    title: 'Pixel War',
    description: '',
    phaserVersion: '2.4.4',
    isPlayable: true,
    screenshots: [
      'pixel-war.jpg'
    ],
    references: [
      'http://www.lessmilk.com/games/2/'
    ],
    tags: [],
    inspirations: [],
    demos: []
  },
  {
    id: 71,
    name: 'platformer',
    title: 'Platformer',
    description: '',
    phaserVersion: '2.4.4',
    isPlayable: true,
    screenshots: [
      'platformer.jpg'
    ],
    references: [
      'http://phaser.io/tutorials/making-your-first-phaser-game/index'
    ],
    tags: [],
    inspirations: [],
    demos: []
  },
  {
    id: 72,
    name: 'platformer-2',
    title: 'Platformer 2',
    description: '',
    phaserVersion: '2.4.4',
    isPlayable: true,
    screenshots: [
      'platformer-2.jpg'
    ],
    references: [
      'http://phaser.io/tutorials/coding-tips-004'
    ],
    tags: [],
    inspirations: [],
    demos: []
  },
  {
    id: 73,
    name: 'pong',
    title: 'Pong',
    description: '',
    phaserVersion: '2.4.4',
    isPlayable: true,
    screenshots: [
      'pong.jpg'
    ],
    references: [
      'https://github.com/zekechan/phaser-html5-tutorial-pong'
    ],
    tags: [],
    inspirations: [],
    demos: []
  },
  {
    id: 74,
    name: 'princess-quest',
    title: 'Princess Quest',
    description: '',
    phaserVersion: '2.4.4',
    isPlayable: false,
    screenshots: [
      'princess-quest.jpg'
    ],
    references: [
      'http://www.lessmilk.com/games/6/'
    ],
    tags: [],
    inspirations: [],
    demos: []
  },
  {
    id: 75,
    name: 'radical',
    title: 'Radical',
    description: '',
    phaserVersion: '2.4.4',
    isPlayable: true,
    screenshots: [
      'radical.jpg'
    ],
    references: [
      'http://www.emanueleferonato.com/2015/11/13/creation-of-an-html5-game-like-radical-using-phaser-and-arcade-physics-step-1/',
      'http://www.emanueleferonato.com/2015/11/25/creation-of-an-html5-game-like-radical-using-phaser-and-arcade-physics-step-2/',
      'http://www.emanueleferonato.com/tag/radical/'
    ],
    tags: [],
    inspirations: [
      'https://itunes.apple.com/us/app/radical/id919034275'
    ],
    demos: []
  },
  {
    id: 76,
    name: 'rise-above',
    title: 'Rise Above',
    description: '',
    phaserVersion: '2.4.4',
    isPlayable: false,
    screenshots: [
      'rise-above.jpg'
    ],
    references: [
      'http://www.emanueleferonato.com/2015/12/24/new-minibook-released-create-html5-vertical-endless-runner-cross-platform-games/',
      'http://www.emanueleferonato.com/2015/11/11/creation-of-an-html5-game-like-rise-above-using-phaser-and-arcade-physics-step-2/',
      'http://www.emanueleferonato.com/2015/10/23/creation-of-an-html5-game-like-rise-above-using-phaser-and-arcade-physics-step-1/',
      'http://www.emanueleferonato.com/tag/rise-above/'
    ],
    tags: [],
    inspirations: [
      'https://itunes.apple.com/nz/app/rise-above/id1039989390'
    ],
    demos: [
      'http://www.emanueleferonato.com/wp-content/uploads/2015/12/riseabove/'
    ]
  },
  {
    id: 77,
    name: 'run',
    title: 'Run',
    description: '',
    phaserVersion: '2.4.4',
    isPlayable: true,
    screenshots: [
      'run.jpg'
    ],
    references: [
      'http://www.lessmilk.com/games/1/'
    ],
    tags: [],
    inspirations: [],
    demos: []
  },
  {
    id: 78,
    name: 'rush-hour',
    title: 'Rush Hour',
    description: '',
    phaserVersion: '2.4.4',
    isPlayable: true,
    screenshots: [
      'rush-hour.jpg'
    ],
    references: [
      'http://www.emanueleferonato.com/2015/08/27/learn-how-phaser-manages-draggable-objects-by-making-the-html5-engine-behind-rush-hour-game/'
    ],
    tags: [],
    inspirations: [],
    demos: [
      'http://www.thinkfun.com/play-online/rush-hour/'
    ]
  },
  {
    id: 79,
    name: 'santa-on-the-run',
    title: 'Santa On The Run',
    description: '',
    phaserVersion: '2.4.4',
    isPlayable: true,
    screenshots: [
      'santa-on-the-run.jpg'
    ],
    references: [
      'http://codepen.io/natewiley/pen/gbwWMX'
    ],
    tags: [],
    inspirations: [],
    demos: []
  },
  {
    id: 80,
    name: 'save-the-city',
    title: 'Save the City',
    description: '',
    phaserVersion: '2.4.4',
    isPlayable: false,
    screenshots: [
      'save-the-city.jpg'
    ],
    references: [
      'http://www.lessmilk.com/games/8/'
    ],
    tags: [],
    inspirations: [],
    demos: []
  },
  {
    id: 81,
    name: 'screenshake',
    title: 'Screenshake',
    description: '',
    phaserVersion: '2.4.4',
    isPlayable: true,
    screenshots: [
      'screenshake.jpg'
    ],
    references: [
      'http://codepen.io/Problematic/pen/dPvBZN',
      'https://github.com/dmaslov/phaser-screen-shake',
      'https://github.com/dmaslov/super-coin-box'
    ],
    tags: [],
    inspirations: [],
    demos: []
  },
  {
    id: 82,
    name: 'sea-life-vs-mines',
    title: 'Sea Life Vs Mines',
    description: '',
    phaserVersion: '2.4.4',
    isPlayable: true,
    screenshots: [
      'sea-life-vs-mines.jpg'
    ],
    references: [
      'http://www.emanueleferonato.com/2014/10/07/how-to-bring-your-html5-games-title-screen-to-life-in-a-minute-with-phaser/'
    ],
    tags: [
      'game title'
    ],
    inspirations: [],
    demos: []
  },
  {
    id: 83,
    name: 'shootout',
    title: 'Shootout',
    description: '',
    phaserVersion: '2.4.4',
    isPlayable: true,
    screenshots: [
      'shootout.jpg'
    ],
    references: [
      'http://phaser.io/tutorials/coding-tips-006'
    ],
    tags: [],
    inspirations: [],
    demos: []
  },
  {
    id: 84,
    name: 'sokoban-responsive',
    title: 'Sokoban Responsive',
    description: '',
    phaserVersion: '2.4.4',
    isPlayable: true,
    screenshots: [
      'sokoban-responsive.jpg'
    ],
    references: [
      'http://www.emanueleferonato.com/2015/02/26/the-basics-of-responsive-html5-games/',
      'http://www.emanueleferonato.com/tag/sokoban/'
    ],
    tags: [
      'responsive'
    ],
    inspirations: [],
    demos: []
  },
  {
    id: 85,
    name: 'sokoban-swipe',
    title: 'Sokoban Swipe',
    description: '',
    phaserVersion: '2.4.4',
    isPlayable: true,
    screenshots: [
      'sokoban-swipe.jpg'
    ],
    references: [
      'http://www.emanueleferonato.com/2014/11/13/html5-swipe-controlled-sokoban-game-made-with-phaser'
    ],
    tags: [],
    inspirations: [],
    demos: []
  },
  {
    id: 86,
    name: 'space-hipster',
    title: 'Space Hipster',
    description: '',
    phaserVersion: '2.4.4',
    isPlayable: true,
    screenshots: [
      'space-hipster.jpg'
    ],
    references: [
      'https://gamedevacademy.org/html5-phaser-tutorial-spacehipster-a-space-exploration-game/'
    ],
    tags: [],
    inspirations: [],
    demos: []
  },
  {
    id: 87,
    name: 'space-is-key',
    title: 'Space is Key',
    description: '',
    phaserVersion: '2.4.4',
    isPlayable: true,
    screenshots: [
      'space-is-key.jpg'
    ],
    references: [
      'http://www.emanueleferonato.com/2014/02/01/create-an-html5-game-like-space-is-key-with-a-lot-of-room-for-customization-step-2-adding-obstacles/',
      'http://www.emanueleferonato.com/2014/01/15/create-an-html5-game-like-space-is-key-with-a-lot-of-room-for-customization/',
      'http://www.emanueleferonato.com/tag/space-is-key/'
    ],
    tags: [],
    inspirations: [
      'http://www.kongregate.com/games/chrisjeff/space-is-key'
    ],
    demos: []
  },
  {
    id: 88,
    name: 'spellfall',
    title: 'Spellfall',
    description: '',
    phaserVersion: '2.0.7',
    isPlayable: true,
    screenshots: [
      'spellfall.jpg'
    ],
    references: [
      'http://www.emanueleferonato.com/2014/08/19/how-to-create-an-html5-swap-and-match-3-game-engine-like-the-one-used-in-spellfall-ios-game-using-phaser/',
      'http://www.emanueleferonato.com/tag/spellfall/'
    ],
    tags: [],
    inspirations: [
      'https://itunes.apple.com/gb/app/spellfall-puzzle-rpg/id809027853'
    ],
    demos: []
  },
  {
    id: 89,
    name: 'spin-wheel',
    title: 'Spin Wheel',
    description: '',
    phaserVersion: '2.4.4',
    isPlayable: true,
    screenshots: [
      'spin-wheel.jpg'
    ],
    references: [
      'http://www.emanueleferonato.com/2015/07/31/create-a-wheel-of-fortune-for-your-html5-games-with-phaser-in-only-a-few-lines/',
      'http://www.emanueleferonato.com/tag/wheel-of-fortune/'
    ],
    tags: [],
    inspirations: [],
    demos: []
  },
  {
    id: 90,
    name: 'splashscreen',
    title: 'Splashscreen',
    description: '',
    phaserVersion: '2.4.4',
    isPlayable: true,
    screenshots: [
      'splashscreen.jpg'
    ],
    references: [],
    tags: [],
    inspirations: [],
    demos: []
  },
  {
    id: 91,
    name: 'spring-ninja',
    title: 'Spring Ninja',
    description: '',
    phaserVersion: '2.4.4',
    isPlayable: true,
    screenshots: [
      'spring-ninja.jpg'
    ],
    references: [
      'http://www.emanueleferonato.com/2015/03/16/html5-prototype-of-an-endless-runner-game-like-spring-ninja/',
      'http://www.emanueleferonato.com/tag/a-jumping-block/'
    ],
    tags: [],
    inspirations: [
      'https://itunes.apple.com/us/app/spring-ninja/id963980545'
    ],
    demos: []
  },
  {
    id: 92,
    name: 'spring-ninja-double-jump',
    title: 'Spring Ninja Double Jump',
    description: '',
    phaserVersion: '2.4.4',
    isPlayable: true,
    screenshots: [
      'spring-ninja-double-jump.jpg'
    ],
    references: [
      'http://www.emanueleferonato.com/2015/06/12/the-basics-of-double-jump-concept-in-an-endless-runner-game-like-spring-ninja/',
      'http://www.emanueleferonato.com/2015/03/20/html5-spring-ninja-game-update-bug-fix/',
      'http://www.emanueleferonato.com/2015/03/16/html5-prototype-of-an-endless-runner-game-like-spring-ninja/'
    ],
    tags: [],
    inspirations: [],
    demos: []
  },
  {
    id: 93,
    name: 'state-transition-plugin',
    title: 'State Transition Plugin',
    description: '',
    phaserVersion: '2.4.4',
    isPlayable: true,
    screenshots: [
      'state-transition-plugin.jpg'
    ],
    references: [
      'https://github.com/aaccurso/phaser-state-transition-plugin'
    ],
    tags: [
      'state transition'
    ],
    inspirations: [],
    demos: [
      'http://aaccurso.github.io/phaser-state-transition-plugin/demo/'
    ]
  },
  {
    id: 94,
    name: 'straight-rush',
    title: 'Straight Rush',
    description: '',
    phaserVersion: '2.0.7',
    isPlayable: true,
    screenshots: [
      'straight-rush.jpg'
    ],
    references: [
      'http://www.emanueleferonato.com/2014/07/30/html5-one-button-minigame-prototype-made-with-phaser/',
      'http://www.emanueleferonato.com/tag/one-button-game/'
    ],
    tags: [],
    inspirations: [],
    demos: []
  },
  {
    id: 95,
    name: 'string-avoider',
    title: 'String Avoider',
    description: '',
    phaserVersion: '2.4.4',
    isPlayable: true,
    screenshots: [
      'string-avoider.jpg'
    ],
    references: [
      'http://www.emanueleferonato.com/2014/06/10/html5-string-avoider-game-made-with-phaser/'
    ],
    tags: [],
    inspirations: [],
    demos: [
      'http://www.kongregate.com/games/triqui/stringy'
    ]
  },
  {
    id: 96,
    name: 'string-avoider-2',
    title: 'String Avoider 2',
    description: '',
    phaserVersion: '2.4.4',
    isPlayable: true,
    screenshots: [
      'string-avoider-2.jpg'
    ],
    references: [
      'http://www.emanueleferonato.com/2014/12/15/phaser-tutorial-creation-of-an-html5-string-avoider-prototype-working-on-mobile-devices-too/'
    ],
    tags: [],
    inspirations: [],
    demos: [
      'http://www.emanueleferonato.com/wp-content/uploads/2014/12/avoider/'
    ]
  },
  {
    id: 97,
    name: 'super-coin-box',
    title: 'Super Coin Box',
    description: '',
    phaserVersion: '2.4.4',
    isPlayable: true,
    screenshots: [
      'super-coin-box.jpg'
    ],
    references: [
      'https://github.com/dmaslov/super-coin-box'
    ],
    tags: [],
    inspirations: [],
    demos: [
      'http://dmaslov.github.io/super-coin-box/'
    ]
  },
  {
    id: 98,
    name: 'tank',
    title: 'Tank',
    description: '',
    phaserVersion: '2.4.4',
    isPlayable: true,
    screenshots: [
      'tank.jpg'
    ],
    references: [
      'http://phaser.io/tutorials/coding-tips-002/'
    ],
    tags: [],
    inspirations: [],
    demos: []
  },
  {
    id: 99,
    name: 'the-next-arrow',
    title: 'The Next Arrow',
    description: '',
    phaserVersion: '2.4.4',
    isPlayable: true,
    screenshots: [
      'the-next-arrow.jpg'
    ],
    references: [
      'http://www.emanueleferonato.com/2015/05/18/create-an-html5-game-like-the-next-arrow-using-phaser/',
      'http://www.emanueleferonato.com/tag/the-next-arrow/'
    ],
    tags: [],
    inspirations: [
      'https://itunes.apple.com/us/app/the-next-arrow/id951476189'
    ],
    demos: [
      'https://www.youtube.com/watch?v=NhvY3LOUZ3E'
    ]
  },
  {
    id: 100,
    name: 'the-three-hearths',
    title: 'The Three Hearths',
    description: '',
    phaserVersion: '2.4.4',
    isPlayable: false,
    screenshots: [
      'the-three-hearths.jpg'
    ],
    references: [
      'http://www.lessmilk.com/games/11/'
    ],
    tags: [],
    inspirations: [],
    demos: []
  },
  {
    id: 101,
    name: 'totem-destroyer',
    title: 'Totem Destroyer',
    description: '',
    phaserVersion: '2.4.4',
    isPlayable: true,
    screenshots: [
      'totem-destroyer.jpg'
    ],
    references: [
      'http://www.emanueleferonato.com/wp-content/uploads/2014/04/totem/',
      'http://www.emanueleferonato.com/2014/04/21/html5-totem-destroyer-fully-working-prototype-using-phaser/',
      'http://www.emanueleferonato.com/2014/02/13/complete-html5-totem-destroyer-engine-using-physicsjs/'
    ],
    tags: [],
    inspirations: [],
    demos: []
  },
  {
    id: 102,
    name: 'trick-shot',
    title: 'Trick Shot',
    description: '',
    phaserVersion: '2.4.4',
    isPlayable: true,
    screenshots: [
      'trick-shot.jpg'
    ],
    references: [
      'http://www.emanueleferonato.com/wp-content/uploads/2015/09/trickshot3/',
      'http://www.emanueleferonato.com/2015/09/16/trick-shot-html5-game-prototype-part-3-handling-collisions/',
      'http://www.emanueleferonato.com/tag/trick-shot/'
    ],
    tags: [],
    inspirations: [
      'https://itunes.apple.com/us/app/trick-shot/id1016915419'
    ],
    demos: []
  },
  {
    id: 103,
    name: 'two-cars',
    title: 'Two Cars',
    description: '',
    phaserVersion: '2.4.4',
    isPlayable: true,
    screenshots: [
      'two-cars.jpg'
    ],
    references: [
      'http://www.emanueleferonato.com/2015/11/03/2-cars-html5-prototype-part-ii-adding-targets-and-steering/',
      'http://www.emanueleferonato.com/2015/10/26/creation-of-a-2-cars-html-prototype-using-phaser-and-arcade-physics/',
      'http://www.emanueleferonato.com/tag/2-cars/'
    ],
    tags: [],
    inspirations: [],
    demos: []
  },
  {
    id: 104,
    name: 'webfont',
    title: 'Webfont',
    description: '',
    phaserVersion: '2.4.4',
    isPlayable: true,
    screenshots: [
      'webfont.jpg'
    ],
    references: [],
    tags: [],
    inspirations: [],
    demos: []
  },
  {
    id: 105,
    name: '123',
    title: '123',
    description: '1+2=3',
    phaserVersion: '2.2.2',
    isPlayable: true,
    screenshots: [
      '123.jpg'
    ],
    references: [
      'http://www.emanueleferonato.com/tag/123/'
    ],
    tags: [],
    inspirations: [
      'https://itunes.apple.com/us/app/1+2-3/id953831664?mt=8'
    ],
    demos: []
  },
  {
    id: 106,
    name: 'guessnext',
    title: 'GuessNext',
    description: '',
    phaserVersion: '2.6.2',
    isPlayable: true,
    screenshots: [
      'guessnext.jpg'
    ],
    references: [
      'http://www.emanueleferonato.com/2017/03/10/html5-deck-of-cards-management-a-first-simple-game/'
    ],
    tags: [],
    inspirations: [],
    demos: []
  },
  {
    id: 107,
    name: 'dungeon-raid',
    title: 'Dungeon Raid',
    description: 'Dots game using "Dungeon Raid" engine',
    phaserVersion: '2.6.2',
    isPlayable: true,
    screenshots: [
      'dungeon-raid.jpg'
    ],
    references: [
      'http://www.emanueleferonato.com/tag/dungeon-raid/'
    ],
    tags: [],
    inspirations: [
      'http://dungeonraid.atspace.com/',
      'https://itunes.apple.com/in/app/dots-a-game-about-connecting/id632285588?mt=8'
    ],
    demos: []
  },
  {
    id: 108,
    name: 'samegame',
    title: 'Samegame',
    description: '',
    phaserVersion: '2.6.2',
    isPlayable: true,
    screenshots: [
      'samegame.jpg'
    ],
    references: [
      'http://www.emanueleferonato.com/2016/11/17/html5-endless-samegame-engine-with-object-pooling-made-with-phaser/',
      'http://www.emanueleferonato.com/2016/10/13/10-successful-games-you-can-easily-create-starting-from-the-samegame-engine/',
      'http://www.emanueleferonato.com/tag/samegame/',
      'http://www.emanueleferonato.com/tag/knightfall/'
    ],
    tags: [],
    inspirations: [
      'http://www.kongregate.com/games/megadev/knightfall'
    ],
    demos: []
  },
  {
    id: 109,
    name: 'revenge',
    title: 'Revenge',
    description: '',
    phaserVersion: '2.6.2',
    isPlayable: true,
    screenshots: [
      'revenge.jpg'
    ],
    references: [
      'http://www.emanueleferonato.com/tag/planet-revenge/'
    ],
    tags: [],
    inspirations: [
      'https://itunes.apple.com/us/app/planet-revenge/id1018002797?mt=8'
    ],
    demos: []
  },
  {
    id: 110,
    name: 'square-one',
    title: 'Square One',
    description: 'Back to Square One',
    phaserVersion: '2.6.2',
    isPlayable: true,
    screenshots: [
      'square-one.jpg'
    ],
    references: [
      'http://www.emanueleferonato.com/2016/08/25/html5-back-to-square-one-prototype-made-with-phaser-adding-enemies/',
      'http://www.emanueleferonato.com/tag/back-to-square-one/'
    ],
    tags: [],
    inspirations: [

    ],
    demos: []
  },
  {
    id: 111,
    name: 'circle-path',
    title: 'Circle Path',
    description: '',
    phaserVersion: '2.6.2',
    isPlayable: true,
    screenshots: [
      'circle-path.jpg'
    ],
    references: [
      'http://www.emanueleferonato.com/2016/02/11/html5-prototype-of-ios-game-circle-path-made-with-phaser/',
      'http://www.emanueleferonato.com/tag/circle-path/'
    ],
    tags: [],
    inspirations: [
      'https://itunes.apple.com/us/app/circle-path/id1059393542?mt=8'
    ],
    demos: []
  },
  {
    id: 112,
    name: 'flipping-legend',
    title: 'Flipping Legend',
    description: '',
    phaserVersion: '2.6.2',
    isPlayable: true,
    screenshots: [
      'flipping-legend.jpg'
    ],
    references: [
      'http://www.emanueleferonato.com/2017/08/01/html5-prototype-of-mobile-hit-flipping-legend-with-top-down-view-made-with-phaser-adding-holes/',
      'http://www.emanueleferonato.com/tag/flipping-legend/'
    ],
    tags: [],
    inspirations: [
      'https://play.google.com/store/apps/details?id=com.noodlecake.flippinglegend&hl=en'
    ],
    demos: []
  },
  {
    id: 113,
    name: 'mike-dangers',
    title: 'Mike Dangers',
    description: '',
    phaserVersion: '2.6.2',
    isPlayable: true,
    screenshots: [
      'mike-dangers.jpg'
    ],
    references: [
      'http://www.emanueleferonato.com/2017/06/12/play-ladderz-the-complete-html5-game-based-on-mike-dangers-concept/',
      'http://www.emanueleferonato.com/tag/mike-dangers/'
    ],
    tags: [],
    inspirations: [
      'https://play.google.com/store/apps/details?id=com.wildbeep.mikedangers&hl=en'
    ],
    demos: []
  },
  {
    id: 114,
    name: 'memdot',
    title: 'Memdot',
    description: '',
    phaserVersion: '2.6.2',
    isPlayable: true,
    screenshots: [
      'memdot.jpg'
    ],
    references: [
      'http://www.emanueleferonato.com/2016/09/22/create-the-html5-engine-behind-ios-hit-memdot-with-phaser-step-2-a-game-prototype/',
      'http://www.emanueleferonato.com/tag/memdot/'
    ],
    tags: [],
    inspirations: [
      'https://itunes.apple.com/us/app/memdot/id1119470318?mt=8'
    ],
    demos: []
  },
  {
    id: 115,
    name: 'pop-the-lock',
    title: 'Pop the Lock',
    description: '',
    phaserVersion: '2.6.2',
    isPlayable: true,
    screenshots: [
      'pop-the-lock.jpg'
    ],
    references: [
      'http://www.emanueleferonato.com/2016/03/22/html5-prototype-of-pop-the-lock-ios-blockbuster-using-phaser-step-2/',
      'http://www.emanueleferonato.com/tag/pop-the-lock/'
    ],
    tags: [],
    inspirations: [
      'https://play.google.com/store/apps/details?id=com.sm.popTheLock&hl=en',
      'https://itunes.apple.com/us/app/pop-the-lock/id979100082?mt=8'
    ],
    demos: []
  },
  {
    id: 116,
    name: 'perfect-square',
    title: 'Perfect Square',
    description: '',
    phaserVersion: '2.6.2',
    isPlayable: true,
    screenshots: [
      'perfect-square.jpg'
    ],
    references: [
      'http://www.emanueleferonato.com/2016/04/06/html5-prototype-of-ios-game-perfect-square-step-3-adding-in-game-instructions-and-scaling-the-game-for-any-resolution/',
      'http://www.emanueleferonato.com/tag/perfect-square/'
    ],
    tags: [],
    inspirations: [
      'https://itunes.apple.com/us/app/perfect-square/id1073059261?mt=8'
    ],
    demos: []
  },
  {
    id: 117,
    name: 'wall-jump',
    title: 'Wall jump',
    description: '',
    phaserVersion: '2.6.2',
    isPlayable: true,
    screenshots: [
      'wall-jump.jpg'
    ],
    references: [
      'http://www.emanueleferonato.com/2017/06/16/the-basics-behind-wall-jump-in-platform-games-html5-prototype-made-with-phaser-and-arcade-physics/'
    ],
    tags: [],
    inspirations: [],
    demos: []
  },
  {
    id: 118,
    name: 'twin-spin',
    title: 'TwinSpin',
    description: '',
    phaserVersion: '2.6.2',
    isPlayable: true,
    screenshots: [
      'twin-spin.jpg'
    ],
    references: [
      'http://www.emanueleferonato.com/tag/twinspin/'
    ],
    tags: [],
    inspirations: [],
    demos: []
  },
  {
    id: 119,
    name: 'zhed',
    title: 'Zhed',
    description: '',
    phaserVersion: '2.6.2',
    isPlayable: true,
    screenshots: [
      'zhed.jpg'
    ],
    references: [
      'http://www.emanueleferonato.com/2017/05/11/html5-prototype-of-ios-zhed-puzzle-game-with-10-playable-levels-made-with-phaser/',
      'http://www.emanueleferonato.com/tag/zhed/'
    ],
    tags: [],
    inspirations: [],
    demos: []
  },
  {
    id: 120,
    name: 'yeah-bunny',
    title: 'Yeah Bunny',
    description: '',
    phaserVersion: '2.6.2',
    isPlayable: true,
    screenshots: [
      'yeah-bunny.jpg'
    ],
    references: [
      'http://www.emanueleferonato.com/2017/06/21/html5-platformer-prototype-inspired-by-ios-hit-yeah-bunny-thanks-to-phaser-and-arcade-physics/',
      'http://www.emanueleferonato.com/tag/yeah-bunny/'
    ],
    tags: [],
    inspirations: [],
    demos: []
  }
];

function debugGameObject() {
  var nGames = games.length;
  var i = 0;

  console.log('nGames', nGames);
  for (i = 0; i < nGames; i++) {
    var text = `i: ${i}, id: ${games[i].id}, ${games[i].name}`;
    console.log(text);
  }
}

debugGameObject();
