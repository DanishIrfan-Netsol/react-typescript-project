import React, { Fragment, useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useNavigate } from "react-router-dom";

interface LoginDialogProps {
  openDialog: boolean;
  setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function LoginDialog(props: LoginDialogProps) {
  const navigate = useNavigate();
  const { openDialog, setOpenDialog } = props;

  console.log("Login Dialog rendered");

  const handleClose = () => {
    setOpenDialog(false);
  };

  useEffect(() => {
    setOpenDialog(openDialog);
  }, [openDialog]);

  return (
    <Fragment>
      <Dialog
        open={openDialog}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            navigate("/login");
            handleClose();
          },
        }}
      >
        <DialogTitle>Login Required</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this product and enjoy personalized updates, please
            log in to your account.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Login</Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
}
