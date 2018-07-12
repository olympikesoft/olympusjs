import mongoose, { Schema } from 'mongoose';

const DBSchema = new mongoose.Schema({
    name:{type:String, required:true},
    password: {type:String, required:true},
    code: {type:String, required:true},
    db_name:  {type:String, required:true},
    subcode: {type:String, required:true}
});
 

  
  module.exports = mongoose.model('DB', DBSchema);
  