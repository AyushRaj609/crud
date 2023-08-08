const express = require('express');
const route = express.Router();
const path = require('path')
const exceljs = require('exceljs');

const UserData = require('../models/usermodel');
require('../dbconnection/connection')

route.post('/api/v1/registration', async (req, res) => {
    try {
        const { name, email, phone_number, age } = req.body;
        const UserExist = await UserData.findOne({ email: email });
        const filePath = path.join(process.cwd(), '../../CSV/nextjs/public', 'data.csv');
        const rows = [];

        if (UserExist) {
            return res.status(422).json({ message: 'user already exists.' })
        }

        const AddUser = new UserData({
            name,
            email,
            phone_number,
            age
        });

        const saveUser = AddUser.save();

        if (saveUser) {

            return res.status(200).json({ message: 'Data updated successfully and exported to Excel!' });
        }

    } catch (err) {
        console.log("Error: " + err)
        return res.status(400).json({ err })
    }
});


route.get('/api/v1/users', async (req, res) => {
    try {
        const allUsers = await UserData.find();

        const userData = allUsers.map((user) => {
            return {
                name: user.name,
                email: user.email,
                phone_number: user.phone_number,
                age: user.age
            };
        });

        // Create an Excel workbook and worksheet
        const workbook = new exceljs.Workbook();
        const worksheet = workbook.addWorksheet('Users');

        // Define headers for the Excel sheet
        worksheet.columns = [
            { header: 'Name', key: 'name', width: 20 },
            { header: 'Email', key: 'email', width: 30 },
            { header: 'Phone Number', key: 'phone_number', width: 15 },
            { header: 'Age', key: 'age', width: 10 }
        ];

        // Populate the Excel sheet with user data
        allUsers.forEach((user) => {
            worksheet.addRow({
                name: user.name,
                email: user.email,
                phone_number: user.phone_number,
                age: user.age
            });
        });

        // Save the Excel workbook to a file
        const excelFilePath = path.join(process.cwd(), 'users.xlsx');
        await workbook.xlsx.writeFile(excelFilePath);

        console.log("Data exported to Excel successfully!");
        res.status(200).json({userData});
    } catch (err) {
        console.log("Error: " + err)
        return res.status(500).json({ error: err });
    }
});


module.exports = route;