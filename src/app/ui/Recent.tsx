export default function Recent() {
  const data = getRecent();

  return (
    <div className="m-4 flex flex-row gap-2">
      {data.map((recent) => {
        return <RecentCard card={recent} key={recent.title} />;
      })}
    </div>
  );
}

interface Recent {
  title: string;
  excerpt: string;
}

function RecentCard(props: { card: Recent }) {
  const { excerpt, title } = props.card;
  return (
    <div className="flex-auto basis-0 p-1 bg-white rounded border-violet-500 border border-solid">
      <h3 className="text-sm">{title}</h3>
      <p className="text-sm">{excerpt}</p>
    </div>
  );
}
