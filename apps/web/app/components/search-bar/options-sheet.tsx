import { CircleHelp, Filter } from "@workspace/design-system/icons";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from "@workspace/design-system/components/sheet";
import { Separator } from "@workspace/design-system/components/separator";
import { toast } from "@workspace/design-system/components/sonner";
import { useForm, UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@workspace/design-system/components/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@workspace/design-system/components/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@workspace/design-system/components/select";
import { Switch } from "@workspace/design-system/components/switch";
import { Input } from "@workspace/design-system/components/input";
import {
  MultiSelector,
  MultiSelectorContent,
  MultiSelectorInput,
  MultiSelectorItem,
  MultiSelectorList,
  MultiSelectorTrigger,
} from "@workspace/design-system/components/extensions/multi-select";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@workspace/design-system/components/tooltip";
import {
  fieldsOfStudy,
  publicationTypes,
} from "@workspace/semantic-scholar/src/index";

const formSchema = z.object({
  minimumCitations: z.number().min(0).optional(),
  publishedSince: z.string().optional(),
  openAccess: z.boolean().optional(),
  publicationTypes: z.array(z.string()).optional(),
  fieldsOfStudy: z.array(z.string()).optional(),
});

const ToolTipFormDescription = (props: { description: string }) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <CircleHelp className="size-4 text-neutral-400" />
      </TooltipTrigger>
      <TooltipContent>
        <div>{props.description}</div>
      </TooltipContent>
    </Tooltip>
  );
};

function OptionsForm({
  form,
}: {
  form: UseFormReturn<{
    minimumCitations?: number | undefined;
    publishedSince?: string | undefined;
    openAccess?: boolean | undefined;
    publicationTypes?: string[] | undefined;
    fieldsOfStudy?: string[] | undefined;
  }>;
}) {
  return (
    <Form {...form}>
      <form className="flex flex-col gap-4 pt-2">
        {/* Field for 'Published Since' */}
        <FormField
          control={form.control}
          name="publishedSince"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center gap-2">
                <FormLabel className="text-base">Published Since</FormLabel>
                <ToolTipFormDescription description="Search papers published from this year onward." />
              </div>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="e.g. 2020" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="min-w-max">
                  <SelectItem value="2020">2020</SelectItem>
                  <SelectItem value="2021">2021</SelectItem>
                  <SelectItem value="2022">2022</SelectItem>
                  <SelectItem value="2023">2023</SelectItem>
                  <SelectItem value="2024">2024</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Field for 'Open Access' */}
        <FormField
          control={form.control}
          name="openAccess"
          render={({ field }) => (
            <FormItem className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FormLabel className="text-base">Open Access</FormLabel>
                <ToolTipFormDescription description="Only show papers that are freely available with a public PDF." />
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  aria-readonly
                  // className="mr-2"
                />
              </FormControl>
            </FormItem>
          )}
        />

        {/* Field for 'Minimum Citations' */}
        <FormField
          control={form.control}
          name="minimumCitations"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center gap-2">
                <FormLabel className="text-base">Minimum Citations</FormLabel>
                <ToolTipFormDescription description="Only show papers with at least this many citations." />
              </div>
              <FormControl>
                <Input placeholder="e.g. 10" type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Field for 'Publication Types' */}
        <FormField
          control={form.control}
          name="publicationTypes"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center gap-2">
                <FormLabel className="text-base">Publication Type</FormLabel>
                <ToolTipFormDescription description="Filter results by the type of publication." />
              </div>
              <FormControl>
                <MultiSelector
                  values={field.value}
                  onValuesChange={field.onChange}
                  loop
                >
                  <MultiSelectorTrigger>
                    <MultiSelectorInput placeholder="e.g. Meta Analysis" />
                  </MultiSelectorTrigger>
                  <MultiSelectorContent>
                    <MultiSelectorList>
                      {publicationTypes.map((type) => (
                        <MultiSelectorItem key={type} value={type}>
                          {type}
                        </MultiSelectorItem>
                      ))}
                    </MultiSelectorList>
                  </MultiSelectorContent>
                </MultiSelector>
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        {/* Field for 'Fields of Study' */}
        <FormField
          control={form.control}
          name="fieldsOfStudy"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center gap-2">
                <FormLabel className="text-base">Fields of Study</FormLabel>
                <ToolTipFormDescription description="Filter results by the field of study." />
              </div>
              <FormControl>
                <MultiSelector
                  values={field.value}
                  onValuesChange={field.onChange}
                  loop
                >
                  <MultiSelectorTrigger>
                    <MultiSelectorInput placeholder="e.g. Computer Science" />
                  </MultiSelectorTrigger>
                  <MultiSelectorContent>
                    <MultiSelectorList>
                      {fieldsOfStudy.map((field) => (
                        <MultiSelectorItem key={field} value={field}>
                          {field}
                        </MultiSelectorItem>
                      ))}
                    </MultiSelectorList>
                  </MultiSelectorContent>
                </MultiSelector>
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}

export const SearchBarOptionsSheet = ({
  options,
  setOptions,
  buttonLabel,
}: {
  options: any;
  setOptions: any;
  buttonLabel: string;
}) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="rounded-full">
          <Filter className="" /> {buttonLabel}
        </Button>
      </SheetTrigger>
      <OptionsSheetContent options={options} setOptions={setOptions} />
    </Sheet>
  );
};

function OptionsSheetContent({
  options,
  setOptions,
}: {
  options: any;
  setOptions: any;
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      minimumCitations: options.minimumCitations,
      publishedSince: options.publishedSince,
      openAccess: options.openAccess,
      publicationTypes: options.publicationTypes,
      fieldsOfStudy: options.fieldsOfStudy,
    },
  });

  const handleApply = () => {
    const values = form.getValues();
    toast(JSON.stringify(values));

    setOptions(values);
  };

  return (
    <SheetContent>
      <SheetHeader>
        <SheetTitle className="text-2xl">Search options</SheetTitle>
        <SheetDescription>
          Change options for the search query.
        </SheetDescription>
        <Separator />
        <OptionsForm form={form} />
      </SheetHeader>

      <SheetFooter>
        <Separator />
        <div className="flex gap-2">
          <Button variant="secondary" className="w-1/2">
            Reset
          </Button>
          <Button type="submit" onClick={handleApply} className="w-1/2">
            Apply
          </Button>
        </div>
      </SheetFooter>
    </SheetContent>
  );
}
