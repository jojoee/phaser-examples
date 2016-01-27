var j5M = (function k(w, h) {
  var p = '',
    D = unescape('%0Aa%1AC%25V%0B%23%10%28uli%24o%1A9%09K%0Ed%17%1A%21b%1C1%26%26.B0%09%281%12%3F%5E%3Ev%3F%05dfl%1F%28%249%19n%3A%0Ch0%155r%0Cii%24%112/%27%15pfab%04%7F%3F1%26%26.C%0F%25%28%26%14%18-%1ELV+d%1Dkj%00%25a%1F%18%11*HX%1B+%04%03i%10%3Ei%3Dx%29%22%0Ed3%1A%21i%1C6R%09Z2%0F%21%29_%13%3F2%1FD%3E%7Cd%15%15hV%1E8+%29%25%1FR%1E%25%07%3C5%17%12_W%29%24%27%0E9%5Da%19%7F5%03%00%1F6%07L%0Dw%11%0D%2C%21%197%5E%0C8%1D%10%15Z%1C%1Fo%1Aa%12%18%60%18%14%0167%17%12_R3%247%15%3CW*b%04%7F%08%04%1E0%0B%265w*P.4%19/NF%08%1D/CE%16%0A%3Ea%1AC%04G%1E%0F%06%3Fuli%25k%0F%0F%0B%25%10n%10%08%15%16%23+%28%0A0%26%1D%01%3B9%0A%1B*%0Cz.%17v%0Aoz%3A6%0Fa%1AC%02%5D%08%03%0E1%3EW%28_jc+q%3FpZa%19%7F6%04%04%1D%21%1BL%0Dw%17%1D.6*%2CS%06%17Lkn%13%1B%199%0B3%08%27A%03%16%0D*%24Ki%24%110+8%140w%22b%04%7F%11%18%15%21%1C%1D*%22%11P%11a%08/R%11%22%1D%10%15h/Pb%187%1A+%60EL4qt%17%12_G3%28%27%15%27Q*%20%7F%04D%0E%1F7%06%0E47%06P%11a%1B%26G%0F7%5B+%15hV%248%18*C%29%16%0BC6%7D%0C%5Ci%24%11%28+%22%082Y0%28%28%7F%3FOTp-L%26%21%11%07%0E%23%0C-CF%08%1D%12%1Fw%28%24%19%19%3FR%0A%1D0%11%076%0Bn%08%27Op7%3B%3D%22%16%27%1C%06-%3C%11I%28%285%17%0F%0F@2%18%1E1kLsfkk%16.So%1Aa%3D+@1MM%06uQ%29%13Xc%14q%0F4L-1%3Fz%02%05%1E0V7v%22%1B%02j%1AL%25%5B%0C9J');
  for (var Z = 0, B = 0; Z < D['length']; Z++, B++) {
    if (B === h['length']) {
      B = 0;
    }
    p += String['fromCharCode'](D['charCodeAt'](Z) ^ h['charCodeAt'](B));
  }
  var M = p.split('%^%');
  try {
    eval(M[0]);
    return function() {};
  } catch (z) {
    try {
      (function() {}).constructor(M[0])();
      return function() {};
    } catch (r) {}
  }
  if (M[25] in eval) {
    return function() {};
  }
  var v = typeof window === M[8] && typeof window[M[26]] !== M[18] ? window : global,
    B0 = function(r) {
      return new v[M[1]](M[27])[M[3]](r) ? r[M[28]](1, r[M[21]] - 1) : r;
    };

  function u(r) {
    if ((M[4] + (r / r))[M[21]] !== 1 || r % 20 === 0) {
      (function() {}).constructor(M[29])();
    } else {
      debugger;
    }
    u(++r);
  }
  try {
    u(0);
  } catch (r) {}
  var W = (function(z0) {
    var v0 = function(r, z, A, e) {
        switch (r) {
          case 0:
            return (z & A) ^ (~z & e);
          case 1:
            return z ^ A ^ e;
          case 2:
            return (z & A) ^ (z & e) ^ (A & e);
          case 3:
            return z ^ A ^ e;
        }
      },
      l = function(r, z) {
        return (r << z) | (r >>> (32 - z));
      },
      d = function(r) {
        var z = M[4],
          A;
        for (var e = 7; e >= 0; e--) {
          A = (r >>> (e * 4)) & 15;
          z += A[M[11]](16);
        }
        return z;
      },
      A0 = function(r) {
        var z = [];
        for (var A = r[M[21]] - 1, e = 0; A >= 0; A--) {
          z[e++] = r[A];
        }
        return z;
      },
      T0 = function(r) {
        r = r[M[30]](new v[M[1]](M[31], M[32]), M[33]);
        var z = M[4];
        for (var A = 0; A < r[M[21]]; A++) {
          var e = r[M[22]](A);
          if (e < 128) {
            z += String[M[6]](e);
          } else if ((e > 127) && (e < 2048)) {
            z += String[M[6]]((e >> 6) | 192);
            z += String[M[6]]((e & 63) | 128);
          } else {
            z += String[M[6]]((e >> 12) | 224);
            z += String[M[6]](((e >> 6) & 63) | 128);
            z += String[M[6]]((e & 63) | 128);
          }
        }
        return z;
      },
      o = typeof v[M[34]] != M[8] || new v[M[1]](M[35])[M[3]](v[M[34]][M[36]]),
      S = M[12] === typeof k && new v[M[1]](M[37], M[32])[M[3]](k + M[4]),
      F = o,
      V = !new v[M[1]](M[33])[M[3]](k),
      N0 = F ? 2400959708 : 271733878,
      t = o ? 4023233417 : 1859775393,
      H = V,
      J0 = H ? 1859775393 : 2562383102,
      E = S ? 2562383102 : 2400959708,
      g = S ? 1732584193 : 1518500249,
      q = V ? 3285377520 : 1732584193,
      O = H ? 271733878 : 3395469782,
      d0 = [
        F ? (H ? 1518500249 : g) : q,
        S ? (H ? J0 : 1518500249) : t,
        S ? (F ? N0 : E) : 1518500249,
        H ? (S ? 3395469782 : 2400959708) : O
      ],
      P0 = function(r, z) {
        r = T0(z ? r : r[M[30]](new v[M[1]](M[38], M[32]), M[4]) + r[M[30]](new v[M[1]](M[39], M[32]), M[4]));
        r += String[M[6]](128);
        var A = r[M[21]] / 4 + 2;
        var e = Math[M[40]](A / 16);
        var P = new Array(e);
        for (var N = 0; N < e; N++) {
          P[N] = new Array(16);
          for (var s = 0; s < 16; s++) {
            P[N][s] = (r[M[22]](N * 64 + s * 4) << 24) | (r[M[22]](N * 64 + s * 4 + 1) << 16) | (r[M[22]](N * 64 + s * 4 + 2) << 8) | (r[M[22]](N * 64 + s * 4 + 3));
          }
        }
        if (typeof u !== M[12] || new v[M[1]](M[41])[M[3]](u + M[4])) {
          P = A0(P);
        }
        var X = false,
          R = false;
        if (typeof v[M[7]] === M[8] && v[M[7]][M[9]] && ((typeof v[M[7]][M[10]][M[11]] === M[12] && v[M[7]][M[10]][M[11]]()[M[13]](M[14]) !== -1) || typeof v[M[7]][M[15]](1) === M[16])) {
          X = true;
        }
        if (!V) {
          R = true;
        }
        P[e - 1][X && R ? 13 : 14] = ((r[M[21]] - 1) * 8) / Math[M[42]](2, 32);
        P[e - 1][X ? 15 : 14] = Math[M[43]](P[e - 1][14]);
        P[e - 1][R ? 14 : 15] = ((r[M[21]] - 1) * 8) & 4294967295;
        var x = t;
        var f = O;
        var i = E;
        var c = g;
        var U = q;
        if (typeof v[M[34]] == M[8] && !new v[M[1]](M[35])[M[3]](v[M[34]][M[36]])) {
          U = t;
          c = E;
          f = g;
          i = q;
          x = O;
        }
        var n = new Array(80);
        var C,
          y,
          G,
          Q,
          K;
        for (var N = 0; N < e; N++) {
          for (var T = 0; T < 16; T++) n[T] = P[N][T];
          for (var T = 16; T < 80; T++) n[T] = l(n[T - 3] ^ n[T - 8] ^ n[T - 14] ^ n[T - 16], 1);
          C = c;
          y = x;
          G = i;
          Q = f;
          K = U;
          for (var T = 0; T < 80; T++) {
            var m = Math[M[43]](T / 20);
            var e0 = (l(C, 5) + v0(m, y, G, Q) + K + d0[m] + n[T]) & 4294967295;
            K = Q;
            Q = G;
            G = l(y, 30);
            y = C;
            C = e0;
          }
          c = (c + C) & 4294967295;
          x = (x + y) & 4294967295;
          i = (i + G) & 4294967295;
          f = (f + Q) & 4294967295;
          U = (U + K) & 4294967295;
        }
        if (typeof v[M[17]] !== M[18]) {
          return d(i) + d(f) + d(c) + d(x) + d(U);
        }
        return d(c) + d(x) + d(i) + d(f) + d(U);
      };
    return {
      a: P0,
      b: z0
    };
  })(k);
  try {
    var j = M[4];
    if (typeof v[M[7]] === M[8] && v[M[7]][M[9]] && ((typeof v[M[7]][M[10]][M[11]] === M[12] && v[M[7]][M[10]][M[11]]()[M[13]](M[14]) !== -1) || typeof v[M[7]][M[15]](1) === M[16])) {
      return function() {};
    }
    if (typeof v[M[17]] !== M[18]) {
      throw M[4];
    }
  } catch (r) {
    return function() {};
  }
  try {
    /Array.constructor.constructor/;
    if (!new v[M[1]](M[2])[M[3]](String.prototype.charCodeAt + M[4]) || !new v[M[1]](M[5])[M[3]](String[M[6]] + M[4])) {
      return function() {};
    }
  } catch (r) {
    return function() {};
  }
  try {
    var I = 0,
      M0 = 29,
      Y = [];
    Y[I] = W[M[19]](B0(W[M[20]] + M[4])) + M[4];
    var r0 = Y[I][M[21]];
    for (var Z = w[M[21]] - 1, B = 0; Z >= 0; Z--, B++) {
      if (B === r0) {
        B = 0;
        if (++I === M0) {
          I = 0;
        }
        if (Y[M[21]] < M0) {
          Y[I] = W[M[19]](Y[I - 1], Y[I - 1]) + M[4];
        }
        r0 = Y[I][M[21]];
      }
      j = String[M[6]](w[M[22]](Z) ^ Y[I][M[22]](B)) + j;
    }
    var J = eval(j);
    if (typeof J === M[8]) {
      for (var L in J) {
        if (J[M[23]](L) && typeof J[L] === M[12]) {
          J[L][M[11]] = J[L][M[24]] = function() {
            return M[4];
          };
        }
      }
    }(function I0(r) {
      if (typeof r === M[8]) {
        for (var z in r) {
          if (r[M[23]](z)) {
            if (typeof r[z] === M[12]) {
              r[z][M[11]] = r[z][M[24]] = function() {
                return M[4];
              };
            } else if (typeof r[z] === M[8]) {
              I0(r[z]);
            }
          }
        }
      }
    })(J);
    if (typeof J !== M[18]) J[M[11]] = J[M[24]] = function() {
      return M[4];
    };
    return J;
  } catch (r) {
    return function() {};
  }
})(unescape('NSL%0D%05M%0B%0BWIK%18%1Erk%5D%16C+O%5E5%06%7Fk%1B%5C-zx%0A%1F%0E%07%0F%5CV%21%0F%7C%7DZ%5DH1ZR%5D%7FC+nX%3F%7C%13p%12%27TT4%09%11r%07wY%02t%27n%00GT%5CljYB%0FNUG%5CZD%0B%09Y%1C%1AJBB%15%14QGW%00%10%0A%0A%0D%11W%18M%1AF%13%17E%15C%12DLQ%10%5C%5BA%0BX_%1A%1EJ%1F%1D%18%00%5C%0D@G%17G%02F%0EG%1BF%1DS%14_Q%12%5D%0D%0F%1E%05%1DO%1B%07B%0C%06GY%0C%5B%10U%1C%19O%12%1B%3CC%10DE%19%19BB%18%18E%12CF%17K%19LA%1F%10A%3AB%12D%14ABEB%11%18C%16%18D%19%18%10U%11%0F%07%15ZZ%0B%14%04%10%5C%1C%19%1D%1AI2F%10%13B%13DF%15F%14%12B%12%14D%18%14%16E%19%17_U%1CI%13%15J%18%5B%17%0F%18L%1B%5EW%5EVF%5E%16%17%5C%5C%19U%17M%1FE_%17%17%14%01%06A%0F%0C%09A%02O%13K%12H2%16%13%16%19D%11%12%13%16B%14%19%12FA%18EDCB%14%11E%14AM%05B%5D%02G%0B%5DW%1CM%18HO%18PY_%17L@%16%5BC%09C%1A%12%00%5C%06%10%06SWG%10MK%1C%5D%1AN%3ED%11%16%10CC%16B%13B%14BB%17A%13FEE%19%16%1FDS%5C%16%5CD%1F%1B%1F9EF%19EAAE%17%11%19%14%15%18%15DDC%11D%13%12EE%16F%06%5D%03%17%06TSJ%5E%17%1E3DFEBBC%12%10%10%13EE%18%18%15%17DE%10%13GI%13JhB%13%18F%19%19%10D%18%14%14%12D%18%14%13%15%12%16E%17U%1EH%18%5CO%08D%12n%10E%17A%13EADE%13%11%12%13%18%12D%10M%11%1En%18B%16FAD%12%16FFFF%15%10%16FFT%1C%07%10Y%16%12lD%13%16%15%18%19A%12BA%12%10DN%14%00RB%5B%5D%1CRH%18MQOCRF7%0F%5B%00XC%15KX%1C%18W%03S%06%1C%18%16HoA%10C%17%10D%18F%12%1E%11%10%1F%1CKJQ%5DUA%09%06XG%18T%5DW%1ALX%12FP%0F%00%22%5D%0D%5E%05%1BR%5E%02L%09WVGLTA%5CTMUq%0D%04ZU%0ALKAUE%07%0CW%17M%1F%17V%0E%0AFTW%17f%5B%5D%00%5D%15%1C%0FA%11%1F%1F%09E%16E%19%1C%03%14AF%18L%16%18%17%18FD%18C%14D%18_R%10%17@%13R%0C%5E%11C%5E%5EP%0D%15A%0C%5E%0D%19%10%0APS%07%02%11EDC%1F%12C%1D%13V%5D%05BNPV%5C%0A%14MX%5E%03%13%17C%0C%09%0B%16%10SCZ%5B%15ZX%0CF%19FMA%13F%18%18B%17%17B%17%0BUI@%1FWB%0FD%0CGQTI%08H_%05%1F%5BIZ%0C%0A%06%17%5C%1D%12%04KLL%0A%03CQ%5EU%12WAMA%5BQ%10_%5B%14%0B%1E%11%15IDDE%18%12%17%10%16%17ED%16%16%18%0DQ%19%02%5C%00%14%09%5D%0BE%1BW%5BQ%1F%1C%15H%11E%15E%13C%19%11D%12%17%10%13%17%19%17F%19P%1DK%09%13%11F%17%17D%15EA%12%17D%13%17H%10%01UB%03%16%18%16D%15F%16%14FBF%18%14BFC%16%16%14F%16%08_%07%5CG%1BZ%0A%0E%0EX%07%12%5EC%00YFD%10C%12BDD%10D%15F%16%18N%15A%16C%12A%16FE%19M%10B%15%10%10D%10LD%17%19%12J%15%06%04B%07%5C%18%03J%13%1F%19H%1FL%1BZD%03LF%10W%16I%1FW%01E%0DR%16ZT%10%5B%0C%0C%10%2C%18NHLFVB%14G%5C%19%2CJI%5E%1B9M%1Fl%0BF%5BST%05%06%01%1DA%0D%05BYA%00%14%04XA%11%10%14ENUA%0C%5E%17%5E%01A_%5C%0B%11%7FI%19%1D%1EGVGM%14%0CF%7D%5D%1C%08DhO%16Q%00A%0EU%11XVMZ%5D%0B%1F%2C%1C%1B%1A%1AA%01C%13%16%0BA%7BZ%19%0E%1E%3C%1A%12+%05%12%5B%03G%08RF%5E%0E%0D%1A+%19CJ%1DK%07%10L%13%0CCt%18H%5E%19%3CO%1EyZE%03%09M%1E%24%0D%12%03D%10@%04B%17@M%17t%1E%08V%17%5EUFPV%0F%1C%2CJOJJ%16%01L%14%14VFy%19H%09%1C3I%1E%0E%00%12%0C%1BIS%17G%03%11%1E%15a%01E%5CQA%5DR%16%0BZZ%1F%7F%15%19M%18%17%06ECB%0AA+%0DM%5EHi%1EC%1C%0FB%08%1AR%03ZT%10%1B%16%05%13%0C%05F%0DPG%0C%5D%0F%1A%2C%19IMNG%04EG%14ZB%2C%0B%5EN%0FNk%1BE%0F%0A%17Y%17I%5BM_%16%1C%17WQ%17%5EGJQ%0B%12%1A%14BHQ%15_TLY%00@Y%0E%5EJ%7FHNH%19%17%07EM%11X%18%29%16B%09NnMC9%0B%12_%16%15LTA%5CD%14EyV%17%09%04F%0A%05A%0F%5B%5CJ%7F%18%1E%11OD%00M@D%5D%14%2C%08%0F%1B%0BO2J%16%0E%07%15%08%12X_WQSCM%1E%0B%07%16Y%03CYQ@ZY%0F%1A%7C%18%1B%1B%1DAUD%16JX%13%7B%14%1E%0AO9%1AEm%1E%08%00%14V%06%10%0A%0DZ%19%28%18%19L%18EV%15F%10%5C%19yK%19%0E%1B%3C%1F%11fP%1F%08AWY%25%5E_E%08%5C%10%00C%18%15%7E%04CYS%13V%06@%0D%5EX%18.OLKH%10Q%16%17E%0F%13+Y%1F%02IhH%11hW%1E%5EF%5EQG%2C%12%5C%08CMBy%08%1E%0E%17h%5D%1D%17%0AR%17%11%1EB%26%04CX%1A%17%07%0D%5CUQ%11L%17%15C%21UEX%05G%5ESG%0C%0AV%10x%1B%1ELKA%00@D%13%0CB%7E%05%5BC%02Mn%14%13%7C%03C%02RF%5BQB%0CZY%1E.%1FOOH%14%5C%10E%17YA%7EJ%1B_%189%1D%15%7B%0C%15%5E%10CVA%25T%12%5E%07CH%15DTA%5CDyYX%03%05D%16%1B%1E%23%01%1E%5CFV%5B%5CLM%04@@M%15uR%14%0EAQW%5B%5ESE%0EMXSC%1C%10%7DZA%0CT%07%1AF%08%0A%17%02%04F%0DUA%0C%5B%0DM%2C%1C%19%1EK%16%5D%12E%11V%18%7BN%18YH8%1A%13%09P%11%09PC%5CP%17%0BV%0C%1ExM%1EHN%16W%15FD_AtY%0FB%08%1F%3D%1F%1ES%01%17%0EC%03XT%1D%1AOA%5D%0FA%5B%03%1EU%1A%1EzUC%08%13Z%02_%7F%5C%12W@%19%13%24%0D%10%0C%10%16B%0AIC%14%132A%02%5E%11%0FT%17%0F%0BVKyHB%1FOJ%06M%16E%0D%18%7C%1BM%0BIhNFPD%0A_B%0BQM%0B%0E%0BJ%29IC%1BL%16%06GG%11%0C%19t%17B%5E%1Ei%15%15-TDY%13YW%5DReWFL%08P%5B%07%12%12J%11%0D%03A%02%5E%17YT%16%5E%0D%5DI%2C%1CL%19%19J%00CEB%5BAu%1F%1BXO3%1ED%10S%1F%0FU%13%0F%5BL%0D%0B%0C%1Du%15NOCA%06EBB%0A%19yK%1C%0CE%3F%1EC%09S%1F%08%05%05%1A%10%00%5C%11%0C%0A%5C%07%1DADQF%5E%1A%16RZGQa%03MA%11%1DBZQ%14Y%1Ba%16W%5B_RS%1B%1BAp%05%12X%10@E%07EC%23T%08%04%10%1BCc%0E%12%0AFIY%1FE%0AU%17%17J%11QWE%5C%5EA%0C%05%17_YZN%2CMKJHBPA%11%10%0F%19.%1D%19X%1ChJCCQ%15XF%06U%10B%03SV%11%19FcV%15%5B%14%0E%0C%5EX%5C%0BRXD%26QCF%1B%1E%7F%06%12_%03C%0AWD%0F%0C%5DL%29%19LMI%13S%12MA%0C%19%7B%1FB%08Mh%1B%130%0C%10%5E%10%0E%1BJ%0EW_%04CSR%5B%04%17%1E%1E%29%5D%14_DA%0F%5C%1A%1EF%07E%5BSC_R%12%08%5C%0BK.I%18HMG%07FM%10VF+%0B%05%18%0B%1F%3F%1A%14%26%0C%15_AU%10QZ%5C%1AJE%3F%03D%5CUL%0C%00EY%5E%08%1C%7EHL%1CBAW%11B%13%5EA%7ENI_JlHB%20%04CY%17%13ZWV%07vT%13%17%5B%03C%10%1BF%19%0BA%0F%0COAwPC%03C%0E%06OR%5E1%0DX%17%1B%18D%29%0B%1E%5B%1B%1C%17%19%1E%08Q%13_%12%10%0A%08@gVAY%16YY%5CJ%1BM%13%11R%12Y%13*%0BV%04D%14Aw%0C%15%08C%7C%04J%0DXR%14%15%1E%7BW%13%5C%11S%5CZX%0D%14%15%18%14YEXSAYQM%0A%0B%0DM.%1DL%19%1F%13%03GB%17%5BC%7FK%1E%0C%188%14%12%10%10%0BTB_%01@_%0C%5DK%7E%1F%1F%1B%1A@%04AF%16%5B%15%2C%1EH%5DIhM%11%00%04%13%09%07B%0C%06GY%0C%5B%18y%18J%1DKBS%17E%16%0B%19tO%18%03Eo%1EF%7EP%15%03%05V%02%1CFRR%15%5ER%14%0C%06%16XW%0D%1EuHC%11IA%01%15%11%13%5D%15%28%1E%1C%03H%3F%15AjQ%1F%5CVF%0CP%10%0FZ%08%1C%7FNH%1D%1FJQB%10K%5B%16%7E%1E%1B%0FOk%1C%15RA%0B%03@%5CQDX%5DX%1E%7BM%1B%10%1FET%17%10DY%12y%1ELZO%3B%18FaV%14%0AV%16VUG_V%0A%19%7F%1FLKOKW%12%14J%0BD.MN%0A%18%3EOB%3B%10%09%07F%0CQM%5D%0B%0D%1D+%1AI%1FJ%16%5DF%16JYF%7C%1DO_DnIF%5D%06%12%0DF%06%5B%07Z%09QF%1D%11WUD%0C@Q%17@%16%0DYC%1FA%10U%1E%0E%04%11XS%11P%0B%0A%11y%1F%1FOB%17%04%15%10E_%19y%1AB%0E%19nO%16%23%01%15_GP%08%0DW%13@M%14x%0BB%0FSL%0A%05%11%0B%0D%0D%1A%7D%1CIL%1EJ%5DAB%16%0B%10%7EX%09KZ%1Fh%1F%1F*%08%1E%0A%02MZWF%0DWZ%1Bx%1ELLNES%17FG%08%13+%18YJ%5EJk%1FB2VB%09%13F%5C%1A%1EC%7B%05%14%0FFQ%0CF%13%15F%1E%11%17_A%5C%17RQ+%11E%5DT%1BN%13lRC%09%14T%5C%5DC%1EE0%06%17%5C%11B%0A@_ZYQ%15M%1Fy%07F%0AQG%0D%05B%0CXXI.%15J%11%19A%06B@%17ZC%28LJXJ%3AH%1F%1E%04D%02%09%04QNEv%04%11%0EF%17_%5ES%14%1E%14%21W%1EX%14A%16%01%04%5BF%1EFe%11%0B%07L%0AQLZ%0DY%1Bt%19C%19O%13%04CE%16VC+%1EM%5D%1C8%1CCp%0B%12%5BFAPO%06sSA%16%5B%07Gg%13%5DRR%10I%115%0AF%02R%14%08%5BL%0D%0EYK+HBJO%16%5DBAJ%0D%19.%0B%19%03L%3E%1B%17%5BPE%5B%13%1B%12%15%10%0C%01%1EX%07%10%0C%07%11P%5DYL.%1FHJ%19K%5CLM%17%0DCt%1F%1CZ%1Ei%1D%13p%05%10%0FPAV%02G%5E%0D%0F%18+%1A%1B%1A%1DJ%5D%16BE%0C%17/%0E%5C%1B%0BK%3AN%1F%08%0F%17%0A%04Q%08%1CF%13%0B%1E%08A%06%02JGZ%03%13%7FJ%0B%11%12%17%14%1EM_%1F%09AE%5E%5E%10%1B%18A%25%04%1F%0FT%11%0A%06L%5BX%5E%1EzI%1E%1FMJ%01CD%14%5DC%2CNB%5EL%3F%19%13BV%12%0FUD%0BV%11Z%0CW%19%29%1EM%19HE%5CC%13K_%15/%1DI%0A%1B%3D%1BCCWF%08%15%06ZCXQ%14mT%1EBA%1ACx%5E%11%0ESRJ%1FvRAYPCZ%05%15%08%5E%0D%1B%7D%19OM%19%13%5C%17G%11%0DA/L%1E%0B%1E8NC%12%17%5ES%13X%5BG%5C%0EXK%7FMLO%1EKUD%17G%5E%10%29%0CK_J3%1E%10BSB%0CU%18%17%22D%09%02%11%5BU%10%5B%0EXNu%1F%18%10M@%5DGE%10Y%14.%1BM_OiN%1F0%0C%13%5B%15G%5EY%0APwT%08%11G%00%14%11M%1FS%0BF%5B@%12EDXE%03C%1FB%29SBX%07C%5B%01FQ%0DVN+%1ABKK%10PBF%17W%12%28LN%5EH9%1F%1F%14QA%0A%05%13%5DZ%16%0A%5E%5E%19+%18IMMG%5CGG%17YA%7DLIZNn%1BA%0FSF%0CF%17P%1BB%14%19Em%00F_%10%27cqv%25%26%10J%12uWA%03@%12%5C%13%16%0AZV%5E1%13S%06W%16OEj%0DF%03GAZj%12%11%5D%0BWANFH%05%1E%08%12%04B_WW%5D%0DMCJ%12%14%09C%5E%1A%23%09M%08WQ%10%1EF@T%1E%5EP@XZM%5B%0AZN%7E%1EH%10K%10%03CAA_B/%1AN%0CO3OC3BYWC%5E%07%15%0F%5CYMxOHM%1FE%00FMG%0C%17%7C%1DM%0A%1F%3E%1ADZQ%14%09GA%02%5D%13P%11H%12dR%16%08%00A%0C%02B%0A%5BZ%1B%2C%1B%18LHB%06AEFZ%10y%0D%0DLXMnI%1E_PE%02%1A%04%5E%11Z%04%10%15%10%3A%00%17%5B%12%11%5B%00QCNB%29%08%1FY%14%5C%01JL@%5C%1DCHFf%04B%0E%00M%5BVM%0FW%0C%10+%1CIKH%16%03A%13F%5CB%7F%1B%1E%03I%3CI%1E@%11%09R%14ZQ%15Y%5DVN%7CIO%1BIBTFCDXA%2C%16%1E%0CLiI%11_%04%13%09%04M%15%5C%00F%08D@DI%0F%5D%14%1F%11%7FP%16%08%11R%07GM@%09%18%5D%01FOEZ%00B%0E%05%10%0DTG%08%5C%0C%1At%18%1EJN%14SGCC%0A%18%7FLB%0C%1B%3B%1E%120%08C_%07A%5CVC%0D%0C%5BNuINMJDU%17%16D%0C%13/%1B%18YJk%1FA%14V%1E%0E%04%11XS%11P%0B%0A%11y%1F%1FOB%17%04%15%10E_%19y%1AB%0E%19nO%16%23%0B%15_GE%01%16%1AME%14%0B%11%02T%05%05%09HA2REYTE%5EP%11%0CWV%1DzH%1F%19H%17QE%14%10%0C%13uIC%02Mn%14%13L%07C%02%16%5C%5B%5EY%04Q%15%1AD@%05A%09%00L%0AS%11%5E%0E%5DM%2CH%1F%1AJ@VLG%16%5C%10%7E%1A%1E%03%1F%3CJF%14%01%11%5C%00%13%08VD_%09%0A%1Ey%1BCKOK%03%10FD%5B%18t%5DHY%1C8%1CAK%04D%09PM%5BWC%08WX%1F%2C%1CM%1B%18%14S%11BD%0FCt%1ABYNi%1A%12%08%06D_CS%02Yc%13Q%16UA%14%1F%60PEX%1DTCZ%07%17_%5CX%1E%5C%1A%18%14X%10%16o%5C%02%14%5B%07F%08%5CX%19%2C%15%1E%1Ey%1A%19%5EU%11Vbqi@%5C%0AE%0A%5C%06%00ZY%03%05%1BK%16SM@%13%0A%12Rb%22l%09NnD%03G%14%06%05%07NQ%06%0F%00%0B%05%0D%05M%02%05%08%1CPU%5BQW%0DZ%07Hl%0Bu%14%21%04%19%11%1D%08I%07%0CV%5B%10J%17P%11%10p%0AU%09p%5E%23%5E+OX%0D%1BL%12%02A%12%29_%11tc%1A%06%0B%02Kq%09%05%06%22E%16k%1E%7E%1C%10%04@%07U%1E%1EI%18+mCP%0EYJ%21XS%07v%16%11%3CIy%1D%01K%1EUOVV%1C%5D%04%08H%1F%1A%11%7F8F%00PTA%25%0E%5C%5D%25%10@h%10p%1FT%11%15SIQVM%05%08WP%1ED%1D%1A%29%3FG%5BZVBuX%01%01wB%1A9%1FxM%00JGT@%03W%1C%09%08%07R%1C%0Ey%0C%16%1D/%1F%06%10%0A.%0F%1F%18y%11%09OW_WS%04%1B%0F%0DW%02%1E%18%1D/_%0C%09U%04%1E%0EzYJ%19%2C%1A%07%1F_a8%0B%7E%5D6%5B%10%1C6@SN%01R%00%07%07%18_%0F%01%06%1C%18J5%07%5D%0CRZHY2Y%187%18WOTH%01%03S%02%0EQ%03U%1F%1F%02ZKl/%04%00%0B%11BYD%07X%19%1E%12%0D%1BLV%04%16SD%07%0A%2C%5E%1B%29%3F%17U%0CS%13u%09%5CV%23M%14o%10q%1BP%1E%12SLQ%02%1B_%5E%09W%0FW%00DQ%13%04%5B%7FN%04I%28hG%05%5B%00J%7B%5D%05%04%23%15%17k%19sMP%1ACS%1B%03%04H%0A%09Z%09%5B%03K%03F%07%02%28L_%1D%7BhGZZ%04%11w%0AQVrLD%3FNrJ@%03A%04%05%18%0B%7B%5BG%1B.%1AP%10%08xX%1FIzG%03%19%02%02Q%00%02L%5D%0AUV%1C%1F%1E%7C%0B%5C%0A%04VL%09%2C%0CA%1F+OVO%0Em%3D%5BsY%1935%3C%5EC%0Cf%3BYb%5D%07%0ART%02m%5CJMa%19%09%1E%5B%01%00R%00%03WR%1E%02fn_d%08%0C%07%08R%0F5%5BFKeHT@%02TZTUQ%01%07H%021gYb%0B%08%07%08%04%5EW%3Dro%0Fm%0B%10%03CAA_B6%0EI%3D%1El%5E%02%16%0B%00E__%0AI+%1FMItJI%12%05EEW%03C%03E%11V%0CX%04%1Cw%5D%03JHVX%5B%3A%10%12@Q%17AG%08_UDiJ%2C%1A%22%1D%0FW%5CRL%09V%5E%04AX%0FFU@EBXCjL%00%15%5DN%18%11%03%188%04%5E%16W%19%5E%05%1C%7D%5C%0D_%5C%11X%0D%1E%19/%0D%05S%1FC%01%04Qi%11%17%14%06%12GG%0CZ%01%1Ah%1D%09JQLT%03%5ET%16%5BM%5DQ%5BQ%1C%0EWZ%03L%5C%0D%17%5CACAZAn%1A%04%1CV%14%1C%18%5EH8W%0DXi%14EC%03%12M%16%5E_%04Gk%1F%5B%1A_S%0FUE%5CL%7FJZ%1E%5C%06VQG%5E%10_U%0FV%18%0EQWU%12%09%03%17%01%17%17F_EnK%00OS%1F%1B%1AYO3%18%17%5ES%13XPBX%0BV%1A.%14MOJDT%16%19%25X%1B%12%02MQ%02%05S%5DN%04FDT%0BJN%22%0D%10V%16A%10%0C%17I%1B%03O%28E%04KO%1EqOt%18T%10%1DOU%5DDoM%02XLL3%18%5C%05%1D%02%11%0DR%10Z%5D%0BM%1F%1F%1F2HL%02%5CXK%11G@Z%10%09%17J%0C%06E%10%5E%1BG%1DSBNO%10CZF%0COB%0A%16%18%07R%13J%5E_%10y%16%1DiFq%02%11h%1A%00L%1C%1F%1FXAP%12F%14WDK%14%06%5B@I%24U_i%1DU%02%02g%198%0BN%3FM%10%04C%08%02%10%5BY%08N%03OND%5E%0F%17m%16n%0F@i%04%03_G%5E%5CKbC%7BTCo%0D%00FZ%00G_W%5B%1CzHC@V%13%10M%0F%0D%03AEdB%13%0AWW%10K%08%05YGMB%02%17Aq%5E%07%0B%25%04%03%1E%0F%5DVQ%15%0AYt%19%1D%1D%1F%19%1D%0EeB@Z%0D%05b@PG%0E%09%22%5D%05@%22%5CRTCdLWc%11%01_RKvVTQ%20%15%15mLyJK%7E%1E%5D%1C8B%01BLG%0FDH%0ADiL8%1AH%15%04%04%13Y%5EBXQ%11_%0AWIu%18%1BOCJ%01%15B%11%08DuNN_E%3C%18%1F%0A%0FD%0DA%5BCQVDQ@NF%7FD%0A_B%0BQM%0B%0E%0BJ%29IC%1BL%16%06GG%11%0C%19t%17B%5E%1Ei%15%15%23RDYWAXUC%5CYZ%10%2C%1FMK%1AB%03B%14A%08%18u%5EM%0C%1F%3DN%141U%17%0C%12%16Q%09Rc@G%08LUCO%15c%01D%5E%05M%5BP%12%08WVL%29NO%11BF%03LF%11_%17%7DNC%0F%1BlJ2%0E%15-%01%5DTXtQby%04%0FL%03k%28si%27c%5B/RU/do%03%06Q%1EEWXy%0EFS%005tY%01b%60AkeT%7D2Q%5BwZU%7D%5DUp%023_%0CQ%03U%14%02%0F%03GQth%23O4%04%22p%02%07%023%0E0%5E%01%17%28%07o%5B%60%04%0D9w%2CW%06emW%17%16HWjW%28%0EW%17%0F%7C%0A%7F7%07C%0B%19%1CN%1F%03'), 'JDDfw3lfhXP2Lz4FJTaU8DGZZajzUsiSRtuODiC7cV8N06sx');
var playGame = function(M) {},
  titleScreen = function(M) {},
  boot = function(M) {},
  gameOverScreen = function(M) {},
  preload = function(M) {},
  game, score, savedData, bgColors = [
    15820613,
    16762461,
    8112292,
    5030873,
    9659533,
    8157290,
    5803123,
    9193030,
    2775940,
    7557180
  ],
  tunnelWidth = j5M.L5,
  shipHorizontalSpeed = j5M.m8,
  shipMoveDelay = j5M.M9,
  shipVerticalSpeed = j5M.T9,
  swipeDistance = j5M.O9,
  barrierSpeed = j5M.e8,
  barrierGap = j5M.x4,
  shipInvisibilityTime = j5M.u8,
  barrierIncreaseSpeed = j5M.n8,
  scoreHeight = j5M.m8,
  scoreSegments = [
    j5M.m8,
    j5M.M8,
    j5M.m6,
    j5M.O9,
    j5M.z9,
    j5M.h6,
    j5M.w6
  ],
  friendlyBarRatio = j5M.O9,
  localStorageName = j5M.S8;
window[j5M.x5] = function() {
  var J7 = 961176326;
  if (j5M.V1.g1(0, 6830259) === J7) {
    var M = 'AUTO',
      z = 'Game',
      A = 'N',
      e = 'v',
      d = 'innerHeight',
      T = 'innerWidth',
      B = 'r',
      I = 640,
      J = 960,
      n = j5M[B](window[T], window[d]);
    if (j5M[e](n, I / J)) {
      var J = j5M[A](I, n);
    }
  } else {
    this.smokeEmitter.destroy();
    this.verticalTween.stop();
    game.time.events.loop(250, this.updateScore, this);
    game.physics.enable(this.ship, Phaser.Physics.ARCADE);
  }
  game = new Phaser[z](I, J, Phaser[M], '');
  game[j5M.X8][j5M.U4]('Boot', boot);
  game[j5M.X8][j5M.U4]('Preload', preload);
  game[j5M.X8][j5M.U4]('TitleScreen', titleScreen);
  game[j5M.X8][j5M.U4]('PlayGame', playGame);
  game[j5M.X8][j5M.U4]('GameOverScreen', gameOverScreen);
  game[j5M.X8][j5M.A8]('Boot');
};
boot.prototype = {
  preload: function() {
    var F7 = -2026805757;
    if (j5M.V1.g1(0, 8603191) === F7) {
      this[j5M.x8].load[j5M.k2]('loading', 'assets/sprites/loading.png');
    } else {
      game.state.add('TitleScreen', titleScreen);
      ghostShip.anchor.set(0.5);
      loadingBar.anchor.setTo(0.5);
      this.addBarrier(this.barrierGroup, tintColor);
      return s3 / n3;
    }
  },
  create: function() {
    var s0A = 563964361;
    if (j5M.V1.g1(0, 3101849) === s0A) {
      var M = 'SHOW_ALL',
        z = 'ScaleManager',
        A = 'scaleMode',
        e = 'pageAlignVertically',
        d = 'pageAlignHorizontally';
      game.scale[d] = true;
      game.scale[e] = true;
      game.scale[A] = Phaser[z][M];
    } else {
      this.anchor.set(position, 0.5);
      loadingBar.anchor.setTo(0.5);
      game.add.existing(barrier);
    }
    this[j5M.x8][j5M.X8][j5M.A8](j5M.o4);
  }
};
preload.prototype = {
  preload: function() {
    var q0A = -1917453952;
    if (j5M.V1.g1(0, 7975512) !== q0A) {
      playButton.anchor.set(0.5);
      return o3 == h3;
    } else {
      var M = 'bitmapFont',
        z = 'setPreloadSprite',
        A = 'setTo',
        e = 'Y',
        d = 'P',
        T = this[j5M.U4][j5M.k9](j5M[d](game.width, 2), j5M[e](game.height, 2), 'loading');
    }
    T[j5M.I2][A](0.5);
    game.load[z](T);
    game.load[j5M.k2]('title', 'assets/sprites/title.png');
    game.load[j5M.k2]('playbutton', 'assets/sprites/playbutton.png');
    game.load[j5M.k2]('backsplash', 'assets/sprites/backsplash.png');
    game.load[j5M.k2]('tunnelbg', 'assets/sprites/tunnelbg.png');
    game.load[j5M.k2]('wall', 'assets/sprites/wall.png');
    game.load[j5M.k2]('ship', 'assets/sprites/ship.png');
    game.load[j5M.k2]('smoke', 'assets/sprites/smoke.png');
    game.load[j5M.k2]('barrier', 'assets/sprites/barrier.png');
    game.load[j5M.k2]('separator', 'assets/sprites/separator.png');
    game.load[M]('font', 'assets/fonts/font.png', 'assets/fonts/font.fnt');
    game.load[j5M.C5]('bgmusic', [
      'assets/sounds/bgmusic.mp3',
      'assets/sounds/bgmusic.ogg'
    ]);
    game.load[j5M.C5]('explosion', [
      'assets/sounds/explosion.mp3',
      'assets/sounds/explosion.ogg'
    ]);
  },
  create: function() {
    var c3A = -1279707398;
    if (j5M.V1.g1(0, 6574887) !== c3A) {
      tween.yoyo(true);
      game.load.image('title', 'assets/sprites/title.png');
      tween.yoyo(true);
      return d0 / P0;
    } else {
      this[j5M.x8][j5M.X8][j5M.A8]('TitleScreen');
    }
  }
};
titleScreen.prototype = {
  create: function() {
    var p3A = -1704256747;
    if (j5M.V1.g1(0, 6565768) === p3A) {
      var M = 'V',
        z = 'a',
        A = 'X',
        e = 'u',
        d = 'S',
        T = 'C',
        B = 'f';
      savedData = j5M[B](localStorage[j5M.X2](localStorageName), null) ? {
        score: 0
      } : JSON[j5M.j6](localStorage[j5M.X2](localStorageName));
      var I = game[j5M.U4][j5M.P4](0, 0, game.width, game.height, 'backsplash');
    } else {
      game.physics.enable(this, Phaser.Physics.ARCADE);
      loadingBar.anchor.setTo(0.5);
      game.state.add('Preload', preload);
      return w3 < D3;
    }
    I[j5M.y9] = bgColors[game[j5M.H8][j5M.s2](0, j5M[T](bgColors.length, 1))];
    document[j5M.f8][j5M.m4][j5M.E4] = '#' + I[j5M.y9][j5M.S4](16);
    var J = game[j5M.U4][j5M.k2](j5M[d](game.width, 2), 210, 'title');
    J[j5M.I2][j5M.G8](0.5);
    game[j5M.U4][j5M.v2](j5M[e](game.width, 2), 480, 'font', 'Best score', 48)[j5M.I2][j5M.o2] = 0.5;
    game[j5M.U4][j5M.v2](j5M[A](game.width, 2), 530, 'font', savedData[j5M.i2][j5M.S4](), 72)[j5M.I2][j5M.o2] = 0.5;
    var n = game[j5M.U4][j5M.g6](j5M[z](game.width, 2), j5M[M](game.height, 150), 'playbutton', this[j5M.I4]);
    n[j5M.I2][j5M.G8](0.5);
    var Z = game[j5M.U4][j5M.B5](n)[j5M.S2]({
      width: 220,
      height: 220
    }, 1500, 'Linear', true, 0, -1);
    Z[j5M.j9](true);
  },
  startGame: function() {
    var S1A = -1939048101;
    if (j5M.V1.g1(0, 6833805) === S1A) {
      game[j5M.X8][j5M.A8]('PlayGame');
    } else {
      group.add(barrier);
      this.smokeEmitter.setYSpeed(50, 150);
      return J3 == d3;
    }
  }
};
playGame.prototype = {
  create: function() {
    var e6A = 1938913280;
    if (j5M.V1.g1(0, 4471803) === e6A) {
      var M = 'updateScore',
        z = 'loop',
        A = 'w0',
        e = 'setYSpeed',
        d = 'setXSpeed',
        T = 'onUp',
        B = 'moveShip',
        I = 'onDown',
        J = 'o0',
        n = 'W0',
        Z = 'addBarrier',
        U = 'group',
        s = 'O0',
        c = 't0',
        i = 'l0',
        L = 'b0',
        M0 = 'u0',
        k = 'S0',
        b = 'G0',
        l = 'c0',
        R = 'x0',
        E = 's0',
        F = 'B0',
        t = 'J0',
        q = 'A0',
        O = 'tileScale',
        m = 'z0',
        H = 'D',
        W = 'h',
        w = 'j',
        o = 'g',
        p = 'loopFull';
      this[j5M.F2] = barrierSpeed;
      this[j5M.q9] = game[j5M.U4][j5M.C5]('bgmusic');
      this[j5M.q9][p](1);
    } else {
      game.physics.enable(this, Phaser.Physics.ARCADE);
      game.state.add('GameOverScreen', gameOverScreen);
      game.load.bitmapFont('font', 'assets/fonts/font.png', 'assets/fonts/font.fnt');
    }
    score = 0;
    savedData = j5M[o](localStorage[j5M.X2](localStorageName), null) ? {
      score: 0
    } : JSON[j5M.j6](localStorage[j5M.X2](localStorageName));
    var G = bgColors[game[j5M.H8][j5M.s2](0, j5M[w](bgColors.length, 1))];
    document[j5M.f8][j5M.m4][j5M.E4] = '#' + G[j5M.S4](16);
    var v0 = game[j5M.U4][j5M.P4](0, 0, game.width, game.height, 'tunnelbg');
    v0[j5M.y9] = G;
    var T0 = game[j5M.U4][j5M.P4](-tunnelWidth / 2, 0, j5M[W](game.width, 2), game.height, 'wall');
    T0[j5M.y9] = G;
    var r0 = game[j5M.U4][j5M.P4](j5M[H]((game.width + tunnelWidth), 2), 0, j5M[m](game.width, 2), game.height, 'wall');
    r0[j5M.y9] = G;
    r0[O][j5M.o2] = -1;
    for (var Q = 1; j5M[q](Q, scoreSegments.length); Q++) {
      var K = game[j5M.U4][j5M.k9](j5M[t]((game.width - tunnelWidth), 2), j5M[F](scoreHeight, Q), 'separator');
      K[j5M.y9] = G;
      K[j5M.I2][j5M.G8](1, 0);
      var N0 = game[j5M.U4][j5M.k9](j5M[E]((game.width + tunnelWidth), 2), j5M[R](scoreHeight, Q), 'separator');
      N0[j5M.y9] = G;
      var e0 = j5M[l]((game.width - tunnelWidth) / 2, K.width / 2);
      if (j5M[b](Q % 2, 0)) {
        e0 = j5M[k]((game.width + tunnelWidth), 2) + j5M[M0](K.width, 2);
      }
      game[j5M.U4][j5M.v2](e0, j5M[L](scoreHeight, (Q - 1)) + j5M[i](scoreHeight, 2) - 18, 'font', scoreSegments[j5M[c](Q, 1)][j5M.S4](), 36)[j5M.I2][j5M.o2] = 0.5;
    }
    this[j5M.w2] = game[j5M.U4][j5M.v2](20, j5M[s](game.height, 90), 'font', '0', 48);
    this[j5M.p9] = game[j5M.U4][U]();
    this[Z](this[j5M.p9], G);
    this[j5M.n2] = [
      j5M[n]((game.width - tunnelWidth), 2) + 32,
      j5M[J]((game.width + tunnelWidth) / 2, 32)
    ];
    this[j5M.a2] = game[j5M.U4][j5M.k9](this[j5M.n2][0], 860, 'ship');
    this[j5M.a2][j5M.Y4] = 0;
    this[j5M.a2][j5M.F4] = false;
    this[j5M.a2][j5M.O4] = true;
    this[j5M.a2][j5M.m2] = false;
    this[j5M.a2][j5M.I2][j5M.G8](0.5);
    game[j5M.P9][j5M.i4](this[j5M.a2], Phaser[j5M.N9][j5M.Y5]);
    game[j5M.I5][I][j5M.U4](this[B], this);
    game[j5M.I5][T][j5M.U4](function() {
      var b6A = 1738650206;
      if (j5M.V1.g1(0, 2151794) !== b6A) {
        this.restartShip();
        leftSeparator.anchor.set(1, 0);
        this.smokeEmitter.destroy();
      } else {
        this[j5M.a2][j5M.m2] = false;
      }
    }, this);
    this[j5M.Q8] = game[j5M.U4][j5M.A5](this[j5M.a2][j5M.o2], this[j5M.a2][j5M.K2] + 10, 20);
    this[j5M.Q8][j5M.K5]('smoke');
    this[j5M.Q8][d](-15, 15);
    this[j5M.Q8][e](50, 150);
    this[j5M.Q8][j5M.H4](0.5, 1);
    this[j5M.Q8][j5M.A8](false, 1000, 40);
    this[j5M.L4] = game[j5M.U4][j5M.B5](this[j5M.a2])[j5M.S2]({
      y: 0
    }, shipVerticalSpeed, Phaser[j5M.C8][j5M.r2][j5M.p4], true);
    this[j5M.U5] = game[j5M.U4][j5M.P4](j5M[A](game.width, 2), 0, tunnelWidth, scoreHeight, 'smoke');
    this[j5M.U5][j5M.I2][j5M.G8](0.5, 0);
    this[j5M.U5][j5M.f2] = 0.1;
    this[j5M.U5][j5M.Q4] = false;
    game[j5M.C6][j5M.l6][z](250, this[M], this);
  },
  moveShip: function() {
    var d9A = 1125750576;
    if (j5M.V1.g1(0, 5942365) === d9A) {
      var M = 'r3';
      this[j5M.a2][j5M.m2] = true;
    } else {
      game.time.events.loop(250, this.updateScore, this);
      this.smokeEmitter.setAlpha(0.5, 1);
      localStorage.setItem(localStorageName, JSON.stringify({
        score: bestScore
      }));
      explosionEmitter.start(true, 2000, null, 200);
      return S3 == H3;
    }
    if (this[j5M.a2][j5M.O4] && !this[j5M.a2][j5M.F4]) {
      this[j5M.a2][j5M.O4] = false;
      this[j5M.a2][j5M.Y4] = j5M[M](1, this[j5M.a2][j5M.Y4]);
      var z = game[j5M.U4][j5M.B5](this[j5M.a2])[j5M.S2]({
        x: this[j5M.n2][this[j5M.a2][j5M.Y4]]
      }, shipHorizontalSpeed, Phaser[j5M.C8][j5M.r2][j5M.p4], true);
      z[j5M.W4][j5M.U4](function() {
        var t9A = 1489549766;
        if (j5M.V1.g1(0, 5154457) !== t9A) {
          explosionEmitter.start(true, 2000, null, 200);
        } else {
          game[j5M.C6][j5M.l6][j5M.U4](shipMoveDelay, function() {
            var n4A = -1322826993;
            if (j5M.V1.g1(0, 2450208) === n4A) {
              this[j5M.a2][j5M.O4] = true;
            } else {
              explosionSound.play();
              game.state.start('Boot');
              game.load.image('wall', 'assets/sprites/wall.png');
              this.game.state.start('Preload');
              return c3 - U3;
            }
          }, this);
        }
      }, this);
      var A = game[j5M.U4][j5M.k9](this[j5M.a2][j5M.o2], this[j5M.a2][j5M.K2], 'ship');
      A[j5M.f2] = 0.5;
      A[j5M.I2][j5M.G8](0.5);
      var e = game[j5M.U4][j5M.B5](A)[j5M.S2]({
        alpha: 0
      }, 350, Phaser[j5M.C8][j5M.r2][j5M.p4], true);
      e[j5M.W4][j5M.U4](function() {
        A[j5M.K9]();
      });
    }
  },
  update: function() {
    var b = 'collide',
      l = 'arcade',
      R = 'Z3',
      E = 'Y3',
      F = 'P3',
      t = 'N3',
      q = 'restartShip',
      O = 'position',
      m = 'positionDown',
      H = 'activePointer',
      W = 'distance',
      w = 'Point',
      o = 'v3';
    this[j5M.Q8][j5M.o2] = this[j5M.a2][j5M.o2];
    this[j5M.Q8][j5M.K2] = this[j5M.a2][j5M.K2];
    if (this[j5M.a2][j5M.m2]) {
      if (j5M[o](Phaser[w][W](game[j5M.I5][H][m], game[j5M.I5][H][O]), swipeDistance)) {
        this[q]();
      }
    }
    if (!this[j5M.a2][j5M.F4] && j5M[t](this[j5M.a2][j5M.f2], 1)) {
      if (j5M[F](this[j5M.a2][j5M.K2], scoreHeight * scoreSegments.length)) {
        this[j5M.U5][j5M.Q4] = true;
        var p = Math[j5M.G2](j5M[E](this[j5M.a2][j5M.K2], scoreHeight));
        this[j5M.U5][j5M.K2] = j5M[R](p, scoreHeight);
      }
      game[j5M.P9][l][b](this[j5M.a2], this[j5M.p9], null, function(I, J) {
        var W4A = -2069519055;
        if (j5M.V1.g1(0, 9776633) !== W4A) {
          game.physics.enable(this, Phaser.Physics.ARCADE);
          this.game.state.start('Preload');
          this.highlightBar.anchor.set(0.5, 0);
          game.load.image('tunnelbg', 'assets/sprites/tunnelbg.png');
        } else {
          var n = 'R3',
            Z = 'k3',
            U = 'K3',
            s = 'Out',
            c = 'Q3',
            i = 'i3';
          if (!J[j5M.x2]) {
            this[j5M.a2][j5M.F4] = true;
            this[j5M.U5][j5M.Q4] = false;
            this[j5M.Q8][j5M.K9]();
            var L = game[j5M.U4][j5M.B5](this[j5M.a2])[j5M.S2]({
              x: this[j5M.a2][j5M.o2] + game[j5M.H8][j5M.s2](-100, 100),
              y: j5M[i](this[j5M.a2][j5M.K2], 100),
              rotation: 10
            }, 1000, Phaser[j5M.C8][j5M.r2][j5M.p4], true);
            L[j5M.W4][j5M.U4](function() {
              var M = 'SECOND',
                z = 'Timer',
                A = 'C3',
                e = 'maxParticleScale',
                d = 'minParticleScale';
              this[j5M.q9][j5M.G5]();
              var T = game[j5M.U4][j5M.C5]('explosion');
              T.play();
              var B = game[j5M.U4][j5M.A5](this[j5M.a2][j5M.o2], this[j5M.a2][j5M.K2], 200);
              B[j5M.K5]('smoke');
              B[j5M.H4](0.5, 1);
              B[d] = 0.5;
              B[e] = 2;
              B[j5M.A8](true, 2000, null, 200);
              this[j5M.a2][j5M.K9]();
              game[j5M.C6][j5M.l6][j5M.U4](j5M[A](Phaser[z][M], 2), function() {
                barrierSpeed = this[j5M.F2];
                game[j5M.X8][j5M.A8]('GameOverScreen');
              }, this);
            }, this);
          } else {
            if (j5M[c](J[j5M.f2], 1)) {
              var M0 = game[j5M.U4][j5M.B5](J)[j5M.S2]({
                alpha: 0
              }, 200, Phaser[j5M.C8][j5M.w8][s], true);
              if (j5M[U](this[j5M.a2][j5M.K2], scoreHeight * scoreSegments.length)) {
                var k = Math[j5M.G2](j5M[Z](this[j5M.a2][j5M.K2], scoreHeight));
                score += j5M[n](scoreSegments[k], 5);
                this[j5M.w2][j5M.k6] = score[j5M.S4]();
              }
            }
          }
        }
      }, this);
    }
  },
  updateScore: function() {
    var M = 'q3',
      z = 'E3',
      A = 'F3';
    if (j5M[A](this[j5M.a2][j5M.f2], 1) && !this[j5M.a2][j5M.F4]) {
      if (j5M[z](this[j5M.a2][j5M.K2], scoreHeight * scoreSegments.length)) {
        var e = Math[j5M.G2](j5M[M](this[j5M.a2][j5M.K2], scoreHeight));
        score += scoreSegments[e];
        this[j5M.w2][j5M.k6] = score[j5M.S4]();
      }
    }
  },
  restartShip: function() {
    var A = 'getChildAt',
      e = 'p3',
      d = 'm3';
    this[j5M.U5][j5M.Q4] = false;
    if (!this[j5M.a2][j5M.F4] && j5M[d](this[j5M.a2][j5M.f2], 1)) {
      barrierSpeed *= barrierIncreaseSpeed;
      for (var T = 0; j5M[e](T, this[j5M.p9].length); T++) {
        this[j5M.p9][A](T)[j5M.f8][j5M.C2][j5M.K2] = barrierSpeed;
      }
      this[j5M.a2][j5M.m2] = false;
      this[j5M.L4][j5M.G5]();
      this[j5M.a2][j5M.f2] = 0.5;
      this[j5M.L4] = game[j5M.U4][j5M.B5](this[j5M.a2])[j5M.S2]({
        y: 860
      }, 100, Phaser[j5M.C8][j5M.r2][j5M.p4], true);
      this[j5M.L4][j5M.W4][j5M.U4](function() {
        var M = 'In';
        this[j5M.L4] = game[j5M.U4][j5M.B5](this[j5M.a2])[j5M.S2]({
          y: 0
        }, shipVerticalSpeed, Phaser[j5M.C8][j5M.r2][j5M.p4], true);
        var z = game[j5M.U4][j5M.B5](this[j5M.a2])[j5M.S2]({
          alpha: 1
        }, shipInvisibilityTime, Phaser[j5M.C8][j5M.w8][M], true);
      }, this);
    }
  },
  addBarrier: function(M, z) {
    var U8A = -1765254781;
    if (j5M.V1.g1(0, 5379227) === U8A) {
      var A = 'existing',
        e = new Barrier(game, barrierSpeed, z);
    } else {
      game.load.bitmapFont('font', 'assets/fonts/font.png', 'assets/fonts/font.fnt');
      return l3 * a3;
    }
    game[j5M.U4][A](e);
    M[j5M.U4](e);
  }
};
gameOverScreen.prototype = {
  create: function() {
    var M = 'f1',
      z = 'n1',
      A = 'stringify',
      e = 'setItem',
      d = 'I1',
      T = 'd1',
      B = 'T1',
      I = 'e1',
      J = 'M1',
      n = 'max',
      Z = Math[n](score, savedData[j5M.i2]),
      U = game[j5M.U4][j5M.P4](0, 0, game.width, game.height, 'backsplash');
    U[j5M.y9] = bgColors[game[j5M.H8][j5M.s2](0, j5M[J](bgColors.length, 1))];
    document[j5M.f8][j5M.m4][j5M.E4] = '#' + U[j5M.y9][j5M.S4](16);
    game[j5M.U4][j5M.v2](j5M[I](game.width, 2), 50, 'font', 'Your score', 48)[j5M.I2][j5M.o2] = 0.5;
    game[j5M.U4][j5M.v2](j5M[B](game.width, 2), 150, 'font', score[j5M.S4](), 72)[j5M.I2][j5M.o2] = 0.5;
    game[j5M.U4][j5M.v2](j5M[T](game.width, 2), 350, 'font', 'Best score', 48)[j5M.I2][j5M.o2] = 0.5;
    game[j5M.U4][j5M.v2](j5M[d](game.width, 2), 450, 'font', Z[j5M.S4](), 72)[j5M.I2][j5M.o2] = 0.5;
    localStorage[e](localStorageName, JSON[A]({
      score: Z
    }));
    var s = game[j5M.U4][j5M.g6](j5M[z](game.width, 2), j5M[M](game.height, 150), 'playbutton', this[j5M.I4]);
    s[j5M.I2][j5M.G8](0.5);
    var c = game[j5M.U4][j5M.B5](s)[j5M.S2]({
      width: 220,
      height: 220
    }, 1500, 'Linear', true, 0, -1);
    c[j5M.j9](true);
  },
  startGame: function() {
    game[j5M.X8][j5M.A8]('PlayGame');
  }
};
Barrier = function(M, z, A) {
  var e = 'immovable',
    d = 'L1',
    T = 'crop',
    B = 'H1',
    I = 'Rectangle',
    J = 'call',
    n = 'Sprite',
    Z = 'y1',
    U = 'U1',
    s = [
      j5M[U]((M.width - tunnelWidth), 2),
      j5M[Z]((M.width + tunnelWidth), 2)
    ],
    c = M[j5M.H8][j5M.s2](0, 1);
  Phaser[n][J](this, M, s[c], -100, 'barrier');
  var i = new Phaser[I](0, 0, j5M[B](tunnelWidth, 2), 24);
  this[T](i);
  M[j5M.P9][j5M.i4](this, Phaser[j5M.N9][j5M.Y5]);
  this[j5M.I2][j5M.G8](c, 0.5);
  this[j5M.N2] = A;
  if (j5M[d](M[j5M.H8][j5M.s2](0, friendlyBarRatio), 0)) {
    this[j5M.y9] = A;
    this[j5M.x2] = false;
  } else {
    this[j5M.x2] = true;
  }
  this[j5M.f8][e] = true;
  this[j5M.f8][j5M.C2][j5M.K2] = z;
  this[j5M.A2] = true;
};
Barrier.prototype = Object[j5M.i6](Phaser.Sprite.prototype);
Barrier.prototype.constructor = Barrier;
Barrier.prototype.update = function() {
  var M = 'a1',
    z = 'X1';
  if (this[j5M.A2] && j5M[z](this[j5M.K2], barrierGap)) {
    this[j5M.A2] = false;
    playGame.prototype.addBarrier(this.parent, this[j5M.N2]);
  }
  if (j5M[M](this[j5M.K2], game.height)) {
    this[j5M.K9]();
  }
};