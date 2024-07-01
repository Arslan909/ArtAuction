import mongoose from 'mongoose';

const test2 = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required field!'],
    unique: true,
  }
},
  {
    timestamps: true
  }
);

// Create the model for the Blog Post collection
const Test2 = mongoose.model('test2', test2);

export default Test2;