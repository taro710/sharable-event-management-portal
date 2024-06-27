'use client';

import EventEditContainer from '@/components/containers/event/EventEditContainer';
import DialogWrapper from '@/components/presentations/Dialog/DialogWrapper';
import { EventData } from '@/domain/event';

type Props = {
  isOpen: boolean;
  closeDialog: () => void;
  handleSubmit: (data: EventData) => Promise<void>;
};
const DialogOverviewEdit = ({ isOpen, closeDialog, handleSubmit }: Props) => (
    <DialogWrapper closeDialog={closeDialog} isOpen={isOpen}>
      <EventEditContainer handleSubmit={handleSubmit} />
    </DialogWrapper>
  );

export default DialogOverviewEdit;
