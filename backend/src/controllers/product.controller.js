import { ProductRepository } from "../repositories/product.repository.js";
import { ProductService } from "../services/product.service.js";
import {catchAsync} from '../utils/catchAsync.js'


const productRepository = new ProductRepository();
const productService = new ProductService(productRepository)

export class ProductController {
        createProduct = catchAsync(async(req,res) => {
        const product = await productService.createProduct(req.body, req.files);
        return res.status(201).json({
            success:true,
            message:"Product created successfully",
            data:product
        });
    });

        getAllProducts = catchAsync(async(req,res) => {
            const {search} = req.query; // Query parameter handling
         const result = await productService.getAllProducts(search)
        return res.status(200).json({
            success:true,
            source:result.source,
            data:result.data
        });
        });

        getProductById = catchAsync(async(req,res) => {
            const product = await productService.getProductById(req.params.id)
            return res.status(200).json({
            success: true,
            data: product
        });
        });


        updateProduct = catchAsync(async(req,res) => {
            const product = await productService.updateProduct(req.params.id, req.body, req.files);
            return res.status(200).json({
            success: true,
            message: "Product updated successfully",
            data: product
        });
        });

        deleteProduct = catchAsync(async(req,res) => {
            await productService.deleteProduct(req.params.id);
            return res.status(200).json({
            success: true,
            message: "Product deleted successfully"
        });
        });
    
}