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
  category: {
    type: String,
    // required: [true, 'Category is a required field!'],
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UsersInfo', // Reference to the User collection
    required: [true, 'userId is required'],
  },
  biddingStartTime: {
    type: Date,
    validate: {
      validator: function (value) {
        return this.bidStatus == "bidding" ? value  != null : value == null;
      },
      message: 'Bidding start time is required when status is set to bidding',
    },
  },
  biddingEndTime: {
    type: Date,
    validate: {
      validator: function (value) {
        return this.bidStatus == "bidding" ? value  != null : value == null;
      },
      message: 'Bidding end time is required when status is set to bidding',
    },
  },
  bidStatus: {
    type: String,
    enum: ['selling', 'bidding', 'sold'],
    required: [true, 'status should be atleast one of theese: (selling, bidding)'],

  },
  fixedPrice: {
    type: Number,
    required: [true,'Fixed price is required as a fallback value if no one bids :(',]
  },
  highestBid: {
    type: Number,
    default: 0,
  },
  highestBidder: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UsersInfo',
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Art = mongoose.model('Art', artSchema);

export default Art;
