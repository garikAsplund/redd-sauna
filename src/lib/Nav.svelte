<script lang="ts">
	import Instagram from '$lib/Instagram.svelte';
</script>

<nav
	class="fixed top-0 w-full md:flex justify-between items-center hidden z-40 text-white py-12 px-8 font-bold"
>
	<div class="mx-8 flex items-center space-x-4 nav-items flex-grow">
		<a
			href="#Explore"
			class="p-2 hover:opacity-75 text-2xl"
			aria-label="Explore">Learn more</a
		>
	</div>
	<div class="text-6xl text-center flex-grow">
		Redd Sauna
	</div>
	<div class="flex items-center nav-items flex-grow justify-end mx-8">
		<Instagram />
	</div>
</nav>
