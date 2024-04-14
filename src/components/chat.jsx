import { useState, useEffect, useRef } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function Chat() {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const endOfMessagesRef = useRef(null);

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = (event) => {
    event.preventDefault();
    if (!inputMessage) return;

    const newUserMessage = { role: 'user', content: inputMessage };
    const assistantResponse = { role: 'assistant', content: "Here's an example of a card component." };
    setMessages(messages => [...messages, newUserMessage, assistantResponse]);
    setInputMessage('');
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
              <div className={`rounded-xl bg-gray-100 px-4 py-2 ${msg.role === 'assistant' ? 'bg-gray-800 text-white' : ''}`}>
                {msg.content}
              </div>
            </div>
          ))}
          <div ref={endOfMessagesRef}></div>
        </div>
        <div className="p-4 sticky bottom-0 bg-white">
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
