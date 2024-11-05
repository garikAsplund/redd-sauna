import { z } from 'zod';

export const schema = z.object({
	firstName: z.string().min(1, 'First Name is required').default(''),
	lastName: z.string().min(1, 'Last Name is required').default(''),
	preferredContactMethod: z.string().min(1, 'Preferred Contact Method is required').default(''),
	email: z.string().email('Please enter a valid email address').default(''),
	phoneNumber: z
		.string()
		.regex(/^\d{10}$/, 'Phone number must be 10 digits')
		.default(''),
	deliveryDate: z
		.string()
		.transform((val) => {
			const date = new Date(val);
			console.log('Transformed date:', date);
			return date;
		})
		.refine((date) => !isNaN(date.getTime()), { message: 'Invalid date' })
		.refine(
			(date) => {
				const today = new Date();
				today.setUTCHours(0, 0, 0, 0);
				date.setUTCHours(0, 0, 0, 0);
				console.log('Today:', today);
				console.log('Delivery date:', date);
				return date >= today; 
			},
			{ message: 'Delivery date must be today or in the future' }
		),
	deliveryAddress: z.object({
		addressLine1: z.string().min(1, 'Address Line 1 is required').default(''),
		addressLine2: z.string().optional(),
		city: z.string().min(1, 'City is required').default(''),
		state: z.string().min(1, 'State is required').default('Oregon'),
		zipCode: z
			.string()
			.length(5, 'ZIP Code must be exactly 5 digits')
			.regex(/^\d{5}$/, 'ZIP Code must be a 5-digit number')
			.default(''),
		country: z.string().min(1, 'Country is required').default('United States')
	}),
	additionalComments: z.string().optional(),
	isGift: z.boolean().optional(),
	numberOfDays: z.number().min(1, 'Please select at least one day').optional(),
	subscribe: z.boolean().optional()
});
