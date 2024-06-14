import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import PostForm from "./PostForm";
import { useDispatch } from "react-redux";
import { createPost } from "@/redux/slices/postSlice";
import { useSelector } from "react-redux";

export default function CreatePostDialog() {
  const dispatch = useDispatch();
  const postState = useSelector((state) => state.post);
  const [open, setOpen] = useState(false);

  function onSubmit(formData) {
    dispatch(createPost(formData));
  }

  useEffect(() => {
    setOpen(false);
  }, [postState.posts]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* Trigger */}
      <DialogTrigger asChild>
        <Button className="bg-blue-700 hover:bg-blue-800">
          <FaPlus className="mr-1" />
          Create Post
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Post</DialogTitle>
        </DialogHeader>
        <PostForm onSubmit={onSubmit} />
      </DialogContent>
    </Dialog>
  );
}
