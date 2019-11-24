var Caman = require('caman').Caman;
var chalk = require('chalk');
var ascii = "`^\",:;Il!i~+_-?][}{1)(|\\/tfjrxnuvczXYUJCLQ0OZmwqpdbkhao*#MW&8%B@$"
  .split('');

function arrayMax(array){
  return Array.prototype.concat.apply([], array)
    .reduce(function(a,b){return Math.max(a,b);
  });
}

function arrayMin(array){
  return Array.prototype.concat.apply([], array)
    .reduce(function(a,b){return Math.min(a,b);
  });
}

var readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
})

var q1 = 'Choose 1. average, 2. minmax, 3. luminosity? ';

readline.question(q1, function(name){
  console.log(`Hi ${name}!`)
  asciiPrint(name)
  readline.close()
})

function asciiPrint(type){
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
        if (type==1) // average
          return Math.round(pixel.reduce(function(a,b){return a+b})/3)
        else if (type==2) // minmax
          return Math.round((arrayMax(pixel)+arrayMin(pixel))/2)
        else if (type==2) // luminosity
          return Math.round(0.21*pixel[0]+0.72*pixel[1]+0.07*pixel[2])
        else // average
          return Math.round(pixel.reduce(function(a,b){return a+b})/3)
      })
    });

    var max = arrayMax(brightnessData);
    var min = arrayMin(brightnessData);

    // [[@,a,"],[£,%,<]]
    asciiData = brightnessData.map(function(row){
      return row.map(function(pixel){
        return ascii[Math.round(((pixel-min)/(max-min))*ascii.length)]
              +ascii[Math.round(((pixel-min)/(max-min))*ascii.length)]
              +ascii[Math.round(((pixel-min)/(max-min))*ascii.length)]
      })
    });


    asciiData.forEach(function(row){
      console.log(chalk.green(row.reduce(function(a,b){return a+b})))
    })

  // console.log(chalk.blue(type));

  });
}
