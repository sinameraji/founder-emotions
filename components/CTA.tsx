import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Marquee from "@/components/ui/marquee";
import { ChevronRight, HeartHandshake } from "lucide-react";
import { Dialog, DialogTrigger } from "./ui/dialog";

const reviews = [
  {
    name: "Enzo",
    id: "enzo",
    body: "Highly recommend learning loop to founders who want to stress test their mental models, and learn from the mental models of other highly competent tech founders.",
    img: "https://media.licdn.com/dms/image/v2/D5603AQE4Cddn2RmGfg/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1685021375692?e=1744243200&v=beta&t=WNWDvIRAmEqDoO59QwRP0RP9Gh9-tMHA4Lszpm2fWFM",
  },
  {
    name: "Sherry",
    id: "sherry",
    body: "I don't know what to say. I'm speechless. This is amazing.",
    img: "https://media.licdn.com/dms/image/v2/D4E03AQH9QLDqKRABiA/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1715870003617?e=1744243200&v=beta&t=QNzAlyV2O2hXihx6D3Fw3L2c8MQHU6o1OHNNqpCulcQ",
  },
  {
    name: "Tommaso",
    id: "tommaso",
    body: "Sina (the community moderator) inspires the whole Singaporean entrepreneurial community. This man is relentless, visionary, and a maker.",
    img: "https://media.licdn.com/dms/image/v2/D4E03AQG_ty2OiqWAgg/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1702351306282?e=1744243200&v=beta&t=aj_U8KlK0PiWFhS3Yj8FlL6PLEyOcTjJmzXD1pFiKCA",
  },
  {
    name: "Viktor",
    id: "viktor",
    body: "I have met some of the smartest founders in Southeast Asia (and beyond) through Learning Loop, super grateful to be a member and have access to such a group of ambitious people!",
    img: "https://media.licdn.com/dms/image/v2/C5603AQGgzjfCjtKG-g/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1629549292877?e=1744243200&v=beta&t=eZFNThdkziM0LAJOCf9osRAYpoQLMLrIlfi2N4dAriA",
  },
  {
    name: "Fatima",
    id: "fatima",
    body: "I have been part of the Learning Loop community for the past year and it has been one of the best and highly engaged community of founders willing to help, support and uplift each other.",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVi21dc3ggk9WOlNmYSPvv5d_fA_9kvWeaGg&s",
  },
  {
    name: "Vera",
    id: "vera",
    body: "I've joined some pretty great founder communities, but Learning Loop is by far the best and most helpful.",
    img: "https://media.licdn.com/dms/image/v2/C5103AQH0t1i4CpnQlg/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1557331283434?e=1744243200&v=beta&t=a6gEMkMieJRitBhnIhqKb5ehrh6tcq9xz4jIo2AcsHg",
  },
];

const firstRow = reviews.slice(0, reviews.length / 2);
const secondRow = reviews.slice(reviews.length / 2);

const ReviewCard = ({
  img,
  name,
  body,
}: {
  img: string;
  name: string;
  body: string;
}) => {
  return (
    <figure
      className={cn(
        "relative w-64 cursor-pointer overflow-hidden rounded-[2rem] border p-4",
        // light styles
        "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
        // dark styles
        "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]",
      )}
    >
      <div className="flex flex-row items-center gap-2">
        <img className="rounded-full" width="32" height="32" alt="" src={img} />
        <div className="flex flex-col">
          <figcaption className="text-sm font-medium dark:text-white">
            {name}
          </figcaption>
        </div>
      </div>
      <blockquote className="mt-2 text-sm">{body}</blockquote>
    </figure>
  );
};

export function CallToAction() {
  return (
    <section id="cta">
      <div className="py-14">
        <div className="container flex w-full flex-col items-center justify-center p-4">
          <div className="relative flex w-full max-w-[1000px] flex-col items-center justify-center overflow-hidden rounded-[2rem] border p-10 py-14">
            <div className="absolute rotate-[35deg]">
              <Marquee pauseOnHover className="[--duration:20s]" repeat={3}>
                {firstRow.map((review) => (
                  <ReviewCard key={review.id} {...review} />
                ))}
              </Marquee>
              <Marquee
                reverse
                pauseOnHover
                className="[--duration:20s]"
                repeat={3}
              >
                {secondRow.map((review) => (
                  <ReviewCard key={review.id} {...review} />
                ))}
              </Marquee>
              <Marquee pauseOnHover className="[--duration:20s]" repeat={3}>
                {firstRow.map((review) => (
                  <ReviewCard key={review.id} {...review} />
                ))}
              </Marquee>
              <Marquee
                reverse
                pauseOnHover
                className="[--duration:20s]"
                repeat={3}
              >
                {secondRow.map((review) => (
                  <ReviewCard key={review.id} {...review} />
                ))}
              </Marquee>
              <Marquee pauseOnHover className="[--duration:20s]" repeat={3}>
                {firstRow.map((review) => (
                  <ReviewCard key={review.id} {...review} />
                ))}
              </Marquee>
              <Marquee
                reverse
                pauseOnHover
                className="[--duration:20s]"
                repeat={3}
              >
                {secondRow.map((review) => (
                  <ReviewCard key={review.id} {...review} />
                ))}
              </Marquee>
            </div>
            <div className="z-10 mx-auto size-24 rounded-[2rem] border bg-white/10 p-3 shadow-2xl backdrop-blur-md dark:bg-black/10 lg:size-32">
              <HeartHandshake className="mx-auto size-16 text-black dark:text-white lg:size-24" />
            </div>
            <div className="z-10 mt-4 flex flex-col items-center text-center text-black dark:text-white">
              <h1 className="text-3xl font-bold lg:text-4xl">
                Lonely in your startup journey?
              </h1>
              <p className="mt-2">
                We reimagined the founder community experience.
              </p>
              <a
                href="https://learningloop.com"
                className={cn(
                  buttonVariants({
                    size: "lg",
                    variant: "outline",
                  }),
                  "group mt-4 rounded-[2rem] px-6",
                )}
              >
                Check it out
                <ChevronRight className="ml-1 size-4 transition-all duration-300 ease-out group-hover:translate-x-1" />
              </a>
            </div>
            <div className="absolute inset-x-0 bottom-0 h-full bg-gradient-to-b from-transparent to-white to-70% dark:to-black" />
          </div>
        </div>
      </div>
    </section>
  );
}

export function AuthModal() {
  return <Dialog>
    <DialogTrigger asChild>
      <Button variant="outline">Sign in</Button>
    </DialogTrigger>
  </Dialog>
}