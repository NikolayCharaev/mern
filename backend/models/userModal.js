import mongoose from 'mongoose';

const UserShema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      unique: true,
      required: true,
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model('Users', UserShema);
