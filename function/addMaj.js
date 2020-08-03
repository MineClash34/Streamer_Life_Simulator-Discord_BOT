module.exports = function (text1) {
    let text = text1.toString().toLowerCase().split("")
    let firstLetter = text[0].toUpperCase()
    text.shift()
    text.unshift(firstLetter)
    return text.join("")
};