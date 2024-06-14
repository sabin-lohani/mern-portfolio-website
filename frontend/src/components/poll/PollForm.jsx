import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import pollSchema from "../../../../schemas/poll.schemas.js";
import { useEffect } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
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
import { Input } from "@/components/ui/input.jsx";
import { Loader2, X } from "lucide-react";
import { Button } from "../ui/button.jsx";
import { FaPlus } from "react-icons/fa";
import { getSinglePoll } from "@/redux/slices/pollSlice.js";

export default function PollForm({ pollId, onSubmit }) {
  const dispatch = useDispatch();
  const pollState = useSelector((state) => state.poll);
  const form = useForm({
    defaultValues: {
      question: "",
      options: [{ name: "" }, { name: "" }],
    },
    resolver: zodResolver(pollSchema),
  });
  const {
    fields: options,
    append,
    remove,
  } = useFieldArray({
    control: form.control,
    name: "options",
  });

  useEffect(() => {
    if (pollId) {
      dispatch(getSinglePoll(pollId));
    }
  }, [pollId]);
  useEffect(() => {
    if (pollId && pollState.singlePoll) {
      form.setValue("question", pollState.singlePoll.question);
      form.setValue("options", pollState.singlePoll.options);
    }
  }, [pollState.singlePoll]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="mb-5">
          <FormField
            control={form.control}
            name="question"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel htmlFor="question">Question</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      id="question"
                      placeholder="Enter Question"
                    />
                  </FormControl>
                  <FormMessage errors={form.formState.errors} name="question" />
                </FormItem>
              );
            }}
          />
          <div className="border p-2">
            {options.map((option, index) => (
              <FormField
                key={option.id}
                control={form.control}
                name={`options.${index}.name`}
                render={({ field }) => (
                  <FormItem>
                    <div className="mb-3">
                      <FormControl>
                        <div className="flex items-center gap-2">
                          <Input
                            {...field}
                            id={`option-${index}`}
                            placeholder={`Option ${index + 1}`}
                          />{" "}
                          <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            onClick={() => remove(index)}
                            disabled={options.length === 2}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </FormControl>
                      <FormMessage
                        errors={form.formState.errors}
                        name={`options.${index}.name`}
                      />
                    </div>
                  </FormItem>
                )}
              />
            ))}
            <div>
              <Button
                type="button"
                variant="outline"
                onClick={() => append({ name: "" })}
                className="w-full"
              >
                <FaPlus className="me-1" />
                Add Option
              </Button>
            </div>
          </div>

          <Button
            className="bg-blue-700 hover:bg-blue-800 mt-5 w-full"
            type="submit"
            disabled={pollState.isLoading}
          >
            {pollState.isLoading ? (
              <Loader2 className="animate-spin" />
            ) : (
              "Submit"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
