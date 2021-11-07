import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

type Props = {
    title: string;
    message: string;
    confirmMsg: string;
    cancelMsg: string;
    onConfirm: () => void;
    onCancel: () => void;
};
export const Confirm: React.FC<Props> = ({
    title,
    message,
    confirmMsg,
    cancelMsg,
    onCancel,
    onConfirm,
}): JSX.Element => {
    return (
        <div>
            <Dialog
                open={true}
                onClose={onCancel}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {title}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {message}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onCancel}>{cancelMsg}</Button>
                    <Button onClick={onConfirm} autoFocus>
                        {confirmMsg}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};
