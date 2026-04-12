const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Passenger = require('./Passenger'); // Import the schema we just made

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/flightDB')
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.log("❌ DB Error: ", err));

// 1. INSERT (Create)
app.post('/add', async (req, res) => {
  try {
    const newPassenger = new Passenger(req.body);
    await newPassenger.save();
    res.status(201).send("Passenger Added!");
  } catch (err) {
    res.status(400).send("Error adding passenger: " + err.message);
  }
});

// 2. VIEW ALL (Read)
app.get('/view', async (req, res) => {
  const passengers = await Passenger.find();
  res.json(passengers);
});

// 3. UPDATE (Update based on Phone Number)
app.put('/update/:phone', async (req, res) => {
  try {
    await Passenger.findOneAndUpdate({ phoneNumber: req.params.phone }, req.body);
    res.send("Record Updated Successfully");
  } catch (err) {
    res.status(400).send("Update failed");
  }
});

// 4. DELETE (Delete based on Phone Number)
app.delete('/delete/:phone', async (req, res) => {
  try {
    await Passenger.findOneAndDelete({ phoneNumber: req.params.phone });
    res.send("Record Deleted");
  } catch (err) {
    res.status(400).send("Delete failed");
  }
});

app.listen(5000, () => console.log("🚀 Server running on Port 5000"));