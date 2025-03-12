<script>
    import { page } from '$app/state';
    import { fly } from 'svelte/transition';

    const name = page.url.searchParams.get('name');
    const email = page.url.searchParams.get('email');
</script>

<div 
    class="flex min-h-[90vh] flex-col items-center justify-center bg-gray-100 p-4 text-gray-800" 
    role="main"
>
<div 
class="w-full max-w-lg rounded-lg bg-white p-8 text-center shadow-lg space-y-6 animate-fade-in"
in:fly={{ y: 100, duration: 800, opacity: 0 }}
>
        <h1 class="text-3xl font-bold text-[#d33e27]">
            Thank you for booking 🎉
        </h1>

        {#if email}
            <p class="text-gray-600">
                An email was sent to <span class="font-medium text-gray-800">{email}</span>
            </p>
        {/if}

        <p class="text-xl text-gray-700">
            We look forward to seeing you{name ? `, ${name}` : ''}!
        </p>
    </div>
</div>