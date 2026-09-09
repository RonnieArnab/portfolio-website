export default function PixelButton({
  as = "button",
  variant = "solid",
  className = "",
  children,
  ...rest
}) {
  const Comp = as;
  const cls = [
    "pixel-btn",
    variant === "lite" ? "pixel-btn-lite" : "",
    className,
  ].join(" ");
  return (
    <Comp className={cls} {...rest}>
      {children}
    </Comp>
  );
}
