<script lang="ts">
	import SuperDebug, { superForm } from 'sveltekit-superforms';
	import { schema } from '$lib/zod';
	import { dev } from '$app/environment';
	import { zod } from 'sveltekit-superforms/adapters';

	let { data } = $props();
	let isSubmitting: boolean = $state(false);
	const { form, errors, constraints, message, enhance, validateForm } = superForm(data.form, {
		validators: zod(schema),
		schema,
		dataType: 'json'
	});
	const isFormValid = $derived(
		$form.firstName &&
			$form.lastName &&
			// $form.preferredContactMethod &&
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
		const result = await validateForm();

		if (result.valid) {
			isSubmitting = true;
			try {
			} catch (error) {
				console.error('Error submitting form:', error);
				isSubmitting = false;
			}
		} else {
			console.error('Form is not valid');
			isSubmitting = false;
		}
	}
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
						First Name
						<span class="sr-only">required</span>
					</label>
					{#if $errors.firstName}
						
						<p class="mt-1 text-sm text-red-500 flex items-end gap-1" role="alert"><svg
							class="h-4 w-4"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
							/>
						</svg>
						{$errors.firstName}</p>
					{/if}
					<input
						type="text"
						id="firstName"
						name="firstName"
						bind:value={$form.firstName}
						class="mt-1 w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 {$errors.firstName
							? 'border-red-500'
							: ''}"
						required
						maxlength="35"
						aria-required="true"
						aria-invalid={$errors.firstName ? 'true' : undefined}
						autocomplete="given-name"
					/>
				</div>
				<div>
					<label for="lastName" class="block text-sm font-medium text-gray-600">
						Last Name
						<span class="sr-only">required</span>
					</label>
					{#if $errors.lastName}
						
						<p class="mt-1 text-sm text-red-500 flex items-end gap-1" role="alert"><svg
							class="h-4 w-4"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
							/>
						</svg>
						{$errors.lastName}</p>
					{/if}
					<input
						type="text"
						id="lastName"
						name="lastName"
						bind:value={$form.lastName}
						class="mt-1 w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 {$errors.lastName
							? 'border-red-500'
							: ''}"
						required
						maxlength="35"
						aria-required="true"
						aria-invalid={$errors.lastName ? 'true' : undefined}
						autocomplete="family-name"
					/>
				</div>
			</div>
		</div>

		<!-- Contact Information Section -->
		<div role="region" aria-labelledby="contact-info-title">
			<div class="space-y-4">
				<div>
					<label for="email" class="block text-sm font-medium text-gray-600">
						Email Address
						<span class="sr-only">required</span>
					</label>
					{#if $errors.email}
						
						<p class="mt-1 text-sm text-red-500 flex items-end gap-1" role="alert"><svg
							class="h-4 w-4"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
							/>
						</svg>
						{$errors.email}</p>
					{/if}
					<input
						type="email"
						id="email"
						name="email"
						bind:value={$form.email}
						class="mt-1 w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 {$errors.email
							? 'border-red-500'
							: ''}"
						required
						maxlength="255"
						aria-required="true"
						aria-invalid={$errors.email ? 'true' : undefined}
						autocomplete="email"
					/>
				</div>
				<div>
					<label for="phoneNumber" class="block text-sm font-medium text-gray-600">
						Phone Number
						<span class="sr-only">required</span>
					</label>
					{#if $errors.phoneNumber}
						
						<p class="mt-1 text-sm text-red-500 flex items-end gap-1" role="alert">
						<svg
							class="h-4 w-4"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
							/>
						</svg>
						{$errors.phoneNumber}</p>
					{/if}
					<input
						type="tel"
						id="phoneNumber"
						name="phoneNumber"
						bind:value={$form.phoneNumber}
						class="mt-1 w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 {$errors.phoneNumber
							? 'border-red-500'
							: ''}"
						required
						aria-required="true"
						aria-invalid={$errors.phoneNumber ? 'true' : undefined}
						autocomplete="tel"
						pattern="^(\(?\d{3}\)?[-.\s]?)?\d{3}[-.\s]?\d{4}$"
						oninput={(e) => {
							e.target.value = e.target.value.replace(/[^0-9().-\s]/g, '');
							$form.phoneNumber = e.target.value;
						}}
						onpaste={(e) => {
							e.preventDefault();
							const pastedContent = e.clipboardData.getData('text');
							const formattedValue = pastedContent.replace(/[^0-9().-\s]/g, '');
							$form.phoneNumber = formattedValue;
						}}
					/>
				</div>
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
						Address
						<span class="sr-only">required</span>
					</label>
					{#if $errors.deliveryAddress?.addressLine1}
						
						<p class="mt-1 text-sm text-red-500 flex items-end gap-1" role="alert">
							<svg
							class="h-4 w-4"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
							/>
						</svg>
						{$errors.deliveryAddress.addressLine1}
						</p>
					{/if}
					<input
						type="text"
						id="addressLine1"
						name="deliveryAddress.addressLine1"
						bind:value={$form.deliveryAddress.addressLine1}
						class="mt-1 w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 {$errors
							.deliveryAddress?.addressLine1
							? 'border-red-500'
							: ''}"
						required
						maxlength="100"
						aria-required="true"
						aria-invalid={$errors.deliveryAddress?.addressLine1 ? 'true' : undefined}
						autocomplete="address-line1"
					/>
				</div>

				<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
					<div>
						<label for="city" class="block text-sm font-medium text-gray-600">
							City
							<span class="sr-only">required</span>
						</label>
						{#if $errors.deliveryAddress?.city}
							
							<p class="mt-1 text-sm text-red-500 flex items-end gap-1" role="alert"><svg
								class="h-4 w-4"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
								/>
							</svg>
							{$errors.deliveryAddress.city}</p>
						{/if}
						<input
							type="text"
							id="city"
							name="deliveryAddress.city"
							bind:value={$form.deliveryAddress.city}
							class="mt-1 w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 {$errors
								.deliveryAddress?.city
								? 'border-red-500'
								: ''}"
							required
							maxlength="50"
							aria-required="true"
							aria-invalid={$errors.deliveryAddress?.city ? 'true' : undefined}
							autocomplete="address-level2"
						/>
					</div>
					<div>
						<label for="state" class="block text-sm font-medium text-gray-600"> State </label>
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
						ZIP Code
						<span class="sr-only">required</span>
					</label>
					{#if $errors.deliveryAddress?.zipCode}
						<p class="mt-1 text-sm text-red-500 flex items-end gap-1" role="alert">
							<svg
								class="h-4 w-4"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
								/>
							</svg>
							{$errors.deliveryAddress.zipCode}
						</p>
					{/if}
					<input
						type="text"
						id="zipCode"
						name="deliveryAddress.zipCode"
						bind:value={$form.deliveryAddress.zipCode}
						class="mt-1 w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 {$errors
							.deliveryAddress?.zipCode
							? 'border-red-500'
							: ''}"
						required
						aria-required="true"
						aria-invalid={$errors.deliveryAddress?.zipCode ? 'true' : undefined}
						autocomplete="postal-code"
						pattern="\d{5}"
						inputmode="numeric"
						maxlength="5"
						oninput={(e) => {
							e.target.value = e.target.value.replace(/\D/g, '');
							$form.deliveryAddress.zipCode = e.target.value;
						}}
						onpaste={(e) => {
							e.preventDefault();
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
						Delivery Date (a.m.)
						<span class="sr-only">required</span>
					</label>
					{#if $errors.deliveryDate}
						
						<p class="mt-1 text-sm text-red-500 flex items-end gap-1" role="alert"><svg
							class="h-4 w-4"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
							/>
						</svg>
						{$errors.deliveryDate}</p>
					{/if}
					<input
						type="date"
						id="deliveryDate"
						name="deliveryDate"
						bind:value={$form.deliveryDate}
						class="mt-1 w-full cursor-pointer rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 {$errors.deliveryDate
							? 'border-red-500'
							: ''}"
						required
						aria-required="true"
						aria-invalid={$errors.deliveryDate ? 'true' : undefined}
						min={new Date().toISOString().split('T')[0]}
					/>
				</div>

				<fieldset>
					<legend class="block text-sm font-medium text-gray-600">
						Number of Days
						<span class="sr-only">required</span>
					</legend>
					{#if $errors.numberOfDays}
						<p class="mt-1 text-sm text-red-500 flex items-end gap-1" role="alert"><svg
							class="h-4 w-4"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
							/>
						</svg>
						{$errors.numberOfDays}</p>
					{/if}
					<div
						class="mt-2 flex flex-col space-y-2 pl-4"
						role="radiogroup"
						aria-invalid={$errors.numberOfDays ? 'true' : undefined}
					>
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

			<div role="region" aria-labelledby="additional-options-title">
				<div class="space-y-4">
					<div>
						<label for="additionalComments" class="block pt-4 text-sm font-medium text-gray-600">
							Additional Comments
						</label>
						{#if $errors.additionalComments}
							<p class="mt-1 text-sm text-red-500 flex items-end gap-1" role="alert"><svg
								class="h-4 w-4"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
								/>
							</svg>
							{$errors.additionalComments}</p>
						{/if}
						<textarea
							id="additionalComments"
							name="additionalComments"
							bind:value={$form.additionalComments}
							class="mt-1 w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 {$errors.additionalComments
								? 'border-red-500'
								: ''}"
							rows="4"
							maxlength="500"
							aria-label="Additional comments or special requests"
							aria-invalid={$errors.additionalComments ? 'true' : undefined}
							placeholder="Got special requests? Say so here and I'll be in touch :)"
						></textarea>
					</div>

					<!-- Options -->
					<div class="flex items-center space-x-2">
						<input
							type="checkbox"
							id="isGift"
							name="isGift"
							bind:checked={$form.isGift}
							class="rounded border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-400"
							aria-invalid={$errors.isGift ? 'true' : undefined}
						/>
						<label for="isGift" class="text-sm font-medium text-gray-600">This is a gift</label>
						{#if $errors.isGift}
							<p class="mt-1 text-sm text-red-500 flex items-end gap-1" role="alert"><svg
								class="h-4 w-4"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
								/>
							</svg>
							{$errors.isGift}</p>
						{/if}
					</div>

					<div class="flex items-center space-x-2">
						<input
							type="checkbox"
							id="subscribe"
							name="subscribe"
							bind:checked={$form.subscribe}
							class="rounded border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-400"
							aria-invalid={$errors.subscribe ? 'true' : undefined}
						/>
						<label for="subscribe" class="text-sm font-medium text-gray-600"
							>Sign up for news and updates</label
						>
						{#if $errors.subscribe}
							<p class="mt-1 text-sm text-red-500 flex items-end gap-1" role="alert"><svg
								class="h-4 w-4"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
								/>
							</svg>
							{$errors.subscribe}</p>
						{/if}
					</div>

					<p class="mt-4 text-sm text-gray-500">
						I try to respond and confirm bookings within a day or two.
					</p>
					<p class="mt-4 text-sm text-gray-500">
						Be sure to check your spam folder if you're expecting an email.
					</p>

					<!-- Submit Button -->
					<div>
						{#if Object.keys($errors).length > 0}
							<div class="mb-4 rounded-md bg-red-50 p-4" role="alert">
								<p class="text-sm text-red-700">
									Please correct the errors in the form before submitting.
								</p>
							</div>
						{/if}
						<button
							type="submit"
							disabled={!isFormValid || isSubmitting}
							class="mt-4 w-full {isFormValid && !isSubmitting
								? 'bg-[#d33e27]'
								: 'bg-gray-300'} rounded-md py-2 font-semibold text-white transition duration-300 hover:opacity-85 disabled:cursor-not-allowed"
							aria-disabled={!isFormValid || isSubmitting}
						>
							{isSubmitting ? 'Please wait...' : 'Complete My Reservation'}
						</button>
					</div>
				</div>
			</div>
		</div>
	</form>
</section>
