import {
  Box,
  Breadcrumbs,
  Button,
  Link,
  Stack,
  Typography,
} from "@mui/material";

type BreadcrumbItem = {
  title: string;
  segment: string;
};

type PageHeaderProps = {
  title: string;
  subheader?: string;
  slotProps?: {
    breadcrumb?: {
      items: BreadcrumbItem[];
      router?: {
        navigate: (to: string) => void;
      };
    };
    action?: {
      label: string;
      onClick: () => void;
    };
  };
};

export function PageHeader({ title, subheader, slotProps }: PageHeaderProps) {
  const breadcrumb = slotProps?.breadcrumb;
  const action = slotProps?.action;

  return (
    <Box sx={{ mb: 3 }}>
      <Stack
        direction="row"
        spacing={2}
        sx={{ minHeight: 40, alignItems: "center", mb: 1 }}
      >
        {action && (
          <Button
            size="small"
            variant="outlined"
            onClick={action.onClick}
            sx={{ whiteSpace: "nowrap" }}
          >
            {action.label}
          </Button>
        )}

        {breadcrumb?.items?.length ? (
          <Breadcrumbs
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            {breadcrumb.items.map((item, index) => {
              const isLast = index === breadcrumb.items.length - 1;

              if (isLast) {
                return (
                  <Typography
                    key={item.segment}
                    color="text.primary"
                    sx={{ display: "flex", alignItems: "center" }}
                  >
                    {item.title}
                  </Typography>
                );
              }

              return (
                <Link
                  key={item.segment}
                  underline="hover"
                  color="inherit"
                  onClick={() => breadcrumb.router?.navigate(item.segment)}
                  sx={{
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
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
        <Box sx={{ mt: 0.5 }}>
          <Typography variant="body2" color="text.secondary">
            {subheader}
          </Typography>
        </Box>
      )}
    </Box>
  );
}
