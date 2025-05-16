import { forwardRef, type ComponentPropsWithoutRef } from "react";

type InputProps = {
  label: string;
  id: string;
} & ComponentPropsWithoutRef<"input">;

export default forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, id, ...props },
  ref
) {
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <input id={id} {...props} ref={ref}></input>
    </div>
  );
});
