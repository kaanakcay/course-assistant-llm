"use client";
import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Axis3DIcon, Inbox, Loader2 } from 'lucide-react';
import { toast } from 'react-hot-toast';
import axios from 'axios';

const FileUpload = () => {
    const [uploading, setUploading] = useState(false);

    const handleUpload = async (file) => {
        const formData = new FormData();
        if(file.type.startsWith("audio/")) {
          formData.append('files', file); // Match the backend parameter
        }else{
          formData.append('file', file); // Match the backend parameter

        }
        

        try {
            let response;
            if (file.type === "application/pdf") {
                response = await axios.post("http://localhost:8000/upload_new_pdf/", formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                toast.success("PDF uploaded successfully!");
            } else if (file.type.startsWith("image/")) {
                response = await axios.post("http://localhost:8000/upload_image/", formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                toast.success("Image uploaded successfully!");
            } else if (file.type.startsWith("audio/")) { // Handle audio uploads
                response = await axios.post("http://localhost:8000/whisper/", formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });

                console.log("Audio file response:", response.data); // Log the full response

                const results = response.data.results || [];
                results.forEach(result => {
                    console.log(`Transcription of ${result.filename}: ${result.transcript}`);
                });
                toast.success("Audio file transcribed successfully!");
            } else {
                toast.error("Unsupported file type");
                return;
            }

            console.log("Upload response:", response.data);
        } catch (error) {
            console.error("Error uploading file:", error.response || error);
            toast.error(`An error occurred: ${error.response?.data?.detail || error.message}`);
        }
    };

    const { getRootProps, getInputProps } = useDropzone({
        accept: {
            "application/pdf": [".pdf"],
            "image/png": [".png"],
            "image/jpeg": [".jpeg"],
            "image/jpg": [".jpg"],
            "audio/mpeg": [".mp3"],
            "audio/wav": [".wav"],
            "audio/ogg": [".ogg"],
            "audio/m4a": [".m4a"], // Include .m4a files
        },
        maxFiles: 1,
        onDrop: async (acceptedFiles) => {
            const file = acceptedFiles[0];
            if (file.size > 10 * 1024 * 1024) {
                toast.error("File too large");
                return;
            }

            setUploading(true);
            await handleUpload(file);
            setUploading(false);
        },
    });

    return (
        <div class="p-2 bg-white rounded-xl">
            <div
                {...getRootProps({
                    className: "border-dashed border-2 rounded-xl cursor-pointer bg-gray-50 py-8 flex justify-center items-center flex-col",
                })}
            >
                <input {...getInputProps()} />
                {uploading ? (
                    <>
                        {/* Loading state */}
                        <Loader2 className="h-10 w-10 text-blue-500 animate-spin" />
                        <p class="mt-2 text-sm text-slate-400">Uploading...</p>
                    </>
                ) : (
                    <>
                        <Inbox className="w-10 h-10 text-blue-500" />
                        <p class="mt-2 text-sm text-slate-400">Drop Document Here</p>
                    </>
                )}
            </div>
        </div>
    );
};

export default FileUpload;
