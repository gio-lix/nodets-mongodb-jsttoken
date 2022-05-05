import {Schema, model} from "mongoose";

interface UserType {
    name: string
    email: string
    password: string
    data: string | number;

}

const UserSchema = new Schema<UserType>({
    name: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    email: {
      type: String,
      required: true,
      min: 6,
      max: 140
    },
    password: {
        type: String,
        required: true,
        min: 5,
        max: 1200
    },
    data: {
        type: String,
        default: Date.now()
    }
})


export default model("Users", UserSchema)