module.exports = function (text) {
    let text = text.toString().toLowerCase().split("")
    let firstLetter = text[0].toUpperCase()
    text.shift()
    text.unshift(firstLetter)
    return text.join("")
};