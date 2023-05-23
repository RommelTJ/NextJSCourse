interface Props { params: {slug: string} }

const CoffeeStore = (props: Props) => {
  const {slug} = props.params;
  return (
    <div>Coffee Store Page {slug}</div>
  )
};

export default CoffeeStore;
