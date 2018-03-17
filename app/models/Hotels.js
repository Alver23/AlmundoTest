import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const HotelSchema = new Schema({
    name: {
        type: String,
        unique: true,
        required: [true, 'The Name is required.'],
    },
    starts: {
        type: Number,
        min: 1,
        max: 5,
    },
    price: {
        type: Schema.Types.Decimal128,
        required: [true, 'The Price is required'],
    },
    images: [String],
    amenities: [String],
    timestamps: true,
});

const HotelModel = mongoose.model('Hotel', HotelSchema);

export default HotelModel;
