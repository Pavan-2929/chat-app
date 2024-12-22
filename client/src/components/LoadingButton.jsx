import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

const LoadingButton = ({ loading, disabled, className, children }) => {
  return (
    <Button
      disabled={disabled || loading}
      className={cn("flex items-center justify-center gap-x-2", className)}
    >
      {loading && (
        <Loader2
          className="h-5 w-5 animate-spin text-current"
          aria-hidden="true"
        />
      )}
      {children}
    </Button>
  );
};

export default LoadingButton;
