'use client';

import EventEditContainer from '@/components/containers/event/EventEditContainer';
import DialogWrapper from '@/components/presentations/Dialog/DialogWrapper';
import { EventData } from '@/domain/event';

type Props = {
  isOpen: boolean;
  closeDialog: () => void;
  onSubmit: (data: EventData) => Promise<void>;
};
const DialogOverviewEdit = ({ isOpen, closeDialog, onSubmit }: Props) => (
  <DialogWrapper closeDialog={closeDialog} isOpen={isOpen}>
    <EventEditContainer onSubmit={onSubmit} />
  </DialogWrapper>
);

export default DialogOverviewEdit;
