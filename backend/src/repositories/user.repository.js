import { User } from "../models/user.model.js";

export class UserRepository  {
async findByEmail(email){
    return await User.findOne({ email }).select("+password")
}

async findById(id){
    return await User.findById(id).select("-password")
}

async create(userData){
    return await User.create(userData)
}
};
