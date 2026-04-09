import { RouteIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "../ui/empty";

export const MainPage = () => {
  return (
    <div>
      <Empty className="relative z-10">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <RouteIcon />
          </EmptyMedia>
          <EmptyTitle>Upload. Share. Copy. Done.</EmptyTitle>
          <EmptyDescription>
            Share text and images instantly. No hassle, no delay. Just upload,
            copy, and go.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <div className="flex gap-3">
            <Button
              size="lg"
              variant="outline"
              className="cursor-pointer"
              render={(props) => (
                <Link to="/upload" {...props}>
                  Upload text or image
                </Link>
              )}
            />
            <Button
              size="lg"
              variant="default"
              className="cursor-pointer"
              render={(props) => (
                <Link to="/copy" {...props}>
                  Copy Content
                </Link>
              )}
            />
          </div>
        </EmptyContent>
      </Empty>
    </div>
  );
};
