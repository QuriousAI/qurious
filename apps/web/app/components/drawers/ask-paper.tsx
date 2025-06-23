import { Badge } from "@workspace/ui/src/components/badge";
import { Button } from "@workspace/ui/src/components/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@workspace/ui/src/components/drawer";
import { Separator } from "@workspace/ui/src/components/separator";
import {
  Construction,
  MessageCircleQuestion,
} from "@workspace/ui/src/iconography";

const LeftSidePreview = () => {
  return "LeftSidePreview";
};

const RightSidePreview = () => {
  return "RightSidePreview";
};

export const AskPaperDrawer = () => {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline">
          <MessageCircleQuestion />
          Ask Paper
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="w-full max-w-5xl mx-auto">
          <DrawerHeader>
            <DrawerTitle className="text-3xl text-left items-center flex gap-2">
              Ask Paper <Badge variant="secondary">Beta</Badge>
            </DrawerTitle>
            <DrawerDescription className="text-lg text-left">
              Ask questions about this paper and get AI-powered answers to help
              understand it better.
            </DrawerDescription>
          </DrawerHeader>

          <Separator />

          <div className="flex flex-col items-center justify-center p-12 gap-y-6 border rounded-lg w-fit mx-auto mt-8 bg-card">
            <span className="text-3xl font-bold flex items-center gap-4">
              <Construction className="size-8" /> Coming Soon~
            </span>
            <p className="text-muted-foreground text-center max-w-md">
              We're working hard to bring you an amazing AI-powered paper Q&A
              experience. Stay tuned!
            </p>
          </div>
        </div>

        <DrawerFooter />
      </DrawerContent>
    </Drawer>
  );
};
