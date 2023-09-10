import {
  Alert,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
} from "@mui/material";
import { useState } from "react";
import CheckIcon from "@mui/icons-material/Check";
import { dietaryRestrictions, rsvp, songRequest } from "@/utils/apiUtils";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import * as yup from "yup";
import styles from "@/styles/rsvpModal.module.css";

interface RsvpModalProps {
  onClose: () => void;
}

const RsvpModal = (props: RsvpModalProps) => {
  const [errorBar, setErrorBar] = useState<{
    show: boolean;
    message: string;
    error: boolean;
  }>({ show: false, message: "", error: true });
  const router = useRouter();
  const rsvpUser = async () => {
    const rsvpQuery = await rsvp(
      formik.values.email,
      formik.values.name,
      formik.values.attending,
      formik.values.guest
    );
    const songQuery = await songRequest(
      formik.values.email,
      formik.values.name,
      formik.values.songRequest
    );
    const dietQuery = await dietaryRestrictions(
      formik.values.email,
      formik.values.name,
      formik.values.dietaryRestrictions
    );
    if (rsvpQuery.status !== 200) {
      setErrorBar({ show: true, message: rsvpQuery.message, error: true });
    } else if (songQuery.status !== 200) {
      setErrorBar({ show: true, message: songQuery.message, error: true });
    } else if (dietQuery.status !== 200) {
      setErrorBar({ show: true, message: dietQuery.message, error: true });
    } else {
      router.push("/rsvpSuccess");
    }
  };
  const formik = useFormik({
    initialValues: {
      email: "",
      name: "",
      attending: true,
      needsGuest: false,
      guest: "",
      songRequest: "",
      dietaryRestrictions: "",
    },
    validationSchema: yup.object({
      email: yup
        .string()
        .email("Please enter a valid email")
        .required("Please provide your email address"),
      name: yup.string().required("Please provide your name"),
      attending: yup.boolean(),
      guest: yup.string(),
    }),
    validateOnChange: false,
    onSubmit: () => rsvpUser(),
  });
  return (
    <Dialog open={true} onClose={props.onClose}>
      <DialogTitle className={styles["modal-title"]}>RSVP</DialogTitle>
      <DialogContent>
        <form onSubmit={formik.handleSubmit}>
          <Stack
            className={styles["wrapper"]}
            spacing={2}
            direction="column"
            style={{ minWidth: "500px" }}
          >
            {errorBar.show && (
              <Alert severity={errorBar.error ? "error" : "success"}>
                {errorBar.message
                  ? errorBar.message
                  : "There was a server error"}
              </Alert>
            )}
            <TextField
              label="Name"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              error={formik.errors.name !== undefined}
              helperText={formik.errors.name}
            />
            <TextField
              label="Email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.errors.email !== undefined}
              helperText={formik.errors.email}
            />
            <Button
              variant={formik.values.needsGuest ? "contained" : "outlined"}
              name="needsGuest"
              onClick={() =>
                formik.setFieldValue("needsGuest", !formik.values.needsGuest)
              }
              startIcon={formik.values.needsGuest && <CheckIcon />}
            >
              Bringing a guest?
            </Button>
            {formik.values.needsGuest && (
              <TextField
                label="Guest Name"
                name="guest"
                value={formik.values.guest}
                onChange={formik.handleChange}
              />
            )}
            <Button
              variant={formik.values.attending ? "contained" : "outlined"}
              name="attending"
              id="attending"
              onClick={() =>
                formik.setFieldValue("attending", !formik.values.attending)
              }
              startIcon={formik.values.attending && <CheckIcon />}
            >
              Attending
            </Button>
            <TextField
              label="Song Requests"
              name="songRequest"
              value={formik.values.songRequest}
              onChange={formik.handleChange}
            />
            <TextField
              label="Dietary Restrictions"
              name="dietaryRestrictions"
              value={formik.values.dietaryRestrictions}
              onChange={formik.handleChange}
            />
            <Button type="submit" variant="contained">
              {" "}
              Submit{" "}
            </Button>
          </Stack>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default RsvpModal;
