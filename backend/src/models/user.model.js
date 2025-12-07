import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            minlength: 1,
            maxLength: 30
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },
        password: {
            type: String,
            required: true,
            minlength: 6,
            maxLength: 50
        },
    }, {
        timestamps: true
    }
);

// Pre-save hook to hash password before saving
userSchema.pre('save', async function () {
    if (!this.isModified('password')) return;
    // We only hash the password if it has been modified (or is new)

    // Hash the password
    this.password = await bcrypt.hash(this.password, 10);
});

// Compare password method
userSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
    // Compares the provided password with the stored hashed password
};

export const User = mongoose.model('User', userSchema);