<template>
	<div class="flex flex-col h-screen">
		<Heading />
		<main class="flex-1 overflow-y-auto p-5">
			<router-view />
		</main>
	</div>
</template>

<script>
import Heading from './components/Heading.vue';

export default {
	name: 'App',
	components: {
		Heading,
	},
};
</script>
