const Space = require("../db/Schemas/Space");
require('dotenv').config();
const { BlobServiceClient } = require('@azure/storage-blob');
const blobService = BlobServiceClient.fromConnectionString(process.env.AZURE_KEY)

const register = async (req, res) => {
    try {
        const space = await Space.create(req.body);
        const imgs = [];
        for (const file of req.files) {
            const { buffer, originalname } = file;
            const containerClient = blobService.getContainerClient('photos');
            const blobClient = containerClient.getBlockBlobClient(`${space._id}_${originalname}`);
            await blobClient.uploadData(buffer);
            imgs.push(blobClient.url);
        }
        space.imgs = imgs;
        await space.save();
        return res.status(200).json({ ok: 'Successful' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getSpaces = async (req, res) => {
    try {
        const { email } = req.params;
        const spaces = await Space.find({ user: email }).sort({ createdAt: -1 });
        return res.status(200).json(spaces);
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}
const getSpace = async (req, res) => {
    try {
        const { id } = req.params;
        const space = await Space.findOne({ _id: id });
        return res.status(200).json(space);
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}
const getAllSpaces = async (req, res) => {
    try {
        const { filter } = req.body;
        const cleanedFilter = {};
        if (filter.address) {
            cleanedFilter.address = { $regex: filter.address, $options: 'i' };
        }
        if (filter.type) {
            cleanedFilter.type = filter.type;
        }
        if (filter.capacity) {
            cleanedFilter.capacity = { $lte: parseInt(filter.capacity) };
        }
        if (filter.price) {
            cleanedFilter.price = { $lte: parseInt(filter.price) };
        }
        const spaces = await Space.aggregate([
            { $match: cleanedFilter }
        ]);
        return res.status(200).json(spaces);
    } catch (error) {
        console.error('Error retrieving spaces:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    register,
    getSpaces,
    getAllSpaces,
    getSpace
}