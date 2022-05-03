<template>
	<nav class="bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-800">
		<div class="container flex flex-wrap justify-between items-center mx-auto">
			<a href="/" class="flex items-center">
				<span class="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Covid Charts</span>
			</a>
			<div>
				<a href="/all">
					<span class="text-sm font-semibold mr-5 hover:text-blue-500">All Cases</span>
				</a>
				<a href="/new">
					<span class="text-sm font-semibold hover:text-blue-500">New Cases</span>
				</a>
			</div>
		</div>
	</nav>
</template>

<script>
export default {
	name: 'Heading',
};
</script>
