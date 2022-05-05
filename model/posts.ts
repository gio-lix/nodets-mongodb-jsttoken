import { Schema , model} from 'mongoose';


interface User {
    title: string;
    description: string;
    data: string | number;
}

const PostSchema = new Schema<User>({
    title: { type: String, required: true },
    description: { type: String, required: true },
    data: {type: String, default: Date.now()}
});


export default model("Posts",PostSchema)
