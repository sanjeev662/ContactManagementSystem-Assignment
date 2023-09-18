const express = require("express");
const moment = require("moment-timezone");
const router = express.Router();
const users = require("../models/userSchema");

// Create a new userContact

router.post("/api/contacts", async (req, res) => {
  const { name, email, age, mobile, spoc, add, desc } = req.body;

  if (!name || !email || !age || !mobile || !spoc || !add || !desc) {
    res.status(422).json("plz fill the data");
  }

  try {
    const preuser = await users.findOne({ email: email });
    if (preuser) {
      res.status(422).json("this  user  is already present");
    } else {
      const datecreated = moment.tz(new Date(), 'Asia/Kolkata').format("YYYY-MM-DD hh:mm:ss");

      const adduser = new users({
        name,
        email,
        age,
        mobile,
        spoc,
        add,
        desc,
        datecreated,
      });

      const savedUser = await adduser.save();
      res.status(201).json(savedUser);
    }
  } catch (error) {
    res.status(422).json(error);
  }
});

//get all user Contact data 

router.get("/api/contacts", async (req, res) => {
  const search = req.query.search || "";
  const sort = req.query.sort || "";

  const query = {
    name: { $regex: search, $options: "i" },
  };
  try {
    const userdata = await users
      .find(query)
      .sort({ datecreated: sort == "new" ? -1 : 1 });

    res.status(201).json(userdata);
  } catch (error) {
    res.status(422).json(error);
  }
});

// get individual user contact by ID

router.get("/api/contacts/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const userindividual = await users.findById({ _id: id });
    res.status(201).json(userindividual);
  } catch (error) {
    res.status(422).jsom(error);
  }
});

// update user contact by ID

router.put("/api/contacts/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const updateduser = await users.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updateduser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(201).json(updateduser);
  } catch (error) {
    res.status(422).json(error);
  }
});

//delete user Contact by ID

router.delete("/api/contacts/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deleteuser = await users.findByIdAndDelete({ _id: id });
    if (!deleteuser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(201).json(deleteuser);
  } catch (error) {
    res.status(422).json(error);
  }
});

module.exports = router;
