require("dotenv").config();
const express = require("express");
const router = express.Router();
const Model = require("../models/model");
const { EmbedBuilder, WebhookClient } = require("discord.js");
const { check, validationResult } = require("express-validator");

module.exports = router;

// Post Method
router.post("/submit", async (req, res) => {
  const data = new Model({
    name: req.body.name,
    time: req.body.time,
    link: req.body.link,
    abyssVersion: req.body.abyssVersion,
    chamber: req.body.chamber,
    team: req.body.team,
  });

  try {
    const dataToSave = await data.save();
    res.status(200).json(dataToSave);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get All Method
router.get("/getAll", async (req, res) => {
  try {
    const data = await Model.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET BY INDIVIDAL CHAMBERS
router.get("/get12-1-1", async (req, res) => {
  try {
    const data = await Model.find({ chamber: "12-1-1" }).sort({ time: "asc" });
    res.json(data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/get12-1-2", async (req, res) => {
  try {
    const data = await Model.find({ chamber: "12-1-2" }).sort({ time: "asc" });
    res.json(data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/get12-2-1", async (req, res) => {
  try {
    const data = await Model.find({ chamber: "12-2-1" }).sort({ time: "asc" });
    res.json(data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/get12-2-2", async (req, res) => {
  try {
    const data = await Model.find({ chamber: "12-2-2" }).sort({ time: "asc" });
    res.json(data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/get12-3-1", async (req, res) => {
  try {
    const data = await Model.find({ chamber: "12-3-1" }).sort({ time: "asc" });
    res.json(data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/get12-3-2", async (req, res) => {
  try {
    const data = await Model.find({ chamber: "12-3-2" }).sort({ time: "asc" });
    res.json(data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//Get by ID Method
router.get("/getOne/:id", async (req, res) => {
  try {
    const data = await Model.findById(req.params.id);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Update by ID Method
router.patch("/update/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;
    const options = { new: true };

    const result = await Model.findByIdAndUpdate(id, updatedData, options);

    res.send(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//Delete by ID Method
router.delete("/delete/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Model.findByIdAndDelete(id);
    res.send(`Document with ${data.name} has been deleted..`);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Post to Discord Method
router.post(
  "/postDiscord",
  [
    check("name").notEmpty().withMessage("Name cannot be empty"),
    check("link").notEmpty().withMessage("Link cannot be empty"),
    check("id").notEmpty().withMessage("Id cannot be empty"),
    check("team").notEmpty().withMessage("Team cannot be empty"),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const webhookClient = new WebhookClient({ url: process.env.WEBHOOK_URL });

      const embed = new EmbedBuilder()
        .setTitle(`New Run Submission by ${req.body.name}`)
        .setColor(0x00ffff);

      webhookClient.send({
        username: "some-username",
        avatarURL: "https://i.imgur.com/AfFp7pu.png",
        embeds: [embed],
      });

      res.send("Posted to Discord");
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
);
