<script lang="ts">
	import { page } from '$app/stores';
</script>

<div class="relative flex h-full w-full flex-col items-center justify-center">
	<enhanced:img src="/static/404.png" class="object-contain w-full h-full mb-24" alt="Listening to Kanye, I see"/>
	<h1 class="text-3xl text-white/70 mt-16">{$page.status}: {$page.error?.message}</h1>
</div>
