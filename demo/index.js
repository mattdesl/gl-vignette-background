var hex = require('hex-rgb')
var gl = require('webgl-context')()
var canvas = document.body.appendChild(gl.canvas)

var app = require('canvas-loop')(canvas, {
  scale: 1
})

app.on('tick', render)
app.start()

var background = require('../')(gl)

function rgb (str) {
  return hex(str).map(function (a) {
    return a / 255
  })
}

function render () {
  gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight)
  gl.clearColor(0, 0, 0, 1)
  gl.clear(gl.COLOR_BUFFER_BIT)
  gl.disable(gl.DEPTH_TEST)
  gl.disable(gl.CULL_FACE)

  var width = app.shape[0]
  var height = app.shape[1]
  var radius = Math.max(width, height) * 1.05
  background.style({
    scale: [ 1 / width * radius, 1 / height * radius],
    aspect: 1,
    color1: rgb('#ffffff'),
    color2: rgb('#283844'),
    smoothing: [ -0.5, 1.0 ],
    noiseAlpha: 0.35,
    noiseScale: app.scale * 1.75,
    coloredNoise: true,
    offset: [ -0.05, -0.15 ]
  })
  background.draw()
}
