export interface FAQ {
	question: string;
	answer: string;
}

export const faqs: FAQ[] = [
	{
		question: 'What are your rates?',
		answer: `
        Rental and delivery is <span class="text-[#d33e27]">$90/day for a single day</span>, or 
        <span class="text-[#d33e27]">$75/day for consecutive days</span>. If you want to 
        come to us for a quick session on Alder slope in Enterprise, the rate is 
        <span class="text-[#d33e27]">$20/hour</span>. Session availability is not 
        guaranteed. Delivery bookings take priority.
      `
	},
	{
		question: 'How long do I have to use it?',
		answer: `
        For rental purposes, a ‘day’ is 
        <span class="text-[#d33e27]">24 hours</span>. Shorter turnarounds are possible 
        (for the single day rate).
      `
	},
	{
		question: 'When can you deliver?',
		answer: `
        Pickup/delivery times are flexible, depending on our 
        booking schedule. Mid-morning is my preference. Unless otherwise arranged, 
        <span class="text-[#d33e27]">someone must be present to receive delivery and instructions.</span>
      `
	},
	{
		question: 'Where can you deliver?',
		answer: `
        I can deliver anywhere in Wallowa County that is safe 
        to haul a trailer with my Subaru. The site should be mostly flat. Deep snow and uneven ice makes 
        access, setup, and use difficult. Please prepare beforehand.
      `
	},
	{
		question: 'How many people can use it?',
		answer: `
        At least 3 people can sit comfortably inside, 
        or one person can lie flat. There are no restrictions on use during your rental period. 
        Invite your friends!
      `
	},
	{
		question: 'Is it safe?',
		answer: `
        Saunas are quite safe for most people, but there are inherent 
        risks. If you have concerns, please consult a doctor before booking. 
        <span class="text-[#d33e27]">I do require users to sign a release of liability.</span>
      `
	},
	{
		question: 'Can I reserve dates?',
		answer: `
        Absolutely! Refer to the calendar below for availability. 
        Weekends and holidays book quickly, so plan accordingly. Please let me know about a change of 
        plans as soon as possible and at least a day before your reservation.
      `
	}
];
