<script lang="ts">
	import * as Accordion from '$lib/components/ui/accordion/index.js';
	import { faqs } from '$lib/faq';
</script>

<svelte:head>
	<title>Redd Sauna | FAQ</title>
</svelte:head>

<!-- Accordion Component - Mobile Only -->
<div class="flex w-full justify-center">
	<div class="flex w-[70%] flex-col items-center justify-center pb-24 pt-24 sm:hidden">
		<Accordion.Root class="w-full space-y-4">
			{#each faqs as { question, answer }, i}
				<Accordion.Item value={`item-${i}`}>
					<Accordion.Trigger>{question}</Accordion.Trigger>
					<Accordion.Content>{@html answer}</Accordion.Content>
				</Accordion.Item>
			{/each}
		</Accordion.Root>
	</div>
</div>

<!-- Regular FAQ Layout - Desktop Only -->
<div class="hidden w-full flex-col items-center pb-24 pt-24 sm:flex md:pt-64">
	<section class="max-w-4xl space-y-12 text-black/80 px-8">
		<h1 class="text-center text-4xl">Frequently Asked Questions</h1>

		<div class="text-xl leading-loose">
			{#each faqs as { question, answer }}
				<div>
					<p><strong>{question}</strong></p>
					<p class="pb-4 pl-8">{@html answer}</p>
				</div>
			{/each}
		</div>
	</section>
</div>
