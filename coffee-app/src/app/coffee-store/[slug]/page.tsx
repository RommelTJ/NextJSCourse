import Link from "next/link";

interface Props { params: {slug: string} }

const CoffeeStore = (props: Props) => {
  const {slug} = props.params;
  return (
    <div>
      <h1>Coffee Store Page {slug}</h1>
      <Link href="/">Back to Home</Link>
    </div>
  )
};

export default CoffeeStore;
