const rgbaControl = document.querySelectorAll('.rgba-control');
const rgbaDisplayText = document.getElementById('rgba-display-text');
const rgbaCopyButton = document.getElementById('rgba-copy-button');

const rgbRangeProgressValue = 100 / 255;
const opacityRangeProgressValue = 100 / 1;

const rangeProgressColor = 'var(--range-progress-color)';
const trickColor = 'var(--trick-color)';

const setRangeColor = (direction, firstColor, secondColor, value) => {
	return `linear-gradient(${direction}, ${firstColor} ${value}%, ${secondColor} ${value}%)`;
}

const rgba = (red, green, blue, opacity) => {
	return `rgba(${red}, ${green}, ${blue}, ${opacity})`;
}

const rgbaToRgb = (text) => {
	if (text.includes(', 1)')) {
		return `${text.replace('rgba(', 'rgb(').replace(', 1)', ')')}`
	} else {
		return text;
	}
}

const saveRgbaToLocalStorage = () => {
	const values = {};
	const rgbaValues = Array.from(rgbaControl).forEach((control, index) => {
		switch (index) {
			case 0:
				values.redLightValue = Number(control.value) || 0;
				break;
			case 1:
				values.greenLightValue = Number(control.value) || 0;
				break;
			case 2:
				values.blueLightValue = Number(control.value) || 0;
				break;
			case 3:
				values.opacityValue = Number(control.value) || 1;
		}
		
		return values;
});
	
	localStorage.setItem('rgbaValues', JSON.stringify(values));
}

const loadRgbaFromLocalStorage = () => {
	const savedRgba = JSON.parse(localStorage.getItem('rgbaValues')) || {};
	const { redLightValue,
			greenLightValue,
			blueLightValue,
			opacityValue } = savedRgba;
	
	rgbaDisplayText.textContent = rgbaToRgb(rgba(redLightValue, greenLightValue, blueLightValue, opacityValue));
	
	rgbaControl.forEach((control, index) => {
		const rgbaControlDisplay = control.parentNode.querySelector('.light-type-value');
		
		switch (index) {
			case 0:
				control.value = redLightValue;
				control.style.backgroundImage = setRangeColor('to right', rangeProgressColor, trickColor, control.value * rgbRangeProgressValue);
				break;
			case 1:
				control.value = greenLightValue;
				control.style.backgroundImage = setRangeColor('to right', rangeProgressColor, trickColor, control.value * rgbRangeProgressValue);
				break;
			case 2:
				control.value = blueLightValue;
				control.style.backgroundImage = setRangeColor('to right', rangeProgressColor, trickColor, control.value * rgbRangeProgressValue);
				break;
			case 3:
				control.value = opacityValue;
				control.style.backgroundImage = setRangeColor('to right', rangeProgressColor, trickColor, control.value * opacityRangeProgressValue);
		}
		
		rgbaControlDisplay.textContent = control.value;
		
		document.body.style.backgroundColor = rgba(redLightValue, greenLightValue, blueLightValue, opacityValue);
	});
}

rgbaControl.forEach((control, index) => {
	control.addEventListener('input', () => {
		saveRgbaToLocalStorage();
		
		const rgbaControlDisplay = control.parentNode.querySelector('.light-type-value');
		const savedRgba = JSON.parse(localStorage.getItem('rgbaValues'));
		const { redLightValue,
				greenLightValue,
				blueLightValue,
				opacityValue } = savedRgba;
		
		rgbaDisplayText.textContent = rgbaToRgb(rgba(redLightValue, greenLightValue, blueLightValue, opacityValue));
		
		control.style.backgroundImage = setRangeColor('to right', rangeProgressColor, trickColor, control.value * opacityRangeProgressValue);
		
		switch (index) {
			case 0:
				control.value = redLightValue;
				control.style.backgroundImage = setRangeColor('to right', rangeProgressColor, trickColor, control.value * rgbRangeProgressValue);
				break;
			case 1:
				control.value = greenLightValue;
				control.style.backgroundImage = setRangeColor('to right', rangeProgressColor, trickColor, control.value * rgbRangeProgressValue);
				break;
			case 2:
				control.value = blueLightValue;
				control.style.backgroundImage = setRangeColor('to right', rangeProgressColor, trickColor, control.value * rgbRangeProgressValue);
				break;
			case 3:
				control.style.backgroundImage = setRangeColor('to right', rangeProgressColor, trickColor, control.value * opacityRangeProgressValue);
				break;
		}
		
		rgbaControlDisplay.textContent = control.value;
		
		document.body.style.backgroundColor = rgba(redLightValue, greenLightValue, blueLightValue, opacityValue);
	});
});

rgbaCopyButton.addEventListener('click', (event) => {
	const targetButton = event.currentTarget;
	targetButton.style.borderColor = '#00FF00';
	
	setTimeout(() => {
		targetButton.style.borderColor = 'transparent';
	}, 1500);
	
	navigator.clipboard.writeText(rgbaDisplayText.textContent);
});

loadRgbaFromLocalStorage();