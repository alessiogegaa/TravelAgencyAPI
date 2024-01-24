const express = require('express');
const asyncHandler = require("express-async-handler");
const bodyParser = require('body-parser');

const db = require('../db'); 
const app = express();
app.use(bodyParser.json());
const getBooking = asyncHandler(async (req, res) => {
    try {
        const [rows, fields] = await db.query("SELECT * from bookings");
        res.json(rows);
    } catch (err) {
        console.error('Database query failed', err);
        res.status(500).send('Internal Server Error');
    }
});

const postBooking = asyncHandler(async (req, res) => {
    const booking = req.body;
  
    try {
      const columnsToInsert = Object.keys(booking).join(', ');
      const valuesToInsert = Object.values(booking);
      const placeholders = valuesToInsert.map(() => '?').join(', ');
  
      const insertQuery = `INSERT INTO bookings (${columnsToInsert}) VALUES (${placeholders})`;
      
      await db.query(insertQuery, valuesToInsert);
  
      res.send('Booking created successfully');
    } catch (err) {
      console.error('Database query failed', err);
      res.status(500).send('Internal Server Error');
    }
  });

const putBooking = asyncHandler(async (req, res) => {
    const bookingId = req.params.id;
    const updatedBooking = req.body;

    try {
        
        const columnsToUpdate = Object.keys(updatedBooking).map(column => `${column} = ?`).join(', ');
        const valuesToUpdate = Object.values(updatedBooking);

        
        valuesToUpdate.push(bookingId);

        const updateQuery = `UPDATE bookings SET ${columnsToUpdate} WHERE booking_id = ?`;

        await db.query(updateQuery, valuesToUpdate);
        res.send('Booking updated successfully');
    } catch (err) {
        console.error('Database update failed', err);
        res.status(500).send('Internal Server Error');
    }
});

const deleteBooking = asyncHandler(async (req, res) => {
    const bookingId = req.params.id;
  
    try {
      const deleteQuery = `DELETE FROM bookings WHERE booking_id = ?`;
      await db.query(deleteQuery, [bookingId]);
  
      console.log(`Booking with id ${bookingId} deleted successfully`);
      res.send('Booking deleted successfully');
    } catch (err) {
      console.error('Database query failed', err);
      res.status(500).send('Internal Server Error');
    }
  });

module.exports = { getBooking, postBooking, putBooking, deleteBooking };