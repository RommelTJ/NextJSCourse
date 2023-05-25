import Link from "next/link";

interface Props { params: {slug: string} }

const CoffeeStore = (props: Props) => {
  const {slug} = props.params;
  return (
    <div>
      <h1>Coffee Store Page {slug}</h1>
      <div><Link href="/">Back to Home</Link></div>
      <div><Link href={`/coffee-store/2324tsg`}>Go to dynamic</Link></div>
    </div>
  )
};

export default CoffeeStore;
