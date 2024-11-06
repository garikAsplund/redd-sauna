import nodemailer from 'nodemailer';

export async function POST({ request }) {
	const formData = await request.json(); 

    const transporter = nodemailer.createTransport({
		host: 'smtp.gmail.com',
		port: 587,
		secure: false,
		auth: {
			user: import.meta.env.VITE_EMAIL_USER,
			pass: import.meta.env.VITE_EMAIL_PASSWORD
		}
    });
    
	const {
		firstName,
		lastName,
		preferredContactMethod,
		email,
		phoneNumber,
		deliveryDate,
		deliveryAddress,
		additionalComments,
		isGift,
		numberOfDays,
		subscribe
	} = formData.data;

	const mailOptions = {
		from: 'garik.asplund@gmail.com', // Replace with reddsauna@gmail.com
		to: 'garik.asplund@gmail.com', // Replace with ${email}
		subject: 'New Booking Request', // Edit
		html: `
        <h2>New Booking Request</h2>
        <p><strong>Name:</strong> ${firstName} ${lastName}</p>
        <p><strong>Contact Method:</strong> ${preferredContactMethod}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phoneNumber}</p>
        <p><strong>Delivery Date:</strong> ${new Date(deliveryDate).toLocaleDateString()}</p>
        <p><strong>Number of Days:</strong> ${numberOfDays}</p>
        <p><strong>Delivery Address:</strong></p>
        <ul>
            <li>${deliveryAddress.addressLine1}</li>
            <li>${deliveryAddress.city}, ${deliveryAddress.state} ${deliveryAddress.zipCode}</li>
        </ul>
        <p><strong>Gift:</strong> ${isGift ? 'Yes' : 'No'}</p>
        <p><strong>Additional Comments:</strong></p>
        <p>${additionalComments || 'None, Your Honor'}</p>
        <p><strong>Total:</strong> $${numberOfDays * (numberOfDays > 1 ? 75 : 90)}</p>
    `
	};

	try {
		await transporter.sendMail(mailOptions);
		return new Response(JSON.stringify({ success: true }), { status: 200 });
	} catch (error) {
		console.error('Error sending email:', error);
		return new Response(JSON.stringify({ success: false, error: error.message }), { status: 500 });
	}
}
