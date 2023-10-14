const fromSelectLanguages = document.getElementById('fromSelect')
const toSelectLanguages = document.getElementById('toSelect')

const fromTextArea = document.getElementById('fromTextarea')
const toTextArea = document.getElementById('toTextarea')

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '36da985f0bmsh1dfd70afbf899dcp1b558ejsnc51a4984864b',
		'X-RapidAPI-Host': 'text-translator2.p.rapidapi.com'
	}
};



fetch('https://text-translator2.p.rapidapi.com/getLanguages', options)
	.then(response => response.json())
	.then(({ data }) => data.languages.forEach(languages => {
		fromSelectLanguages.innerHTML += `<option value=${languages.code} >${languages.name} </option>`;
		toSelectLanguages.innerHTML += `<option value=${languages.code} >${languages.name} </option>`;
	}))
	.catch(err => console.error(err));





//traducir
let lastText = ''
function update() {
	if (lastText != fromTextArea.value) {
		lastText = fromTextArea.value;
		translate()
	}
}

setInterval(update, 2);

function translate() {
	const fromTransalateLanguage = fromSelectLanguages.value
	const toTransalateLanguage = toSelectLanguages.value
	const toTransalateText = fromTextArea.value


	if (fromTransalateLanguage != "" && toTransalateLanguage != "" && toTransalateText != "") {
		const encodedParams = new URLSearchParams();
		encodedParams.append("source_language", fromTransalateLanguage);
		encodedParams.append("target_language", toTransalateLanguage);
		encodedParams.append("text", toTransalateText);

		const options = {
			method: 'POST',
			headers: {
				'content-type': 'application/x-www-form-urlencoded',
				'X-RapidAPI-Key': '36da985f0bmsh1dfd70afbf899dcp1b558ejsnc51a4984864b',
				'X-RapidAPI-Host': 'text-translator2.p.rapidapi.com'
			},
			body: encodedParams
		};



		fetch('https://text-translator2.p.rapidapi.com/translate', options)
			.then(response => response.json())
			.then(({ data }) => toTextArea.innerText = data.translatedText)
			.catch(err => console.error(err));
	}




}



