import mongoose from "mongoose";

const userSchema = mongoose.Schema({
 name: {
    type: String,
    required: true
 },
 email: {
    type: String,
    required: true
 },
 avatar: {
   type: String,
   required: true,
 },
 nutritions: {
      kcal: {
         type: Number,
      },
      proteins: {
         type: Number,
      },
      carbs: {
         type: Number,
      },
      fats: {
         type: Number,
      },
      fiber: {
         type: Number,
      }
 },
 password: {
    type: String,
    required: true
 }
})

const User = mongoose.model('User', userSchema);

export default User;