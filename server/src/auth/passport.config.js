import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as GitHubStrategy } from "passport-github2";
import prisma from "../DB/db.config.js";

export const googlePassport = passport.use(
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

export const githubPassport = passport.use(
  new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.GITHUB_CALLBACK_URL,
    scope: ["user", "email"],
  }, async (accessToken, refreshToken, profile, done) => {
    try {
      if (!profile.emails || !profile.emails[0] || !profile.emails[0].value) {
        return done(new Error("Email not provided by GitHub"), null);
      }
      const email = profile.emails[0].value;
      let user = await prisma.user.findUnique({
        where: { email },
      });

      if (!user) {
        user = await prisma.user.create({
          data: {
            email,
            provider: "GITHUB",
            providerId: profile.id,
            profilePicture: profile.photos[0]?.value || null,
            isProfileComplete: false,
          },
        });
      } else if (user.provider === "LOCAL") {
        user = await prisma.user.update({
          where: { id: user.id },
          data: {
            provider: "GITHUB",
            providerId: profile.id,
            profilePicture: user.profilePicture || profile.photos[0]?.value,
          },
        });
      }

      return done(null, user);
    } catch (error) {
      console.error("GitHub OAuth Error:", error);
      return done(error, null);
    }
  })
);
