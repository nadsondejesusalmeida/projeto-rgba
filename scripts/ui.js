export const setRangeColor = (direction, firstColor, secondColor, value) => {
	return `linear-gradient(${direction}, ${firstColor} ${value}%, ${secondColor} ${value}%)`;
}

export const rgba = (red, green, blue, opacity) => {
	return `rgba(${red}, ${green}, ${blue}, ${opacity})`;
}

export const rgbaToRgb = (text) => {
	if (text.includes(', 1)')) {
		return `${text.replace('rgba(', 'rgb(').replace(', 1)', ')')}`
	} else {
		return text;
	}
}

export const rangeProgressColor = 'var(--range-progress-color)';
export const trickColor = 'var(--trick-color)';