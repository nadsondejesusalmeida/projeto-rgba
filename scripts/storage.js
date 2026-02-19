import {
	setRangeColor,
	rgba,
	rangeColorSettings,
	rgbaSettings
} from './ui.js';

export const saveRgbaToLocalStorage = (controls) => {
	const rgbaValues = Array.from(controls).map((control, index) => {
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
				values.value = Number(control.value) ?? 1;
				values.rangeProgressColor = 100 / 1;
				break;
		}
		
		return values;
	});
	
	localStorage.setItem('rgbaValues', JSON.stringify(rgbaValues));
}

export const getRgbaFromLocalStorage = (controls) => {
	let rgbaValues = JSON.parse(localStorage.getItem('rgbaValues'));
	
	if (!rgbaValues) {
		saveRgbaToLocalStorage(controls);
		rgbaValues = JSON.parse(localStorage.getItem('rgbaValues'));
	}
	
	return rgbaValues;
}

export const loadRgbaFromLocalStorage = (controls, displayText) => {
	const savedRgba = getRgbaFromLocalStorage(controls);
	const [ redLight, greenLight, blueLight, opacity ] = savedRgba;
	
	rgbaSettings.updateData({
		red: redLight.value,
		green: greenLight.value,
		blue: blueLight.value,
		opacity: opacity.value
	});
	
	displayText.textContent = rgba(rgbaSettings);
	
	document.body.style.backgroundColor = rgba(rgbaSettings);
	
	controls.forEach((control, index) => {
		const rgbaControlDisplay = control.parentNode.querySelector('.light-type-value');
		
		control.value = savedRgba[index].value;
		
		rangeColorSettings.value = control.value * savedRgba[index].rangeProgressColor;
		
		control.style.backgroundImage = setRangeColor(rangeColorSettings);
		
		rgbaControlDisplay.textContent = control.value;
	});
}