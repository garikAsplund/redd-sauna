<script lang="ts">
	import Logo from '$lib/Logo.svelte';
	import Instagram from '$lib/Instagram.svelte';
	import { page } from '$app/stores';
</script>

<nav
	class="fixed top-0 z-10 w-full pb-36 font-bold {$page.url.pathname === '/'
		? 'text-white'
		: 'bg-white text-black'}"
	id="nav"
>
	<div class="relative flex w-full items-center justify-between px-24 pt-12">
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

		<Instagram />
	</div>
</nav>
