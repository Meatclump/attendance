'use server'

import { SignInButton, UserButton, currentUser } from "@clerk/nextjs"
import Link from "next/link"
import { Nav } from "./nav/navbar"

export const Header = async () => {
	const user = await currentUser()

	return (
		<div className="flex w-full h-[60px] dark:bg-zinc-800 py-3">
			<Link href="/" className="px-4">
				<h1 className="text-3xl">
					Attendance
				</h1>
			</Link>
			{
				user &&
				<Nav />
			}
			{
				!user
					? (
						<SignInButton mode="modal">
							<button className="border border-slate-100 hover:bg-slate-100/10 text-center mx-4 rounded-lg ms-auto min-w-[80px]">Sign In</button>
						</SignInButton>
					) : (
						<div className="px-4">
							<UserButton afterSignOutUrl="/" />
						</div>
					)
			}
		</div>
	)
}
