import React, { useState } from 'react';
import axios from 'axios';

const ImageUpload = () => {
  const [images, setImages] = useState<FileList | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages(e.target.files);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    if (images) {
      for (let i = 0; i < images.length; i++) {
        formData.append('files[]', images[i]);
      }
    }

    try {
      const response = await axios.post('http://localhost:5000/api/upload/multipleUpload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Upload Success:', response.data);
    } catch (error) {
      console.error('Upload Error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" multiple onChange={handleFileChange} />
      <button type="submit">Upload</button>
    </form>
  );
};

export default ImageUpload;
