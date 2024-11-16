<script lang="ts">
	import Logo from '$lib/svg/Logo.svelte';
	import InstagramSVG from '$lib/svg/InstagramSVG.svelte';
	import { page } from '$app/stores';
	import VenmoSVG from '$lib/svg/VenmoSVG.svelte';
	import HomeSVG from '$lib/svg/HomeSVG.svelte';

	let { scrollY } = $props();
</script>

<nav
	class="fixed top-0 z-40 w-full font-bold md:pb-20 {$page.url.pathname === '/'
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
			class="translate-y-1/6 absolute left-1/2 mt-8 hidden -translate-x-1/2 transform hover:opacity-75 md:block md:scale-75 lg:scale-[90%]"
			aria-current={$page.url.pathname === '/' ? 'page' : undefined}
		>
			<Logo />
		</a>
		<div class="flex items-center space-x-4">
			<a
				href="/booking"
				class="hidden p-2 lg:px-4 lg:mx-2 text-2xl md:block md:scale-75 lg:scale-100
        {$page.url.pathname === '/' && scrollY < 10 ? 'invisible' : ''}
        {$page.url.pathname === '/' ? 'border-2 border-white' : 'border-2 border-[#d33e27]'}
        {$page.url.pathname === '/booking' ? 'invisible' : ''}"
				style={$page.url.pathname === '/'
					? `opacity: ${scrollY / 300}; transition: opacity 0.3s`
					: ''}
				aria-label="Book now"
				aria-current={$page.url.pathname === '/booking' ? 'page' : undefined}
				onmouseover={() => (event.target.style.opacity = 0.75)}
				onmouseleave={() => (event.target.style.opacity = 1)}
				onfocus={() => (event.target.style.opacity = 0.75)}
				onblur={() => (event.target.style.opacity = 1)}
			>
				Book Now
			</a>

			<a
				href="/"
				aria-label="Home"
				class="block scale-125 p-4 md:hidden"
				style={$page.url.pathname === '/' ? `opacity: ${scrollY / 300}` : ``}
				aria-current={$page.url.pathname === '/' ? 'page' : undefined}
			>
				<HomeSVG />
			</a>
			<a
				href="https://account.venmo.com/u/reddsauna"
				rel="noopener noreferrer"
				target="_blank"
				aria-label="Venmo"
				class="scale-125 p-4 md:p-2 hover:opacity-75"
			>
				<VenmoSVG />
			</a>
			<a
				href="https://www.instagram.com/reddsauna"
				target="_blank"
				rel="noopener"
				class="scale-125 p-4 md:p-2 hover:opacity-75"
			>
				<InstagramSVG />
			</a>
		</div>
	</div>
</nav>
