// utils/faceStudioApi.ts
import axios from 'axios';

const FACE_STUDIO_API_URL = 'https://facestud.io/v1/generate';
const API_KEY = process.env.NEXT_PROTRAIT_API_KEY;


interface GenerateFaceParams {
  gender: string;
  age: string;
  ethnicity: string;
  resolution?: number;
  image_format?: 'jpeg';
  // Add other parameters as needed
}

export const generateFace = async ({age,ethnicity,gender}: GenerateFaceParams) => {
  console.log("HHHH")
console.log('API_KEY:', process.env.NEXT_RapidAPI_Key);
console.log('djdhdhdhd:', process.env.NEXT_PROTRAIT_API_KEY);
  try {
    const response = await axios.get(`https://face-studio.p.rapidapi.com/generate?gender=${gender}&age=${age}&ethnicity=${ethnicity}`, {
        headers: {
            'x-rapidapi-key': process.env.NEXT_RapidAPI_Key|| '',
            'x-rapidapi-host': 'face-studio.p.rapidapi.com'
          },
    //   params,
      responseType: 'blob', // Ensure the response is treated as a binary data
    });

    console.log('Face generated:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error generating face:', error);
    throw error;
  }
};
