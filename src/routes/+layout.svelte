<script lang="ts">
	import Footer from '$lib/Footer.svelte';
	import Nav from '$lib/Nav.svelte';
	import '../app.css';

	let { children } = $props();
	let scrollY = $state(0);
</script>

<svelte:window bind:scrollY />

<main class="flex min-h-screen flex-col">
	<Nav {scrollY}/>

	{@render children()}

	<Footer />
</main>
