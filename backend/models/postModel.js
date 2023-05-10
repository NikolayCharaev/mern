import mongoose from 'mongoose';

const PostModel = new mongoose.Schema({
  title: {
    type: String,
    unique: true,
  },
  description: {
    type: String,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
    // required: true,
  },
});

export default mongoose.model('Posts', PostModel);
