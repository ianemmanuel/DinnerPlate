import { redirect } from "next/navigation";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export async function requireUser() {
    
    const { getUser } = getKindeServerSession()
    const user =  getUser()

    if(!user) {
        return redirect("/api/auth/register")
    }

    return user
}
