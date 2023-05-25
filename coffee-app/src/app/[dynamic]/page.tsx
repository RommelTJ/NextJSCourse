interface Props { params: {dynamic: string} }

const DynamicPage = (props: Props) => {
  const {dynamic} = props.params;
  return <div><h1>Page {dynamic}</h1></div>;
};

export default DynamicPage;
