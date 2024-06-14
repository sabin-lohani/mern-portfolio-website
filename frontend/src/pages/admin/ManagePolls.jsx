import CreatePollDialog from "@/components/poll/CreatePollDialog";
import PollCard from "@/components/poll/PollCard";
import { getPolls } from "@/redux/slices/pollSlice";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

export default function ManagePolls() {
  const dispatch = useDispatch();
  const pollState = useSelector((state) => state.poll);

  useEffect(() => {
    dispatch(getPolls());
  }, [dispatch]);

  return (
    <main className="p-5">
      <h2 className="text-xl font-bold mb-3">Manage Polls</h2>
      <CreatePollDialog />

      <div className="mt-5">
        {pollState.polls.length > 0 ? (
          <div className="grid grid-cols-12 gap-4">
            {pollState.polls.map((poll, idx) => (
              <div
                key={idx}
                className="col-span-12 md:col-span-6 lg:col-span-4"
              >
                <PollCard poll={poll} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500">No Polls Found</div>
        )}
      </div>
    </main>
  );
}
