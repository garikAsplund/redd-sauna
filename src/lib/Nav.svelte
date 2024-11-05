<script lang="ts">
	import Logo from '$lib/svg/Logo.svelte';
	import InstagramSVG from '$lib/svg/InstagramSVG.svelte';
	import { page } from '$app/stores';
	import VenmoSVG  from '$lib/svg/VenmoSVG.svelte';
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
			class="translate-y-1/6 absolute left-1/2 mt-4 hidden -translate-x-1/2 transform hover:opacity-75 md:block"
			aria-current={$page.url.pathname === '/' ? 'page' : undefined}
		>
			<Logo />
		</a>
		<div class="flex items-center">
			<a
			href="/booking"
			class="mx-4 hidden p-2 px-4 text-2xl md:block
				{$page.url.pathname === '/' && scrollY < 10 ? 'invisible' : ''}
				{$page.url.pathname === '/booking' ? 'border-b-2 border-black' : ''}
				{$page.url.pathname === '/' ? 'border-2 border-white' : 'border-2 border-[#d33e27]'}
			"
			style={$page.url.pathname === '/' ? `opacity: ${scrollY / 300}` : ``}
			aria-label="Book now"
			aria-current={$page.url.pathname === '/booking' ? 'page' : undefined}
			onmouseover={() => scrollY >= 10 && ($page.url.pathname === '/' ? (event.target.style.opacity = 0.75) : '')}
			onmouseleave={() => scrollY >= 10 && ($page.url.pathname === '/' ? (event.target.style.opacity = scrollY / 300) : '')}
			onfocus={() => scrollY >= 10 && ($page.url.pathname === '/' ? (event.target.style.opacity = 0.75) : '')}
			onblur={() => scrollY >= 10 && ($page.url.pathname === '/' ? (event.target.style.opacity = scrollY / 300) : '')}
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
				class="scale-125 p-4 hover:opacity-75"
			>
				<VenmoSVG />
			</a>
			<a
				href="https://www.instagram.com/reddsauna"
				target="_blank"
				rel="noopener"
				class="scale-125 p-4 hover:opacity-75"
			>
				<InstagramSVG />
			</a>
		</div>
	</div>
</nav>
