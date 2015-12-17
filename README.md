# gl-vignette-background

[![experimental](http://badges.github.io/stability-badges/dist/experimental.svg)](http://github.com/badges/stability-badges)

Creates a soft gradient background with noise, suitable for your sweet WebGL demos!

![demo](http://i.imgur.com/IMRLl9D.png)

Also see [three-vignette-background](https://github.com/mattdesl/three-vignette-background) for a ThreeJS version of this module, with a slightly different API and noise algorithm.

## Install

```sh
npm install gl-vignette-background --save
```

## Example

```js
var createBackground = require('gl-vignette-background')

// get a WebGL canvas
var gl = require('webgl-context')()

// create your background
var background = createBackground(gl)

function render () {
  var width = gl.drawingBufferWidth
  var height = gl.drawingBufferHeight

  gl.viewport(0, 0, width, height)
  gl.clearColor(0, 0, 0, 1)
  
  // set some flags before drawing
  gl.clear(gl.COLOR_BUFFER_BIT)
  gl.disable(gl.DEPTH_TEST)
  gl.disable(gl.CULL_FACE)

  // setup some fancy style (optional)
  var radius = Math.max(width, height) * 1.05
  background.style({
    // xy scale
    scale: [ 1 / width * radius, 1 / height * radius ],
    // aspect ratio for vignette
    aspect: 1,
    // radial gradient colors A->B
    color1: [ 1, 1, 1 ],
    color2: [ 0.5, 0.5, 0.5 ],
    // smoothstep low/high input
    smoothing: [ -0.5, 1.0 ],
    // % opacity of noise grain (0 -> disabled)
    noiseAlpha: 0.35,
    // whether or not the noise is monochromatic
    coloredNoise: true,
    // offset the vignette
    offset: [ -0.05, -0.15 ]
  })
  background.draw()
}
```

See [demo/index.js](demo/index.js) for a full-screen example.

## Usage

[![NPM](https://nodei.co/npm/gl-vignette-background.png)](https://nodei.co/npm/gl-vignette-background/)

### ```var bg = createBackground(gl [, style])```

Creates a background quad with some default options (bright and soft white gradient in the center, using the current canvas size for aspect ratio).

You can provide `style` to override some defaults, e.g:

```js
bg = createBackground(gl {
	color1: [ 1, 0, 0]
})
```

See [styling](#styling)


### ```bg.style(options)```

Style the background with the given overrides in the specified object. Acts the same as the styling options passed to constructor. 

### ```bg.draw()```

Draws the quad.

### ```bg.dispose()```

Disposes the quad and its shader.

## styling

The following options are stylable:

- `aspect`: a float for aspect ratio; typically set whenever the background size changes
- `smoothing`: a vec2 representing the low and high end for the smooth function
- `noiseAlpha`: the opacity of the random noise (set to zero to disable)
- `coloredNoise`: a bool for whether noise is enabled, `1` for chromatic, `0` for monochrome
- `offset`: the position vec2 offset, normalized. `[0, 0]` is center (default), `[-0.5, -0.5]` will be top left
- `scale`: the vec2 amount to scale the gradient, normalized. default is `[1, 1]`
- `color1`: the first `[r, g, b]` color in the gradient, default white
- `color2`: the second `[r, g, b]` color in the gradient, default black

## running the demo

Git clone this repo, run `npm install`, then `npm start` and open `localhost:9966`.

## License

MIT, see [LICENSE.md](http://github.com/mattdesl/gl-vignette-background/blob/master/LICENSE.md) for details.
