import mongoose from 'mongoose';

//სქემა
const emailSchema = new mongoose.Schema({
    to: { type: String, required: true },
    subject: { type: String, required: true },
    text: { type: String, required: true },
    date: { type: Date, default: Date.now },
    sent: { type: Boolean, default: false }
});

//მოდელი
const Email = mongoose.model('Email', emailSchema);

export default Email;
