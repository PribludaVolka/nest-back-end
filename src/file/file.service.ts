import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { UploadApiResponse, v2 as cloudinary } from 'cloudinary';
import * as streamifier from 'streamifier';

export enum FileType {
  AUDIO = 'audio',
  IMAGE = 'image',
}

@Injectable()
export class FileService {
  async uploadToCloudinary(file: Express.Multer.File, type: FileType): Promise<{ url: string, duration?: string }> {
    try {
      const result = await new Promise<UploadApiResponse>((resolve, reject) => {
        const upload = cloudinary.uploader.upload_stream(
          { resource_type: type === FileType.AUDIO ? 'video' : 'image', folder: type },
          (error, result) => {
            if (error || !result) return reject(error);
            resolve(result);
          }
        );
        streamifier.createReadStream(file.buffer).pipe(upload);
      });
      return { url: result.secure_url };
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
