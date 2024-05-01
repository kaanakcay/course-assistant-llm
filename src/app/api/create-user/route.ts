import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import "fs"
const fs = require('fs');

function checkRole(nameToCheck: string, fileName: string) {
    const namesInFile = fs.readFileSync(fileName, 'utf8').split('\n').map(name => name.trim());
    if (namesInFile.includes(nameToCheck.trim())) {
        return "instructor";
    } else {
        return "student";
    }
}

// /api/create-user
export async function POST(req: Request, res: Response) {
    /*
    const {userId} = await auth();
    if (!userId) {
        return NextResponse.json({ error: "unauthorized" }, { status: 401 });
    } 
    */
       
    try{
        const body = await req.json();
        console.log(req.json());
        const {name, email} = body;
        console.log(name, email);
        const role = checkRole(name, "src/app/name.txt");
        const user_id = await db.insert(users).values({"name": name, "email": email, "role": role})
        .returning({insertedId: users.id});

        return NextResponse.json({"user_id": user_id[0].insertedId}, {status: 200});
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: "internal server error" },
            { status: 500}
            );
    }
}