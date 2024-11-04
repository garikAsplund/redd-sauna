<script lang="ts">
	import { faqs } from '$lib/faq';
</script>

<svelte:head>
	<title>Redd Sauna | FAQ</title>
</svelte:head>

<div class="flex w-full flex-col items-center pt-36 md:pt-64 pb-24">
	<section class="w-[70%] space-y-12 text-black/80">
		<h1 class="text-4xl text-center">Frequent Asked Questions</h1>

		<div class="text-xl leading-loose">
			{#each faqs as { question, answer }}
				<div>
					<p><strong>{question}</strong></p>
					<p class="pb-4 pl-8" >{@html answer}</p>
				</div>
			{/each}
		</div>
	</section>
</div>
