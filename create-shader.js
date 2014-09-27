//should be split out...
var create = require('gl-shader-core')
var copy = require('deepcopy')

var indices = [
	'position',
	'normal',
	'color'
]
var tex = 'texcoord'

function idx(name) {
	var i = indices.indexOf(name)
	if (i !== -1)
		return i
	if (name.indexOf(tex) === 0)
		return parseInt(name.substring(tex.length), 10)|0 + 3
	return undefined
}

function remap(attribute) {
	attribute.location = idx(attribute.name)
}

module.exports = function(shader) {
	return function(gl) {
		var s = copy(shader)
		s.attributes.forEach(remap)
		return create(gl, s.vertex, s.fragment, s.uniforms, s.attributes)
	}
}