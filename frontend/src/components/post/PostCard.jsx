import { Share2 } from "lucide-react";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import PostDropdown from "../common/PostDropdown";
import { useSelector } from "react-redux";

export default function PostCard({ post }) {
  const { user } = useAuth();
  const postState = useSelector((state) => state.post);

  function handleShare() {
    if (navigator.share) {
      navigator
        .share({
          title: post.title,
          text: post.subtitle ? post.subtitle : "Check out this post!",
          url: window.location.origin + "/posts/" + post.slug,
        })
        .catch(console.error);
    }
  }

  return (
    <div
      className={
        "rounded-sm overflow-hidden border-2 h-full flex flex-col" +
        (postState.isLoading ? " animate-pulse" : "")
      }
    >
      <img
        src={post.images?.[0]?.url}
        alt={post.title}
        className="w-full h-40 object-cover"
      />
      <div className="p-3 flex-grow">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold">{post.title}</h3>
          <PostDropdown post={post} />
        </div>
        <p className="text-sm text-gray-500">{post.subtitle}</p>
      </div>
      {/* bottom */}

      <div className="p-3">
        <div className="mb-3 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <img
              src={post.user.image}
              alt={post.user.name}
              className="h-7 w-7 object-cover rounded-full"
            />
            <span className="text-sm">{post.user.name}</span>
          </div>
          <div>
            <span className="text-sm text-gray-500">
              {post.updatedAt && new Date(post.updatedAt).toDateString()}
            </span>
          </div>
        </div>
        <Separator />
        <div className="mt-3 flex justify-between items-center">
          <Button
            variant="link"
            className="p-0 hover:text-gray-500"
            onClick={handleShare}
          >
            <Share2 size={20} />
          </Button>
          <Button variant="outline" asChild>
            <Link to={"/posts/" + (user?.isAdmin ? post._id : post.slug)}>
              Read full post
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
