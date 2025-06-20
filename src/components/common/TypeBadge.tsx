import React from "react";
import { getTypeBadge } from "../../utils/getTypeBadge";

interface TypeBadgeProps {
  type: string;
}

const TypeBadge: React.FC<TypeBadgeProps> = ({ type }) => {
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
