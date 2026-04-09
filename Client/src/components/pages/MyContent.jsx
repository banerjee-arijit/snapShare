import { useState, useEffect } from "react";
import { Spinner } from "../ui/spinner";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import axios from "axios";
import { Button } from "../ui/button";
import { Copy, Check } from "lucide-react";

export const MyContent = () => {
  const [content, setContent] = useState({});
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (content?.textContent) {
      navigator.clipboard.writeText(content.textContent);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const fetchContent = async () => {
    try {
      const code = sessionStorage.getItem("passwordCode");
      if (!code) {
        setLoading(false);
        return;
      }
      const response = await axios.post(
        "https://snapshare-9uzz.onrender.com/api/get-content",
        {
          passwordCode: code,
        }
      );
      console.log("Fetched password details: ", response.data);
      setContent(response.data.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContent();
  }, []);
  return (
    <div className="min-h-screen flex justify-center items-center p-4 bg-background">
      {loading ? (
        <Spinner />
      ) : (
        <div className="w-full max-w-md space-y-6">
          <div className="space-y-1.5 text-center">
            <h2 className="text-2xl font-semibold tracking-tight text-foreground">
              Secret Content
            </h2>
            <p className="text-sm text-muted-foreground">
              Secret files unlocked successfully.
            </p>
          </div>

          <Accordion
            type="single"
            collapsible="true"
            className="w-full border rounded-2xl overflow-hidden bg-card shadow-sm"
          >
            <AccordionItem value="item-1" className="border-b-0">
              <AccordionTrigger className="px-5 hover:bg-muted/50 transition-colors font-medium">
                Uploaded Text
              </AccordionTrigger>
              <AccordionContent className="px-5 pb-5 pt-3 text-muted-foreground whitespace-pre-wrap leading-relaxed border-t bg-muted/10 relative group">
                <div className="pr-8">
                  {content?.textContent || `No text content found. When you upload text, it will securely appear here.`}
                </div>
                {content?.textContent && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2 h-8 w-8 text-muted-foreground hover:text-foreground"
                    onClick={handleCopy}
                    title="Copy text"
                  >
                    {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                  </Button>
                )}
              </AccordionContent>
            </AccordionItem>

            <div className="h-px bg-border w-full" />

            <AccordionItem value="item-2" className="border-b-0">
              <AccordionTrigger className="px-5 hover:bg-muted/50 transition-colors font-medium">
                Uploaded Image
              </AccordionTrigger>
              <AccordionContent className="px-5 pb-5 pt-5 border-t bg-muted/10 flex flex-col items-center justify-center text-muted-foreground">
                {content?.imageUrl ? (
                  <img src={content.imageUrl} alt="Uploaded item" className="w-full h-auto max-h-64 object-contain rounded-xl" />
                ) : (
                  <div className="w-full h-40 border-2 border-dashed border-border rounded-xl flex flex-col gap-2 items-center justify-center bg-background/50 hover:bg-background transition-colors">
                    <span className="text-sm">No image uploaded yet</span>
                  </div>
                )}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      )}
    </div>
  );
};
