"use client"
import React from 'react';
import {useDropzone} from 'react-dropzone'
import { Axis3DIcon, Inbox, Loader2 } from 'lucide-react';
import { uploadToS3} from '@/lib/s3';
import { useMutation } from '@tanstack/react-query';
import { addSyntheticLeadingComment } from 'typescript';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation'
import axios from "axios";



const FileUpload = () => {
  console.log("begin")
  const router = useRouter();
  const [uploading, setUploading] = React.useState(false);
  console.log("second")
  const { mutate, isLoading } = useMutation({
    mutationFn: async ({ file_key, file_name }) => {
      const response = await axios.post("/api/create-chat", {
        file_key, 
        file_name,
      });
      console.log("end")
      return response.data;
    },
  });
  
  const handlePDFUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {  // Dosya seçildiyse
      const formData = new FormData();
      formData.append('file', file);  // 'pdf' anahtarı ile dosyayı ekleyin
      try {
        // API'ye yükleme isteği gönder
        const response = await axios.post('http://localhost:3000/upload_new_pdf', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        // Yükleme başarılıysa kullanıcıyı bilgilendir
        addMessage(`PDF uploaded!`, 'user');
      } catch (error) {
        console.error('Error while uploading PDF:', error);
        addMessage('An error occurred while trying to upload the PDF.', 'assistant');
      }
    }
  };
  
  const handleFileUpload = async (event) => {
    const files = event.target.files;
    if (files.length === 0) return; // No file is selected
  
    const formData = new FormData();
    // Append the selected audio file to the form data
    formData.append('files', files[0]); // Note: 'files' to match your FastAPI endpoint parameter
  
    try {
        // Send the POST request to the /whisper/ endpoint with the form data
        const response = await axios.post('http://localhost:3000/whisper/', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
  
        // Check if the response is successful
        if (response.data && response.data.results && response.data.results.length > 0) {
            // Display the transcript as if the assistant is answering
            const transcript = response.data.results[0].transcript;
            addMessage(transcript, 'assistant');
        } else {
            // If the transcription is not successful, inform the user
            addMessage('Sorry, I could not transcribe the audio.', 'assistant');
        }
    } catch (error) {
        console.error('Error while uploading and transcribing audio:', error);
        addMessage('An error occurred while trying to upload and transcribe the audio.', 'assistant');
    }
  
    // Clear the file input after processing
    event.target.value = '';
  };
  
  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {  // Dosya seçildiyse
      const formData = new FormData();
      formData.append('file', file);
      try {
        // API'ye yükleme isteği gönder
        const response = await axios.post('http://localhost:3000/upload_image', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        // Yükleme başarılıysa ve API'den yanıt alındıysa, kullanıcıyı ve API'den gelen yanıtı bilgilendir
        addMessage(`Image uploaded!`, 'user');
        if (response.data && response.data.response) {
          // API'den gelen yanıtı assistant rolünde ekrana ekleyin
          console.log("IMAGE DAN GELEN", response.data)
          addMessage(response.data.response, 'assistant');
        }
      } catch (error) {
        console.error('Error while uploading image:', error);
        addMessage('An error occurred while trying to upload the image.', 'assistant');
      }
    }
  };

  const {getRootProps, getInputProps} = useDropzone({
    accept: { "application/pdf": [".pdf"], "video/mp4": [".mp4"], "image/png": [".png"], "image/jpeg": [".jpeg"] },
    maxFiles: 1,
    onDrop: async (acceptedFiles) => {
      console.log(acceptedFiles);
      const file = acceptedFiles[0];
      if (file.size > 10 * 1024 * 1024 * 1) {
        toast.error("File too large");
        return;
      }
      try {
        setUploading(true);
        const data = await uploadToS3(file);
        if (!data?.file_key || !data.file_name) {
            toast.error("Something went wrong");
            return;
        }
        mutate(data, {
          onSuccess: ({ chat_id }) => {
            toast.success("File has been successfully uploaded!");     
          },
          onError: (err) => {
            toast.error("Error uploading file");
            console.error(err);
          },
        });
      } catch (error) {
        console.log(error);
      } finally {
        setUploading(false);
      }
    },
  });
  return (
    <div className='p-2 bg-white rounded-xl'>
         <div
        {...getRootProps({
          className:
            "border-dashed border-2 rounded-xl cursor-pointer bg-gray-50 py-8 flex justify-center items-center flex-col",
        })}
      >
            <input {...getInputProps()} />
            {uploading || isLoading ? (
          <>
            {/* loading state */}
            <Loader2 className="h-10 w-10 text-blue-500 animate-spin" />
            <p className="mt-2 text-sm text-slate-400">
              Spilling Tea to GPT...
            </p>
          </>
        ) : (
            <>
              <Inbox className="w-10 h-10 text-blue-500" />
              <p className="mt-2 text-sm text-slate-400">Drop Course PDF Here</p>
            </>
            )}
        </div>
    </div>
  );
};

export default FileUpload;