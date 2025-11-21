import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import prisma from "../DB/db.config.js";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
      scope: ["profile", "email"],
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await prisma.user.findUnique({
          where: { email: profile.emails[0].value },
        });

        if (!user) {
          user = await prisma.user.create({
            data: {
              email: profile.emails[0].value,
              provider: "GOOGLE",
              providerId: profile.id,
              profilePicture: profile.photos[0]?.value || null,
              isProfileComplete: false,
            },
          });
        } else if (user.provider === "LOCAL") {
          user = await prisma.user.update({
            where: { id: user.id },
            data: {
              provider: "GOOGLE",
              providerId: profile.id,
              profilePicture: user.profilePicture || profile.photos[0]?.value,
            },
          });
        }

        return done(null, user);
      } catch (error) {
        console.error("Google OAuth Error:", error);
        return done(error, null);
      }
    },
  ),
);

export default passport;
