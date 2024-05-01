import { HTMLAttributes, forwardRef } from "react";
import { VariantProps, cva } from "class-variance-authority";
import { cn } from "../../utils/twCSS";

const titleVariants = cva("text-primary font-bold", {
  variants: {
    size: {
      default: "text-3xl md:text-4xl text-center",
      lg: "text-4xl sm:text-5xl lg:text-7xl",
      sm: "text-2xl md:text-3xl lg:text4xl",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

interface TitleProps
  extends HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof titleVariants> {}

const Title = forwardRef<HTMLHeadingElement, TitleProps>(
  ({ className, size, children, ...props }, ref) => {
    return (
      <h1
        ref={ref}
        {...props}
        className={cn(titleVariants({ size, className }))}
      >
        {children}
      </h1>
    );
  }
);

Title.displayName = "Title";

export default Title;
