export interface SVGButtonProps {
  icon: React.ElementType | JSX.Element;
  onClick: () => void;
  disabled?: boolean;
  className?: string;
  ariaLabel?: string;
}
