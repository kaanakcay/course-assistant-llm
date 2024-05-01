import { Chat } from "@/components/chat";
import CombinedChat from "@/components/combinedChat";
import { Leftbar } from "@/components/Leftbar";
import Login from "@/components/login";
import { Navbar } from "@/components/navbar";
import { UserButton, auth } from "@clerk/nextjs";
import { Button } from "../components/ui/button";
import Link from "next/link";
import { ArrowRight, LogIn } from "lucide-react";
import FileUpload from "@/components/FileUpload";
import { clerkClient } from "@clerk/nextjs";
import axios from "axios";

async function registerUser(name, email) {
    try {
        const response = await axios.post('http://localhost:3000/api/create-user', { name, email });
        return { status: response.status, message: "User registered successfully" };
    } catch (error) {
        console.error("Error caught:", error.response);
        return { status: 500, message: "Error registering user" };
    }
}


export default async function Home() {
  const {userId} = await auth();
    const isAuth = !!userId;
    if(isAuth){
        const response = await clerkClient.users.getUser(userId);
        var fullName = null;
        if(response.lastName.at(-1) == ')'){
            fullName = (response.firstName + " " + response.lastName.substring(0, response.lastName.indexOf('(')));
            fullName = fullName.substring(0, fullName.length-1);
        }
        else{
            fullName = response.firstName + response.lastName;
        }
    
        //console.log(fullName);
        //console.log(fullName.length);
    
        const email = response.emailAddresses[0].emailAddress;
    
        registerUser(fullName, email)
        .then(response => {
            console.log(response.status, response.message);
        })
        .catch(error => {
            console.error(error.status, error.message);
        });
    }

    return (
    <div className="w-screen min-h-screen bg-gradient-to-r from-rose-100 to-teal-100">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="flex flex-col items-center text-center">
                <div className="flex items-center">
                    {!isAuth && (<h1 className="mr-3 text-5xl font-semibold">Sabanci University Course Assistant</h1>)}       
                </div>    

                {!isAuth && ( <p className="max-w-xl mt-1 text-lg text-slate-600">
                    Join millions of students, researchers and professionals to instantly
                    answer questions and understand research with AI
                </p>)}   

                <div className="w-full mt-4">
                    {!isAuth ?
                     (<Link href="/sign-in">
                        <Button>Log in to get started
                            <LogIn className="w-4 h-4 ml-2"/>
                        </Button>
                     </Link>
                     ) 
                     : (<div className="w-screen min-h-screen bg-gradient-to-r from-rose-100 to-teal-100">
                     <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                         <div className="flex flex-col items-center text-center">
                             <CombinedChat/>
                         </div>
                     </div>
                 </div>)}
                </div>
            
            </div>
        </div>
    </div>);
}
