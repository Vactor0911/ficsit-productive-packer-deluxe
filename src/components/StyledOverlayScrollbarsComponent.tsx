import styled from "@emotion/styled";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import "overlayscrollbars/overlayscrollbars.css";

const StyledOverlayScrollbarsComponent = styled(OverlayScrollbarsComponent)`
  height: 100%;
  .os-scrollbar {
    --os-size: 12px;
    --os-handle-bg: white;
    --os-handle-border-radius: 2px;
    --os-handle-border: 1px solid #aaa;
`;

export default StyledOverlayScrollbarsComponent;
