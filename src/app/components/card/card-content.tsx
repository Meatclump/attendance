interface CardContentProps {
	children: React.ReactNode
}

export const CardContent = ({
	children
}: CardContentProps) => {
	return (
		<div className="flex-1 border-t border-t-slate-100/20 pt-4 overflow-y-scroll">
			{children}
		</div>
	)
}