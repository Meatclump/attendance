'use client'

import { useSearchParams } from "next/navigation"

interface RosterLayoutProps {
	children: React.ReactNode
}

const RosterLayout = ({
	children
}: RosterLayoutProps ) => {
	return (
		<div className="flex flex-1 p-4 gap-4 overflow-y-scroll">
			<div className="rounded-xl bg-slate-100/10 border border-slate-100/20 flex flex-col">
				{children}
			</div>
		</div>
	)
}

export default RosterLayout