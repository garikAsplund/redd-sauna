<script>
	import BookingForm from "$lib/BookingForm.svelte";
	
	let { data } = $props();
</script>

<svelte:head>
	<title>Redd Sauna | Booking</title>
</svelte:head>


<section class="w-full px-4 md:pt-64 pt-24 flex flex-col items-center">
	<div class="w-full max-w-screen-lg px-4">
		<iframe
			scrolling="no"
			src="https://calendar.google.com/calendar/embed?height=600&amp;wkst=1&amp;bgcolor=%23ffffff&amp;ctz=America%2FLos_Angeles&amp;showTz=0&amp;showCalendars=0&amp;showPrint=0&amp;showTabs=0&amp;showTitle=0&amp;src=YTZsbWF2N2NzZzFxbGxwbWE0dHBoOWlhcnNAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&amp;color=%23D81B60&amp;wmode=opaque"
			width="100%"
			title="Redd Sauna Booking"
			frameborder="0"
			class="border-0 w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] max-h-screen overflow-x-hidden"
		></iframe>
	</div>
    <BookingForm {data} />
</section>
