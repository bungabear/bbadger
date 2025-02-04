const fs = require('fs');


function saveFileToJson(file, output) {
	const f = fs.readFileSync(file);
	const encoded = f.toString('base64');
	const bson = {
		name: 'OpenSans-Bold.ttf',
		data: encoded,
	};
	fs.writeFileSync(output, JSON.stringify(bson));
}

function loadFileFromJson(json, output) {
	const file = fs.readFileSync(json);
	const j = JSON.parse(file.toString('utf8'));
	const buffer = Buffer.from(j.data, "base64");
	fs.writeFileSync(output, buffer);
}

module.exports = {
	saveFileToJson,
	loadFileFromJson,
}
