import mongoose from 'mongoose';

const PostModel = new mongoose.Schema({
  title: {
    type: String,
    unique: true,
  },
  description: {
    type: String,
  },
  viewsCount: {
    type: Number,
    default: 0,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
    // required: true,
  },
});

export default mongoose.model('Posts', PostModel);
