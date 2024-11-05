<script lang="ts">
	import SuperDebug, { superForm } from 'sveltekit-superforms';
	import { schema } from '$lib/zod';
  import { dev } from '$app/environment';

	let { data } = $props();
  let isSubmitting: boolean = $state(false);
	const { form, errors, constraints, message, enhance } = superForm(data.form, {
		schema,
		dataType: 'json'
	});
	const isFormValid = $derived(
		$form.firstName &&
			$form.lastName &&
			$form.preferredContactMethod &&
			$form.deliveryAddress.addressLine1 &&
			$form.deliveryAddress.city &&
			$form.deliveryAddress.zipCode &&
			$form.email &&
			$form.phoneNumber &&
			$form.deliveryDate &&
			$form.numberOfDays
	);

  async function handleSubmit(event) {
    event.preventDefault();
		if (isFormValid) {
			isSubmitting = true; 
			try {
				// Simulate a form submission (replace this with your actual submission logic)
				await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate a delay
				console.log("Form submitted successfully:", $form);
			} catch (error) {
				console.error("Error submitting form:", error);
			} finally {
				isSubmitting = false; // Reset to false after submission
			}
		}
	};
</script>

<section
	class="mx-auto my-8 flex w-full max-w-2xl flex-col items-center rounded-lg bg-gray-50 p-4 py-8 shadow-lg"
	aria-labelledby="booking-form-title"
>
	<h1 id="booking-form-title" class="mb-6 text-2xl font-semibold text-gray-700">Booking Form</h1>

	<SuperDebug data={$form} display={dev}></SuperDebug>

	<form
		method="POST"
		use:enhance
		class="w-full space-y-4"
		aria-label="Reservation booking form"
		novalidate
    onsubmit={handleSubmit}

	>
		<!-- Personal Information Section -->
		<div role="region" aria-labelledby="personal-info-title">
			<h2 id="personal-info-title" class="mb-4 text-lg font-semibold text-gray-700">
				Personal Information
			</h2>

			<div class="grid grid-cols-1 gap-4">
				<div>
					<label for="firstName" class="block text-sm font-medium text-gray-600">
						First Name <span class="text-[#d33e27]" aria-hidden="true">*</span>
						<span class="sr-only">required</span>
					</label>
					<input
						type="text"
						id="firstName"
						name="firstName"
						bind:value={$form.firstName}
						class="mt-1 w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
						required
						aria-required="true"
						autocomplete="given-name"
					/>
				</div>
				<div>
					<label for="lastName" class="block text-sm font-medium text-gray-600">
						Last Name <span class="text-[#d33e27]" aria-hidden="true">*</span>
						<span class="sr-only">required</span>
					</label>
					<input
						type="text"
						id="lastName"
						name="lastName"
						bind:value={$form.lastName}
						class="mt-1 w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
						required
						aria-required="true"
						autocomplete="family-name"
					/>
				</div>
			</div>
		</div>

		<!-- Contact Information Section -->
		<div role="region" aria-labelledby="contact-info-title">
			<h2 id="contact-info-title" class="mb-4 text-lg font-semibold text-gray-700">
				Contact Information
			</h2>

			<div class="space-y-4">
				<div>
					<label for="email" class="block text-sm font-medium text-gray-600">
						Email Address <span class="text-[#d33e27]" aria-hidden="true">*</span>
						<span class="sr-only">required</span>
					</label>
					<input
						type="email"
						id="email"
						name="email"
						bind:value={$form.email}
						class="mt-1 w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
						required
						aria-required="true"
						autocomplete="email"
					/>
				</div>
				<div>
					<label for="phoneNumber" class="block text-sm font-medium text-gray-600">
						Phone Number <span class="text-[#d33e27]" aria-hidden="true">*</span>
						<span class="sr-only">required</span>
					</label>
					<input
						type="tel"
						id="phoneNumber"
						name="phoneNumber"
						bind:value={$form.phoneNumber}
						class="mt-1 w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
						required
						aria-required="true"
						autocomplete="tel"
						pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
						placeholder="123-456-7890"
					/>
				</div>

				<fieldset class="mt-4">
					<legend class="block text-sm font-medium text-gray-600">
						Preferred Contact Method <span class="text-[#d33e27]" aria-hidden="true">*</span>
						<span class="sr-only">required</span>
					</legend>
					<div class="mt-2 flex flex-col space-y-2 pl-4" role="radiogroup">
						<label class="flex items-center">
							<input
								type="radio"
								name="preferredContactMethod"
								value="email"
								bind:group={$form.preferredContactMethod}
								id="contactMethodEmail"
								class="rounded border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-400"
							/>
							<span class="ml-2">Email</span>
						</label>
						<label class="flex items-center">
							<input
								type="radio"
								name="preferredContactMethod"
								value="call"
								bind:group={$form.preferredContactMethod}
								id="contactMethodCall"
								class="rounded border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-400"
							/>
							<span class="ml-2">Phone Call</span>
						</label>
						<label class="flex items-center">
							<input
								type="radio"
								name="preferredContactMethod"
								value="text"
								bind:group={$form.preferredContactMethod}
								id="contactMethodText"
								class="rounded border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-400"
							/>
							<span class="ml-2">Text Message</span>
						</label>
					</div>
				</fieldset>
			</div>
		</div>

		<!-- Delivery Information Section -->
		<div role="region" aria-labelledby="delivery-info-title">
			<h2 id="delivery-info-title" class="mb-4 text-lg font-semibold text-gray-700">
				Delivery Information
			</h2>

			<div class="space-y-4">
				<div>
					<label for="addressLine1" class="block text-sm font-medium text-gray-600">
						Address Line 1 <span class="text-[#d33e27]" aria-hidden="true">*</span>
						<span class="sr-only">required</span>
					</label>
					<input
						type="text"
						id="addressLine1"
						name="deliveryAddress.addressLine1"
						bind:value={$form.deliveryAddress.addressLine1}
						class="mt-1 w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
						required
						aria-required="true"
						autocomplete="address-line1"
					/>
				</div>

				<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
					<div>
						<label for="city" class="block text-sm font-medium text-gray-600">
							City <span class="text-[#d33e27]" aria-hidden="true">*</span>
							<span class="sr-only">required</span>
						</label>
						<input
							type="text"
							id="city"
							name="deliveryAddress.city"
							bind:value={$form.deliveryAddress.city}
							class="mt-1 w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
							required
							aria-required="true"
							autocomplete="address-level2"
						/>
					</div>
					<div>
						<label for="state" class="block text-sm font-medium text-gray-600">
							State <span class="text-[#d33e27]" aria-hidden="true">*</span>
						</label>
						<input
							type="text"
							id="state"
							name="deliveryAddress.state"
							bind:value={$form.deliveryAddress.state}
							class="mt-1 w-full rounded-md border border-gray-300 bg-gray-100 p-2"
							disabled
							aria-disabled="true"
							aria-label="State (Oregon only)"
							autocomplete="address-level1"
						/>
					</div>
				</div>

				<div>
					<label for="zipCode" class="block text-sm font-medium text-gray-600">
						ZIP Code <span class="text-[#d33e27]" aria-hidden="true">*</span>
						<span class="sr-only">required</span>
					</label>
					<input
						type="text"
						id="zipCode"
						name="deliveryAddress.zipCode"
						bind:value={$form.deliveryAddress.zipCode}
						class="mt-1 w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
						required
						aria-required="true"
						autocomplete="postal-code"
						pattern="\d{5}"
						inputmode="numeric"
						maxlength="5"
						oninput={(e) => {
							// Remove any non-numeric characters
							e.target.value = e.target.value.replace(/\D/g, '');
							// Update the form value
							$form.deliveryAddress.zipCode = e.target.value;
						}}
						onpaste={(e) => {
							e.preventDefault();
							// Get pasted content and clean it
							const pastedContent = e.clipboardData.getData('text');
							const numericValue = pastedContent.replace(/\D/g, '').slice(0, 5);
							$form.deliveryAddress.zipCode = numericValue;
						}}
					/>
				</div>
			</div>
		</div>

		<!-- Booking Details Section -->
		<div role="region" aria-labelledby="booking-details-title">
			<h2 id="booking-details-title" class="mb-4 text-lg font-semibold text-gray-700">
				Booking Details
			</h2>

			<div class="space-y-4">
				<div
					class="relative"
					onclick={() => {
						const input = document.getElementById('deliveryDate');
						input?.showPicker();
					}}
					role="presentation"
				>
					<label for="deliveryDate" class="block cursor-pointer text-sm font-medium text-gray-600">
						Delivery Date (a.m.) <span class="text-[#d33e27]" aria-hidden="true">*</span>
						<span class="sr-only">required</span>
					</label>
					<input
						type="date"
						id="deliveryDate"
						name="deliveryDate"
						bind:value={$form.deliveryDate}
						class="mt-1 w-full cursor-pointer rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
						required
						aria-required="true"
						min={new Date().toISOString().split('T')[0]}
					/>
				</div>

				<fieldset>
					<legend class="block text-sm font-medium text-gray-600">
						Number of Days <span class="text-[#d33e27]" aria-hidden="true">*</span>
						<span class="sr-only">required</span>
					</legend>
					<div class="mt-2 flex flex-col space-y-2 pl-4" role="radiogroup">
						{#each [1, 2, 3, 4, 5] as day}
							<label class="flex items-center">
								<input
									type="radio"
									id="day-{day}"
									name="numberOfDays"
									value={day}
									bind:group={$form.numberOfDays}
									class="rounded border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-400"
								/>
								<span class="ml-2">{day} {day === 1 ? 'day' : 'days'}</span>
							</label>
						{/each}
					</div>
				</fieldset>
			</div>
		</div>

		<!-- Additional Options Section -->
		<div role="region" aria-labelledby="additional-options-title">
			<div class="space-y-4">
				<div>
					<label for="additionalComments" class="block text-sm font-medium text-gray-600">
						Additional Comments
					</label>
					<textarea
						id="additionalComments"
						name="additionalComments"
						bind:value={$form.additionalComments}
						class="mt-1 w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
						rows="4"
						aria-label="Additional comments or special requests"
						placeholder="Got special requests? Say so here and I'll be in touch :)"
					></textarea>
				</div>

				<!-- Options -->
				<div class="flex items-center space-x-2">
					<input
						type="checkbox"
						name="isGift"
						bind:checked={$form.isGift}
						class="rounded border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-400"
					/>
					<label for="isGift" class="text-sm font-medium text-gray-600">This is a gift</label>
				</div>
				<div class="flex items-center space-x-2">
					<input
						type="checkbox"
						name="subscribe"
						bind:checked={$form.subscribe}
						class="rounded border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-400"
					/>
					<label for="subscribe" class="text-sm font-medium text-gray-600"
						>Sign up for news and updates</label
					>
				</div>

				<p class="mt-4 text-sm text-gray-500">
					I try to respond and confirm bookings within a day or two. Be sure to check your spam
					folder if you're expecting an email.
				</p>

				<!-- Submit Button -->
				<div>
					<button
						type="submit"
						disabled={!isFormValid || isSubmitting}
						class="mt-4 w-full {isFormValid && !isSubmitting
							? 'bg-[#d33e27]'
							: 'bg-gray-300'} rounded-md py-2 font-semibold text-white transition duration-300 hover:opacity-85"
					>
						{isSubmitting ? 'Please wait...' : 'Complete My Reservation'}
					</button>
				</div>
			</div>
		</div>
	</form>
</section>
