<script lang="ts">
	import Logo from '$lib/Logo.svelte';
	import Instagram from '$lib/Instagram.svelte';
	import { page } from '$app/stores';

	let { scrollY } = $props();
</script>

<nav
	class="fixed top-0 z-40 w-full pb-36 font-bold {$page.url.pathname === '/'
		? 'text-white'
		: 'bg-white text-black'}"
	id="nav"
>
	<div class="relative flex w-full items-center justify-between px-24 pt-8">
		<div>
			<a
				href="/about"
				class="p-2 text-2xl hover:opacity-75 {$page.url.pathname === '/about'
					? 'border-b-2 border-black'
					: ''}"
				aria-label="About"
			>
				About
			</a>
			<a
				href="/faq"
				class="p-2 text-2xl hover:opacity-75 {$page.url.pathname === '/faq'
					? 'border-b-2 border-black'
					: ''}"
				aria-label="Frequently asked questions"
			>
				FAQ
			</a>
		</div>
		<a
			href="/"
			aria-label="Home"
			class="absolute left-1/2 -translate-x-1/2 translate-y-1/4 transform hover:opacity-75"
		>
			<Logo />
		</a>
		<div class="flex items-center">
			<a
				href="/booking"
				class="mx-4 p-2 px-4 text-2xl hover:!opacity-75 border-2 {scrollY < 10 && $page.url.pathname === '/' ? 'invisible' : ''} {$page.url.pathname === '/'
					? 'border-white'
					: 'border-[#d33e27]'}"
				style={$page.url.pathname === '/' ? `opacity: ${scrollY / 300}` : ``}
				aria-label="Book now"
				>Book now!
			</a>
			<Instagram />
		</div>
	</div>
</nav>
