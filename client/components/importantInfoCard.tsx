import { Card, CardContent, Divider, Stack, Typography } from "@mui/material";
import styles from "@/styles/importantInfo.module.css";
import { StaticImageData } from "next/image";
import defaultImage from "@/public/holdingHands.jpg";

interface importantInfoCardProps {
  reversed?: boolean;
  image?: StaticImageData;
  title: string;
  body: string;
}

export const ImportantInfoCard = ({
  reversed = false,
  image = defaultImage,
  title,
  body,
}: importantInfoCardProps) => {
  return (
    <>
      {reversed === false ? (
        <Card className={styles["info-card"]}>
          <CardContent className={styles["info-card-content"]}>
            <div
              className={styles["info-card-image"]}
              style={{
                backgroundImage: `url(${image.src})`,
              }}
            ></div>
            <Divider
              orientation="vertical"
              className={styles["info-card-divider"]}
              flexItem
            ></Divider>
            <div className={styles["info-card-text"]}>
              <Stack direction="column">
                <Typography className={styles["info-h3"]} variant="h3">
                  {title}
                </Typography>
                <Typography className={styles["info-body"]} variant="body1">
                  {body}
                </Typography>
              </Stack>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card className={styles["info-card"]}>
          <CardContent className={styles["info-card-content"]}>
            <div className={styles["info-card-text"]}>
              <Stack direction="column">
                <Typography className={styles["info-h3"]} variant="h3">
                  {title}
                </Typography>
                <Typography className={styles["info-body"]} variant="body1">
                  {body}
                </Typography>
              </Stack>
            </div>
            <Divider
              orientation="vertical"
              className={styles["info-card-divider"]}
              flexItem
            ></Divider>
            <div className={styles["info-card-image"]}></div>
          </CardContent>
        </Card>
      )}
    </>
  );
};
