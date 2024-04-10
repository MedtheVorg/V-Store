import { compare, genSalt, hash } from 'bcrypt';
import mongoose, { Model, Schema } from 'mongoose';

export interface IUser {
    username: string;
    email: string;
    password: string;
    avatar: string;
    refreshToken?: string;
}

interface IUserMethods {
    validatePassword: (candidatePassword: string) => Promise<boolean>;
}
export type IUserModel = Model<IUser, {}, IUserMethods>;

const UserSchema = new Schema<IUser, IUserModel, IUserMethods>(
    {
        username: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        avatar: {
            type: String,
            required: true
        },
        refreshToken: {
            type: String
        }
    },
    {
        versionKey: false,
        timestamps: true,
        collection: 'users'
    }
);

//  User Schema methods

UserSchema.methods = {
    validatePassword: async function (candidatePassword: string) {
        try {
            return await compare(candidatePassword, this.password);
        } catch (error) {
            logging.error('Failed to validate password');
            return false;
        }
    }
};
//  User Schema Middlewares

UserSchema.pre('save', async function (this, next) {
    logging.warn('is modified :', this.isModified('password'));
    logging.warn('is New :', this.isNew);
    logging.warn('Result  :', this.isModified('password') || this.isNew);

    if (this.isModified('password') || this.isNew) {
        logging.warn('unhashed password : ', this.password);
        const salt = await genSalt(12);
        const hashedPassword = await hash(this.password, salt);
        logging.warn('hashed password : ', hashedPassword);

        this.password = hashedPassword;
    }
    next();
});

export default mongoose.model<IUser, IUserModel>('User', UserSchema);
