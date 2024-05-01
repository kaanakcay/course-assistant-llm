
import { Chat } from '../components/chat'; 
import { Leftbar } from './Leftbar';
import FileUpload from './FileUpload';
import { Navbar } from './navbar';
import { UserButton, auth } from "@clerk/nextjs";

export default function CombinedChat() {
    return (
        <div className="flex flex-col h-screen w-screen">
            <div className="flex-shrink-0">
                <Navbar />
                <UserButton afterSignOutUrl="/" />
            </div>
            <div className="flex min-h-0">
                <div className="flex-none w-auto bg-gray-200">
                    <Leftbar/>
                </div>
                <div className="flex flex-col flex-1 min-w-0 p-4">
                    <div className="h-autoflex-shrink-0 p-4 bg-gray-100">
                        <Chat />
                        <FileUpload/>
                    </div>
                </div>
            </div>
        </div>
    );
}
