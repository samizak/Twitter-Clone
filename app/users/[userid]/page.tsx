"use client";

import { ClipLoader } from "react-spinners";
import useUser from "@/hooks/useUser";

// import PostFeed from "@/components/posts/PostFeed";
import Header from "@/app/components/Header";
import UserHero from "@/app/components/Users/UserHero";
import UserBio from "@/app/components/Users/UserBio";

const UserView = ({ params }: any) => {
  const { userid: userId } = params;
  const { data: fetchedUser, isLoading } = useUser(userId as string);

  if (isLoading || !fetchedUser) {
    return (
      <div className="flex items-center justify-center h-full">
        <ClipLoader color="lightblue" size={80} />
      </div>
    );
  }

  return (
    <>
      <Header showBackArrow label={fetchedUser?.name} tweetCount={fetchedUser?.postCount || 0} />
      <UserHero userId={userId as string} />
      <UserBio userId={userId as string} />
      {/* <PostFeed userId={userId as string} /> */}
    </>
  );
};

export default UserView;
