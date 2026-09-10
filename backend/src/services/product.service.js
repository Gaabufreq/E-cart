import {redis} from '../config/redis.js'
import {storageService} from './storage.service.js'
import {AppError} from '../utils/AppError.js'

export class ProductService{
    constructor(productRepository){
        this.productRepository = productRepository
    }
    async createProduct(productData, files){
        let imageUrls = [];
        if(files && files.length > 0){
            imageUrls = await storageService.uploadMultipleFiles(files,'products')
        }
        const newProduct = await this.productRepository.create({
            ...productData,
            images:imageUrls
        });

        // Invalidate product list cache
        try {
            await redis.del('products:all')
        } catch (error) {}
        
        return newProduct
    }
    async getAllProducts(search = ''){
        // Agar search active hai toh DB filtering perform karein (Cache bypass karke)
        if(search && search.trim() !== ''){
            const products = await this.productRepository.findAll(search);
            return { source: "database", data: products };
        }


        const cacheKey = 'products:all';

        try {
            const cachedProducts = await redis.get(cacheKey)
            if(cachedProducts) {
                return {source: "cache", data: JSON.parse(cachedProducts)};
            }
        } catch (error) {}

        const products = await this.productRepository.findAll();
        try {
            await redis.set(cacheKey, JSON.stringify(products), "EX", 1800)
        } catch (error) {}
        return {source: "database", data: products}

    }

    async getProductById(id){
        const product = await this.productRepository.findById(id);
        if(!product){
            throw new AppError("Product not found", 404);
        }
        return product
    }

    async updateProduct(id,updateData,files){
        let product = await this.productRepository.findById(id);
        if(!product){
            throw new AppError("Product not found", 404);
        }

        if(files && files.length > 0){
            const newImages = await storageService.uploadMultipleFiles(files, 'products')
            updateData.images = [...(product.images || []), ...newImages];
        }

        const updatedProduct = await this.productRepository.updateById(id,updateData);

        try {
            await redis.del('products:all');
        } catch (error) {}
        return updatedProduct
    }
    async deleteProduct(id){
    const product = await this.productRepository.findById(id);
    if(!product){
        throw new AppError("Product not found", 404);
    }
    await this.productRepository.deleteById(id);

    try {
        await redis.del('products:all');
    } catch (error) {}
    return true

    }
}