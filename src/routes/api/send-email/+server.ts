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
        // preferredContactMethod,
        email,
        phoneNumber,
        deliveryDate,
        deliveryAddress,
        additionalComments,
        isGift,
        numberOfDays,
        subscribe
    } = formData.data;

    const totalCost = numberOfDays * (numberOfDays > 1 ? 75 : 90);

    // Email to the business
    const businessMailOptions = {
        from: 'garik.asplund@gmail.com',
        to: 'garik.asplund@gmail.com', // reddsauna@gmail.com
        subject: 'New Booking Request',
        html: `
            <h2>New Booking Request</h2>
            <p><strong>Name:</strong> ${firstName} ${lastName}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phoneNumber}</p>
            <p><strong>Delivery Date:</strong> ${new Date(deliveryDate).toLocaleDateString()}</p>
            <p><strong>Number of Days:</strong> ${numberOfDays}</p>
            <p><strong>Delivery Address:</strong></p>
            <div style="margin-left: 20px;">
                <p>${deliveryAddress.addressLine1}<br/>
                ${deliveryAddress.city}, ${deliveryAddress.state} ${deliveryAddress.zipCode}</p>
            </div>
            <p><strong>Gift:</strong> ${isGift ? 'Yes' : 'No'}</p>
            <p><strong>Additional Comments:</strong></p>
            <p>${additionalComments || ''}</p>
        `
    };

    // Email to the customer
    const customerMailOptions = {
        from: 'garik.asplund@gmail.com',
        to: 'garik.asplund@gmail.com', // email
        subject: 'Your Redd Sauna Booking Confirmation',
        html: `
            <h2>Thank you for booking with us, ${firstName}!</h2>
            <p>We've received your booking request:</p>
			<div style="margin-left: 20px;">
           <p><strong>Delivery Date:</strong> ${new Date(deliveryDate).toLocaleDateString()}</p>
            <p><strong>Number of Days:</strong> ${numberOfDays}</p>
            <p><strong>Delivery Address:</strong></p>
            <div style="margin-left: 20px;">
                <p>${deliveryAddress.addressLine1}<br/>
                ${deliveryAddress.city}, ${deliveryAddress.state} ${deliveryAddress.zipCode}</p>
            </div>
            <p><strong>Gift:</strong> ${isGift ? 'Yes' : 'No'}</p>
            <p><strong>Additional Comments:</strong> ${additionalComments || 'None'}</p>
			</div>
            <p>The total cost for your booking is <strong>$${totalCost.toFixed(2)}</strong>. Please make your payment via Venmo to <a href="https://venmo.com/reddsauna" target="_blank">@reddsauna</a>.</p>
            <p>We appreciate your business and look forward to serving you. If you have any further questions, please don't hesitate to reach out by replying to this email or contacting me at (541) 626-6261.</p>
            <p>See you soon,<br>
            Pip</p>
        `
    };

    try {
        await transporter.sendMail(businessMailOptions);
        await transporter.sendMail(customerMailOptions);
        return new Response(JSON.stringify({ success: true }), { status: 200 });
    } catch (error) {
        console.error('Error sending email:', error);
        return new Response(JSON.stringify({ success: false, error: error.message }), { status: 500 });
    }
}