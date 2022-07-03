const mongoose = require("mongoose");

const MakananSchema = mongoose.Schema({
  namaMakanan: {
    type: String,
    required: true,
  },
  hargaMakanan: {
    type: Number,
    required: true,
  },
  stok: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Makanan", MakananSchema);
