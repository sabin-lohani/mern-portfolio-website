import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { MoreVertical } from "lucide-react";
import PostForm from "../admin/post/PostForm";
import { useDispatch } from "react-redux";
import { deletePost, updatePost } from "@/redux/slices/postSlice";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function PostDropdown({ post }) {
  const dispatch = useDispatch();
  const postState = useSelector((state) => state.post);
  const [showEditDialog, setShowEditDialog] = useState(false);

  function handleDelete() {
    dispatch(deletePost(post._id));
  }
  function handleUpdate(formData) {
    dispatch(updatePost({ id: post._id, formData }));
  }

  useEffect(() => {
    setShowEditDialog(false);
  }, [postState.posts]);

  return (
    <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
      <AlertDialog>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <MoreVertical size={15} />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <AlertDialogTrigger asChild>
              <DropdownMenuItem className="cursor-pointer">
                Delete
              </DropdownMenuItem>
            </AlertDialogTrigger>

            <DialogTrigger asChild>
              <DropdownMenuItem className="cursor-pointer">
                Edit
              </DropdownMenuItem>
            </DialogTrigger>
          </DropdownMenuContent>
        </DropdownMenu>

        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure want to delete?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              item from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-600 hover:bg-red-700"
              onClick={handleDelete}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit post</DialogTitle>
          <PostForm postId={post._id} onSubmit={handleUpdate} />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
