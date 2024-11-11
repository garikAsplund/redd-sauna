<script lang="ts">
	import Logo from '$lib/svg/Logo.svelte';
	import { onMount } from 'svelte';

	let scrollY = $state(0);
	let navHeight: number = $state(0);

	onMount(() => {
		let navElement: HTMLDivElement = document.getElementById('nav');

		function calculateNavHeight() {
			if (navElement) {
				navHeight = navElement.offsetHeight; 
				// console.log(`Navigation height: ${navHeight}px`);
			}
		}
		calculateNavHeight();
		window.addEventListener('resize', calculateNavHeight);
		return () => {
			window.removeEventListener('resize', calculateNavHeight);
		};
	});
</script>

<svelte:window bind:scrollY />

<svelte:head>
	<title>Redd Sauna | Home</title>
</svelte:head>

<div class="relative h-screen w-full">
	<enhanced:img
		src="/static/redd-bg.jpeg"
		alt="Redd Sauna"
		class="absolute inset-0 z-20 h-full w-full object-cover object-right"
	/>
	<div class="absolute inset-0 z-20 bg-black/20"></div>
	<div
		class="absolute inset-0 z-30 flex flex-col items-center justify-center space-y-16 translate-y-8 font-bold text-white"
		style="opacity: {1 - scrollY / 300}"
	>
	<div class="md:hidden absolute inset-y-10 -z-10"><Logo /></div>
		<h1 class="text-center text-6xl">Keep your fire burning</h1>
		<a href="/booking">
			<button
				class="rounded-md bg-white p-4 px-6 text-2xl text-[#d33e27] transition-opacity duration-300 hover:opacity-75"
			>
				Book Now
			</button>
		</a>
	</div>
</div>
<div
	class="sticky top-0 md:h-[calc(var(--nav-height)+1px)] bg-[#d33e27] h-[calc(var(--nav-height))]"
	style="--nav-height: {navHeight}px;"
></div>

<div class="mb-8 flex w-full justify-center">
	<section class="h-full w-[80%]">
		<div class="my-32 flex flex-col items-center justify-center space-y-12 text-center">
			<p class="text-4xl font-bold">…a cozy and invigorating sauna right outside your door.</p>
			<p class="text-2xl font-thin">
				We can bring our mobile sauna anywhere in Wallowa County (as long as there are roads).
			</p>
		</div>
		<div class="grid grid-cols-2 items-center gap-12 md:grid-cols-3">
			<enhanced:img
				src="$lib/images/1.jpeg"
				alt="Image 1"
				class="h-auto w-full rounded-sm object-cover"
			/>
			<enhanced:img
				src="$lib/images/2.jpeg"
				alt="Image 2"
				class="h-auto w-full rounded-sm object-cover"
			/>
			<enhanced:img
				src="$lib/images/3.jpeg"
				alt="Image 3"
				class="h-auto w-full rounded-sm object-cover"
			/>
			<enhanced:img
				src="$lib/images/4.jpeg"
				alt="Image 4"
				class="h-auto w-full rounded-sm object-cover"
			/>
			<enhanced:img
				src="$lib/images/5.jpeg"
				alt="Image 5"
				class="h-auto w-full rounded-sm object-cover"
			/>
			<enhanced:img
				src="$lib/images/6.jpeg"
				alt="Image 6"
				class="h-auto w-full rounded-sm object-cover"
			/>
			<enhanced:img
				src="$lib/images/7.jpeg"
				alt="Image 7"
				class="h-auto w-full rounded-sm object-cover"
			/>
			<enhanced:img
				src="$lib/images/8.jpeg"
				alt="Image 8"
				class="h-auto w-full rounded-sm object-cover"
			/>
			<enhanced:img
				src="$lib/images/9.jpeg"
				alt="Image 9"
				class="h-auto w-full rounded-sm object-cover"
			/>
			<enhanced:img
				src="$lib/images/10.jpeg"
				alt="Image 10"
				class="h-auto w-full rounded-sm object-cover"
			/>
			<enhanced:img
				src="$lib/images/11.jpeg"
				alt="Image 11"
				class="h-auto w-full rounded-sm object-cover"
			/>
			<enhanced:img
				src="$lib/images/12.jpeg"
				alt="Image 12"
				class="h-auto w-full rounded-sm object-cover"
			/>
		</div>
	</section>
</div>
