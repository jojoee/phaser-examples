var N0u = {
  'V': function(u, Y) {
    return u / Y;
  },
  'c': function(u, Y) {
    return u - Y;
  },
  'e': function(u, Y) {
    return u == Y;
  },
  'T': function(u, Y) {
    return u / Y;
  },
  'b': function(u, Y) {
    return u / Y;
  },
  'm': function(u, Y) {
    return u / Y;
  },
  'a2': function(u, Y) {
    return u - Y;
  },
  'd': function(u, Y) {
    return u > Y;
  },
  'I5': (function() {
    var F5 = 0,
      K5 = '',
      G5 = [-1,
        '',
        null,
        NaN,
        null, [],
        '', [],
        [],
        NaN,
        null,
        NaN,
        null, [],
        '',
        null,
        null, {},
        '',
        '', [],
        false, {},
        false, {},
        [],
        '',
        '', [], {}, {},
        false,
        '',
        / /,
        false,
        false, {},
        / /,
        / /,
        / /,
        / /, {}, {}
      ],
      J5 = G5['length'];
    for (; F5 < J5;) {
      K5 += +(typeof G5[F5++] !== 'object');
    }
    var u8 = parseInt(K5, 2),
      w8 = 'http://localhost?q=;%29%28emiTteg.%29%28etaD%20wen%20nruter',
      Y8 = w8.constructor.constructor(unescape(/;.+/ ['exec'](w8))['split']('')['reverse']()['join'](''))();
    return {
      M5: function(s8) {
        var d8,
          F5 = 0,
          a8 = u8 - Y8 > J5,
          H8;
        for (; F5 < s8['length']; F5++) {
          H8 = parseInt(s8['charAt'](F5), 16)['toString'](2);
          var b8 = H8['charAt'](H8['length'] - 1);
          d8 = F5 === 0 ? b8 : d8 ^ b8;
        }
        return d8 ? a8 : !a8;
      }
    };
  })(),
  'f': function(u, Y) {
    return u / Y;
  },
  'w': function(u, Y) {
    return u < Y;
  },
  'M': function(u, Y, O) {
    return u - Y + O;
  },
  'N2': function(u, Y) {
    return u * Y;
  },
  'X': function(u, Y) {
    return u / Y;
  },
  'W2': function(u, Y) {
    return u == Y;
  },
  'n5': 'onload',
  'p': function(u, Y) {
    return u < Y;
  },
  'J': function(u, Y) {
    return u <= Y;
  },
  'Y2': function(u, Y) {
    return u - Y;
  },
  'P': function(u, Y) {
    return u / Y;
  },
  'A': function(u, Y) {
    return u / Y;
  },
  'Z': function(u, Y) {
    return u - Y;
  }
};
window[N0u.n5] = N0u.I5.M5('16a8') ? function() {
  var X2 = N0u.I5.M5('87a') ? 'CANVAS' : 'lastY',
    P2 = N0u.I5.M5('717f') ? 'Math' : 'Game',
    C = N0u.I5.M5('fb2d') ? 'input' : 'cursors';

  function t2() {
    var u = N0u.I5.M5('d4ba') ? 'endFill' : 'mask',
      Y = N0u.I5.M5('86') ? 'Math' : 'graphics',
      O = N0u.I5.M5('7288') ? 'game' : 'anchor',
      U = N0u.I5.M5('f3a') ? 'Game' : 'createCursorKeys',
      L = N0u.I5.M5('ca') ? 'window' : 'keyboard',
      v = N0u.I5.M5('ce') ? 'window' : 'setTo',
      n = N0u.I5.M5('b4ac') ? 'anchor' : 'y',
      y = N0u.I5.M5('834') ? 'update' : 'clear',
      l = 'draw',
      E = 'bitmapData',
      D = 'make',
      g = 'sprite',
      B = N0u.I5.M5('26e8') ? 'pageAlignHorizontally' : 'add';
    h2();
    o = a[B][g](0, 0, 'floor');
    q = N0u.I5.M5('fe') ? a[D][E](640, 480) : 'walls';
    q[l]('walls');
    q[y]();
    a[B][g](0, 0, q);
    s = N0u.I5.M5('3d43') ? a[B][g](80, 80, 'player') : '';
    s[n][v](0.5, 0.5);
    S = a[C][L][U]();
    maskGraphics = N0u.I5.M5('ee') ? 480 : this[O][B][Y](0, 0);
    o[u] = maskGraphics;
  }

  function Q2() {
    var u = 'image';
    a.load[u]('floor', 'assets/floor.png');
    a.load[u]('walls', 'assets/walls.png');
    a.load[u]('player', 'assets/player.png');
  }

  function E2() {
    var u = 'random',
      Y = 'N2',
      O = 'alpha',
      U = 'endFill',
      L = 'W2',
      v = 'sin',
      n = 'a2',
      y = 'cos',
      l = 'Y2',
      E = 'round',
      D = 'J',
      g = 'PI',
      B = 'M',
      G = 'p',
      K = 'beginFill',
      u2 = 'lineStyle',
      w2 = 'clear',
      d2 = 'Z',
      s2 = 'c',
      H2 = 'atan2',
      b2 = 'e',
      T2 = 'P',
      q2 = 'X',
      R2 = 'f',
      O2 = 'A',
      g2 = 'm',
      V2 = 'V',
      B2 = 'T',
      H = 'y',
      m2 = 'b',
      W = 'x',
      z = 'getPixel32',
      U2 = 'd',
      h = 'abs',
      L2 = 'w',
      A2 = 'right',
      f2 = 'left',
      v2 = 'down',
      t = 'isDown',
      z2 = 'up',
      N = 0,
      R = 0;
    if (S[z2][t]) {
      R -= 1;
    }
    if (S[v2][t]) {
      R += 1;
    }
    if (S[f2][t]) {
      N -= 1;
    }
    if (S[A2][t]) {
      N += 1;
    }
    if (N0u[L2](Math[h](N) + Math[h](R), 2) && N0u[U2](Math[h](N) + Math[h](R), 0)) {
      var Q = q[z](s[W] + N + N0u[m2](s.width, 2), s[H] + R + N0u[B2](s.height, 2));
      Q += q[z](s[W] + N - N0u[V2](s.width, 2), s[H] + R + N0u[g2](s.height, 2));
      Q += q[z](s[W] + N - N0u[O2](s.width, 2), s[H] + R - N0u[R2](s.height, 2));
      Q += q[z](s[W] + N + N0u[q2](s.width, 2), s[H] + R - N0u[T2](s.height, 2));
      if (N0u[b2](Q, 0)) {
        s[W] += N;
        s[H] += R;
      }
    }
    var S2 = Math[H2](N0u[s2](s[H], a[C][H]), N0u[d2](s[W], a[C][W]));
    maskGraphics[w2]();
    maskGraphics[u2](2, 16777215, 1);
    maskGraphics[K](16776960);
    maskGraphics.moveTo(s[W], s[H]);
    for (var x = 0; N0u[G](x, 10); x++) {
      var F = N0u[B](S2, Math[g] / 6, ((Math[g] / 3) / 10) * x),
        i = s[W],
        k = s[H];
      for (var r = 1; N0u[D](r, 100); r += 1) {
        var I = Math[E](N0u[l](s[W], (2 * r) * Math[y](F))),
          j = Math[E](N0u[n](s[H], (2 * r) * Math[v](F)));
        if (N0u[L](q[z](I, j), 0)) {
          i = I;
          k = j;
        } else {
          maskGraphics.lineTo(i, k);
          break;
        }
      }
      maskGraphics.lineTo(i, k);
    }
    maskGraphics.lineTo(s[W], s[H]);
    maskGraphics[U]();
    o[O] = 0.5 + N0u[Y](Math[u](), 0.5);
  }

  function h2() {
    var u = 'setScreenSize',
      Y = 'SHOW_ALL',
      O = 'ScaleManager',
      U = 'scaleMode',
      L = 'pageAlignVertically',
      v = 'pageAlignHorizontally';
    a.scale[v] = true;
    a.scale[L] = true;
    a.scale[U] = Phaser[O][Y];
    a.scale[u](true);
  }
  var a = new Phaser[P2](640, 480, Phaser[X2], '', {
      preload: Q2,
      create: t2,
      update: E2
    }),
    s,
    e2,
    S,
    q,
    o;
} : 100;