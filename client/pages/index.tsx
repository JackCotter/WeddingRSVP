import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import RsvpModal from "@/components/modals/rsvpModal";
import style from "@/styles/Home.module.css";

export default function Home() {
  const [showRsvpModal, setShowRsvpModal] = useState(false);

  return (
    <div className={style["background-container"]}>
      <Button
        className={style["rsvp-button"]}
        onClick={() => setShowRsvpModal(true)}
        size="large"
        variant="contained"
      >
        RSVP
      </Button>
      {showRsvpModal && <RsvpModal onClose={() => setShowRsvpModal(false)} />}
    </div>
  );
}
