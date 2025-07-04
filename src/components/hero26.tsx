import {
  ArrowRight,
  Heart,
  Leaf,
  MoveRight,
  Sparkles,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const Hero26 = () => {
  return (
    <section className="py-12">
      <div className="container">
        <div className="text-center">
          <a
            href="#featured-posts"
            className="mx-auto mb-3 inline-flex items-center gap-3 rounded-full border px-2 py-1 text-sm"
          >
            <Badge className="rounded-full">NEW</Badge>
            Jak prowadzić gabinet dietetyka na autopilocie
            <span className="flex size-7 items-center justify-center rounded-full bg-muted">
              <ArrowRight className="w-4" />
            </span>
          </a>
          <h1 className="mx-auto mt-4 mb-3 max-w-3xl text-5xl font-light text-balance lg:mb-7 lg:text-7xl font-serif italic">
          Twoja praca to nie tylko jadłospisy
          </h1>
          <p className="m mx-auto max-w-3xl text-muted-foreground lg:text-xl">
          A jednak większość czasu zżerają Ci maile, tabelki i powtarzalne zadania. Czas to zmienić. Piszemy o tym, jak zhakować pracę 
            <span className="relative top-[5px] mx-2 inline-flex font-medium text-primary md:top-[3px]">
              <Heart className="mr-1 w-4 md:w-5" />
              Dietetyka
            </span>
            używając
            <span className="relative top-[5px] mx-2 inline-flex font-medium text-primary md:top-[3px]">
              <Leaf className="mr-1 w-5" />
              technologii,
            </span>
            o których inni jeszcze nie słyszeli.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <Button size="lg" asChild>
              <a href="/blog">
                Zobacz artykuły
                <MoveRight className="ml-2" strokeWidth={1} />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Hero26 };
