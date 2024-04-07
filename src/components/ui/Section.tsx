import { HTMLAttributes, forwardRef } from "react";
import { cn } from "../../utils/twCSS";

const sectionVaraints = "my-8 max-w-6xl w-11/12 mx-auto sm:my-10";

interface SectionProps extends HTMLAttributes<HTMLDivElement> {}

const Section = forwardRef<HTMLDivElement, SectionProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <section ref={ref} {...props} className={cn(sectionVaraints, className)}>
        {children}
      </section>
    );
  }
);

Section.displayName = "Section";

export default Section;
