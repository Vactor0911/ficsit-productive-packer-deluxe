import {
  OverlayScrollbarsComponent,
  type OverlayScrollbarsComponentProps,
} from "overlayscrollbars-react";
import "overlayscrollbars/overlayscrollbars.css";
import type { ReactNode } from "react";

interface StyledOverlayScrollbarsComponent
  extends OverlayScrollbarsComponentProps {
  children: ReactNode;
  css?: React.CSSProperties;
}

const StyledOverlayScrollbarsComponent = (
  props: StyledOverlayScrollbarsComponent
) => {
  const { children, css, ...others } = props;

  return (
    <OverlayScrollbarsComponent
      css={{
        height: "100%",
        "& .os-scrollbar": {
          "--os-size": "12px",
          "--os-handle-bg": "white",
          "--os-handle-border-radius": "2px",
          "--os-handle-border": "1px solid #aaa",
          position: "absolute",
          zIndex: 10000,
        },
        ...css,
      }}
      {...others}
    >
      {children}
    </OverlayScrollbarsComponent>
  );
};

export default StyledOverlayScrollbarsComponent;
