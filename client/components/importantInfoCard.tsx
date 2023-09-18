import { Card, CardContent, Divider, Stack, Typography } from "@mui/material";
import styles from "@/styles/importantInfo.module.css";

interface importantInfoCardProps {
  reversed?: boolean;
  imagePath: string;
  title: string;
  body: string;
}

export const ImportantInfoCard = ({
  reversed = false,
  imagePath = "",
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
                backgroundImage: 'url("../public/main.jpg")',
              }}
            ></div>
            <Divider
              orientation="vertical"
              className={styles["info-card-divider"]}
              flexItem
            ></Divider>
            <div className={styles["info-card-text"]}>
              <Stack direction="column">
                <Typography className={styles["cursive-h3"]} variant="h3">
                  {title}
                </Typography>
                <Typography className={styles["cursive-body"]} variant="body1">
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
                <Typography className={styles["cursive-h3"]} variant="h3">
                  {title}
                </Typography>
                <Typography className={styles["cursive-body"]} variant="body1">
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
