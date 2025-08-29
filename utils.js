function isNumber(value) {
    return /^-?\d+$/.test(value);
}

function isAlphabet(value) {
    return /^[a-zA-Z]+$/.test(value);
}

function alternatingCapsReverse(str) {
    let reversed = str.split("").reverse();
    return reversed
        .map((ch, idx) => (idx % 2 === 0 ? ch.toUpperCase() : ch.toLowerCase()))
        .join("");
}

module.exports = { isNumber, isAlphabet, alternatingCapsReverse };
