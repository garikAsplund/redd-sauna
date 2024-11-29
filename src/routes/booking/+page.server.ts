import { superValidate, message } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import type { PageServerLoad } from './$types';
import { schema } from '$lib/zod';
import { fail } from '@sveltejs/kit';
import { redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async () => {
	const form = await superValidate(zod(schema));
    form.data.deliveryDate = new Date().toISOString().split('T')[0];
	return { form };
};

export const actions = {
	default: async ({ request, fetch }) => {
		const form = await superValidate(request, zod(schema));
		console.log({ form });

		if (!form.valid) {
			return fail(400, { form });
		} else {
			const response = await fetch('/api/send-email', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(form)
			});

			if (response.ok) {
				throw redirect(
					302,
					`/thanks?name=${form.data.firstName}&email=${form.data.email}`
				);
			} else {
				const errorData = await response.json();
				return message(form, `Error sending email: ${errorData.error}`);
			}
		}
	}
};
