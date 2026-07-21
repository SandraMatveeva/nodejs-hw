import {model, Schema} from "mongoose";

const userSchema = new Schema({
  username: {
    type: String,
    trim: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },

  password: {
    type: String,
    required: true,
    trim: true,
  },
}, {timestamps: true});

userSchema.pre('save', function  () {
  if (!this.username) {
    this.username = this.email;
  }
});

userSchema.methods.toJSON = function () {
  // console.log(this);
  const obj = this.toObject();
  delete obj.password;
  return obj;
};


export const User = model ("User", userSchema);
