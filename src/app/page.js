'use client'
import { Chat } from "@/components/chat";
import CombinedChat from "@/components/combinedChat";
import { Leftbar } from "@/components/leftbar";
import { Navbar } from "@/components/navbar";

export default function Home() {
  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex">
        <Leftbar />
        <Chat />
      </div>
    </div>
  );
}
