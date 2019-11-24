var Caman = require('caman').Caman;
var ascii = "`^\",:;Il!i~+_-?][}{1)(|\\/tfjrxnuvczXYUJCLQ0OZmwqpdbkhao*#MW&8%B@$"
  .split('');

Caman("ascii-pineapple.jpg", function () {

  this.resize({
    width: 500,
  });
  this.render();

  var imgData = this.pixelData;

  var rgbData = [];
  for (var j = 0; j < this.height; j++){
    var column=0;
    var rowData = []
    for (var i = 0+this.width*4*j; i < this.width*4+this.width*4*j; i += 4) {
      rowData.push([imgData[i+1],imgData[i+2],imgData[i+3]])
      column++;
    }
    rgbData.push(rowData)
  }

  brightnessData = rgbData.map(function(row){
    return row.map(function(pixel){
       return Math.round(pixel.reduce(function(a,b){return a+b})/3)
    })
  });


  var max = Array.prototype.concat.apply([], brightnessData)
    .reduce(function(a,b){return Math.max(a,b);
  });

  var min = Array.prototype.concat.apply([], brightnessData)
    .reduce(function(a,b){return Math.min(a,b);
  });

  // [[@,a,"],[£,%,<]]
  asciiData = brightnessData.map(function(row){
    return row.map(function(pixel){
      return ascii[Math.round(((pixel-min)/(max-min))*ascii.length)]
            +ascii[Math.round(((pixel-min)/(max-min))*ascii.length)]
            +ascii[Math.round(((pixel-min)/(max-min))*ascii.length)]
    })
  });


  asciiData.forEach(function(row){
    console.log(row.reduce(function(a,b){return a+b}))
  })

});
