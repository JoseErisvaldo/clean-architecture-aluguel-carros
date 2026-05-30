import { Box, Card, CardContent, Divider, Skeleton } from "@mui/material";

export default function CarDetailsSkeleton() {
  return (
    <Box
      sx={{
        display: "flex",
      }}
    >
      <Card
        sx={{
          width: "100%",
          borderRadius: 2,
        }}
      >
        <CardContent sx={{ p: 4 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box>
              <Skeleton width={200} height={30} />
              <Skeleton width={120} height={20} />
            </Box>

            <Skeleton variant="rounded" width={120} height={32} />
          </Box>

          <Divider sx={{ my: 3 }} />

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "1fr 1fr",
              },
              gap: 2,
            }}
          >
            {Array.from({ length: 6 }).map((_, index) => (
              <Box
                key={index}
                sx={{
                  p: 2,
                  borderRadius: 2,
                  background: "#fafafa",
                  border: "1px solid #eee",
                }}
              >
                <Skeleton width={80} height={15} />
                <Skeleton width="60%" height={25} />
              </Box>
            ))}
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
