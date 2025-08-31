const Booking = require('../models/Booking');
exports.createBookings = async(req,res) => {
    try{
        const userData = req.user;
        const {place, checkIn, checkOut,numOfGuests, name, phone, price} = req.body;
        const booking = await Booking.create({
            user: userData,
            place,
            checkIn,
            checkOut,
            numOfGuests,
            name,
            phone,
            price,
        });
        res.send(200).json({
            booking,
        });
    }catch(err){
        res.status(500).json({
            message: 'Internal server error',
            error: err,
        });
    }
};
exports.getBookings = async (req,res) => {
    try{
        const userData = req.user;
        if(!userData){
            return res
            .status(401)
            .json({error: 'You are not authorised to access this page'});
        }
        const booking = await Booking.find({user: userData.id}).populate('place')
        res.status(200).json({booking,success: true})
    }catch(err){
        console.log(err);
        res.status(500).json({
            message: 'Internal Server error is there',
            error: err,
        })
    }
}