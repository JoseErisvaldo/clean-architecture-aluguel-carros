import { Container } from "@mui/material";

type ContainerLayoutProps = {
  children: React.ReactNode | React.ReactNode[];
};

export default function ContainerLayout({ children }: ContainerLayoutProps) {
  return (
    <Container
      maxWidth={false}
      sx={{
        maxWidth: "1440px",
        mx: "auto",
        px: 3,
        py: 2,
        minHeight: "100vh",
        boxSizing: "border-box",
      }}
    >
      {children}
    </Container>
  );
}
