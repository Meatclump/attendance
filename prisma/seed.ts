import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()

// TODO - Create "style" attributes "#fff" out of all the colors
async function main() {
	const eventColors = [
		"gray",
		"red",
		"orange",
		"amber",
		"yellow",
		"lime",
		"green",
		"emerald",
		"teal",
		"cyan",
		"sky",
		"blue",
		"indigo",
		"violet",
		"purple",
		"fuchsia",
		"pink",
	]

	const createEventColors = await prisma.eventColor.createMany({
		data: eventColors.map(color => ({
			name: color,
			textCSS: `text-${color}-400`,
			bgCSS: `bg-${color}-400`
		})),
		skipDuplicates: true,
	})

	console.log("Create Event Colors:",createEventColors)

	const createBaseCharacters = await prisma.character.createMany({
		data: [
			{
				name: "Bob",
			},
			{
				name: "Tim",
			}
		],
		skipDuplicates: true,
	})

	console.log("Create Base Characters", createBaseCharacters)

	const limbusColor = await prisma.eventColor.findUnique({
		where: {name: "cyan"}
	})

	const dynamisColor = await prisma.eventColor.findUnique({
		where: {name: "indigo"}
	})
	
	if (limbusColor && dynamisColor) {
		const createBaseEvents = await prisma.eventType.createMany({
			data: [
				{
					name: "Limbus",
					eventColorId: limbusColor.id
				},
				{
					name: "Dynamis",
					eventColorId: dynamisColor?.id
				}
			]
		})
		console.log("Create Base Events:",createBaseEvents)
	} else {
		console.log("Limbus or Dynamis colors undefined!")
	}
}

main()
	.then(async () => {
		await prisma.$disconnect()
	})
	.catch(async (e) => {
		console.error(e)
		await prisma.$disconnect()
		process.exit(1)
	})