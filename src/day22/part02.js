"use strict";
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var e_1, _a, e_2, _b;
exports.__esModule = true;
var fs_1 = require("fs");
var fileName = process.argv[2];
var input = (0, fs_1.readFileSync)(fileName, 'utf-8').split('\n').map(function (elem) { return elem.split(' '); });
var state = input.map(function (el) { return el[0]; });
var bounds = input.map(function (el) { return el[1].split(',').map(function (bound) { return bound.split('=')[1].split('..').map(function (num) { return parseInt(num); }); }); });
var xRegions = [];
var yRegions = [];
var zRegions = [];
try {
    for (var bounds_1 = __values(bounds), bounds_1_1 = bounds_1.next(); !bounds_1_1.done; bounds_1_1 = bounds_1.next()) {
        var coordinates = bounds_1_1.value;
        var _c = __read(coordinates[0], 2), x1 = _c[0], x2 = _c[1];
        var _d = __read(coordinates[1], 2), y1 = _d[0], y2 = _d[1];
        var _e = __read(coordinates[2], 2), z1 = _e[0], z2 = _e[1];
        xRegions.push(x1, x2);
        yRegions.push(y1, y2);
        zRegions.push(z1, z2);
    }
}
catch (e_1_1) { e_1 = { error: e_1_1 }; }
finally {
    try {
        if (bounds_1_1 && !bounds_1_1.done && (_a = bounds_1["return"])) _a.call(bounds_1);
    }
    finally { if (e_1) throw e_1.error; }
}
xRegions.sort(function (a, b) { return a - b; });
yRegions.sort(function (a, b) { return a - b; });
zRegions.sort(function (a, b) { return a - b; });
var eliminateDupes = function (arr) {
    var temp = [];
    var n = arr.length;
    for (var i = 0; i < n - 1; i++) {
        if (arr[i] != arr[i + 1]) {
            temp.push(arr[i]);
        }
    }
    if (arr[n - 1] != arr[n - 2]) {
        temp.push(arr[n - 1]);
    }
    // now create the 'in-between regions'
    var m = temp.length;
    var otherTemp = [{
            c1: temp[0],
            c2: temp[0]
        }];
    var previousBoundary = temp[0];
    for (var j = 1; j < m; j++) {
        if (temp[j] - previousBoundary > 1) {
            otherTemp.push({
                c1: previousBoundary + 1,
                c2: temp[j] - 1
            });
        }
        otherTemp.push({
            c1: temp[j],
            c2: temp[j]
        });
        previousBoundary = temp[j];
    }
    return otherTemp;
};
xRegions = eliminateDupes(xRegions);
yRegions = eliminateDupes(yRegions);
zRegions = eliminateDupes(zRegions);
var n = xRegions.length;
var m = yRegions.length;
var o = zRegions.length;
var reactor = [];
for (var i = 0; i < n; i++) {
    var temp = [];
    for (var j = 0; j < m; j++) {
        var innerTemp = Array(o).fill(false);
        temp.push(innerTemp);
    }
    reactor.push(temp);
}
var cubesOn = 0;
var inBounds = function (c1, c2, cRegion) {
    var bounds = [-1, -1];
    for (var i = 0; i < cRegion.length; i++) {
        if (cRegion[i].c1 === c1) {
            bounds[0] = i;
        }
        if (cRegion[i].c1 === c2) {
            bounds[1] = i;
        }
    }
    if (bounds[0] === -1 || bounds[1] === -1) {
        console.log('ALERT:', c1, c2);
    }
    return bounds;
};
try {
    for (var _f = __values(bounds.entries()), _g = _f.next(); !_g.done; _g = _f.next()) {
        var _h = __read(_g.value, 2), idx = _h[0], coordinates = _h[1];
        var _j = __read(coordinates[0], 2), x1 = _j[0], x2 = _j[1];
        var _k = __read(coordinates[1], 2), y1 = _k[0], y2 = _k[1];
        var _l = __read(coordinates[2], 2), z1 = _l[0], z2 = _l[1];
        x1 = x1 < x2 ? x1 : x2;
        x2 = x1 < x2 ? x2 : x1; // x1 is always smaller
        y1 = y1 < y2 ? y1 : y2;
        y2 = y1 < y2 ? y2 : y1;
        z1 = z1 < z2 ? z1 : z2;
        z2 = z1 < z2 ? z2 : z1;
        // Now I need to find the bounds in the list
        // x2 - x1 + 1 (because inclusive)
        var newState = state[idx] === 'on' ? true : false;
        // basically need to find x1 and x2 in xRegions, then highlight the regions between them
        var xB = inBounds(x1, x2, xRegions); // xB represents the right indexes in the 'regions'
        var yB = inBounds(y1, y2, yRegions);
        var zB = inBounds(z1, z2, zRegions);
        // console.log(xB)
        // console.log(yB)
        // console.log(zB)
        for (var i = xB[0]; i <= xB[1]; i++) {
            for (var j = yB[0]; j <= yB[1]; j++) {
                for (var k = zB[0]; k <= zB[1]; k++) {
                    if (typeof reactor[i] === 'undefined' || typeof reactor[i][j] === 'undefined' || typeof reactor[i][j][k] === 'undefined') {
                        console.log(i, j, k);
                    }
                    // console.log(i, j, k);
                    reactor[i][j][k] = newState;
                }
            }
        }
        console.log('entry done', new Date().toLocaleTimeString());
    }
}
catch (e_2_1) { e_2 = { error: e_2_1 }; }
finally {
    try {
        if (_g && !_g.done && (_b = _f["return"])) _b.call(_f);
    }
    finally { if (e_2) throw e_2.error; }
}
for (var i = 0; i < n; i++) {
    for (var j = 0; j < m; j++) {
        for (var k = 0; k < o; k++) {
            if (reactor[i][j][k]) {
                var dx = xRegions[i].c2 - xRegions[i].c1 + 1;
                var dy = yRegions[j].c2 - yRegions[j].c1 + 1;
                var dz = zRegions[k].c2 - zRegions[k].c1 + 1;
                cubesOn += dx * dy * dz;
            }
        }
    }
}
console.log(cubesOn === 2758514936282235);
console.log('total cubes: ', cubesOn);
