import NextLink from "next/link";
import { AnchorHTMLAttributes, FC, forwardRef } from "react";

interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  path: string;
}

const Link: FC<LinkProps> = ({ path, children, className, ...props }) => {
  className = (className ?? "text-blue-700") + "no-underline hover:underline";
  return (
    <NextLink href={path}>
      <a className={className} {...props}>
        {children}
      </a>
    </NextLink>
  );
};

export default Link;
