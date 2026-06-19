declare module '*.csv' {
	export interface Abbreviation {
		abbreviation: string;
		meaning: string;
		categories: string;
		sources: string;
		organizations: string;
	}
	const content: Abbreviation[];
	export default content;
}
