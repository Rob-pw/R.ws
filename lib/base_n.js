var base_n = function(params) {
    var symbols = params.symbols || ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "(", ")", "!", "$", "_", "'", "*", "+", "-", ".", ',']
    ,   base = params.base;

    if(!base) {
        throw("Base not defined.");
    }

    function toDecimal(value) {
        value = value.toString();

        var total = 0
        ,   i
        ,   max = value.length - 1
        ,   valueOfChar;

        for(i = max; i >= 0; i -= 1) {
            valueOfChar = symbols.indexOf(value[i]);

            if(valueOfChar > base) {
                return false;

            } else if(valueOfChar !== -1) {
                total += valueOfChar * Math.pow(base, max - i); 

            } else {
                throw('Not a valid char');
            }
        }

        return total;
    }

    function toBase(value, toBase) {
        var decimal = !isNaN(value) && value >= 0 ? value : toDecimal(value) //isNaN(value) ? toDecimal(value) : value
        , conversion = ""
        , rounded
        , result;

        if(!decimal && typeof decimal !== 'number') {
            return false;
        }

        toBase = toBase ? toBase : base;

        if (toBase > symbols.length || toBase <= 1) {
            return false;
        }

        while (decimal >= 1) {
            rounded = Math.floor(decimal / toBase);
            result = (decimal - (toBase * rounded));

            conversion = symbols[result] + conversion;
            decimal = rounded;
        }

        return conversion;
    }

    function increment(value) {
        return toBase(toDecimal(value) + 1);
    }

    function add(value, valueToAdd) {
        return toBase(toDecimal(value) + toDecimal(valueToAdd));
    }

    function sub(value, valueToSub) {
        return toBase(toDecimal(value) - toDecimal(valueToSub));
    }

    return {
        convert : toBase,
        add : add,
        sub : sub,
        inc : increment
    };
};

module.exports = base_n;