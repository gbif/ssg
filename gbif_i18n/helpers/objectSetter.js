/*
A small helper for setting deep object properties
usage:
var myTestObj = {here: 'is'};
objHelper.set([myTestObj, 'hello', 'old'], 'friend');

 myTestObj is now:
 {
 here: 'is',
 hello: {
    old: friend
    }
 }

 objHelper.update will overwrite existing values. 'set' will set it if not defined already.

 */
module.exports = (function () {
    function set(loc, value, overwrite) {
        "use strict";
        if (Object.prototype.toString.call(loc) !== '[object Array]') {
            return false;
        }
        if (loc.length < 2) {
            return false;//must contain object and property as a minimum
        }
        var obj = loc[0];
        if (typeof obj !== 'object') {
            return false;
        }
        for (var i = 1; i < loc.length; i++) {
            var n = loc[i],
                isNumber = !isNaN(parseFloat(n)) && isFinite(n),
                isString = typeof n === 'string';
            if (!isNumber && !isString) {
                return false;
            }

            if (i == loc.length - 1) {
                if (overwrite) {
                    obj[n] = value;
                } else {
                    obj[n] = obj[n] || value;
                }
            } else {
                obj[n] = obj[n] || {};
                obj = obj[n];
            }
        }
        return true;
    }

    return {
        update: function (loc, value) {
            "use strict";
            return set(loc, value, true)
        },
        set: function (loc, value) {
            "use strict";
            return set(loc, value, false)
        }
    }
})();