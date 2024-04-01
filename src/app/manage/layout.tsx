'use client'

import { useSearchParams } from "next/navigation"

interface RosterLayoutProps {
	children: React.ReactNode
}

const RosterLayout = ({
	children
}: RosterLayoutProps ) => {
	return (
		<div className="flex flex-1 gap-4 p-4">
			{children}
		</div>
	)
}

export default RosterLayout