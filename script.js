const rgbaControl = document.querySelectorAll('.rgba-control');
const rgbaDisplayText = document.getElementById('rgba-display-text');
const rgbaCopyButton = document.getElementById('rgba-copy-button');

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
	const rgbaValues = Array.from(rgbaControl).map((control, index) => {
		const values = {};
		values.value = Number(control.value) || 0;
		values.rangeProgressColor = 100 / 255;
		
		switch (index) {
			case 0: // Luz vermelha (R)
				values.name = 'redLight';
				break;
			case 1: // Luz verde (G)
				values.name = 'greenLight';
				break;
			case 2: // Luz azul (B)
				values.name = 'blueLight';
				break;
			case 3: // Opacidade (A)
				values.name = 'opacity';
				values.value = Number(control.value) || 1;
				values.rangeProgressColor = 100 / 1;
				break;
		}
		
		return values;
	});
	
	localStorage.setItem('rgbaValues', JSON.stringify(rgbaValues));
}

const getRgbaFromLocalStorage = () => {
	let rgbaValues = JSON.parse(localStorage.getItem('rgbaValues'));
	
	if (!rgbaValues) {
		saveRgbaToLocalStorage();
		rgbaValues = JSON.parse(localStorage.getItem('rgbaValues'));
	}
	
	return rgbaValues;
}

const loadRgbaFromLocalStorage = () => {
	const savedRgba = getRgbaFromLocalStorage();
	const [ redLight,
			greenLight,
			blueLight,
			opacity ] = savedRgba;
	
	rgbaDisplayText.textContent = rgbaToRgb(rgba(redLight.value, greenLight.value, blueLight.value, opacity.value));
	
	rgbaControl.forEach((control, index) => {
		const rgbaControlDisplay = control.parentNode.querySelector('.light-type-value');
		
		control.value = savedRgba[index].value;
		control.style.backgroundImage = setRangeColor('to right', rangeProgressColor, trickColor, control.value * savedRgba[index].rangeProgressColor);
		
		
		rgbaControlDisplay.textContent = control.value;
		
		document.body.style.backgroundColor = rgba(redLight.value, greenLight.value, blueLight.value, opacity.value);
	});
}

rgbaControl.forEach((control, index) => {
	control.addEventListener('input', () => {
		saveRgbaToLocalStorage();
		
		const rgbaControlDisplay = control.parentNode.querySelector('.light-type-value');
		const savedRgba = getRgbaFromLocalStorage();
		const [ redLight,
				greenLight,
				blueLight,
				opacity ] = savedRgba;
		
		rgbaDisplayText.textContent = rgbaToRgb(rgba(redLight.value, greenLight.value, blueLight.value, opacity.value));
		
		control.value = savedRgba[index].value;
		control.style.backgroundImage = setRangeColor('to right', rangeProgressColor, trickColor, control.value * savedRgba[index].rangeProgressColor);
		
		rgbaControlDisplay.textContent = control.value;
		
		document.body.style.backgroundColor = rgba(redLight.value, greenLight.value, blueLight.value, opacity.value);
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