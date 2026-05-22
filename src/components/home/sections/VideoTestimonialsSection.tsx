import { Button } from "@/components/ui/Button";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SectionShell } from "@/components/ui/SectionShell";
import { VIDEO_SECTION, VIDEO_TESTIMONIALS } from "@/data/homepage";

export function VideoTestimonialsSection() {
  return (
    <SectionShell padding="compact" aria-labelledby="video-testimonials-heading">
      <div className="container">
        <div className="rounded-3xl border border-[var(--color-border-light)] bg-white p-4 shadow-sm sm:p-6">
          <SectionHeader
            id="video-testimonials-heading"
            eyebrow={VIDEO_SECTION.eyebrow}
            title={VIDEO_SECTION.title}
          />

          <div className="testimonial-marquee mt-6 pb-2 sm:mt-8">
            <div className="testimonial-marquee-track">
              {[...VIDEO_TESTIMONIALS, ...VIDEO_TESTIMONIALS].map((video, index) => (
                <article
                  key={`${video.title}-${index}`}
                  className="min-w-[260px] overflow-hidden rounded-2xl border border-[var(--color-border-light)] bg-surface sm:min-w-[300px] lg:min-w-[320px]"
                >
                  <div className="aspect-[16/9] w-full">
                    <iframe
                      src={video.embedUrl}
                      title={video.title}
                      className="h-full w-full"
                      loading="lazy"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                  <div className="p-3">
                    <p className="text-overline uppercase text-teal">{video.subtitle}</p>
                    <h3 className="mt-1 font-heading text-heading-sm font-semibold text-navy">{video.title}</h3>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className="mt-8 flex justify-center">
            <Button href="/gallery" size="lg">
              Watch More Patient Stories
            </Button>
          </div>
        </div>
      </div>
    </SectionShell>
  );
}
