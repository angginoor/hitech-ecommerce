import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { connectMongoDB } from "./mongoose";
import bcrypt from "bcryptjs"
import { authConfig } from "./auth.config";
import User from "@/models/user";

const login = async (credentials) => {
    try {
      connectMongoDB();
      const user = await User.findOne({ username: credentials.username });
  
      if (!user) throw new Error("Wrong credentials!");
  
      const isPasswordCorrect = await bcrypt.compare(
        credentials.password,
        user.password
      );
  
      if (!isPasswordCorrect) throw new Error("Wrong credentials!");
  
      return user;
    } catch (err) {
      console.log(err);
      throw new Error("Failed to login!");
    }
  };

export const { 
    handlers:{GET, POST}, 
    auth, 
    signIn, 
    signOut 
} = NextAuth({
    ...authConfig, 
    providers: [ CredentialsProvider({
        async authorize(credentials) {
            try {
                const user = await login(credentials)
                return user
            } catch (err) {
                return null
            }
        }
    }) ],
    callbacks: {
      async signIn() {
        return true;
      },
      ...authConfig.callback
    }, 
})