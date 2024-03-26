'use server'

import { SignInButton, UserButton, currentUser } from "@clerk/nextjs"
import Link from "next/link"

export const Header = async () => {
	const user = await currentUser()
	//console.log("user:", user)

	return (
		<div className="flex items-center justify-end w-full h-[60px] dark:bg-zinc-800 p-3">
			<div className="flex-1">
				<h1 className="text-3xl">
					<Link href="/">
						Attendance
					</Link>
				</h1>
			</div>
			{
				!user
					? (
						<SignInButton mode="modal">
							<button className="border border-slate-100 px-4 py-2 rounded-lg">Sign In</button>
						</SignInButton>
					) : (
						<UserButton afterSignOutUrl="/" />
					)
			}
		</div>
	)
}
