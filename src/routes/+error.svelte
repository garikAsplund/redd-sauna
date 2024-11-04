<script lang="ts">
	import { page } from '$app/stores';
</script>

<div class="relative flex h-[90vh] w-full flex-col items-center justify-center">
	<h1 class="text-3xl text-black mt-16">{$page.status}: {$page.error?.message}</h1>
</div>
