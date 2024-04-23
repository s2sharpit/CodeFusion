import { HTMLAttributes, forwardRef } from "react";
import { VariantProps, cva } from "class-variance-authority";
import { cn } from "@/utils/twCSS";

const wrapperVariants = cva(
  "mt-16 mx-auto gap-6 gap-x-8 md:gap-x-16 justify-center w-full",
  {
    variants: {
      variant: {
        default: "grid grid-cols-1 place-items-center",
        flex: "flex flex-wrap md:gap-8",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

interface WrapperProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof wrapperVariants> {}

const Wrapper = forwardRef<HTMLDivElement, WrapperProps>(
  ({ className, variant, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        {...props}
        className={cn(wrapperVariants({ variant, className }))}
      >
        {children}
      </div>
    );
  }
);

Wrapper.displayName = "Wrapper";

export default Wrapper;
