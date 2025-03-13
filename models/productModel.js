import mongoose from 'mongoose';

const productSchema = mongoose.Schema({
	name: { type: String, required: true },
	price: { type: Number, required: true },
	description: { type: String, required: false },
	image: { type: String, required: true },
	category: {
		type: String,
		required: true,
	},
});

export const Product = mongoose.model('Product', productSchema);
