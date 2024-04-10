import axios from 'axios';
import { toast } from 'react-hot-toast';

/**
 *
 * @param file
 * @description uploads image to cloudinary
 * @returns
 */
export async function uploadToCloudinary(file: File) {
  try {
    const formData = new FormData();

    formData.append('file', file);
    formData.append('upload_preset', import.meta.env.VITE_CLOUDINARY_PRESET);

    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUDNAME}/image/upload`,
      formData
    );

    return response.data.secure_url;
  } catch (error: any) {

    toast.error('Something went wrong.');
    return undefined;
  }
}
