import { type ComponentPropsWithoutRef, type ReactNode } from "react";
import { Link } from "react-router-dom";

type ButtonType = {
  textOnly: boolean;
  children: ReactNode;
} & ComponentPropsWithoutRef<"button">;

type LinkType = {
  to: string;
} & ComponentPropsWithoutRef<"a"> &
  ButtonType;

type PropsType = LinkType | ButtonType;

function Button(props: PropsType) {
  if ("to" in props) {
    const { textOnly, children, className, to, ...rest } = props;
    return (
      <Link
        to={to}
        {...rest}
        className={`button ${textOnly ? "button--text-only" : ""}`}
      >
        {children}
      </Link>
    );
  }

  const { textOnly, children, className, ...rest } = props;
  return (
    <button
      className={`button ${textOnly ? "button--text-only" : ""}`}
      {...rest}
    >
      {children}
    </button>
  );
}

export default Button;
