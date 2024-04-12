
"use client"; 
import { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function Chat() {
  // Mesajları saklamak için state
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');

  // Mesaj gönderme fonksiyonu
  const sendMessage = (event) => {
    event.preventDefault();  // Formun sayfayı yenilemesini önler
    if (!inputMessage) return;  // Boş mesaj gönderimi engeller

    // Kullanıcı mesajını dizimize ekler
    const newUserMessage = { role: 'user', content: inputMessage };
    setMessages([...messages, newUserMessage]);

    // Asistan cevabını simüle eder (Gerçek uygulamada burası dinamik olabilir)
    const assistantResponse = { role: 'assistant', content: "Here's an example of a card component." };
    setMessages(messages => [...messages, newUserMessage, assistantResponse]);

    // Input'u sıfırlar
    setInputMessage('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="grid w-full max-w-3xl max-h-[80vh] gap-4 rounded-xl border border-gray-200 bg-white shadow-lg overflow-hidden sm:gap-6 dark:border-gray-800 dark:border-gray-800">
        <div className="p-4">
          <h1 className="text-2xl font-bold">Chat with SU Assistant</h1>
        </div>
        <div className="divide-y">
          {messages.map((msg, index) => (
            <div key={index} className={`flex flex-col p-4 ${msg.role === 'assistant' ? 'self-end' : ''}`}>
              <div className={`rounded-xl bg-gray-100 px-4 py-2 ${msg.role === 'assistant' ? 'dark:bg-gray-800' : ''}`}>
                {msg.content}
              </div>
            </div>
          ))}
        </div>
        <div className="p-4">
          <form className="flex space-x-2" onSubmit={sendMessage}>
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
