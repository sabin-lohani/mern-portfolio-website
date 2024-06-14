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
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import PollForm from "./PollForm";
import { MoreVertical } from "lucide-react";
import { deletePoll, updatePoll } from "@/redux/slices/pollSlice";

export default function PollDropdown({ poll }) {
  const dispatch = useDispatch();
  const pollState = useSelector((state) => state.poll);
  const [showEditDialog, setShowEditDialog] = useState(false);

  function handleDelete() {
    dispatch(deletePoll(poll._id));
  }
  function handleUpdate(formData) {
    dispatch(updatePoll({ id: poll._id, formData }));
  }

  useEffect(() => {
    setShowEditDialog(false);
  }, [pollState.polls]);

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
          </AlertDialogHeader>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the item
            from our servers.
          </AlertDialogDescription>
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
          <DialogTitle>Edit poll</DialogTitle>
          <PollForm pollId={poll._id} onSubmit={handleUpdate} />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
