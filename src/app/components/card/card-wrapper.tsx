interface CardWrapperProps {
	children: React.ReactNode
}

export const CardWrapper = ({
	children
}: CardWrapperProps) => {
	return (
		<div className="flex overflow-y-scroll">
			<div className="rounded-xl bg-slate-100/10 border border-slate-100/20 flex flex-col mx-auto">
				{children}
			</div>
		</div>
	)
}