import { Button, Section, Subtle, Title } from "@/components/ui";
import Link from "next/link";
import { FaGithub, FaShareAlt, FaMoneyBillAlt, FaGlobe } from "react-icons/fa";

const features = [
  {
    name: "Add GitHub link",
    description: "You can add your GitHub repository link to your profile.",
    icon: FaGithub,
  },
  {
    name: "Share your profile",
    description: "Share your profile with your friends and colleagues.",
    icon: FaShareAlt,
  },
  {
    name: "Open Source",
    description: "This project is open source and you can contribute to it.",
    icon: FaGlobe,
  },
  {
    name: "Free to use",
    description:
      "This project is free to use and you don't have to pay anything.",
    icon: FaMoneyBillAlt,
  },
];

export default function Home() {
  return (
    <Section>
      <section className="flex">
        <div className="md:w-1/2 mt-6 md:mt-24 space-y-6">
          <Title size="lg" className="font-bold text-primary">
            Explore. Create. Collab.
          </Title>
          <p className="text-xl tracking-wide">
            CodeFusion is a platform where you can share your open source
            projects, explore and collab within the college.
          </p>
          <Button
            asChild
            variant="outline"
            className="text-base text-primary hover:text-secondary hover:bg-primary h-12"
          >
            <Link href="/projects">
              Explore Projects
            </Link>
          </Button>
        </div>
        <div className="w-1/2">{/* right half  */}</div>
      </section>

      <section className="grid place-items-center my-16 md:my-24">
        <Title size="sm">Why should you use this?</Title>
        <Subtle size="sm" className="text-highlight">
          Showcase your projects
        </Subtle>

        <div className="mx-auto my-8 sm:mt-16 max-wxl lg:max-w-4xl grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-y-12">
          {features.map((feature) => (
            <div
              key={feature.name}
              className="p-5 hover:outline outline-1 outline-border rounded"
            >
              <div className="flex gap-6 items-start">
                <div className="p-2 rounded-lg bg-highlight">
                  <feature.icon
                    className="h-6 w-6 text-primary"
                    aria-hidden="true"
                  />
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-primary">
                    {feature.name}
                  </h4>
                  <p>{feature.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </Section>
  );
}
