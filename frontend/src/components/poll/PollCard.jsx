import { Dot } from "lucide-react";
import Moment from "react-moment";
import { Separator } from "../ui/separator";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useAuth } from "@/contexts/AuthContext";
import { useDebounce } from "@uidotdev/usehooks";
import { useEffect, useState } from "react";
import { toggleLikePoll, votePoll } from "@/redux/slices/pollSlice";
import { useDispatch } from "react-redux";
import PollDropdown from "./PollDropdown";
import { useSelector } from "react-redux";
import EngagementButtons from "../common/EngagementButtons";
import { toast } from "react-toastify";

export default function PollCard({ poll }) {
  const dispatch = useDispatch();
  const pollState = useSelector((state) => state.poll);
  const { user } = useAuth();

  const totalVotes = poll.options.reduce(
    (acc, option) => acc + option.votes.length,
    0
  );
  const existingVote = poll.options.find((option) =>
    option.votes.includes(user?._id)
  );
  const [selectedOption, setSelectedOption] = useState(existingVote?._id || "");
  const debouncedOption = useDebounce(selectedOption, 200);

  function handleVote(optionId) {
    if (!user) return toast.error("You need to login to vote");
    dispatch(votePoll({ id: poll._id, data: { optionId } }));
  }
  function handleLike() {
    dispatch(toggleLikePoll({ item_id: poll._id }));
  }

  useEffect(() => {
    if (debouncedOption && debouncedOption !== existingVote?._id) {
      handleVote(debouncedOption);
    }
  }, [debouncedOption]);

  return (
    <div
      className={
        "border rounded-sm h-full flex flex-col" +
        (pollState.isLoading ? " animate-pulse" : "")
      }
    >
      <div className="py-2 px-5 flex-1">
        {/* User info */}
        <div className="flex items-center justify-between py-2">
          <div className="flex items-center gap-3">
            <img
              src={poll.user.image}
              alt={poll.user.name}
              className="w-10 h-10 object-cover rounded-full"
            />
            <div>
              <p className="font-bold">{poll.user.name}</p>
              <p className="text-xs text-gray-500 flex items-center">
                <Moment fromNow>{poll.updatedAt}</Moment>
                <Dot size={10} />
                {new Date(poll.updatedAt).toDateString()}
              </p>
            </div>
          </div>
          {user?.isAdmin && <PollDropdown poll={poll} />}
        </div>

        <Separator className="my-3" />

        {/* Poll question */}
        <div>
          <div className="flex items-center gap-2">
            <p className="font-bold">{poll.question}</p>
          </div>

          <div className="my-3">
            {existingVote && (
              <p className="text-right text-xs text-gray-500 my-1">
                {totalVotes} vote{totalVotes > 1 && "s"}
              </p>
            )}
            <RadioGroup
              value={selectedOption}
              onValueChange={setSelectedOption}
            >
              {poll.options.map((option, idx) => (
                <div key={idx} className="flex items-center space-x-2">
                  <RadioGroupItem value={option._id} id={option._id} />
                  <Label className="border w-full p-3" htmlFor={option._id}>
                    {option.name}
                    {existingVote && (
                      <>
                        <span className="text-xs text-gray-500 ml-2">
                          {option.votes.length} vote
                          {option.votes.length > 1 && "s"}
                        </span>
                        <div className="h-2 bg-gray-200 rounded-sm mt-2">
                          {totalVotes > 0 && (
                            <div
                              className="h-2 bg-blue-700 rounded-sm"
                              style={{
                                width: `${
                                  (option.votes.length / totalVotes) * 100
                                }%`,
                              }}
                            />
                          )}
                        </div>
                      </>
                    )}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        </div>
      </div>
      <EngagementButtons
        item={poll}
        onLike={handleLike}
        commentsLink={"/polls/" + (user?.isAdmin ? poll._id : poll.slug)}
        shareData={{
          title: poll.question,
          text: `Poll by ${poll.user.name}`,
          url: `/polls/${poll.slug}`,
        }}
      />
    </div>
  );
}
