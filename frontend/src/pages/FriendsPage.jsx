import Friends from "../components/Friends";

const FriendsPage = () => {
  return (
    <div className="container mx-auto space-y-10 p-4 sm:p-6 lg:p-8">
      <Friends pageType="friends"/>
    </div>
  );
};

export default FriendsPage;
