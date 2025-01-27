import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";
import { type FC, Fragment } from "react";

import { useI18n } from "../../i18n/i18n-main";

import "./generic-pop-up.scss";

interface GenericPopUpProps {
  type: "edit" | "delete" | "copy";
  handleApprove: () => void;
  handleReject: () => void;
  showCancelButton?: boolean;
  isOpen: boolean;
}

const GenericPopUp: FC<GenericPopUpProps> = ({
  type,
  handleApprove,
  handleReject,
  showCancelButton = true,
  isOpen,
}) => {
  const i18n = useI18n((i18n) => i18n.genericPopUp);

  const getTitleAndDescription = (type: "edit" | "delete" | "copy") => {
    switch (type) {
      case "edit":
        return {
          title: i18n.editNotice,
          description: i18n.warningEditSave,
        };
      case "delete":
        return {
          title: i18n.areYouSureDeleting,
          description: i18n.deleteWarning,
        };
      case "copy":
        return {
          title: i18n.copiedLink,
          description: i18n.approveCopyLink,
        };
      default:
        return {
          title: "",
          description: "",
        };
    }
  };
  const { title, description } = getTitleAndDescription(type);

  return (
    <Fragment>
      <Dialog
        open={isOpen}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        dir="rtl"
        PaperProps={{
          className: "custom-dialog",
        }}
      >
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{description}</DialogContentText>
        </DialogContent>
        <DialogActions>
          {showCancelButton && (
            <Button className="cancel-button" onClick={handleReject}>
              {i18n.cancel}
            </Button>
          )}
          <Button onClick={handleApprove} className="agree-button">
            {i18n.approve}
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};

export default GenericPopUp;
