import mongoose, {Schema} from 'mongoose'

const PostModel = new Schema({
    image: {
        type: String,
        required: [true, 'Image is required'],
    },
    caption: {
        type: String,
    },
    likes: {
        type: Number,
        default: 0,
    },
    comments: {
        type: Number,
        default: 0,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User is required'],
    },
}, {timestamps: true})

export default mongoose.models['Post'] || mongoose.model<any, any>('Post', PostModel);