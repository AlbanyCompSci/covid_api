<template><LineChart :chartData="newCases" /></template>

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
	name: 'newCases',
	setup() {
		const cases = getData().then((json) => {
			let cases = [];
			json.data.actualsTimeseries.slice(0, json.data.actualsTimeseries.length).map((item) => {
				cases.push(item.newCases);
			});
			localStorage.setItem('new_cases', JSON.stringify(cases.flat()));
			localStorage.setItem(
				'new_case_count',
				JSON.stringify(months({ count: json.data.actualsTimeseries.slice(0, json.data.actualsTimeseries.length).length }))
			);
		});

		const newCases = {
			labels: JSON.parse(localStorage.getItem('new_case_count')).reverse(),
			datasets: [
				{
					label: 'new covid cases: california',
					data: JSON.parse(localStorage.getItem('new_cases')).reverse(),
					fill: false,
					borderColor: 'rgb(75, 192, 192)',
					tension: 0.1,
				},
			],
		};

		return { newCases };
	},
};
</script>
