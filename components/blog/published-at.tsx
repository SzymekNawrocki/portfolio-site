import { POST_QUERYResult } from "@/sanity/types";
import dayjs from "dayjs";

type PublishedAtProps = {
  publishedAt: NonNullable<POST_QUERYResult>["publishedAt"];
};

export function PublishedAt({ publishedAt }: PublishedAtProps) {
  return publishedAt ? (
    <p className="text-xs font-semibold uppercase tracking-[0.35em] text-muted-foreground">
      {dayjs(publishedAt).format("D MMMM YYYY")}
    </p>
  ) : null;
}