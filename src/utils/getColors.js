/**
 * Generates an array of colors for the light theme.
 *
 * @returns {string[]} - An array of color strings in HSL format.
 */

function getColors() {
	const colors = [];
	const colorsCount = 21;

	for (let i = 0; i < colorsCount; i++) {
		colors.push(`hsl(${Math.floor(360 / colorsCount * i)}, 85%, 70%)`);
	}

	return colors;
}

export default getColors;