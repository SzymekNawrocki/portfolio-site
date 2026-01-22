import { PAGE_QUERYResult } from "@/sanity/types";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

type FeaturesProps = Extract<
  NonNullable<NonNullable<PAGE_QUERYResult>["content"]>[number],
  { _type: "features" }
>;

export function Features({ features, title }: FeaturesProps) {
  return (
    <section className="py-16">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4">
        {title && (
          <h2 className="text-foreground mx-auto max-w-3xl text-pretty text-xl font-semibold md:text-2xl lg:text-5xl">
            {title}
          </h2>
        )}

        {Array.isArray(features) && (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {features.map((feature) => (
              <Card
                key={feature._key}
                className="bg-card text-card-foreground rounded-xl shadow-sm"
              >
                <CardHeader>
                  <CardTitle className="text-xl font-semibold">
                    {feature.title}
                  </CardTitle>
                </CardHeader>

                <CardContent>
                  <p className="text-lg">{feature.text}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
