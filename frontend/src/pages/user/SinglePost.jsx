import CommentSection from "@/components/common/CommentSection";
import EngagementButtons from "@/components/common/EngagementButtons";
import PostCard from "@/components/post/PostCard";
import { Button } from "@/components/ui/button";
import { getPost, toggleLikePost } from "@/redux/slices/postSlice";
import { ArrowLeft } from "lucide-react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export default function SinglePost() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const postState = useSelector((state) => state.post);

  function handleLike() {
    dispatch(toggleLikePost({ item_id: postState.singlePost._id }));
  }

  useEffect(() => {
    if (id) {
      dispatch(getPost(id));
    }
  }, [id, dispatch]);

  if (!postState.singlePost)
    return <div className="text-center pt-20">Post not found</div>;

  return (
    <main className="pt-20">
      <div className="md:max-w-[60%] mx-auto">
        <div className="flex">
          <Button
            variant="outline"
            size="icon"
            onClick={() => window.history.back()}
          >
            <ArrowLeft size={20} />
          </Button>
        </div>
        <div className="flex justify-center py-5">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/feed">Feed</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{postState.singlePost.title}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <PostCard post={postState.singlePost} isSingle={true} />
        <div className="p-3 md:px-0">
          <p className="py-3">{postState.singlePost.content}</p>

          <div className="grid grid-cols-2 gap-2">
            {postState.singlePost.images?.map((image, idx) => (
              <a
                key={idx}
                href={image.url}
                target="_blank"
                className="col-span-2 md:col-span-1"
              >
                <img
                  src={image.url}
                  alt={postState.singlePost.title}
                  className="w-full h-full object-cover"
                />
              </a>
            ))}
          </div>
        </div>
        <EngagementButtons
          item={postState.singlePost}
          onLike={handleLike}
          shareData={{
            title: postState.singlePost.title,
            text: `Post by ${postState.singlePost.user.name}`,
            url: `/posts/${postState.singlePost.slug}`,
          }}
        />
        <div className="p-3 md-p-0">
          <CommentSection itemId={postState.singlePost._id} itemType="post" />
        </div>
      </div>
    </main>
  );
}
