import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import User from "@/app/(models)/User";

export const options = {
  providers: [
    GithubProvider({
      profile(profile) {
        let userRole = "Github User";
        if (profile?.name === "karthicktamil") {
          userRole = "admin";
        }

        return {
          ...profile,
          role: userRole,
        };
      },
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    GoogleProvider({
      profile(profile) {
        let userRole = "Google User";

        return {
          ...profile,
          id: profile.sub,
          role: userRole,
        };
      },
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "email:",
          type: "text",
          placeholder: "your-email@gmail.com",
        },
        password: {
          label: "password:",
          type: "password",
          placeholder: "********",
        },
      },
      async authorize(credentials) {
        try {
          const foundUser = User.findOne({ email: credentials.email })
            .lean()
            .exec();

          if (foundUser) {
            const match = bcrypt.compare(
              credentials.password,
              foundUser.password
            );

            if (match) {
              delete foundUser.password;

              foundUser["role"] = "Unverified User";
              return foundUser;
            }
          }
        } catch (error) {
          console.log(error);
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.role = user.role;
      return token;
    },
    async session({ session, token }) {
      if (session?.user) session.user.role = token.role;
      return session;
    },
  },
};
