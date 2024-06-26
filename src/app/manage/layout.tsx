'use client'

interface RosterLayoutProps {
	children: React.ReactNode
}

const RosterLayout = ({
	children
}: RosterLayoutProps ) => {
	return (
		<div className="flex flex-1 gap-4 p-4 overflow-y-scroll">
			{children}
		</div>
	)
}

export default RosterLayout