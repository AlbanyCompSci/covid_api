<template><LineChart :chartData="allCases" /></template>

<script>
import { defineComponent } from 'vue';
import { LineChart } from 'vue-chart-3';
import { Chart, registerables } from 'chart.js';
import ky from 'ky';

Chart.register(...registerables);

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

function months(config) {
	var cfg = config || {};
	var count = cfg.count || 12;
	var section = cfg.section;
	var values = [];
	var i, value;

	for (i = 0; i < count; ++i) {
		value = MONTHS[Math.ceil(i) % 12];
		values.push(value.substring(0, section));
	}

	return values;
}

async function getData() {
	return await ky.get('http://155.248.207.29:3000/v2/state/ca/timeseries').json();
}

export default {
	components: { LineChart },
	name: 'Home',
	setup() {
		const labels = months({ count: localStorage.getItem('case_count') });
		const cases = getData().then((json) => {
			let cases = [];
			json.data.actualsTimeseries.slice(200, json.data.actualsTimeseries.length).map((item) => {
				cases.push(item.cases);
				cases = cases.flat();
			});
			localStorage.setItem('cases', JSON.stringify(cases));
			localStorage.setItem('case_count', json.data.actualsTimeseries.slice(200, json.data.actualsTimeseries.length).length);
		});

		const allCases = {
			labels: labels,
			datasets: [
				{
					label: 'total covid cases: california',
					data: JSON.parse(localStorage.getItem('cases')),
					fill: false,
					borderColor: 'rgb(75, 192, 192)',
					tension: 0.1,
				},
			],
		};

		return { allCases };
	},
};
</script>
