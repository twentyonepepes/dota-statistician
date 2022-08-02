import { mean as toMean } from "lodash";

export function seriesToStats(series) {

	const sampleSize = series.length;
	const mean = toMean(series) || 0;
	const max = Math.max(...series);
	const min = Math.min(...series);
	const variances = series.map(n => Math.pow(n - mean, 2));
	const variance = toMean(variances);
	const sigma = Math.pow(variance, 1/2) || 0;
	const variability = sigma ?  sigma / mean  : 0;

	return {
		sampleSize,
		mean,
		sigma,
		variability,
		max,
		min
	}
}