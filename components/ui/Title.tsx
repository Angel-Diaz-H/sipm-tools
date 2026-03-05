interface Props {
  text: string;
  className?: string;
}

export const Title = ({ text, className }: Props) => {
  return <div className={`mb-4 text-4xl font-bold ${className}`}>{text}</div>;
};
