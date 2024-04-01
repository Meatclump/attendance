interface CardHeaderProps {
	children: React.ReactNode
}

export const CardHeader = ({
	children
}: CardHeaderProps) => {
	return (
		<div className="flex items-center gap-4 p-4">
			{children}
		</div>
	)
}