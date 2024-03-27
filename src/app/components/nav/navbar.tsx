import { NavLink } from "./nav-link"
import { currentUser } from "@clerk/nextjs"
import { FaCalendar } from "react-icons/fa"
import { FaPeopleGroup } from "react-icons/fa6"

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
				</>
			}
		</nav>
	)
}