import {
	setRangeColor,
	rgba,
	rgbaToRgb,
	rangeProgressColor,
	trickColor
} from './scripts/ui.js';

import {
	saveRgbaToLocalStorage,
	getRgbaFromLocalStorage,
	loadRgbaFromLocalStorage
} from './scripts/storage.js';

const rgbaControls = document.querySelectorAll('.rgba-control');
const rgbaDisplayText = document.getElementById('rgba-display-text');
const rgbaCopyButton = document.getElementById('rgba-copy-button');

rgbaControls.forEach((control, index) => {
	control.addEventListener('input', () => {
		saveRgbaToLocalStorage(rgbaControls);
		
		const rgbaControlDisplay = control.parentNode.querySelector('.light-type-value');
		const savedRgba = getRgbaFromLocalStorage(rgbaControls);
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

loadRgbaFromLocalStorage(rgbaControls, rgbaDisplayText);