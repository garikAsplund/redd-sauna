<script lang="ts">
	import { enhance } from '$app/forms';
	import { superForm } from 'sveltekit-superforms';
	import { z } from 'zod';

	// Define the Zod schema for validation
	const schema = z.object({
		firstName: z.string().min(1, 'First Name is required'),
		lastName: z.string().min(1, 'Last Name is required'),
		preferredContactMethod: z.string().min(1, 'Preferred Contact Method is required'),
		email: z.string().email('Email address is required'),
		phoneNumber: z.string().min(1, 'Phone number is required'),
		deliveryDate: z.string().min(1, 'Delivery date is required'),
		deliveryAddress: z.object({
			addressLine1: z.string().min(1, 'Address Line 1 is required'),
			addressLine2: z.string().optional(),
			city: z.string().min(1, 'City is required'),
			state: z.string().min(1, 'State is required'),
			zipCode: z.string().min(1, 'ZIP Code is required'),
			country: z.string().min(1, 'Country is required').default('United States')
		}),
		additionalComments: z.string().optional(),
		isGift: z.boolean().optional(),
		numberOfDays: z.number().min(1, 'Please select at least one day').optional(),
		subscribe: z.boolean().optional()
	});

	// Initialize form data
	const data = {
		form: {
			firstName: '',
			lastName: '',
			preferredContactMethod: '',
			email: '',
			phoneNumber: '',
			deliveryDate: '',
			deliveryAddress: {
				addressLine1: '',
				addressLine2: '',
				city: '',
				state: 'Oregon',
				zipCode: '',
				country: 'United States'
			},
			additionalComments: '',
			isGift: false,
			numberOfDays: 1,
			subscribe: false
		}
	};

	// Initialize superForm with the schema
	const { form } = superForm(data.form, { schema, dataType: 'json' });

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
</script>

<section
	class="mx-auto my-8 flex w-full max-w-2xl flex-col items-center rounded-lg bg-gray-50 p-4 py-8 shadow-lg"
>
	<h2 class="mb-6 text-2xl font-semibold text-gray-700">Booking Form</h2>

	<form method="POST" use:enhance class="w-full space-y-4">
		<!-- Name fields -->
		<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
			<div>
				<label for="firstName" class="block text-sm font-medium text-gray-600">First Name *</label>
				<input
					type="text"
					name="firstName"
					bind:value={$form.firstName}
					class="mt-1 w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
				/>
			</div>
			<div>
				<label for="lastName" class="block text-sm font-medium text-gray-600">Last Name *</label>
				<input
					type="text"
					name="lastName"
					bind:value={$form.lastName}
					class="mt-1 w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
				/>
			</div>
		</div>

		<!-- Contact Method -->
		<div>
			<label for="preferredContactMethod" class="block text-sm font-medium text-gray-600"
				>Preferred Contact Method *</label
			>
			<select
				name="preferredContactMethod"
				bind:value={$form.preferredContactMethod}
				class="mt-1 w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
			>
				<option value="">Select an option</option>
				<option value="email">Email</option>
				<option value="call">Call</option>
				<option value="text">Text</option>
			</select>
		</div>

		<!-- Contact Info -->
		<div>
			<label for="email" class="block text-sm font-medium text-gray-600">Email Address *</label>
			<input
				type="email"
				name="email"
				bind:value={$form.email}
				class="mt-1 w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
			/>
		</div>
		<div>
			<label for="phoneNumber" class="block text-sm font-medium text-gray-600">Phone Number *</label
			>
			<input
				type="tel"
				name="phoneNumber"
				bind:value={$form.phoneNumber}
				class="mt-1 w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
			/>
		</div>

		<!-- Delivery Date -->
		<div>
			<label for="deliveryDate" class="block text-sm font-medium text-gray-600"
				>Delivery Date (A.M.)</label
			>
			<input
				type="date"
				name="deliveryDate"
				bind:value={$form.deliveryDate}
				class="mt-1 w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
			/>
		</div>

		<!-- Number of Days -->
		<div>
			<label for="numberOfDays" class="block text-sm font-medium text-gray-600"
				>Number of Days *</label
			>
			<select
				name="numberOfDays"
				bind:value={$form.numberOfDays}
				class="mt-1 w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
			>
				<option value="">Select number of days</option>
				<option value="1">1 day</option>
				<option value="2">2 days</option>
				<option value="3">3 days</option>
				<option value="4">4 days</option>
				<option value="5">5 days</option>
				<!-- Add more options as needed -->
			</select>
		</div>

		<!-- Delivery Address -->
		<div class="mt-4">
			<h3 class="text-lg font-semibold text-gray-700">Delivery Address</h3>
			<div class="mt-2 grid grid-cols-1 gap-4">
				<div>
					<label for="addressLine1" class="block text-sm font-medium text-gray-600"
						>Address Line 1 *</label
					>
					<input
						type="text"
						name="deliveryAddress.addressLine1"
						bind:value={$form.deliveryAddress.addressLine1}
						class="mt-1 w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
					/>
				</div>
				<div>
					<label for="city" class="block text-sm font-medium text-gray-600">City *</label>
					<input
						type="text"
						name="deliveryAddress.city"
						bind:value={$form.deliveryAddress.city}
						class="mt-1 w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
					/>
				</div>
				<div class="grid grid-cols-2 gap-4">
					<div>
						<label for="state" class="block text-sm font-medium text-gray-600">State *</label>
						<input
							type="text"
							disabled
							name="deliveryAddress.state"
							bind:value={$form.deliveryAddress.state}
							class="mt-1 w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
						/>
					</div>
					<div>
						<label for="zipCode" class="block text-sm font-medium text-gray-600">ZIP Code *</label>
						<input
							type="text"
							name="deliveryAddress.zipCode"
							bind:value={$form.deliveryAddress.zipCode}
							class="mt-1 w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
						/>
					</div>
				</div>
			</div>
		</div>

		<!-- Additional Info -->
		<div>
			<label for="additionalComments" class="block text-sm font-medium text-gray-600"
				>Additional Comments</label
			>
			<textarea
				name="additionalComments"
				placeholder="Got special requests? Say so here and I'll be in touch :)"
				bind:value={$form.additionalComments}
				class="mt-1 w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
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
			I try to respond and confirm bookings within a day or two. Be sure to check your spam folder
			if you're expecting an email.
		</p>

		<!-- Submit Button -->
		<div>
			<button
				type="submit"
				disabled={!isFormValid}
				class="mt-4 w-full {isFormValid
					? 'bg-[#d33e27]'
					: 'bg-gray-300'} rounded-md py-2 font-semibold text-white transition duration-300 hover:opacity-85"
				>Submit</button
			>
		</div>
	</form>
</section>
