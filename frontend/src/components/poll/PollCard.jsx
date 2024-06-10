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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { HiOutlinePencilAlt, HiOutlineTrash } from "react-icons/hi";
import { useEffect, useState } from "react";
import { useDebounce } from "@uidotdev/usehooks";
import { useDispatch } from "react-redux";
import { votePoll } from "@/features/poll/poll.slice";

export default function PollCard({ poll, onEdit, onDelete }) {
  const dispatch = useDispatch();
  const [selectedOption, setSelectedOption] = useState(null);
  const debouncedOption = useDebounce(selectedOption, 300);
  const totalVotes = poll.options.reduce(
    (acc, option) => acc + option.votes.length,
    0
  );

  function handleVote(optionId) {
    dispatch(votePoll({ id: poll._id, data: { optionId } }));
  }

  useEffect(() => {
    if (debouncedOption) {
      handleVote(debouncedOption);
    }
  }, [debouncedOption]);
  return (
    <Card className="mb-4">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl font-semibold">
            {poll.question}
          </CardTitle>
          <div>
            <Button
              variant="outline"
              className="mr-2"
              onClick={() => onEdit(poll)}
            >
              <HiOutlinePencilAlt className="mr-1" />
              Edit
            </Button>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive">Delete</Button>
              </AlertDialogTrigger>

              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    Are you sure want to delete?
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    the poll from our servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    className="bg-red-600 hover:bg-red-700"
                    onClick={() => onDelete(poll)}
                  >
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <ul>
          {poll.options.map((option) => {
            const votePercentage = totalVotes
              ? (option.votes.length / totalVotes) * 100
              : 0;
            return (
              <li key={option._id} className="my-4 p-2 border">
                <div className="flex items-center mb-1">
                  <input
                    type="radio"
                    id={option._id}
                    name={poll._id}
                    value={option._id}
                    checked={selectedOption === option._id}
                    onChange={(e) => setSelectedOption(e.target.value)}
                    className="mr-2"
                  />
                  <label htmlFor={option._id} className="w-full">
                    <div className="flex justify-between w-full">
                      <span>{option.name}</span>
                      <span>{option.votes.length} votes</span>
                    </div>
                    <div className="relative w-full h-2 bg-gray-200 rounded">
                      <div
                        className="absolute top-0 left-0 h-full bg-blue-600 rounded"
                        style={{ width: `${votePercentage}%` }}
                      ></div>
                    </div>
                  </label>
                </div>
              </li>
            );
          })}
        </ul>
      </CardContent>
    </Card>
  );
}
