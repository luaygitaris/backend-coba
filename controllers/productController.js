import productModel from '../models/productModel.js';
import fs from 'fs';

const addProduct = async (req, res) => {
	const { name, description, price, image, category } = req.body;

	if (!name || !description || !price || !image || !category) {
		return res.status(400).json({ success: false, message: 'Semua field harus diisi.' });
	}

	const product = new productModel({
		name,
		description,
		price,
		image,
		category,
	});

	try {
		await product.save();
		res.json({ success: true, message: 'Produk berhasil ditambahkan.' });
	} catch (error) {
		console.log(error);
		res.status(500).json({ success: false, message: 'Terjadi kesalahan saat menambahkan produk.' });
	}
};


const listProduct = async (req, res) => {
	try {
		const products = await productModel.find({});
		res.json({ success: true, data: products });
	} catch (error) {
		console.log(error);
		res.json({ success: false, message: 'Error' });
	}
};

const removeProduct = async (req, res) => {
	try {
		const product = await productModel.findById(req.body.id);
		// fs.unlink(`uploads/${product.image}`, ()=>{})

		await productModel.findByIdAndDelete(req.body.id);
		res.json({ success: true, message: 'Product Removed' });
	} catch (error) {
		console.log(error);
		res.json({ success: false, message: 'Error' });
	}
};

export { addProduct, listProduct, removeProduct };
