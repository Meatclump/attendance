import { NavLink } from "./nav-link"
import { currentUser } from "@clerk/nextjs"
import { FaCalendar } from "react-icons/fa"
import { FaPeopleGroup } from "react-icons/fa6"
import { createCharacter } from "@/app/actions"
import { revalidatePath } from "next/cache"

export const Nav = async () => {
	const user = await currentUser()

	return (
		<nav className="flex flex-1 gap-4 items-center mx-4">
			{
				user?.publicMetadata?.role === "admin" &&
				<>
					<NavLink path="/roster">
						<FaPeopleGroup /> Roster
					</NavLink>
					<NavLink path="/events" >
						<FaCalendar /> Events
					</NavLink>
					<form
						action={async (formData: FormData) => {
							"use server"
							const name = formData.get("name") as string | null
							if (name) {
								const result = await createCharacter(name)
								revalidatePath("/dashboard")
							}
						}}
						className="flex gap-4"
					>
						<input
							className="border rounded-lg py-1 px-2 dark:text-zinc-900"
							name="name"
							placeholder="Character Name"
						/>
						<button>Add User</button>
					</form>
				</>
			}
		</nav>
	)
}