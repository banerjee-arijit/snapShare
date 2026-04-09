import {mongoose} from 'mongoose'

const fileSchema=new mongoose.Schema({
    
    passwordCode: {
    type: String,
    required: true,
    unique: true
  },
  imageUrl: String,
  textContent:String,
},{timestamps:true})

const File=mongoose.model("File",fileSchema);
export default File;