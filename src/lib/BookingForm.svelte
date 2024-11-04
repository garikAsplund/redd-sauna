<script lang="ts">
    import { superForm } from 'sveltekit-superforms';
    import { z } from 'zod';
  
    // Define the Zod schema for validation
    const schema = z.object({
      firstName: z.string().min(1, "First Name is required"),
      lastName: z.string().min(1, "Last Name is required"),
      preferredContactMethod: z.string().min(1, "Preferred Contact Method is required"),
      email: z.string().email("Invalid email address").optional(),
      phoneNumber: z.string().optional(),
      deliveryDate: z.string().optional(),
      deliveryAddress: z.object({
        addressLine1: z.string().min(1, "Address Line 1 is required"),
        addressLine2: z.string().optional(),
        city: z.string().min(1, "City is required"),
        state: z.string().min(1, "State is required"),
        zipCode: z.string().min(1, "ZIP Code is required"),
        country: z.string().min(1, "Country is required").default("United States"),
      }),
      additionalComments: z.string().optional(),
      isGift: z.boolean().optional(),
      numberOfDays: z.number().min(1, "Please select at least one day").optional(),
      subscribe: z.boolean().optional(),
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
          state: '',
          zipCode: '',
          country: 'United States',
        },
        additionalComments: '',
        isGift: false,
        numberOfDays: 1,
        subscribe: false,
      },
    };
  
    // Initialize superForm with the schema
    const { form } = superForm(data.form, { schema });
  </script>
  
  <form method="POST">
    <div>
      <label for="firstName">First Name (required)</label>
      <input type="text" name="firstName" bind:value={$form.firstName} />
      {#if $form.errors.firstName}
        <span class="text-red-500">{$form.errors.firstName}</span>
      {/if}
    </div>
  
    <div>
      <label for="lastName">Last Name (required)</label>
      <input type="text" name="lastName" bind:value={$form.lastName} />
      {#if $form.errors.lastName}
        <span class="text-red-500">{$form.errors.lastName}</span>
      {/if}
    </div>
  
    <div>
      <label for="preferredContactMethod">Preferred Contact Method (required)</label>
      <select name="preferredContactMethod" bind:value={$form.preferredContactMethod}>
        <option value="">Select an option</option>
        <option value="email">Email Address</option>
        <option value="phone">Phone Number</option>
      </select>
      {#if $form.errors.preferredContactMethod}
        <span class="text-red-500">{$form.errors.preferredContactMethod}</span>
      {/if}
    </div>
  
    <div>
      <label for="email">Email Address (required if contact method is email)</label>
      <input type="email" name="email" bind:value={$form.email} />
      {#if $form.errors.email}
        <span class="text-red-500">{$form.errors.email}</span>
      {/if}
    </div>
  
    <div>
      <label for="phoneNumber">Phone Number (required if contact method is phone)</label>
      <input type="tel" name="phoneNumber" bind:value={$form.phoneNumber} />
      {#if $form.errors.phoneNumber}
        <span class="text-red-500">{$form.errors.phoneNumber}</span>
      {/if}
    </div>
  
    <div>
      <label for="deliveryDate">Delivery Date (A.M.)</label>
      <input type="date" name="deliveryDate" bind:value={$form.deliveryDate} />
      {#if $form.errors.deliveryDate}
        <span class="text-red-500">{$form.errors.deliveryDate}</span>
      {/if}
    </div>
  
    <div>
      <h3>Delivery Address</h3>
      <label for="addressLine1">Address Line 1 (required)</label>
      <input type="text" name="deliveryAddress.addressLine1" bind:value={$form.deliveryAddress.addressLine1} />
      {#if $form.errors.deliveryAddress?.addressLine1}
        <span class="text-red-500">{$form.errors.deliveryAddress.addressLine1}</span>
      {/if}
  
      <label for="addressLine2">Address Line 2</label>
      <input type="text" name="deliveryAddress.addressLine2" bind:value={$form.deliveryAddress.addressLine2} />
  
      <label for="city">City (required)</label>
      <input type="text" name="deliveryAddress.city" bind:value={$form.deliveryAddress.city} />
      {#if $form.errors.deliveryAddress?.city}
        <span class="text-red-500">{$form.errors.deliveryAddress.city}</span>
      {/if}
  
      <label for="state">State (required)</label>
      <input type="text" name="deliveryAddress.state" bind:value={$form.deliveryAddress.state} />
      {#if $form.errors.deliveryAddress?.state}
        <span class="text-red-500">{$form.errors.deliveryAddress.state}</span>
      {/if}
  
      <label for="zipCode">ZIP Code (required)</label>
      <input type="text" name="deliveryAddress.zipCode" bind:value={$form.deliveryAddress.zipCode} />
      {#if $form.errors.deliveryAddress?.zipCode}
        <span class="text-red-500">{$form.errors.deliveryAddress.zipCode}</span>
      {/if}
  
      <label for="country">Country</label>
      <input type="text" name="deliveryAddress.country" bind:value={$form.deliveryAddress.country} />
  
      <label for="additionalComments">Additional Comments</label>
      <textarea name="additionalComments" bind:value={$form.additionalComments}></textarea>
  
      <label>
        <input type="checkbox" name="isGift" bind:checked={$form.isGift} />
        Is this a gift? Got special requests? Say so here and I'll be in touch.
      </label>
  
      <label>
        <input type="checkbox" name="subscribe" bind:checked={$form.subscribe} />
        Sign up for news and updates.
      </label>
    </div>
  
    <div>
      <label for="numberOfDays">Requested Number of Days (required)</label>
      <input type="number" name="numberOfDays" min="1" bind:value={$form.numberOfDays} />
      {#if $form.errors.numberOfDays}
        <span class="text-red-500">{$form.errors.numberOfDays}</span>
      {/if}
    </div>
  
    <div>
      <button type="submit">Submit</button>
    </div>
  
    <p>I try to respond and confirm bookings within a day or two.</p>
    <p>Be sure to check your spam folder if you're expecting an email.</p>
  </form>
  