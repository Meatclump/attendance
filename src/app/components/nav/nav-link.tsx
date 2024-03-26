import Link from "next/link"

interface NavLinkProps {
	children: React.ReactNode
	path: string
}

export const NavLink = ({
	children,
	path
}: NavLinkProps ) => {
	return (
		<Link
			href={path}
			className="border hover:bg-slate-100/10 rounded-lg px-2 py-1 flex items-center gap-2"
		>
			{children}
		</Link>
	)
}