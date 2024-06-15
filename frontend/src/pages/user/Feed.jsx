import PollCard from "@/components/poll/PollCard";
import PostCard from "@/components/post/PostCard";
import { getPolls } from "@/redux/slices/pollSlice";
import { getPosts } from "@/redux/slices/postSlice";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export default function Feed() {
  const dispatch = useDispatch();
  const postState = useSelector((state) => state.post);
  const pollState = useSelector((state) => state.poll);
  const feedItems = [...postState.posts, ...pollState.polls].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  useEffect(() => {
    dispatch(getPosts());
    dispatch(getPolls());
  }, [dispatch]);

  return (
    <main className="pt-20">
      <div className="flex"></div>

      <div className="flex justify-center">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Feed</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="mx-5 md:w-[50%] md:mx-auto">
        {feedItems.map((item) => (
          <div key={item._id} className="my-5">
            {item.options ? (
              <PollCard poll={item} />
            ) : (
              <PostCard key={item._id} post={item} />
            )}
          </div>
        ))}
      </div>
    </main>
  );
}
