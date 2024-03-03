import type { Metadata } from 'next';

import NavBar from "@/components/NavBar/NavBar";
import CardSection from "@/components/CardSection/CardSection";

export const metadata: Metadata = {
  title: 'My List',
  description: 'My favorite videos',
}

const MyList = () => {
  return (
    <div>
      <NavBar />
      <div>
        <CardSection title="My List" size="small" videos={[]} />
      </div>
    </div>
  );
}

export default MyList;
