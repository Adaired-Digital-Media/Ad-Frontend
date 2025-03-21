import { MouseEventHandler } from 'react';
import { Icons } from './../Icons';
import Link from 'next/link';
import { Button as RizzButtton } from 'rizzui';

type ButtonProps = {
  title: string;
  icon?: keyof typeof Icons;
  className?: string;
  textClassName?: string;
  svgClassName?: string;
  svgInnerClassName?: string;
  navigateTo?: string;
  target?: string;
  rel?: string;
  type?: 'button' | 'submit' | 'reset';
  onClick?: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  loading?: boolean;
};

const Button: React.FC<ButtonProps> = (props) => {
  const SelectedIcon = props.icon
    ? Icons[props.icon]
    : Icons['ArrowRightBroken'];

  const buttonContent = (
    <>
      {props.title && (
        <p className={`font-nunito text-lg ${props.textClassName}`}>
          {props.title}
        </p>
      )}

      <span
        className={`absolute left-[calc(100%-45px)] rounded-full p-1 font-nunito transition-all duration-500 ease-in-out group-hover/btn:left-[7px] ${props.svgClassName}`}
      >
        <SelectedIcon
          className={`text-3xl text-white ${props.svgInnerClassName}`}
        />
      </span>
    </>
  );

  return (
    <>
      {props.navigateTo ? (
        <Link
          href={props.navigateTo || ''}
          target={props.target || '_self'}
          rel={props.rel || 'noreferrer'}
          aria-label="Link to page"
        >
          <RizzButtton
            className={`group/btn relative inline-flex items-center justify-start overflow-hidden rounded-full border-2 !py-6 pl-4 pr-14 text-black transition-all duration-500 ease-in-out hover:bg-white hover:pl-14 hover:pr-4 ${props.className}`}
            aria-label="Your Accessible Button Name"
            name="button"
            disabled={props.disabled}
            isLoading={props.loading}
          >
            {buttonContent}
          </RizzButtton>
        </Link>
      ) : (
        <RizzButtton
          className={`group/btn relative inline-flex items-center justify-start overflow-hidden rounded-full border-2  !py-6 pl-4 pr-14 text-black transition-all duration-500 ease-in-out hover:bg-white hover:pl-14 hover:pr-4 ${props.className}`}
          type={props.type}
          onClick={props.onClick}
          aria-label="Your Accessible Button Name"
          name="button"
          disabled={props.disabled}
          isLoading={props.loading}
        >
          {buttonContent}
        </RizzButtton>
      )}
    </>
  );
};

export default Button;
