import { getTypeBadge } from "../../utils/getTypeBadge";

interface TypeBadgeProps {
  type: string;
}

const TypeBadge = ({ type }: TypeBadgeProps) => {
  const typeStyles = getTypeBadge(type);

  return (
    <span
      className={`inline-flex items-center gap-2 px-3 py-1 rounded-lg border ${typeStyles.border} ${typeStyles.text} text-sm font-medium capitalize`}
    >
      {type}
    </span>
  );
};

export default TypeBadge;
