import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import postSchema from "../../../../../schemas/post.schemas.js";
import { useDropzone } from "react-dropzone";
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
import { Textarea } from "@/components/ui/textarea.jsx";
import { TbCameraPlus } from "react-icons/tb";
import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button.jsx";
import { useSelector } from "react-redux";
import { Loader2, X } from "lucide-react";
import { useDispatch } from "react-redux";
import { deleteImage, getPost } from "@/redux/slices/postSlice.js";

export default function PostForm({ postId, onSubmit }) {
  const dispatch = useDispatch();
  const postState = useSelector((state) => state.post);
  const form = useForm({
    defaultValues: {
      title: "",
      subtitle: "",
      content: "",
    },
    resolver: zodResolver(postSchema),
  });
  const [uploadedImages, setUploadedImages] = useState([]);
  const onDrop = useCallback((acceptedFiles) => {
    const additional = acceptedFiles.map((file) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
      })
    );
    setUploadedImages((prev) => [...prev, ...additional]);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  function _onSubmit(data) {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("subtitle", data.subtitle);
    formData.append("content", data.content);
    uploadedImages.forEach((file) => {
      formData.append("images", file);
    });

    onSubmit(formData);
  }
  function handleDeleteImage(imageId) {
    dispatch(deleteImage({ postId, imageId }));
  }

  useEffect(() => {
    if (postId) {
      dispatch(getPost(postId));
    }
  }, [postId]);

  useEffect(() => {
    if (postId && postState.singlePost) {
      form.setValue("title", postState.singlePost.title);
      form.setValue("subtitle", postState.singlePost.subtitle);
      form.setValue("content", postState.singlePost.content);
    }
  }, [postState.singlePost]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(_onSubmit)}>
        <div className="mb-5">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel htmlFor="title">Title</FormLabel>
                  <FormControl>
                    <Input {...field} id="title" placeholder="Enter Title" />
                  </FormControl>
                  <FormMessage errors={form.formState.errors} name="title" />
                </FormItem>
              );
            }}
          />
        </div>
        <div className="mb-5">
          <FormField
            control={form.control}
            name="subtitle"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel htmlFor="subtitle">Subtitle (optional)</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      id="subtitle"
                      placeholder="Enter Subtitle"
                    />
                  </FormControl>
                  <FormMessage errors={form.formState.errors} name="subtitle" />
                </FormItem>
              );
            }}
          />
        </div>
        <div className="mb-5">
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel htmlFor="content">Content</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      id="content"
                      placeholder="Enter Content"
                    />
                  </FormControl>
                  <FormMessage errors={form.formState.errors} name="content" />
                </FormItem>
              );
            }}
          />
        </div>
        <div className="h-60 overflow-y-scroll">
          <div className="mb-5">
            <div className="border p-2 cursor-pointer" {...getRootProps()}>
              <input {...getInputProps()} />
              {isDragActive ? (
                <p>Drop the files here ...</p>
              ) : (
                <div className="flex flex-col items-center">
                  <TbCameraPlus className="text-3xl" />
                  <p className="text-center">
                    Drag 'n' drop some files here, or click to select files
                  </p>
                </div>
              )}
            </div>
          </div>
          <div className="grid grid-cols-3">
            {postState.singlePost?.images?.map((file, idx) => (
              <div
                key={idx}
                className={
                  "col-span-3 md:col-span-1 me-2 mt-2 relative" +
                  (postState.isLoading ? " animate-pulse" : "")
                }
              >
                <img
                  src={file.url}
                  className="w-full object-cover"
                  alt="uploaded"
                />
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <button
                      className="absolute top-2 end-2 bg-white hover:bg-gray-200 p-1 rounded-full"
                      type="button"
                      disabled={postState.isLoading}
                    >
                      <X size={15} />
                    </button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you sure want to delete?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        delete the item from our servers.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        className="bg-red-600 hover:bg-red-700"
                        onClick={() => handleDeleteImage(file._id)}
                      >
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            ))}
            {uploadedImages.map((file, idx) => (
              <div
                key={idx}
                className={
                  "col-span-3 md:col-span-1 me-2 mt-2 relative" +
                  (postState.isLoading ? " animate-pulse" : "")
                }
              >
                <img
                  src={file.preview}
                  className="w-full object-cover"
                  alt="uploaded"
                />
                <button
                  className="absolute top-2 end-2 bg-white hover:bg-gray-200 p-1 rounded-full"
                  type="button"
                  onClick={() =>
                    setUploadedImages(
                      uploadedImages.filter((_, index) => index !== idx)
                    )
                  }
                  disabled={postState.isLoading}
                >
                  <X size={15} />
                </button>
              </div>
            ))}
          </div>
        </div>

        <Button
          className="bg-blue-700 hover:bg-blue-800 mt-5 w-full"
          type="submit"
          disabled={postState.isLoading}
        >
          {postState.isLoading ? (
            <Loader2 className="animate-spin" />
          ) : (
            "Submit"
          )}
        </Button>
      </form>
    </Form>
  );
}
