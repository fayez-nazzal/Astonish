/** @jsxImportSource @theme-ui/core */
import { IChevronProps } from "./index.types";

const Chevron = ({ direction }: IChevronProps) => {
  return (
    <svg
      className="c-chevron"
      viewBox="0 0 16 16"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      transform={`rotate(${direction !== "left" ? "180" : "0"})`}
    >
      <path
        sx={{
          fill: "arrow-icon",
        }}
        d="M2.9 8l8-8 2.2 2.1-5.9 5.9 5.9 5.9-2.2 2.1z"
      ></path>
    </svg>
  );
};

export default Chevron;
