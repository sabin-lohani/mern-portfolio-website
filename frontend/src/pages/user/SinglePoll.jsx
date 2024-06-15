import CommentSection from "@/components/common/CommentSection";
import PollCard from "@/components/poll/PollCard";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { commentOnPoll, getSinglePoll } from "@/redux/slices/pollSlice";
import { ArrowLeft, Loader2 } from "lucide-react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

export default function SinglePoll() {
  const { id } = useParams();
  const { user } = useAuth();
  const dispatch = useDispatch();
  const pollState = useSelector((state) => state.poll);

  useEffect(() => {
    if (id) {
      dispatch(getSinglePoll(id));
    }
  }, [id, dispatch]);

  if (!pollState.singlePoll)
    return <div className="text-center pt-20">Poll not found</div>;

  return (
    <main className="p-10 pt-20">
      <div className="md:max-w-[60%] mx-auto">
        <div className="flex my-3">
          <Button
            variant="outline"
            size="icon"
            onClick={() => window.history.back()}
          >
            <ArrowLeft size={20} />
          </Button>
        </div>
        <PollCard poll={pollState.singlePoll} />
        <CommentSection itemId={pollState.singlePoll._id} itemType="poll" />
      </div>
    </main>
  );
}
