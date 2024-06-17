import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useEffect, useState } from "react";
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVertical } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useSelector } from "react-redux";

export default function CommentActions({
  comment,
  handleCommentDelete,
  handleCommentUpdate,
}) {
  const { user } = useAuth();
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [editCommentText, setEditCommentText] = useState(comment.text);
  const commentState = useSelector((state) => state.comment);

  useEffect(() => {
    setShowEditDialog(false);
  }, [commentState.comments]);
  return (
    <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
      <AlertDialog>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <MoreVertical size={15} />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {(user?.isAdmin || user._id == comment.user._id) && (
              <>
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
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>

        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure want to delete?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              comment from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-600 hover:bg-red-700"
              onClick={handleCommentDelete}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit comment</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Input
            id="name"
            value={editCommentText}
            onChange={(e) => setEditCommentText(e.target.value)}
            className="col-span-3"
          />
        </div>
        <DialogFooter>
          <Button
            type="submit"
            className="bg-blue-700 hover:bg-blue-800"
            onClick={() => handleCommentUpdate(editCommentText)}
          >
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
