'use client';
import * as React from 'react';
import Autoplay from 'embla-carousel-autoplay';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@core/ui/shadcn-ui/carousel';
import Image from 'next/image';
import MaxWidthWrapper from '@web-components/MaxWidthWrapper';
import { Icons } from '@web-components/Icons';
import Heading from '../../common/Heading';

const TestimonialSlider = () => {
  type Data = {
    img: string;
    name: string;
    review: string;
  };

  const data: Data[] = [
    {
      img: '',
      name: 'Tom Allen Jr.',
      review:
        'I was impressed with their work, the team is very experienced. They are able to manage all my social media accounts in a very professional manner.',
    },
    {
      img: '',
      name: 'Marianne Thomas',
      review:
        "They worked incredibly hard on my projects and consistently delivered excellent outcomes 💥. All I can say this is the best IT firm I've ever worked with.",
    },
    {
      img: '',
      name: 'Gloria Oliver',
      review:
        'My experience with the company was amazing. They worked incredibly well on our recent project. We are more than happy with the final results.',
    },
    {
      img: '',
      name: 'Rath Lora',
      review:
        "It's great to deal with Adaired digital. They are responsive and if you have any trouble they are available almost 24/7. I love their project management tool. Kudos to you.",
    },
    {
      img: '',
      name: 'Glenn Russell',
      review:
        "AdAired Digital Media's CPC service has helped me increase my website's traffic and reach the target audience better. Their team of experts helped me create a customized campaign, which has improved my business's ROI. I'd recommend their CPC services to anyone looking to boost their online presence.",
    },
  ];

  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true })
  );

  const handleMouseEnter = () => {
    plugin.current.stop();
  };

  const handleMouseLeave = () => {
    plugin.current.play();
  };

  return (
    <section className="bg-[#FAFFF3] pb-20 pt-6 sm:pb-16 sm:pt-12">
      <MaxWidthWrapper>
        <Heading
          subTitle={'Not Convinced?'}
          title={'Check Out What Our Clients Want To Say!'}
          span={''}
          description={`These are the genuine experiences of our clients regarding
            Adaired&apos;s digital marketing services. The service quality and
            client satisfaction we focus on define our unwavering commitment
            and make us the most trusted digital marketing company.`}
        />
        <div className="pt-10">
          <Carousel
            opts={{
              align: 'start',
              loop: true,
            }}
            plugins={[plugin.current]}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <CarouselContent className="-ml-0 pb-6 md:-ml-1">
              {data.map((item) => (
                <CarouselItem
                  key={item.name}
                  className="rounded-lg border border-[#8EC640] pb-3 pl-2 pr-3 pt-3 md:basis-1/2 md:border-none md:p-0 md:pl-3 lg:basis-1/2"
                >
                  <div className="flex gap-10 pl-6">
                    <div className="relative max-h-24 sm:max-h-32">
                      <div className="absolute left-1/2 top-0 h-24 w-1.5 -translate-x-1/2 rounded-full bg-[#D2EAB1] sm:h-32" />
                      <div className="z-2 absolute left-1/2 top-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-4 border-[#D2EAB1] bg-[#8EC640] text-white sm:h-12 sm:w-12">
                        <Icons.Quote />
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center gap-5">
                        {item.img ? (
                          <Image
                            src={item.img}
                            alt="User Avatar"
                            height={50}
                            width={50}
                          />
                        ) : (
                          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#c2c2c2]">
                            {item.name[0].toUpperCase()}
                          </div>
                        )}
                        <h3>{item.name}</h3>
                      </div>
                      <p className="pt-4">{item.review}</p>
                      <Image
                        src={'/assets/images/rating-star.svg'}
                        alt="Rating"
                        width={100}
                        height={50}
                        className="pt-4"
                      />
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

            <div className="relative mx-auto max-w-[100px] pt-5 sm:static sm:max-w-full sm:pt-0">
              <CarouselPrevious className="left-0 top-[110%] w-10 flex-none rounded-lg border-none bg-[#515151] text-white transition-all hover:bg-[#8EC640] hover:text-white sm:left-0 sm:mr-2 sm:w-8 sm:translate-x-0 sm:rounded-full sm:bg-transparent sm:text-[#A7A9AC] sm:after:absolute sm:after:right-[-30%] sm:after:h-10 sm:after:w-0.5 sm:after:bg-[#A7A9AC] sm:after:content-[''] sm:hover:bg-transparent sm:hover:text-[#FB9100]">
                <Icons.ArrowLeft className="hover:scale-125" />
              </CarouselPrevious>

              <CarouselNext className="right-0 top-[110%] w-10 flex-none rounded-lg border-none bg-[#515151] text-white transition-all hover:bg-[#8EC640] hover:text-white sm:left-12 sm:w-8 sm:rounded-full sm:bg-transparent sm:text-[#A7A9AC] sm:hover:bg-transparent sm:hover:text-[#FB9100]">
                <Icons.ArrowRight className="hover:scale-125" />
              </CarouselNext>
            </div>
          </Carousel>
        </div>
      </MaxWidthWrapper>
    </section>
  );
};
export default TestimonialSlider;
