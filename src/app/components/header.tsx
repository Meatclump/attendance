'use server'

import { SignInButton, UserButton, currentUser } from "@clerk/nextjs"
import Link from "next/link"
import { Nav } from "./nav/navbar"
import Image from "next/image"

export const Header = async () => {
	const user = await currentUser()

	return (
		<div className="flex w-full h-[60px] dark:bg-zinc-800 py-3 px-4 gap-4">
			<Link href="/" className="flex gap-4">
				<Image
					src={"/linkpearl.png"} 
					width={36}
					height={36}
					alt="linkpearl"
				/>
				<h1 className="">
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
							<button className="border border-slate-100 hover:bg-slate-100/10 text-center rounded-lg ms-auto min-w-[80px]">Sign In</button>
						</SignInButton>
					) : (
						<UserButton afterSignOutUrl="/" />
					)
			}
		</div>
	)
}
