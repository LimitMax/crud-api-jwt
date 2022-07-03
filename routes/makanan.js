const express = require("express");
const router = express.Router();
const Makanan = require("../models/Makanan");
const veriyToken = require("../routes/verifToken");

// CREATE
router.post("/", veriyToken, async (req, res) => {
  const makananPost = new Makanan({
    namaMakanan: req.body.namaMakanan,
    hargaMakanan: req.body.hargaMakanan,
    stok: req.body.stok,
  });

  try {
    const makanan = await makananPost.save();
    res.json(makanan);
  } catch (err) {
    res.json({ message: err });
  }
});

// READ
router.get("/", veriyToken, async (req, res) => {
  try {
    const makanan = await Makanan.find();
    res.json(makanan);
  } catch (err) {
    res.json({ message: err });
  }
});

// UPDATE
router.put("/:makananId", veriyToken, async (req, res) => {
  try {
    const makananUpdate = await Makanan.updateOne(
      { _id: req.params.makananId },
      {
        namaMakanan: req.body.namaMakanan,
        hargaMakanan: req.body.hargaMakanan,
        stok: req.body.stok,
      }
    );
    res.json(makananUpdate);
  } catch (err) {
    res.json({ message: err });
  }
});

// DELETE
router.delete("/:makananId", veriyToken, async (req, res) => {
  try {
    const makananDelete = await Makanan.deleteOne({ _id: req.params.makananId });
    res.json(makananDelete);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
