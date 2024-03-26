import { getRoster } from "../actions"

const DashboardPage = async () => {
	const roster = await getRoster()
	console.log(roster)
	return (
		<div className="flex flex-1 items-center justify-center">
			Dashboard Page
		</div>
	)
}

export default DashboardPage