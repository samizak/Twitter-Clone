"use client";

import { useParams } from "next/navigation";
import { ClipLoader } from "react-spinners";
import usePost from "@/hooks/usePost";
import Header from "@/app/components/Header";
import Form from "@/app/components/Form";
import PostItem from "@/app/components/Posts/PostItem";
import CommentFeed from "@/app/components/Posts/CommentFeed";

const PostView = (request: Request) => {
  const { postid } = useParams();
  const { data: fetchedPost, isLoading } = usePost(postid as string);

  if (isLoading || !fetchedPost) {
    return (
      <div className="flex items-center justify-center h-full">
        <ClipLoader color="lightblue" size={80} />
      </div>
    );
  }

  return (
    <>
      <Header showBackArrow label="Tweet" />
      <PostItem data={fetchedPost} />
      <Form postId={postid as string} isComment placeholder="Tweet your reply!" />
      <CommentFeed comments={fetchedPost?.comments} />
    </>
  );
};

export default PostView;
