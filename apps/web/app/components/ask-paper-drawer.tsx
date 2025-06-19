"use client";

import {
  Loader2,
  MessageCircle,
  Bot,
  User,
  Sparkles,
} from "@workspace/ui/src/iconography";
import { Button } from "../ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../ui/drawer";
import { useParsePDFQuery } from "@/queries";
import { pdfjs, Document, Page, DocumentProps } from "react-pdf";
import { useState, useRef, useEffect, FormEvent } from "react";
import { ScrollArea } from "../ui/scroll-area";
import { Input } from "../ui/input";
import { useChat, Message } from "@ai-sdk/react";
import { cn } from "@/lib/utils";
import { Skeleton } from "../ui/skeleton";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const PDFPreview = (props: { documentUrl: string }) => {
  const [numPages, setNumPages] = useState<number | null>(null);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  return (
    <ScrollArea className="h-[65vh] w-1/2">
      <Document file={props.documentUrl} onLoadSuccess={onDocumentLoadSuccess}>
        {Array.from(new Array(numPages), (_, index) => (
          <Page key={`page_${index + 1}`} pageNumber={index + 1} />
        ))}
      </Document>
    </ScrollArea>
  );
};

const PDFChatBox = (props: { documentUrl: string }) => {
  const [isLoading, setIsLoading] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    append,
    isLoading: isResponding,
  } = useChat({
    api: "/api/chat",
    initialMessages: [
      {
        id: "1",
        role: "assistant",
        content: "I've loaded the paper. What would you like to know about it?",
      },
    ],
    body: {
      documentUrl: props.documentUrl,
    },
    onFinish: () => {
      setIsLoading(false);
    },
    onError: (error: Error) => {
      console.error("Chat error:", error);
      setIsLoading(false);
    },
  });

  const prompts = [
    "Summarize the key findings of this paper",
    "What methodology was used in this research?",
    "What are the main contributions of this work?",
  ];

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handlePromptClick = (prompt: string) => {
    append({
      role: "user",
      content: prompt,
    } as Message);
  };

  return (
    <div className="flex h-full flex-col">
      <div ref={scrollRef} className="flex-1 space-y-6 overflow-y-auto p-4">
        {messages.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center space-y-4 p-4 text-center">
            <div className="bg-primary/10 rounded-full p-4">
              <Sparkles className="text-primary h-8 w-8" />
            </div>
            <h3 className="text-lg font-medium">
              Ask me anything about this paper
            </h3>
            <p className="text-muted-foreground text-sm">
              I can help you understand the content, summarize key points, or
              answer specific questions.
            </p>
            <div className="mt-4 grid w-full grid-cols-1 gap-2">
              {prompts.map((prompt, i) => (
                <button
                  key={i}
                  onClick={() => handlePromptClick(prompt)}
                  className="hover:bg-accent/50 rounded-lg border p-3 text-left text-sm transition-colors"
                >
                  "{prompt}"
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {messages.map((m: Message) => (
              <div
                key={m.id}
                className={cn(
                  "flex gap-4",
                  m.role === "user" ? "justify-end" : "justify-start"
                )}
              >
                {m.role === "assistant" && (
                  <div className="bg-primary/10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full">
                    <Bot className="text-primary h-4 w-4" />
                  </div>
                )}
                <div
                  className={cn(
                    "max-w-[80%] space-y-2 rounded-lg px-4 py-3",
                    m.role === "user"
                      ? "bg-primary text-primary-foreground ml-auto"
                      : "bg-muted"
                  )}
                >
                  <div className="break-words whitespace-pre-wrap">
                    {m.content}
                  </div>
                </div>
                {m.role === "user" && (
                  <div className="bg-primary/10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full">
                    <User className="text-primary h-4 w-4" />
                  </div>
                )}
              </div>
            ))}
            {isResponding && (
              <div className="flex items-center gap-4">
                <div className="bg-muted flex h-8 w-8 shrink-0 items-center justify-center rounded-full">
                  <Bot className="h-4 w-4" />
                </div>
                <div className="bg-muted space-y-2 rounded-lg px-4 py-3">
                  <div className="flex items-center space-x-2">
                    <div className="bg-muted-foreground h-2 w-2 animate-pulse rounded-full" />
                    <div
                      className="bg-muted-foreground h-2 w-2 animate-pulse rounded-full"
                      style={{ animationDelay: "0.2s" }}
                    />
                    <div
                      className="bg-muted-foreground h-2 w-2 animate-pulse rounded-full"
                      style={{ animationDelay: "0.4s" }}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="border-t p-4">
        <form
          onSubmit={(e: FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            if (input.trim()) {
              handleSubmit(e as unknown as React.FormEvent<HTMLFormElement>);
            }
          }}
          className="relative"
        >
          <Input
            value={input}
            onChange={handleInputChange}
            placeholder="Ask a question about the paper..."
            className="pr-12"
            disabled={isResponding}
          />
          <Button
            type="submit"
            size="icon"
            className="absolute top-1/2 right-1 h-8 w-8 -translate-y-1/2"
            disabled={!input.trim() || isResponding}
          >
            {isResponding ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 256 256"
                fill="currentColor"
                className="h-4 w-4"
              >
                <path d="M200 32v144a8 8 0 0 1-8 8H67.31l34.35 34.34a8 8 0 0 1-11.32 11.32l-48-48a8 8 0 0 1 0-11.32l48-48a8 8 0 0 1 11.32 11.32L67.31 168H184V32a8 8 0 0 1 16 0Z" />
              </svg>
            )}
            <span className="sr-only">Send message</span>
          </Button>
        </form>
      </div>
    </div>
  );
};

export const AskPaperDrawer = (props: { documentUrl: string }) => {
  const proxiedUrl = `/api/proxy-pdf?url=${encodeURIComponent(props.documentUrl)}`;

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <MessageCircle className="h-4 w-4" />
          Chat with paper
        </Button>
      </DrawerTrigger>
      <DrawerContent className="h-[85vh] max-h-[1000px]">
        <div className="flex h-full">
          <div className="hidden w-1/2 border-r md:block">
            <div className="h-full overflow-auto p-4">
              <PDFPreview documentUrl={proxiedUrl} />
            </div>
          </div>
          <div className="flex h-full w-full flex-col md:w-1/2">
            {/* Chat Interface */}
            <DrawerHeader className="border-b p-4 text-left">
              <DrawerTitle>Chat with paper</DrawerTitle>
              <DrawerDescription>
                Ask questions about this research paper
              </DrawerDescription>
            </DrawerHeader>
            <PDFChatBox documentUrl={proxiedUrl} />
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

-------

// "use client";

// import {
//   Loader2,
//   MessageCircle,
//   Bot,
//   User,
//   Sparkles,
// } from "@workspace/ui/src/iconography";
// import { Button } from "../ui/button";
// import {
//   Drawer,
//   DrawerContent,
//   DrawerDescription,
//   DrawerHeader,
//   DrawerTitle,
//   DrawerTrigger,
// } from "../ui/drawer";
// import { pdfjs, Document, Page } from "react-pdf";
// import { useState, useRef, useEffect, FormEvent } from "react";
// import { ScrollArea } from "../ui/scroll-area";
// import { Input } from "../ui/input";
// import { useChat, Message } from "@ai-sdk/react";
// import { cn } from "@/lib/utils";

// // Set up PDF.js worker
// pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

// interface PDFPreviewProps {
//   documentUrl: string;
// }

// const PDFPreview: React.FC<PDFPreviewProps> = ({ documentUrl }) => {
//   const [numPages, setNumPages] = useState<number | null>(null);

//   const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
//     setNumPages(numPages);
//   };

//   return (
//     <ScrollArea className="h-[65vh] w-1/2">
//       <Document file={documentUrl} onLoadSuccess={onDocumentLoadSuccess}>
//         {numPages &&
//           Array.from({ length: numPages }, (_, index) => (
//             <Page
//               key={`page_${index + 1}`}
//               pageNumber={index + 1}
//               width={600}
//             />
//           ))}
//       </Document>
//     </ScrollArea>
//   );
// };

// interface PDFChatBoxProps {
//   documentUrl: string;
// }

// const PDFChatBox: React.FC<PDFChatBoxProps> = ({ documentUrl }) => {
//   const [isLoading, setIsLoading] = useState(true);
//   const scrollRef = useRef<HTMLDivElement>(null);

//   const {
//     messages,
//     input,
//     handleInputChange,
//     handleSubmit: originalHandleSubmit,
//     append,
//     isLoading: isResponding,
//   } = useChat({
//     api: "/api/chat",
//     initialMessages: [
//       {
//         id: "1",
//         role: "assistant",
//         content: "I've loaded the paper. What would you like to know about it?",
//       },
//     ],
//     body: {
//       documentUrl,
//     },
//     onFinish: () => {
//       setIsLoading(false);
//     },
//     onError: (error: Error) => {
//       console.error("Chat error:", error);
//       setIsLoading(false);
//     },
//   });

//   const prompts = [
//     "Summarize the key findings of this paper",
//     "What methodology was used in this research?",
//     "What are the main contributions of this work?",
//   ];

//   // Auto-scroll to bottom when messages change
//   useEffect(() => {
//     if (scrollRef.current) {
//       scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
//     }
//   }, [messages]);

//   const handlePromptClick = (prompt: string) => {
//     append({
//       role: "user",
//       content: prompt,
//     });
//   };

//   const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     if (input.trim()) {
//       originalHandleSubmit(e as unknown as React.FormEvent<HTMLFormElement>);
//     }
//   };

//   return (
//     <div className="flex h-full flex-col">
//       <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-6">
//         {messages.length === 0 ? (
//           <div className="flex h-full flex-col items-center justify-center space-y-4 p-4 text-center">
//             <div className="rounded-full bg-primary/10 p-4">
//               <Sparkles className="h-8 w-8 text-primary" />
//             </div>
//             <h3 className="text-lg font-medium">
//               Ask me anything about this paper
//             </h3>
//             <p className="text-sm text-muted-foreground">
//               I can help you understand the content, summarize key points, or
//               answer specific questions.
//             </p>
//             <div className="mt-4 grid w-full grid-cols-1 gap-2">
//               {prompts.map((prompt, i) => (
//                 <button
//                   key={i}
//                   type="button"
//                   onClick={() => handlePromptClick(prompt)}
//                   className="text-left rounded-lg border p-3 text-sm hover:bg-accent/50 transition-colors"
//                 >
//                   {`"${prompt}"`}
//                 </button>
//               ))}
//             </div>
//           </div>
//         ) : (
//           <div className="space-y-6">
//             {messages.map((message) => (
//               <div
//                 key={message.id}
//                 className={cn(
//                   "flex gap-4",
//                   message.role === "user" ? "justify-end" : "justify-start"
//                 )}
//               >
//                 {message.role === "assistant" && (
//                   <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10">
//                     <Bot className="h-4 w-4 text-primary" />
//                   </div>
//                 )}
//                 <div
//                   className={cn(
//                     "max-w-[80%] space-y-2 rounded-lg px-4 py-3",
//                     message.role === "user"
//                       ? "ml-auto bg-primary text-primary-foreground"
//                       : "bg-muted"
//                   )}
//                 >
//                   <div className="whitespace-pre-wrap break-words">
//                     {message.content}
//                   </div>
//                 </div>
//                 {message.role === "user" && (
//                   <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10">
//                     <User className="h-4 w-4 text-primary" />
//                   </div>
//                 )}
//               </div>
//             ))}
//             {isResponding && (
//               <div className="flex items-center gap-4">
//                 <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted">
//                   <Bot className="h-4 w-4" />
//                 </div>
//                 <div className="space-y-2 rounded-lg bg-muted px-4 py-3">
//                   <div className="flex items-center space-x-2">
//                     <div className="h-2 w-2 animate-pulse rounded-full bg-muted-foreground" />
//                     <div
//                       className="h-2 w-2 animate-pulse rounded-full bg-muted-foreground"
//                       style={{ animationDelay: "0.2s" }}
//                     />
//                     <div
//                       className="h-2 w-2 animate-pulse rounded-full bg-muted-foreground"
//                       style={{ animationDelay: "0.4s" }}
//                     />
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>
//         )}
//       </div>

//       <div className="border-t p-4">
//         <form onSubmit={handleSubmit} className="relative">
//           <Input
//             value={input}
//             onChange={handleInputChange}
//             placeholder="Ask a question about the paper..."
//             className="pr-12"
//             disabled={isResponding}
//           />
//           <Button
//             type="submit"
//             size="icon"
//             className="absolute right-1 top-1/2 h-8 w-8 -translate-y-1/2"
//             disabled={!input.trim() || isResponding}
//           >
//             {isResponding ? (
//               <Loader2 className="h-4 w-4 animate-spin" />
//             ) : (
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 viewBox="0 0 256 256"
//                 fill="currentColor"
//                 className="h-4 w-4"
//               >
//                 <path d="M200 32v144a8 8 0 0 1-8 8H67.31l34.35 34.34a8 8 0 0 1-11.32 11.32l-48-48a8 8 0 0 1 0-11.32l48-48a8 8 0 0 1 11.32 11.32L67.31 168H184V32a8 8 0 0 1 16 0Z" />
//               </svg>
//             )}
//             <span className="sr-only">Send message</span>
//           </Button>
//         </form>
//       </div>
//     </div>
//   );
// };

// interface AskPaperDrawerProps {
//   documentUrl: string;
// }

// export const AskPaperDrawer: React.FC<AskPaperDrawerProps> = ({
//   documentUrl,
// }) => {
//   const proxiedUrl = `/api/proxy-pdf?url=${encodeURIComponent(documentUrl)}`;

//   return (
//     <Drawer>
//       <DrawerTrigger asChild>
//         <Button variant="outline" size="sm" className="gap-2">
//           <MessageCircle className="h-4 w-4" />
//           Chat with paper
//         </Button>
//       </DrawerTrigger>
//       <DrawerContent className="h-[85vh] max-h-[1000px]">
//         <div className="flex h-full">
//           {/* PDF Preview */}
//           <div className="hidden w-1/2 border-r md:block">
//             <div className="h-full overflow-auto p-4">
//               <PDFPreview documentUrl={proxiedUrl} />
//             </div>
//           </div>
//           {/* Chat Interface */}
//           <div className="flex h-full w-full flex-col md:w-1/2">
//             <DrawerHeader className="border-b p-4 text-left">
//               <DrawerTitle>Chat with paper</DrawerTitle>
//               <DrawerDescription>
//                 Ask questions about this research paper
//               </DrawerDescription>
//             </DrawerHeader>
//             <PDFChatBox documentUrl={proxiedUrl} />
//           </div>
//         </div>
//       </DrawerContent>
//     </Drawer>
//   );
// };

// export default AskPaperDrawer;
