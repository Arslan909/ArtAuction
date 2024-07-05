import mongoose from 'mongoose';

const UsersDataSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, 'fullName is a required field!'],
  },
  userName: {
    type: String,
    required: [true, 'A userName is required!'],
    unique:true
  },
  whatsAppNumber: {
    type: Number,
    required: [true, 'whatsAppNumber is required!'],
  },
  email: {
    type: String,
    required: [true, 'email is required!'],
    // Todo add validation for email
  },
  password: {
    type: String,
    required: [true, 'password is required!'],
  },
});

const UsersInfo = mongoose.model('UsersInfo', UsersDataSchema);

export default UsersInfo;
