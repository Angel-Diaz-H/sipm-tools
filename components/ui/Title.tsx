import { ComponentType } from "react";

interface Props {
  text: string;
  // Icon: ComponentType<React.SVGProps<SVGSVGElement>>;
  className?: string;
}

export const Title = ({ text, className }: Props) => {
  return (
    <div
      className={`mb-4 flex items-center gap-2 text-4xl font-bold ${className}`}
    >
      {/* {Icon && <Icon className="inline-block h-10 w-10" />} */}
      {text}.
    </div>
  );
};
