import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { createPoll } from "@/redux/slices/pollSlice";
import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import PollForm from "./PollForm";

export default function CreatePollDialog() {
  const dispatch = useDispatch();
  const postState = useSelector((state) => state.poll);
  const [open, setOpen] = useState(false);

  function onSubmit(formData) {
    dispatch(createPoll(formData));
  }

  useEffect(() => {
    setOpen(false);
  }, [postState.polls]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* Trigger */}
      <DialogTrigger asChild>
        <Button className="bg-blue-700 hover:bg-blue-800">
          <FaPlus className="mr-1" />
          Create Poll
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Poll</DialogTitle>
        </DialogHeader>
        <PollForm onSubmit={onSubmit} />
      </DialogContent>
    </Dialog>
  );
}
