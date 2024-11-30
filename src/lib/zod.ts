import { z } from 'zod';

export const schema = z.object({
	firstName: z
		.string()
		.min(1, 'First name is required')
		.max(35, 'First name must be 35 characters or less')
		.default(''),
	lastName: z
		.string()
		.min(1, 'Last name is required')
		.max(35, 'Last name must be 35 characters or less')
		.default(''),
	email: z
		.string()
		.email('Please enter a valid email address')
		.max(255, 'Email must be 255 characters or less')
		.default(''),
	phoneNumber: z
		.string()
		.regex(/^(\+1\s?)?(\(?\d{3}\)?[-.\s]?)?\d{3}[-.\s]?\d{4}$/, 'Please enter a valid phone number')
		.max(20, 'Phone number must be 20 characters or less')
		.default(''),
	deliveryDate: z
		.string()
		.transform((val) => {
			const date = new Date(val);
			if (isNaN(date.getTime())) {
				throw new Error('Invalid date');
			}
			const formattedDate = date.toISOString().split('T')[0];
			return formattedDate;
		})
		.refine(
			(val) => {
				const date = new Date(val);
				const today = new Date();
				today.setUTCHours(0, 0, 0, 0);
				date.setUTCHours(0, 0, 0, 0);
				return date >= today;
			},
			{ message: 'Delivery date must be today or in the future' }
		),
	numberOfDays: z.number().min(1, 'Please select at least one day').default(0),
	deliveryAddress: z.object({
		addressLine1: z
			.string()
			.min(1, 'Address is required')
			.max(100, 'Address must be 100 characters or less')
			.default(''),
		city: z
			.string()
			.min(1, 'City is required')
			.max(50, 'City must be 50 characters or less')
			.default(''),
		state: z
			.string()
			.min(1, 'State is required')
			.max(50, 'State must be 50 characters or less')
			.default('Oregon'),
		zipCode: z
			.string()
			.regex(/^\d{5}$/, 'Please enter a valid 5-digit ZIP code')
			.max(10, 'ZIP code must be 10 characters or less')
			.default(''),
		country: z.string().min(1, 'Country is required').default('United States')
	}),
	additionalComments: z
		.string()
		.max(500, 'Additional comments must be 500 characters or less')
		.optional(),
	isGift: z.boolean().optional(),
	subscribe: z.boolean().optional()
});
