const activeTrackColor = 'var(--active-track-color)';
const inactiveTrackColor = 'var(--inactive-track-color)';

export const setRangeColor = ({direction, activeColor, inactiveColor, value}) => {
	return `linear-gradient(${direction}, ${activeColor} ${value}%, ${inactiveColor} ${value}%)`;
}

export const rgba = ({red, green, blue, opacity}) => {
	let rgbaText = `rgba(${red}, ${green}, ${blue}, ${opacity})`;
	
	if (rgbaText.includes(', 1)')) {
		rgbaText = rgbaText.replace('rgba(', 'rgb(').replace(', 1)', ')');
	}
	
	return rgbaText;
}

export const rangeColorSettings = {
	direction: 'to right',
	activeColor: activeTrackColor,
	inactiveColor: inactiveTrackColor
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