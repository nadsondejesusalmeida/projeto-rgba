export const setRangeColor = ({direction, firstColor, secondColor, value}) => {
	return `linear-gradient(${direction}, ${firstColor} ${value}%, ${secondColor} ${value}%)`;
}

export const rgba = ({red, green, blue, opacity}) => {
	let rgbaText = `rgba(${red}, ${green}, ${blue}, ${opacity})`;
	
	if (rgbaText.includes(', 1)')) {
		rgbaText = rgbaText.replace('rgba(', 'rgb(').replace(', 1)', ')');
	}
	
	return rgbaText;
}

export const rangeProgressColor = 'var(--range-progress-color)';
export const trickColor = 'var(--trick-color)';

export const rangeColorSettings = {
	direction: 'to right',
	firstColor: rangeProgressColor,
	secondColor: trickColor
};

export const rgbaSettings = {
	red: 0,
	green: 0,
	blue: 0,
	opacity: 1,
	updateData: function(data) {
		Object.assign(this, data);
	}
};