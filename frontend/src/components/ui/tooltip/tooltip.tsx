import { ReactNode, useRef, useState, useEffect } from "react";
import styles from "./tooltip.module.scss";
import { createPortal } from "react-dom";

interface ITooltip {
  children: ReactNode;
  position: "top" | "right" | "left" | "bottom";
  content: string;
  className?: string;
}

export default function Tooltip({
  children,
  position,
  content,
  className,
}: ITooltip) {
  const [isVisible, setIsVisible] = useState(false);
  const [tooltipStyle, setTooltipStyle] = useState<React.CSSProperties>({});
  const tooltipRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => setIsVisible(true);
  const handleMouseLeave = () => setIsVisible(false);

  useEffect(() => {
    if (isVisible && triggerRef.current && tooltipRef.current) {
      const triggerRect = triggerRef.current.getBoundingClientRect();
      const tooltipRect = tooltipRef.current.getBoundingClientRect();

      const style: React.CSSProperties = {};
      switch (position) {
        case "top":
          style.left = triggerRect.left + triggerRect.width / 2 - tooltipRect.width / 2;
          style.top = triggerRect.top - tooltipRect.height - 8; 
          break;
        case "bottom":
          style.left = triggerRect.left + triggerRect.width / 2 - tooltipRect.width / 2;
          style.top = triggerRect.bottom + 10;
          break;
        case "left":
          style.left = triggerRect.left - tooltipRect.width - 8;
          style.top = triggerRect.top + triggerRect.height / 2 - tooltipRect.height / 2;
          break;
        case "right":
          style.left = triggerRect.right + 8;
          style.top = triggerRect.top + triggerRect.height / 2 - tooltipRect.height / 2;
          break;
        default:
          break;
      }
      setTooltipStyle(style);
    }
  }, [isVisible, position]);

  return (
    <>
      <div
        className={`${styles.tooltipTrigger} ${className || ""}`}
        ref={triggerRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {children}
      </div>
      {isVisible &&
        createPortal(
          <div
            className={`${styles.tooltipContent} ${styles[position]}`}
            ref={tooltipRef}
            style={tooltipStyle}
          >
            {content}
          </div>,
          document.body
        )}
    </>
  );
}
