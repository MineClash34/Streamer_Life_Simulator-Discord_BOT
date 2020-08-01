module.exports = function () {
    var letters = '0123456789ABCDEF';
    var hexColor = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    };
    return hexColor;
  };