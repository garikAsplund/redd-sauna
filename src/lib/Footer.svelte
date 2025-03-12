<script lang="ts">
	import Watermark from './Watermark.svelte';
</script>

<footer class="relative bottom-0 mt-auto flex w-full flex-col justify-center space-x-4 py-8">
	<div class="flex w-full justify-center space-x-4 py-8">
		<p>reddsauna@gmail.com</p>
		<span>|</span>
		<p class="hidden md:block">(541) 626-6261</p>
		<a href="tel:5416266261" class="block md:hidden">(541) 626-6261</a>
	</div>
	<Watermark />
</footer>
