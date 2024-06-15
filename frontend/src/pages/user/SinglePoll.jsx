import CommentSection from "@/components/common/CommentSection";
import PollCard from "@/components/poll/PollCard";
import { Button } from "@/components/ui/button";
import { getSinglePoll } from "@/redux/slices/pollSlice";
import { ArrowLeft } from "lucide-react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export default function SinglePoll() {
  const { id } = useParams();
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
        <div className="flex">
          <Button
            variant="outline"
            size="icon"
            onClick={() => window.history.back()}
          >
            <ArrowLeft size={20} />
          </Button>
        </div>
        <div className="flex justify-center py-5">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/feed">Feed</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{pollState.singlePoll.question}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <PollCard poll={pollState.singlePoll} />
        <CommentSection itemId={pollState.singlePoll._id} itemType="poll" />
      </div>
    </main>
  );
}
