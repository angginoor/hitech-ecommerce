"use server"

import User from "@/models/user"
import { connectMongoDB } from "./mongoose"
import bcrypt from "bcryptjs"
import { signIn, signOut } from "./auth"

export const register = async (previousState, formData) => {
    const {username, email, password, passwordRepeat} = Object.fromEntries(formData)

    if(password !== passwordRepeat) {
        return {error: "Passwords do not match"}
    }

    try {

        const user = await User.findOne({username})
        const userEmail = await User.findOne({email})

        if (user) {
            return { error: "This username is unavailable" };
        }

        if (userEmail) {
            return { error: "This email already exists"}
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        connectMongoDB()
        const newUser = new User({
            username,
            email,
            password: hashedPassword
        })

        await newUser.save()
        console.log('saved to db')

        return {success: true}
    } catch (error) {
        console.log(error)
        return {error: "Something went wrong!"}
    }
}

export const login = async (previousState, formData) => {
    const {username, password} = Object.fromEntries(formData)

    try {
        await signIn('credentials', {username, password})
    } catch (error) {
        console.log(error)
        if (error.message.includes("CredentialsSignin")) {
            return { error: "Invalid username or password" };
        }
        throw error;
    }
}

export const handleLogout = async () => {
    "use server";
    await signOut();
  };