import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

type Props = {
    onConfirm: () => void;
    onCancel: () => void;
};
export const ConfirmSaveBook: React.FC<Props> = ({
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
                    {"Livre déjà enregistré ?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Un livre avec le même titre ou le même numéro ISBN est déjà présent dans votre liste<br/>
                        Que voulez-vous faire ?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onCancel}>Annuler</Button>
                    <Button onClick={onConfirm} autoFocus>
                        Enregistrer
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};
