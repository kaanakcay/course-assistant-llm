"use client";
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import FileUpload from './FileUpload';
import { IoMdImage } from 'react-icons/io'; // Import the image icon

export function Chat() {
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');
    const endOfMessagesRef = useRef(null);
    const [selectedImage, setSelectedImage] = useState(null); // State for managing selected image

    useEffect(() => {
        endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const sendMessage = async (event) => {
        event.preventDefault();
        if (!inputMessage) return;

        const newUserMessage = { role: 'user', content: inputMessage };
        setMessages(messages => [...messages, newUserMessage]);

        try {
            const response = await axios.post("http://localhost:8000/get_response/", {
                query: inputMessage,
            });

            let assistantContent = response.data.response.answer || "No response received";

            const substringToRemove = "<|im_end|>";
            if (assistantContent.endsWith(substringToRemove)) {
                assistantContent = assistantContent.slice(0, -substringToRemove.length);
            }

            const assistantResponse = {
                role: 'assistant',
                content: assistantContent,
            };

            setMessages(messages => [...messages, assistantResponse]);
        } catch (error) {
            console.error("Error fetching response:", error);
        }

        setInputMessage('');
    };

    const handleImageUpload = async (event) => {
      const file = event.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await axios.post("http://localhost:8000/upload_image/", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            const responseText = response.data.response || "No response found"; // Parse the response
            const assistantResponse = {
                role: 'assistant',
                content: responseText,
            };

            setMessages(messages => [...messages, assistantResponse]);
        } catch (error) {
            console.error("Error uploading image:", error);
        }
  };


    return (
        <div className="flex flex-1 items-center justify-center p-4">
            <div className="flex flex-col w-full max-w-3xl max-h-[80vh] gap-4 rounded-xl border border-gray-200 bg-white shadow-lg overflow-hidden">
                <div className="p-4 sticky top-0 bg-white z-10">
                    <h1 className="text-2xl font-bold">Chat with SU Assistant</h1>
                </div>
                <div className="divide-y overflow-auto max-h-[65vh]">
                    {messages.map((msg, index) => (
                        <div key={index} className={`flex flex-col p-4 ${msg.role === 'assistant' ? 'self-end' : ''}`}>
                            <div class={`rounded-xl bg-gray-100 px-4 py-2 ${msg.role === 'assistant' ? 'bg-gray-800 text-white' : ''}`}>
                                {msg.content}
                            </div>
                        </div>
                    ))}
                    <div ref={endOfMessagesRef}></div>
                </div>
                <div className="p-4 sticky bottom-0 bg-white">
                    <form class="flex space-x-2" onSubmit={sendMessage}>
                        {/* Add IoMdImage icon for image uploads */}
                        <label htmlFor="image-upload">
                            <IoMdImage className="cursor-pointer text-2xl" />
                        </label>

                        <input
                            id="image-upload"
                            type="file"
                            accept="image/*"
                            style={{ display: 'none' }}
                            onChange={handleImageUpload}
                        />

                        <Input
                            className="flex-1"
                            placeholder="Type a message"
                            value={inputMessage}
                            onChange={e => setInputMessage(e.target.value)}
                        />
                        <Button className="w-20" type="submit">
                            Send
                        </Button>
                    </form>
                    
                </div>
            </div>
        </div>
    );
}
