import PollCard from "@/components/poll/PollCard";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { getSinglePoll } from "@/redux/slices/pollSlice";
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
    dispatch(getSinglePoll(id));
  }, [id]);

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
        {pollState.isLoading ? (
          <div className="flex justify-center">
            <Loader2 className="animate-spin" />
          </div>
        ) : (
          pollState.singlePoll && <PollCard poll={pollState.singlePoll} />
        )}
      </div>
    </main>
  );
}
