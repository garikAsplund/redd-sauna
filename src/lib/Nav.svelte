<script lang="ts">
	import Logo from '$lib/Logo.svelte';
	import Instagram from '$lib/Instagram.svelte';
	import { page } from '$app/stores';
	let { scrollY } = $props();
</script>

<nav
	class="fixed top-0 z-40 w-full md:pb-20 font-bold {$page.url.pathname === '/'
		? 'text-white'
		: 'bg-white text-black'}"
	id="nav"
	aria-label="Main navigation"
>
	<div class="relative flex w-full items-center justify-between md:px-24 md:pt-16">
		<div class="flex">
			<a
				href="/about"
				class="p-4 text-2xl hover:opacity-75 {$page.url.pathname === '/about'
					? 'border-b-2 border-black'
					: ''}"
				aria-label="About"
				aria-current={$page.url.pathname === '/about' ? 'page' : undefined}
			>
				About
			</a>
			<a
				href="/faq"
				class="p-4 text-2xl hover:opacity-75 {$page.url.pathname === '/faq'
					? 'border-b-2 border-black'
					: ''}"
				aria-label="Frequently asked questions"
				aria-current={$page.url.pathname === '/faq' ? 'page' : undefined}
			>
				FAQ
			</a>
		</div>
		<a
			href="/"
			aria-label="Home"
			class="absolute left-1/2 -translate-x-1/2 translate-y-1/6 transform hover:opacity-75 hidden md:block mt-4"
			aria-current={$page.url.pathname === '/' ? 'page' : undefined}
		>
			<Logo />
		</a>
		<div class="flex items-center">
			<a
				href="/booking"
				class="mx-4 p-2 px-4 text-2xl hover:opacity-75 hidden md:block {scrollY < 10 && $page.url.pathname === '/' ? 'invisible' : ''} {$page.url.pathname === '/booking'
					? 'border-b-2 border-black'
					: $page.url.pathname === '/'
					? 'border-2 border-white'
					: 'border-2 border-[#d33e27]'}"
				style={$page.url.pathname === '/' ? `opacity: ${scrollY / 300}` : ``}
				aria-label="Book now"
				aria-current={$page.url.pathname === '/booking' ? 'page' : undefined}
			>
				Book Now
			</a>
			<a 
				href="/" 
				aria-label="Home" 
				class="block md:hidden p-4 scale-125"
				style={$page.url.pathname === '/' ? `opacity: ${scrollY / 300}` : ``}
				aria-current={$page.url.pathname === '/' ? 'page' : undefined}
			>
				<svg
					fill="currentColor"
					height="24"
					role="img"
					viewBox="0 0 24 24"
					width="24"
				>
					<path
						d="M22 23h-6.001a1 1 0 0 1-1-1v-5.455a2.997 2.997 0 1 0-5.993 0V22a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V11.543a1.002 1.002 0 0 1 .31-.724l10-9.543a1.001 1.001 0 0 1 1.38 0l10 9.543a1.002 1.002 0 0 1 .31.724V22a1 1 0 0 1-1 1Z"
					></path>
				</svg>
			</a>
			<Instagram />
		</div>
	</div>
</nav>