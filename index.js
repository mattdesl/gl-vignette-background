var glslify = require('glslify')
var inherits = require('inherits')

var createQuad = require('gl-quad')
var createShader = require('gl-shader')

var identity4x4 = require('gl-mat4/identity')

var vert = glslify('./vert.glsl')
var frag = glslify('./frag.glsl')

module.exports = createBackground
function createBackground (gl) {
  var attribs = [
    { name: 'position', location: 0, type: 'vec4' },
    { name: 'uv', location: 1, type: 'vec2' }
  ]

  var shader = createShader(gl, vert, frag, null, attribs)
  var quad = createQuad(gl)
  var matrix = identity4x4([])

  var width = gl.drawingBufferWidth
  var height = gl.drawingBufferHeight

  // some defaults
  style({
    aspect: width / height,
    smoothing: [-0.4, 0.8],
    noiseAlpha: 0.04,
    coloredNoise: true,
    offset: [0, 0],
    resolution: [ width, height ],
    color1: [1, 1, 1],
    color2: [0, 0, 0],
    scale: [1.0, 1.0],
    noiseScale: 1,
    projection: matrix,
    view: matrix,
    model: matrix
  })

  function style (opt) {
    if (!opt)
      return

    shader.bind()
    var uniforms = shader.uniforms
    for (var k in opt) {
      if (exists(opt, k))
        uniforms[k] = opt[k]
    }
  }

  function draw () {
    shader.bind()
    quad.draw()
  }

  function dispose () {
    shader.dispose()
    quad.dispose()
  }

  return {
    draw: draw,
    dispose: dispose,
    style: style
  }
}

function exists (opt, k) {
  return opt.hasOwnProperty(k)
    && (opt[k]
    || typeof opt[k] === 'number'
    || typeof opt[k] === 'boolean')
}
