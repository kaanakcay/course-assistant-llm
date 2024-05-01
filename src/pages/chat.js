import { ClerkProvider } from "@clerk/nextjs"
import CombinedChat from "../components/combinedChat"
import { Navbar } from "../components/navbar"
import Providers from "@/components/Providers";


export default function Chat(){
    return (
    <ClerkProvider>
        <Providers>
            <div className="w-screen min-h-screen bg-gradient-to-r from-rose-100 to-teal-100">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <div className="flex flex-col items-center text-center">
                        <div className="flex items-center">
                        <h1 className="mr-3 text-5xl font-semibold">Sabanci University Course Assistant</h1>
                        </div>
                        <CombinedChat/>
                    </div>
                </div>
            </div>
        </Providers>
    </ClerkProvider>
    )
}