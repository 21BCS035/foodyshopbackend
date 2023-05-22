import express from "express";
import passport from "passport";

import { myProfile } from "../controllers/user.js";
import { logout } from "../controllers/user.js";
import { isAuthenticated,authorizeAdmin } from "../middlewares/auth.js";
import { getAdminUsers,getAdminStats } from "../controllers/user.js";
const router = express.Router();

router.get(
    "/googlelogin",
    passport.authenticate("google", {
      scope: ["profile"],
    })
  );
  
  // router.get(
  //   "/login",
  //   passport.authenticate("google"),
  //   (req,res,next)=>{
  //       res.send("Logged In")
  //   }  
    
  // );
  router.get(
    "/login",
    passport.authenticate("google", {
      successRedirect: process.env.FRONTEND_URL,
      
    })
  );
  
  router.get("/me",isAuthenticated, myProfile);
  router.get("/logout", logout);
  router.get("/admin/users", isAuthenticated, authorizeAdmin, getAdminUsers);
  router.get("/admin/stats", isAuthenticated, authorizeAdmin, getAdminStats);
export default router;