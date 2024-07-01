import mongoose from 'mongoose';

const artSchema = new mongoose.Schema({
  image: {
    type: String,
    required: [true, 'Image is a required field!'],
    unique: true,
  },
  description: {
    type: String,
    required: [true, 'A description for the art is required!'],
  },
  estimatePrice: {
    type: Number,
    required: [true, 'An estimate price is required!'],
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User collection
    required: true,
  },
  category: {
    type: String,
    required: [true, 'Category is a required field!'],
  },
  biddingStartTime: {
    type: Date,
    validate: {
      validator: function(value) {
        return !this.bidStatus || value != null;
      },
      message: 'Bidding start time is required when bidding is active!'
    },
  },
  biddingEndTime: {
    type: Date,
    validate: {
      validator: function(value) {
        return !this.bidStatus || value != null;
      },
      message: 'Bidding end time is required when bidding is active!'
    },
  },
  bidStatus: {
    type: Boolean,
    default: false, 
  },
  fixedPrice: {
    type: Number,
    validate: {
      validator: function(value) {
        return this.bidStatus || value != null; // fix price is no bidding
      },
      message: 'Fixed price is required when bidding is not active!'
    },
  },
  sold: {
    type: Boolean,
    default: false, 
  },
  highestBid: {
    type: Number,
    default: 0, 
  },
  highestBidder: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Art = mongoose.model('Art', artSchema);

export default Art;
