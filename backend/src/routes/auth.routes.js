import expres from "express";

const router = expres.Router();

router.get("/signup", (req, res) => {
  res.send(console.log("Signup route"));
});
router.get("/signin", (req, res) => {
  res.send(console.log("Signin route"));
});
router.get("/logout", (req, res) => {
  res.send(console.log("Logout route"));
});

export default router;
