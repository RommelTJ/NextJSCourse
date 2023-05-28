import Image from "next/image";
import Link from "next/link";

interface Props {
  name: string;
  imageUrl: string;
  href: string;
}

const Card = (props: Props) => {
  const { name, imageUrl, href } = props;

  return (
    <Link href={href}>
      <h2>{name}</h2>
      <Image src={imageUrl} alt="Image" width={260} height={160} />
    </Link>
  );
};

export default Card;
