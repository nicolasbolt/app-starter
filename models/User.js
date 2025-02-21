import { Schema, model, models } from 'mongoose';

const UserSchema = new Schema(
  {
    email: {
      type: String,
      unique: [true, 'Email already exists'],
      required: [true, 'Email is required'],
    },
    username: {
      type: String,
      required: [true, 'Username is required'],
    },
    image: {
      type: String,
    },
    // 0 - Free
    // 1 - Basic
    // 2 - Full
    // 3 - Premium
    group: {
      type: Number,
      default: 0,
    },
    priceId: {
      type: String,
    },

    customerId: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const User = models.User || model('User', UserSchema);

export default User;
