#ifdef GL_ES
precision mediump float;
#endif

varying vec2 vUv;

#pragma glslify: random = require('glsl-random')
#pragma glslify: blend = require('glsl-blend-overlay')

uniform float aspect;
uniform vec2 scale; 
uniform vec2 offset;
uniform bool coloredNoise;

uniform vec2 smoothing;
uniform float noiseAlpha;

uniform vec3 color1;
uniform vec3 color2;

void main() {	
	vec2 pos = vUv;
	pos -= 0.5;

	pos.x *= aspect;
	pos /= scale;
	pos -= offset;

	float dist = length(pos);
	dist = smoothstep(smoothing.x, smoothing.y, 1.-dist);

	vec4 color = vec4(1.0);
	color.rgb = mix(color2, color1, dist);

	if (noiseAlpha > 0.0) {
		vec3 noise = coloredNoise ? vec3(random(vUv * 1.5), random(vUv * 2.5), random(vUv)) : vec3(random(vUv));
		color.rgb = mix(color.rgb, blend(color.rgb, noise), noiseAlpha);
	}
	gl_FragColor = color;
}