import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';
import { stringify } from 'csv-stringify/sync';

const CSV_PATH = path.resolve('src/lib/data/abbreviations.csv');

function isValidUrl(str) {
	try {
		const url = new URL(str);
		return url.protocol === 'http:' || url.protocol === 'https:';
	} catch {
		return false;
	}
}

function formatAndValidate() {
	if (!fs.existsSync(CSV_PATH)) {
		console.error(`CSV file not found at ${CSV_PATH}`);
		process.exit(1);
	}

	const rawText = fs.readFileSync(CSV_PATH, 'utf-8');
	let parsed;
	try {
		parsed = parse(rawText, { skip_empty_lines: true });
	} catch (err) {
		console.error('Error parsing CSV:', err.message);
		process.exit(1);
	}

	if (parsed.length === 0) process.exit(1);

	const header = parsed[0].map((h) => h.trim());
	const expected = ['abbreviation', 'meaning', 'categories', 'sources', 'organizations'];

	if (header.length !== expected.length || !expected.every((h, i) => header[i] === h)) {
		console.error(`Invalid headers. Expected: ${expected.join(', ')}`);
		process.exit(1);
	}

	const errors = [];
	const rows = [];

	for (let i = 1; i < parsed.length; i++) {
		const rawRow = parsed[i];
		const rowNum = i + 1;

		if (rawRow.length !== expected.length) {
			errors.push(`Row ${rowNum}: Expected ${expected.length} columns, got ${rawRow.length}`);
			continue;
		}

		const abbreviation = rawRow[0].trim();
		const meaning = rawRow[1].trim();
		const categories = rawRow[2].trim();
		const sourcesRaw = rawRow[3].trim();
		const organizations = rawRow[4].trim();

		if (!abbreviation) errors.push(`Row ${rowNum}: Abbreviation is empty`);
		if (!meaning) errors.push(`Row ${rowNum}: Meaning is empty`);

		const sources = sourcesRaw
			? sourcesRaw
					.split('|')
					.map((s) => s.trim())
					.filter(Boolean)
			: [];
		for (const src of sources) {
			if (!isValidUrl(src)) {
				errors.push(`Row ${rowNum}: Invalid source URL "${src}"`);
			}
		}

		if (errors.length === 0) {
			rows.push([abbreviation, meaning, categories, sources.join('|'), organizations]);
		}
	}

	if (errors.length > 0) {
		errors.forEach((err) => console.error(err));
		process.exit(1);
	}

	rows.sort((a, b) => a[0].localeCompare(b[0], 'de', { sensitivity: 'base' }));

	try {
		const output = stringify([expected, ...rows]);
		fs.writeFileSync(CSV_PATH, output, 'utf-8');
		console.log('CSV formatted and sorted successfully.');
	} catch (err) {
		console.error('Error writing CSV:', err.message);
		process.exit(1);
	}
}

formatAndValidate();
