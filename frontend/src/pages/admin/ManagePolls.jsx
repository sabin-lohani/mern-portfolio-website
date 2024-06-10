import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { HiOutlineXMark } from "react-icons/hi2";
import Modal from "react-modal";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import pollSchema from "../../../../schemas/poll.schemas.js";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Loader2, X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
  createPoll,
  deletePoll,
  getPolls,
  updatePoll,
} from "@/features/poll/poll.slice.js";
import PollCard from "@/components/poll/PollCard.jsx";

export default function ManagePolls() {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const dispatch = useDispatch();
  const pollState = useSelector((state) => state.poll);
  const [editingPoll, setEditingPoll] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  const form = useForm({
    defaultValues: editingPoll || {
      question: "",
      options: [{ name: "" }, { name: "" }],
    },
    resolver: zodResolver(pollSchema),
  });
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = form;
  const {
    fields: options,
    append,
    remove,
  } = useFieldArray({
    control,
    name: "options",
  });

  function onSubmit(data) {
    if (editingPoll) {
      dispatch(updatePoll({ id: editingPoll._id, data }));
    } else {
      dispatch(createPoll(data));
    }
    setEditingPoll(null);
    form.reset();
    if (!pollState.isLoading) {
      setShowCreateModal(false);
      setShowEditModal(false);
    }
  }
  function onEdit(poll) {
    setEditingPoll(poll);
    setShowEditModal(true);
  }
  function onDelete(poll) {
    dispatch(deletePoll(poll._id));
  }

  useEffect(() => {
    dispatch(getPolls());
  }, [dispatch]);

  useEffect(() => {
    if (editingPoll) {
      form.reset(editingPoll);
    }
  }, [editingPoll, form]);

  return (
    <main className="p-5">
      <h2 className="text-xl font-bold">Manage Polls</h2>
      <div className="mt-5">
        <Button
          onClick={() => setShowCreateModal(true)}
          className="bg-blue-700 hover:bg-blue-800"
        >
          Create Poll
        </Button>
      </div>

      {/* Polls */}
      <div className="mt-5">
        {pollState.polls.length > 0 ? (
          <div className="lg:grid grid-cols-4 gap-4">
            {pollState.polls.map((poll) => (
              <div key={poll._id} className="lg:col-span-2">
                <PollCard poll={poll} onEdit={onEdit} onDelete={onDelete} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500">No Polls Found</div>
        )}
      </div>

      {/* Create/Edit Modal */}
      <Modal
        isOpen={showCreateModal || showEditModal}
        onRequestClose={() => {
          setShowCreateModal(false);
          setShowEditModal(false);
          setEditingPoll(null);
        }}
        closeTimeoutMS={100}
        ariaHideApp={false}
        className="fixed inset-0 flex items-center justify-center p-4"
      >
        <div className="relative max-w-sm w-[90%] max-h-[80vh] p-3 bg-white border-2 rounded-md shadow-md overflow-y-auto">
          <div className="flex justify-between mb-5">
            <h3 className="text-xl font-bold">
              {editingPoll ? "Edit Poll" : "Create a Poll"}
            </h3>
            <button>
              <HiOutlineXMark
                className="text-xl"
                onClick={() => {
                  setShowCreateModal(false);
                  setShowEditModal(false);
                  setEditingPoll(null);
                }}
              />
            </button>
          </div>

          <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-5">
                <FormField
                  control={control}
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
                        <FormMessage errors={errors} name="question" />
                      </FormItem>
                    );
                  }}
                />
              </div>

              <div className="border p-2">
                {options.map((option, index) => (
                  <FormField
                    key={option.id}
                    control={control}
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
                            errors={errors}
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
            </form>
          </Form>
        </div>
      </Modal>
    </main>
  );
}
