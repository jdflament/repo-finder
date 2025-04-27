import { useRouter, useSearchParams } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { SearchIcon, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form"

const formSchema = z.object({
    query: z.string().min(1, "Search query is required"),
})

type FormValues = z.infer<typeof formSchema>

interface SearchFormProps {
    initialQuery?: string
    isLoading: boolean
}

export function SearchForm({
   initialQuery = "",
   isLoading,
}: SearchFormProps) {
    const router = useRouter()
    const searchParams = useSearchParams();

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            query: initialQuery,
        },
    })

    function onSubmit(data: FormValues) {
        const params = new URLSearchParams(searchParams.toString())
        params.set("q", data.query)
        params.set("page", "1")

        router.push(`/?${params.toString()}`)
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="query"
                    render={({ field }) => (
                        <FormItem>
                            <div className="flex gap-2">
                                <FormControl>
                                    <div className="relative flex-1">
                                        <SearchIcon className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                                        <Input
                                            placeholder="Search GitHub repositories..."
                                            className="pl-10"
                                            {...field}
                                        />
                                        {field.value && (
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="sm"
                                                className="absolute right-0 top-0 h-full px-3 py-2 text-muted-foreground"
                                                onClick={() => {
                                                    field.onChange("")
                                                    if (initialQuery) {
                                                        const params = new URLSearchParams(searchParams.toString())
                                                        params.delete("q")
                                                        router.push(`/?${params.toString()}`)
                                                    }
                                                }}
                                            >
                                                <X className="h-4 w-4" />
                                                <span className="sr-only">Clear</span>
                                            </Button>
                                        )}
                                    </div>
                                </FormControl>

                                <Button type="submit" disabled={isLoading}>
                                    {isLoading ? "Searching..." : "Search"}
                                </Button>
                            </div>
                        </FormItem>
                    )}
                />
            </form>
        </Form>
    )
}