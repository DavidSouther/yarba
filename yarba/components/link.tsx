import NextLink from "next/link";
import { AnchorHTMLAttributes, FC, forwardRef } from "react";

interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  path: string;
}

const Link: FC<LinkProps> = ({
  path,
  children,
  className = "no-underline hover:underline text-blue-700",
  ...props
}) => (
  <NextLink href={path}>
    <a className={className} {...props}>
      {children}
    </a>
  </NextLink>
);

export default Link;
