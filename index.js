var glslify = require('glslify')
var Quad = require('gl-quad')

var defaultShader = glslify({
    vertex: './vert.glsl',
    fragment: './frag.glsl'
})

function Vignette(gl, options) {
    if (!(this instanceof Vignette))
        return new Vignette(gl, options)
    Quad.call(this, gl)

    this.gl = gl

    this.shader = defaultShader(gl)

    //some defaults
    this.style({
        aspect: gl.canvas.width / gl.canvas.height,
        smoothing: [-0.4, 0.8],
        noiseAlpha: 0.04,
        coloredNoise: true,
        offset: [0, 0],
        color1: [1, 1, 1],
        color2: [0, 0, 0],
        scale: [1.0, 1.0]
    })

    //mix in user options
    if (options)
        this.style(options)
}

Vignette.prototype = Object.create(Quad.prototype)

Vignette.prototype.style = function(options) {
    if (!options) 
        return

    this.shader.bind()
    var uniforms = this.shader.uniforms
    for (var k in options) {
        if (options.hasOwnProperty(k) 
                && (options[k] || typeof options[k] === 'number')) {
            uniforms[k] = options[k]
        }
    }
}

Vignette.prototype.draw = function() {
    Quad.prototype.draw.call(this, this.shader)
}

Vignette.prototype.dispose = function() {
    if (this.shader) {
        this.shader.dispose()
        this.shader = null
    }
    Quad.prototype.dispose.call(this)
}

module.exports = Vignette