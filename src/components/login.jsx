import { UserButton, auth } from "@clerk/nextjs";
import { Button } from "./ui/button";
import Link from "next/link";
import { ArrowRight, LogIn } from "lucide-react";



export default async function Login(){
    const {userId} = await auth();
    const isAuth = !!userId;

    return (
    <div className="w-screen min-h-screen bg-gradient-to-r from-rose-100 to-teal-100">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="flex flex-col items-center text-center">
                <div className="flex items-center">
                    <h1 className="mr-3 text-5xl font-semibold">Sabanci University Course Assistant</h1>
                    <UserButton afterSignOutUrl="/" />
                </div>    

                <div className="flex mt-2">
                    {isAuth && <Button>Chat with AssintantSU</Button>}

                </div>
                <p className="max-w-xl mt-1 text-lg text-slate-600">
                    Join millions of students, researchers and professionals to instantly
                    answer questions and understand research with AI
                </p>

                <div className="w-full mt-4">
                    {!isAuth ?
                     (<Link href="/sign-in">
                        <Button>Log in to get started
                            <LogIn className="w-4 h-4 ml-2"/>
                        </Button>
                     </Link>
                     ) 
                     : (<p>LOGİN OLDUNDU KARDEŞİM</p>)}
                </div>
            
            </div>
        </div>
    </div>);
}

