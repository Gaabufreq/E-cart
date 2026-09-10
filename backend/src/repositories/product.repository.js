import { Product } from "../models/product.model.js";

export class ProductRepository{
    async create(productData){
        return await Product.create(productData)
    }

    // Advanced Regex Search for title, category, and description
    async findAll(searchQuery = '') {
        let filter = {};
        if(searchQuery) {
            filter = {
                $or: [
                    { title: { $regex: searchQuery, $options: 'i' } },
                    { category: { $regex: searchQuery, $options: 'i' } },
                    { description: { $regex: searchQuery, $options: 'i' } }
                ]
            };
        }
        return await Product.find(filter).sort({ createdAt: -1 });
    }


    async findById(id){
        return await Product.findById(id);
    }
    async updateById(id, updateData){
    return await Product.findByIdAndUpdate(id, updateData, {new:true});
    }
    async deleteById(id){
        return await Product.findByIdAndDelete(id)
    }
}