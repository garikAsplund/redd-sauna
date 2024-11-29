import { z } from 'zod';

export const schema = z.object({
	firstName: z
		.string()
		.min(1, 'First Name is required')
		.max(35, 'First Name must be 35 characters or less')
		.default(''),
	lastName: z
		.string()
		.min(1, 'Last Name is required')
		.max(35, 'Last Name must be 35 characters or less')
		.default(''),
	// preferredContactMethod: z.string().min(1, 'Preferred Contact Method is required').default(''),
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
	// deliveryDate: z
	// 	.string()
	// 	.transform((val) => {
	// 		const date = new Date(val);
	// 		console.log('Transformed date:', date);
	// 		return date;
	// 	})
	// 	.refine((date) => !isNaN(date.getTime()), { message: 'Invalid date' })
	// 	.refine(
	// 		(date) => {
	// 			const today = new Date();
	// 			today.setUTCHours(0, 0, 0, 0);
	// 			date.setUTCHours(0, 0, 0, 0);
	// 			console.log('Today:', today);
	// 			console.log('Delivery date:', date);
	// 			return date >= today;
	// 		},
	// 		{ message: 'Delivery date must be today or in the future' }
	// 	),
	deliveryDate: z
		.string() // Accept the input as a string (from the <input type="date"> element)
		.transform((val) => {
			const date = new Date(val); // Transform the string to a Date object
			if (isNaN(date.getTime())) {
				// Check if the date is valid
				throw new Error('Invalid date'); // Throw an error if it's not a valid date
			}
			// Convert the Date object back to "yyyy-MM-dd" format
			const formattedDate = date.toISOString().split('T')[0];
			return formattedDate; // Return the formatted date string
		})
		.refine(
			(val) => {
				const date = new Date(val);
				const today = new Date();
				today.setUTCHours(0, 0, 0, 0); // Normalize to midnight (UTC) for today
				date.setUTCHours(0, 0, 0, 0); // Normalize the input date to midnight (UTC)
				return date >= today; // Ensure the date is today or in the future
			},
			{ message: 'Delivery date must be today or in the future' }
		),
	deliveryAddress: z.object({
		addressLine1: z
			.string()
			.min(1, 'Address Line 1 is required')
			.max(100, 'Address Line 1 must be 100 characters or less')
			.default(''),
		addressLine2: z.string().max(100, 'Address Line 2 must be 100 characters or less').optional(),
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
	numberOfDays: z.number().min(1, 'Please select at least one day').default(0),
	subscribe: z.boolean().optional()
});
