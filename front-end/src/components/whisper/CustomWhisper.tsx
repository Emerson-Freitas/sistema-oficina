import React, { JSXElementConstructor, ReactElement } from 'react'
import { Tooltip, Whisper } from "rsuite";
import { TypeAttributes } from 'rsuite/esm/@types/common';
import { OverlayTriggerType } from 'rsuite/esm/Overlay/OverlayTrigger';

interface Props {
    message: string
    placement?: TypeAttributes.Placement | undefined
    controlId: string
    trigger: OverlayTriggerType
    content: JSX.Element
}

const CustomWhisper = ({ message, placement, controlId, trigger, content }: Props) => {
  const tooltip = (
    <Tooltip><i>{message}</i></Tooltip>
  );

  return (
    <Whisper
      placement={placement ? placement : "top"}
      controlId={controlId}
      trigger={trigger}
      speaker={tooltip}
   >
    {content}
    </Whisper>
  );
}

export default CustomWhisper