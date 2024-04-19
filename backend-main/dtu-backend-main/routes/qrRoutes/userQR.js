const { v4: uuidv4 } = require('uuid');
const express = require('express');
const QrRouter = express.Router();

//middleware
const { authCheck } = require('../../middleware/authCheck');
//dbModel
const { User, Event } = require('../../db');
QrRouter.use(authCheck);

QrRouter.get('/qr/:id', async (req, res) => {
    const eventId = req.params.id;
    try {
        // Find the event by ID
        const event = await Event.findOne({ _id: eventId });
        if (!event) {
            return res.status(404).json({ "message": "Event not found" });
        }

        // Find the user by email
        const user = await User.findOne({ email: req.user_email });
        // Filter the user's subscribed events by the event ID
        const subscribedEvent = user.events_subscribed.find(item => item.eventId === eventId);

        if (subscribedEvent && subscribedEvent.uuid) {
            // If the QR code exists for the event, return it
            return res.status(200).json({ message: "Event Registered", qrcode: subscribedEvent.uuid });
        } else {
            // If the QR code doesn't exist, generate a new UUID and update the user's subscribed events
            const newUUID = uuidv4();
            if (subscribedEvent) {
                // If the event is already subscribed, update its UUID
                subscribedEvent.uuid = newUUID;
            }
            // Save the updated user data
            await user.save();
            // Return the generated QR code UUID
            return res.status(200).json({ message: "Event Registered", qrcode: newUUID });
        }
    } catch (error) {
        // Handle any errors
        res.status(500).json({ message: "Internal Server Error" + error });
    }
});




module.exports = QrRouter;
