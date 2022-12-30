import passport from "passport";
import { JwtStrategy } from "./jwt.strategy";

export const Auth = () => {
  passport.use(JwtStrategy);
};

