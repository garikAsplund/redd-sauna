<script lang="ts">
	let scrollY = $state(0);
</script>

<svelte:window bind:scrollY />

<enhanced:img
	src="/static/redd-bg.jpeg"
	alt="Redd Sauna"
	class="inset-0 -z-20 h-screen w-full object-cover object-right"
/>
<div class="inset-0 -z-10 bg-black/20"></div>
<div class="absolute inset-0 flex items-center justify-center font-bold text-white">
	<h1 class="text-center text-6xl" style="opacity: {1 - scrollY / 300}">
		Keep your fire burning
	</h1>
</div>

<div class="flex w-full justify-center">
	<section class="h-full w-[80%] bg-white">
		<div class="my-16 flex flex-col items-center justify-center space-y-12">
			<p class="text-4xl font-bold">…a cozy and invigorating sauna right outside your door.</p>
			<p class="text-2xl font-thin">
				We can bring our mobile sauna anywhere in Wallowa County (as long as there are roads)
			</p>
		</div>
		<div class="grid h-screen grid-cols-3 gap-9">
			<enhanced:img src="/static/1.jpeg" class="h-64 w-full rounded-md object-cover" />
		</div>
	</section>
</div>
