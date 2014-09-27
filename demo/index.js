var createBackground = require('../')
var colorString = require('color-string')

var background

var mat4 = require('gl-mat4')

var ortho = mat4.create()    

require('canvas-testbed')(render, start, {
    context: 'webgl',
    retina: false
})

function rgb(str) {
    return colorString.getRgb(str).map(function(a) {
        return a/255
    })
}

function render(gl, width, height) {
    gl.clearColor(0,0,0,1)
    gl.clear(gl.COLOR_BUFFER_BIT)
    gl.viewport(0, 0, width, height)

    // mat4.ortho(ortho, )
    mat4.ortho(ortho, -1, 1, 1, -1, 1, -1)

    var radius = Math.max(width, height) * 1.05
    background.style({ 
        scale: [ 1/width * radius, 1/height * radius],
        aspect: 1,
        color1: rgb('#ffffff'),
        color2: rgb('#283844'),
        smoothing: [ -0.5, 1.0 ],
        noiseAlpha: 0.07,
        offset: [ -0.05, -0.15 ],
        projection: ortho
    })

    // background.shader.uniforms.projection = ortho
    // console.log(background.shader.uniforms.projection)

    background.draw()
}

function start(gl) {
    background = createBackground(gl)
}