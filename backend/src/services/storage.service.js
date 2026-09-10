import { v4 as uuidv4 } from 'uuid';
import {AppError} from '../utils/AppError.js'
import { supabase, BUCKET_NAME } from '../config/supabase.js';


export class storageService {
    // Upload Single File Buffer to Supabase Storage

    static async uploadFile(file,folder = 'products'){
        if(!file) throw new AppError('No file provided for upload', 400)

            const fileExt = file.originalname.split('.').pop()
            const fileName = `${folder}/${Date.now()}-${uuidv4()}.${fileExt}`

            const { data, error} = await supabase.storage.from(BUCKET_NAME).upload(fileName, file.buffer, {
                contentType: file.mimetype,
                upsert:false
            });

            if(error){
                throw new AppError(`Supabase Upload Error: ${error.message}`, 500)
            }

            // Public URL Retrieval

            const {data:publicUrlData} = supabase.storage.from(BUCKET_NAME).getPublicUrl(fileName)

            return publicUrlData.publicUrl
            
    }

    // Upload Multiple Files Simultaneously

    static async uploadMultipleFiles(files,folder = 'products'){
        if(!files || files.length === 0) return []
        const uploadPromises = files.map((file) => this.uploadFile(file,folder))
        return await Promise.all(uploadPromises); 
    }
}