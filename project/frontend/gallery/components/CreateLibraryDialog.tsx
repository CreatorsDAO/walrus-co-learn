import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

const formSchema = z.object({
  name: z.string().min(1, "Library name is required").max(50, "Name too long"),
})

interface CreateLibraryDialogProps {
  onSubmit: (name: string) => Promise<void>
  disabled?: boolean
}

export function CreateLibraryDialog({ onSubmit, disabled }: CreateLibraryDialogProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  })

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    await onSubmit(values.name)
    form.reset()
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button disabled={disabled}>Create Library</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Library</DialogTitle>
          <DialogDescription>
            Enter the name for your new library.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Library Name</FormLabel>
                  <FormControl>
                    <Input placeholder="My Awesome Library" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end">
              <Button type="submit">Create</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
} 