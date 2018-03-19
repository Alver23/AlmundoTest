// Dependencies
import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const HotelSchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: [true, 'The Name is required.'],
  },
  address: {
    type: String,
    required: [true, 'The Address is required.'],
  },
  starts: {
    type: Number,
    min: 1,
    max: 5,
    required: [true, 'The start is required.'],
  },
  price: {
      type: Schema.Types.Decimal128,
      required: [true, 'The Price is required'],
  },
  images: [],
  amenities: [String],
},
  {
    timestamps: true,
  }
);

const HotelModel = mongoose.model('Hotel', HotelSchema);

export default HotelModel;
