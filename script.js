import {
	setRangeColor,
	rgba,
	rangeColorSettings,
	rgbaSettings
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
		const [ redLight, greenLight, blueLight, opacity ] = savedRgba;
		
		rgbaSettings.updateData({
			red: redLight.value,
			green: greenLight.value,
			blue: blueLight.value,
			opacity: opacity.value
		});
		
		rangeColorSettings.value = control.value * savedRgba[index].rangeProgressColor;
		
		rgbaDisplayText.textContent = rgba(rgbaSettings);
		
		control.style.backgroundImage = setRangeColor(rangeColorSettings);
		
		rgbaControlDisplay.textContent = control.value;
		
		document.body.style.backgroundColor = rgba(rgbaSettings);
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