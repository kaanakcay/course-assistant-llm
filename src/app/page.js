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
import toast from "react-hot-toast";
import { eq } from 'drizzle-orm';
import { users } from "@/lib/db/schema";
import { db } from "@/lib/db";

async function registerUser(name, email) {
    try {
        const response = await axios.post('http://localhost:3000/api/create-user', { name, email });
        return { status: response.status, message: "User registered successfully" };
    } catch (error) {
        console.error("Error caught:", error.response);
        return { status: 500, message: "Error registering user" };
    }
}

var role;

export default async function Home() {
    const {userId} = await auth();
    var isAuth = !!userId;
    var isSabanciMember = false;
    if(isAuth){
        const response = await clerkClient.users.getUser(userId);
        var fullName = null;
        var email = null;
        if(response.lastName.at(-1) == ')'){
            fullName = (response.firstName + " " + response.lastName.substring(0, response.lastName.indexOf('(')));
            fullName = fullName.substring(0, fullName.length-1);
        }
        else{
            fullName = response.firstName + response.lastName;
        }
    
        //console.log(fullName);
        //console.log(fullName.length);
    
        email = response.emailAddresses[0].emailAddress;
        role = await db.select().from(users).where(eq(users.email, email));
        //console.log("ALLAJHIASEGNHMK: " + role[0].role);
        if(email.substring(email.indexOf('@'), email.lastIndexOf('.')).includes('sabanciuniv')){
            isSabanciMember = true;
         
            registerUser(fullName, email)
            .then(response => {
                console.log(response.status, response.message);
            })
            .catch(error => {
                console.error(error.status, error.message);
            });
        }else{
            //isAuth = false;
            console.log("AAAAYou must log in with a Sabancı University mail address!");
            //fullName = null;
            //email = null;
        }
    }

    return (
    <div className="w-screen min-h-screen bg-gradient-to-r from-rose-100 to-teal-100">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="flex flex-col items-center text-center">
                <div className="flex items-center">
                    {(!isAuth || !isSabanciMember) && (<h1 className="mr-3 text-5xl font-semibold">Sabanci University Course Assistant</h1>)}       
                    <UserButton afterSignOutUrl="/"/> 
                </div>    

                {(!isAuth || !isSabanciMember) && (<p className="max-w-xl mt-1 text-lg text-slate-600">
                    Join millions of students, researchers and professionals to instantly
                    answer questions and understand research with AI
                </p>)}   

                <div className="w-full mt-4"> 
                    {(!isAuth || !isSabanciMember) ?
                     (<Link href="/sign-in">
                        <Button>Log in to get started
                            <LogIn className="w-4 h-4 ml-2"/>
                        </Button>
                     </Link>
                     ) 
                     : (<div className="w-screen min-h-screen bg-gradient-to-r from-rose-100 to-teal-100">
                     <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                         <div className="flex flex-col items-center text-center">
                             <CombinedChat role={ role[0].role }/>
                         </div>
                     </div>
                 </div>)}
                </div>
                     
            </div>
        </div>
    </div>);
}
