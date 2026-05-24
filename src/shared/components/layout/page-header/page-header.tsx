import { Box, Breadcrumbs, Link, Stack, Typography } from "@mui/material";

type BreadcrumbItem = {
  title: string;
  segment: string;
};

type PageHeaderProps = {
  title: string;
  subheader?: string;
  children?: React.ReactNode;
  slotProps?: {
    breadcrumb?: {
      items: BreadcrumbItem[];
      router?: {
        navigate: (to: string) => void;
      };
    };
  };
};

export function PageHeader({
  title,
  subheader,
  slotProps,
  children,
}: PageHeaderProps) {
  const breadcrumb = slotProps?.breadcrumb;

  return (
    <Box sx={{ mb: 3 }}>
      <Stack
        direction="row"
        spacing={2}
        sx={{ minHeight: 40, alignItems: "center", mb: 1 }}
      >
        {breadcrumb?.items?.length ? (
          <Breadcrumbs sx={{ display: "flex", alignItems: "center" }}>
            {breadcrumb.items.map((item, index) => {
              const isLast = index === breadcrumb.items.length - 1;
              const canNavigate = Boolean(
                breadcrumb.router?.navigate && item.segment,
              );

              if (isLast && !canNavigate) {
                return (
                  <Typography key={item.segment} color="text.primary">
                    {item.title}
                  </Typography>
                );
              }

              return (
                <Link
                  key={item.segment}
                  underline="hover"
                  color={isLast ? "text.primary" : "inherit"}
                  onClick={() => breadcrumb.router?.navigate(item.segment)}
                  sx={{
                    cursor: "pointer",
                    fontWeight: isLast ? 500 : 400,
                  }}
                >
                  {item.title}
                </Link>
              );
            })}
          </Breadcrumbs>
        ) : (
          <Box />
        )}
      </Stack>

      <Typography variant="h5" sx={{ fontWeight: 700 }}>
        {title}
      </Typography>

      {subheader && (
        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
          {subheader}
        </Typography>
      )}
      <Box sx={{ mt: 2, display: "flex", gap: 2, justifyContent: "flex-end" }}>
        {children}
      </Box>
    </Box>
  );
}
