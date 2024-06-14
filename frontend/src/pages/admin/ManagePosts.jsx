import CreatePostDialog from "@/components/admin/post/CreatePostDialog";
import PostCard from "@/components/post/PostCard";
import { getPosts } from "@/redux/slices/postSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

export default function ManagePosts() {
  const dispatch = useDispatch();
  const postState = useSelector((state) => state.post);

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  return (
    <main className="p-5">
      <h2 className="text-xl font-bold mb-3">Manage Posts</h2>
      <CreatePostDialog />

      <div className="mt-5">
        {postState.posts.length > 0 ? (
          <div className="grid grid-cols-8 gap-4">
            {postState.posts.map((post) => (
              <div
                key={post._id}
                className="col-span-8 md:col-span-4 lg:col-span-2"
              >
                <PostCard post={post} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500">No Posts Found</div>
        )}
      </div>
    </main>
  );
}
