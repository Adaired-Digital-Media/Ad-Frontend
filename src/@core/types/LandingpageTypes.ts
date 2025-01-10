export type IHeroSection = {
  title?: string;
  description?: string;
  buttonText?: string;
  buttonLink?: string;
  phoneNumber?: string;
  imageUrl?: string;
};

export type IStandOutSection = {
  subHeadingIconUrl: string;
  subHeadingText: string;
  isSvg: boolean;
  title: string;
  description: string;
  listItems: string[];
};

export type IApproachSectionIconList = {
  icon: string;
  title: string;
  description: string;
};

export type IApproachSection = {
  title: string;
  description: string;
  iconList: IApproachSectionIconList[];
};

export type IsurferSEOIconList = {
  icon: string;
  title: string;
  description: string;
};

export type IsurferSEOImages = {
  src: string;
  alt: string;
};

export type ISurferSEOSection = {
  icon: string;
  title: string;
  iconList: IsurferSEOIconList[];
  image: IsurferSEOImages;
};

export type IBHWServices = {
  _id: string;
  name: string;
  description: string;
  slug: string;
  products: any[];
  status: string;
};

export type IFAQSection = {
  title: string;
  content: string;
};
