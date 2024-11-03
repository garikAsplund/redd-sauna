<script lang="ts">
	import Nav from '$lib/Nav.svelte';
	import '../app.css';
	
	let { children } = $props();
</script>

<enhanced:img
	src="/static/redd-bg.jpg"
	alt="Redd Sauna"
	class="fixed inset-0 -z-20 h-screen w-full object-cover"
/>
<div class="fixed inset-0 -z-10 bg-black/20"></div>
<Nav />
<div class="relative min-h-screen">
	{@render children()}
</div>
