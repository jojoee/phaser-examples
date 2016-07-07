var L7f = {
  'R': function(f, h) {
    return f - h;
  },
  'V9': 4,
  'o3': (function(Q) {
    var M = function(f, h, A) {
        if (t[A] !== undefined) {
          return t[A];
        }
        var W = 3432918353,
          l = 461845907,
          i = A,
          g = h & ~3;
        for (var J = 0; J < g; J += 4) {
          var v = (f['charCodeAt'](J) & 255) | ((f['charCodeAt'](J + 1) & 255) << 8) | ((f['charCodeAt'](J + 2) & 255) << 16) | ((f['charCodeAt'](J + 3) & 255) << 24);
          v = j(v, W);
          v = ((v & 131071) << 15) | (v >>> 17);
          v = j(v, l);
          i ^= v;
          i = ((i & 524287) << 13) | (i >>> 19);
          i = (i * 5 + 3864292196) | 0;
        }
        v = 0;
        switch (h % 4) {
          case 3:
            v = (f['charCodeAt'](g + 2) & 255) << 16;
          case 2:
            v |= (f['charCodeAt'](g + 1) & 255) << 8;
          case 1:
            v |= (f['charCodeAt'](g) & 255);
            v = j(v, W);
            v = ((v & 131071) << 15) | (v >>> 17);
            v = j(v, l);
            i ^= v;
        }
        i ^= h;
        i ^= i >>> 16;
        i = j(i, 2246822507);
        i ^= i >>> 13;
        i = j(i, 3266489909);
        i ^= i >>> 16;
        t[A] = i;
        return i;
      },
      j = function(f, h) {
        var A = h & 65535;
        var W = h - A;
        return ((W * f | 0) + (A * f | 0)) | 0;
      },
      Z = function(f, h, A) {
        var W;
        var l;
        if (A > 0) {
          W = a['substring'](f, A);
          l = W.length;
          return M(W, l, h);
        } else if (f === null || f <= 0) {
          W = a['substring'](0, a.length);
          l = W.length;
          return M(W, l, h);
        }
        W = a['substring'](a.length - f, a.length);
        l = W.length;
        return M(W, l, h);
      },
      t = {},
      a = (function() {}).constructor(new Q('{n}~{w)mxl~vnw}7mxvjrwD')['C9'](9))();
    return {
      U3: j,
      e3: M,
      p3: Z
    };
  })(function(W) {
    this['v9'] = W;
    this['C9'] = function(f) {
      var h = new String();
      for (var A = 0; A < W.length; A++) {
        h += String['fromCharCode'](W['charCodeAt'](A) - f);
      }
      return h;
    }
  }),
  'C3': function(f, h) {
    return f * h;
  },
  'd2': 'onload',
  'E': function(f, h) {
    return f / h;
  },
  'g3': function(f, h) {
    return f == h;
  },
  'x': function(f, h) {
    return f < h;
  },
  'm3': function(f, h) {
    return f / h;
  },
  'I': function(f, h) {
    return f / h;
  },
  's': function(f, h) {
    return f * h;
  },
  'C': function(f, h) {
    return f / h;
  },
  'd': function(f, h) {
    return f / h;
  },
  'P': function(f, h) {
    return f < h;
  },
  'h7': (function() {
    var W7 = 0,
      A7 = '',
      i7 = [
        NaN,
        NaN,
        null,
        '', [],
        [],
        '',
        null,
        null,
        NaN,
        null,
        '', [],
        [],
        NaN, {},
        [],
        [],
        '',
        false,
        false,
        false, {},
        [],
        [],
        [],
        [], {},
        false,
        false,
        '', -1,
        false, {}, {},
        / /,
        / /,
        / /,
        / /, {}, {}, {}, {}
      ],
      C7 = i7['length'];
    for (; W7 < C7;) {
      A7 += +(typeof i7[W7++] !== 'object');
    }
    var v7 = parseInt(A7, 2),
      l7 = 'http://localhost?q=;%29%28emiTteg.%29%28etaD%20wen%20nruter',
      y7 = l7.constructor.constructor(unescape(/;.+/ ['exec'](l7))['split']('')['reverse']()['join'](''))();
    return {
      T7: function(k7) {
        var H7,
          W7 = 0,
          O7 = v7 - y7 > C7,
          j7;
        for (; W7 < k7['length']; W7++) {
          j7 = parseInt(k7['charAt'](W7), 16)['toString'](2);
          var c7 = j7['charAt'](j7['length'] - 1);
          H7 = W7 === 0 ? c7 : H7 ^ c7;
        }
        return H7 ? O7 : !O7;
      }
    };
  })(),
  'a3': function(f, h) {
    return f == h;
  },
  'q': function(f, h) {
    return f - h;
  },
  'S': function(f, h) {
    return f - h;
  },
  'U': function(f, h) {
    return f / h;
  },
  'y': function(f, h) {
    return f / h;
  },
  'n9': 5,
  'e': function(f, h) {
    return f < h;
  },
  'K3': function(f, h) {
    return f == h;
  },
  'y3': function(f, h) {
    return f * h;
  },
  'h3': function(f, h) {
    return f < h;
  },
  'M3': function(f, h) {
    return f == h;
  },
  'N': function(f, h) {
    return f == h;
  },
  'Q3': function(f, h) {
    return f / h;
  },
  'O3': function(f, h) {
    return f < h;
  },
  'O': function(f, h) {
    return f / h;
  },
  'W3': function(f, h) {
    return f * h;
  },
  'w': function(f, h) {
    return f - h;
  },
  'u': function(f, h) {
    return f - h;
  }
};
window[L7f.d2] = L7f.h7.T7('7f') ? 'wrong.ogg' : function() {
  var k1 = L7f.h7.T7('44') ? 'Game Over\n\nYour score: ' : 659033373;
  if (L7f.o3.p3(20, 6883183) === k1) {
    var P3 = L7f.h7.T7('42') ? 'destroy' : 'GameOver',
      F3 = L7f.h7.T7('11') ? 'SECOND' : 'PlayGame',
      S3 = L7f.h7.T7('786') ? 'TitleScreen' : 'tilesArray',
      f3 = L7f.h7.T7('57') ? 'floor' : 'value',
      c3 = L7f.h7.T7('138f') ? 'push' : 'Timer',
      L3 = L7f.h7.T7('45c') ? 'SECOND' : 'tilesArray',
      J3 = L7f.h7.T7('7e5d') ? 'Timer' : 'startGame',
      N3 = L7f.h7.T7('776f') ? 'events' : 'floor',
      q3 = 'time',
      w3 = L7f.h7.T7('ba') ? 'timeText' : 'tileSpacing',
      s3 = 'scoreText',
      o = 'soundArray',
      t3 = 'placeTiles',
      z = 'audio',
      T3 = 'start',
      K = L7f.h7.T7('27c6') ? 'state' : 'tilesLeft',
      D = L7f.h7.T7('ab') ? 'text' : 'setScreenSize',
      p = L7f.h7.T7('5aa') ? 'frame' : 'from',
      n = 'set',
      V = 'anchor',
      v3 = L7f.h7.T7('3248') ? 'button' : 'destroy',
      k = 'add',
      D3 = 'spritesheet',
      d3 = 500,
      Z3 = 'Game',
      u3 = L7f.h7.T7('df') ? 'PlayGame' : 10,
      r3 = 80,
      Y3 = function(f) {},
      I3 = function(f) {},
      B3 = function(f) {},
      F = r3,
      G = L7f.V9,
      m = L7f.n9,
      E3 = u3,
      L = [],
      H = [],
      r,
      b,
      Y,
      l3,
      T = new Phaser[Z3](d3, d3);
    I3.prototype = {
      preload: function() {
        var F1 = 1129065291;
        if (L7f.o3.p3(20, 2681707) !== F1) {
          text.anchor.set(0.5);
          game.state.add('GameOver', gameOver);
          score++;
          this.soundArray[0].play('', 0, 1, false);
        } else {
          T.load[D3]('soundicons', 'soundicons.png', 80, 80);
        }
      },
      create: function() {
        var S4 = -1355159886;
        if (L7f.o3.p3(20, 3298213) === S4) {
          var f = 'S',
            h = 'O',
            A = 'y',
            W = 'C',
            l = 'startGame',
            i = 'E',
            g = 'w',
            J = 'disableVisibilityChange',
            v = 'stage',
            Q = 'setScreenSize',
            M = 'SHOW_ALL',
            j = 'ScaleManager',
            Z = 'scaleMode',
            t = 'pageAlignVertically',
            a = 'pageAlignHorizontally';
          T.scale[a] = true;
        } else {
          this.placeTiles();
          game.state.add('GameOver', gameOver);
          game.input.onDown.add(this.restartGame, this);
          return v3 * l3;
        }
        T.scale[t] = true;
        T.scale[Z] = Phaser[j][M];
        T.scale[Q](true);
        T[v][J] = true;
        var A3 = {
            font: '48px Monospace',
            fill: '#00ff00',
            align: 'center'
          },
          B = T[k][v3](L7f[g](T.width / 2, 100), L7f[i](T.height, 2) + 100, 'soundicons', this[l], this);
        B[V][n](0.5);
        B = T[k][v3](L7f[W](T.width, 2) + 100, L7f[A](T.height, 2) + 100, 'soundicons', this[l], this);
        B[p] = 1;
        B[V][n](0.5);
        var i3 = T[k][D](L7f[h](T.width, 2), L7f[f](T.height / 2, 100), 'Crack Alien Code', A3);
        i3[V][n](0.5);
      },
      startGame: function(f) {
        var V4 = 802522211;
        if (L7f.o3.p3(20, 4282964) !== V4) {
          game.state.add('PlayGame', playGame);
          game.load.audio('wrong', [
            'wrong.mp3',
            'wrong.ogg'
          ]);
          score++;
          game.load.spritesheet('soundicons', 'soundicons.png', 80, 80);
        } else {
          var h = 'N';
          if (L7f[h](f[p], 0)) {
            r = true;
          } else {
            r = false;
          }
        }
        T[K][T3]('PlayGame');
      }
    };
    B3.prototype = {
      scoreText: null,
      timeText: null,
      soundArray: [],
      preload: function() {
        var q8 = -1349182217;
        if (L7f.o3.p3(20, 1340128) !== q8) {
          this.soundArray[2].play('', 0, 1, false);
          this.soundArray[0].play('', 0, 1, false);
          tilesArray.push(Math.floor(L7f.U(i, 2)));
        } else {
          T.load[D3]('tiles', 'tiles.png', F, F);
          T.load[z]('select', [
            'select.mp3',
            'select.ogg'
          ]);
          T.load[z]('right', [
            'right.mp3',
            'right.ogg'
          ]);
        }
        T.load[z]('wrong', [
          'wrong.mp3',
          'wrong.ogg'
        ]);
      },
      create: function() {
        var w7 = -541042741;
        if (L7f.o3.p3(20, 6324961) !== w7) {
          return A3 * i3;
        } else {
          var f = 'decreaseTime',
            h = 'loop',
            A = 'q';
          b = 0;
          Y = 60;
        }
        this[t3]();
        if (r) {
          this[o][0] = T[k][z]('select', 1);
          this[o][1] = T[k][z]('right', 1);
          this[o][2] = T[k][z]('wrong', 1);
        }
        var W = {
          font: '32px Monospace',
          fill: '#00ff00',
          align: 'center'
        };
        this[s3] = T[k][D](5, 5, 'Score: ' + b, W);
        this[w3] = T[k][D](5, L7f[A](T.height, 5), 'Time left: ' + Y, W);
        this[w3][V][n](0, 1);
        T[q3][N3][h](Phaser[J3][L3], this[f], this);
      },
      placeTiles: function() {
        var f = 'y3',
          h = 'showTile',
          A = 'C3',
          W = 'W3',
          l = 'h3',
          i = 'x',
          g = 'R',
          J = 'u',
          v = 'between',
          Q = 'rnd',
          M = 'P',
          j = 'U',
          Z = 'floor',
          t = 'e',
          a = 'I',
          A3 = 'd',
          B = 's';
        l3 = L7f[B](G, m);
        var i3 = L7f[A3]((T.width - (m * F) - ((m - 1) * E3)), 2),
          z3 = L7f[a]((T.height - (G * F) - ((G - 1) * E3)), 2);
        for (var c = 0; L7f[t](c, G * m); c++) {
          L[c3](Math[Z](L7f[j](c, 2)));
        }
        for (c = 0; L7f[M](c, G * m); c++) {
          var k3 = T[Q][v](0, L7f[J](L.length, 1)),
            H3 = T[Q][v](0, L7f[g](L.length, 1)),
            G3 = L[k3];
          L[k3] = L[H3];
          L[H3] = G3;
        }
        for (c = 0; L7f[i](c, m); c++) {
          for (var X = 0; L7f[l](X, G); X++) {
            var j3 = T[k][v3](i3 + L7f[W](c, (F + E3)), z3 + L7f[A](X, (F + E3)), 'tiles', this[h], this);
            j3[p] = 10;
            j3[f3] = L[L7f[f](X, m) + c];
          }
        }
      },
      showTile: function(f) {
        var h = 'checkTiles',
          A = 'g3',
          W = 'indexOf',
          l = 'O3';
        if (L7f[l](H.length, 2) && H[W](f) == -1) {
          if (r) {
            this[o][0].play('', 0, 1, false);
          }
          f[p] = f[f3];
          H[c3](f);
          if (L7f[A](H.length, 2)) {
            T[q3][N3][k](Phaser[J3][L3], this[h], this);
          }
        }
      },
      checkTiles: function() {
        var f = 'M3',
          h = 'destroy',
          A = 'a3';
        if (L7f[A](H[0][f3], H[1][f3])) {
          if (r) {
            this[o][1].play('', 0, 1, false);
          }
          b++;
          Y += 2;
          this[w3][D] = 'Time left: ' + Y;
          this[s3][D] = 'Score: ' + b;
          H[0][h]();
          H[1][h]();
          l3 -= 2;
          if (L7f[f](l3, 0)) {
            L.length = 0;
            H.length = 0;
            this[t3]();
          }
        } else {
          if (r) {
            this[o][2].play('', 0, 1, false);
          }
          H[0][p] = 10;
          H[1][p] = 10;
        }
        H.length = 0;
      },
      decreaseTime: function() {
        var f = 'K3';
        Y--;
        this[w3][D] = 'Time left: ' + Y;
        if (L7f[f](Y, 0)) {
          T[K][T3]('GameOver');
        }
      }
    };
    Y3.prototype = {
      create: function() {
        var f = 'restartGame',
          h = 'onDown',
          A = 'input',
          W = 'Q3',
          l = 'm3',
          i = {
            font: '32px Monospace',
            fill: '#00ff00',
            align: 'center'
          },
          g = T[k][D](L7f[l](T.width, 2), L7f[W](T.height, 2), 'Game Over\n\nYour score: ' + b + '\n\nTap to restart', i);
        g[V][n](0.5);
        T[A][h][k](this[f], this);
      },
      restartGame: function() {
        L.length = 0;
        H.length = 0;
        T[K][T3]('TitleScreen');
      }
    };
  } else {
    return f3 < w3;
  }
  T[K][k](S3, I3);
  T[K][k](F3, B3);
  T[K][k](P3, Y3);
  T[K][T3](S3);
};