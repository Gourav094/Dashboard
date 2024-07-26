import { auth } from "@/auth";
import db from "@/db/db";

export async function checkAdmin() {
    const session = await auth();
    if (session && session.user) {
        const loggedInUser = await db.user.findUnique({ where: { email: session.user.email as string } });
        if (loggedInUser?.isAdmin) {
            return true;
        }
    }
    return false;
}