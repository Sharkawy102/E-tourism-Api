import Booking from "../model/reservation.js";

export const createBook = async (req, res) => {
    const { fullName, email, phone, persons, plan, date, message } = req.body;

    try {
        const booking = new Booking({
            fullName,
            email,
            phone,
            persons,
            plan,
            date,
            message,
        });

        const totalPrice = booking.totalPrice;
        await booking.save();
        res.status(201).json({ "message":`You are Welcomed total price is ${totalPrice}` }); // Include totalPrice in the JSON response
    } catch (error) {
        console.error(error);
        res.status(500).send("An error occurred while creating the booking");
    }
};