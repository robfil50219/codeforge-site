import cn from "../../utils/cn";

type Props = React.PropsWithChildren<{
  className?: string;
  as?: React.ElementType;
}>;

export default function Container({ className, as: Tag = "div", children }: Props) {
  return (
    <Tag className={cn("mx-auto max-w-7xl px-4 sm:px-6 lg:px-8", className)}>
      {children}
    </Tag>
  );
}