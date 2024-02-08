const { Schema, model, models } = require("mongoose");

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        min: 3,
        max: 20
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: String
})

const User = models?.User || model("User", UserSchema);
export default User