
export default function Recent() {
	const data = getRecent()

	return (
		<div className="m-4 flex flex-row gap-2">
			{
				data.map((recent)=> {
					return <RecentCard card={recent} key={recent.title} />
				})
			}
		</div>
	)
}

function getRecent(): Recent[] {
	return [
		{
			excerpt: `This didn't seem like the best idea at the time`,
			title: `Misadventures`
		}, 
		{
			excerpt: `Maybe one of these days I should learn...`,
			title: `Participation`
		}, 
		{
			excerpt: "I'm so lucky to have her",
			title: "Chloe"
		}, 
		{
			title: "Tension",
			excerpt: "If I just keep pulling back this rubber band"
		}
	]
}

interface Recent {
	title: string;
	excerpt: string;
}

function RecentCard(props: {card: Recent}) {
	const {
		excerpt,
		title
	} = props.card;
	return (
		<div className='flex-auto basis-0 p-1 bg-white rounded border-violet-500 border border-solid'>
			<h3 className="text-sm">{title}</h3>
			<p className="text-sm">{excerpt}</p>
		</div>
	)
}