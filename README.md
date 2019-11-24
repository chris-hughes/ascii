
### Based off

https://robertheaton.com/2018/06/12/programming-projects-for-advanced-beginners-ascii-art/

### Annoyingly

In order for this to work i've had to edit node_modules/caman/dist/caman.full.js directly so can't use the npm version

update lines 370 & 2530 to (eg)

`this.canvas = new Canvas.Canvas(this.imageWidth(), this.imageHeight());`

### To run

Need to zoom out as far as possible in the terminal then `node index.js`
