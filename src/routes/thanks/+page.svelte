<script>
	import { page } from '$app/stores';

    const name = $page.url.searchParams.get('name');
</script>

<div class="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-4 text-gray-800" role="main">
	<div class="w-full max-w-lg rounded-lg bg-white p-8 text-center shadow-lg">
		<h1 class="mb-4 text-2xl font-bold text-[#d33e27]">Thank you for booking 🙏</h1>
		<p class="mb-6 text-gray-600">Your reservation was successful.</p>
		<p class="text-gray-600 text-xl">
			We look forward to seeing you{ name ? `, ${name}` : '' }!
		</p>
	</div>
</div>
