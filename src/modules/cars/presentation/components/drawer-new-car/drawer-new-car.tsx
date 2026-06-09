import {
  Box,
  Select,
  MenuItem,
  TextField,
  FormControl,
  InputLabel,
  FormHelperText,
} from "@mui/material";

import DrawerRight from "../../../../../shared/components/ui/drawer-right/drawer-right";
import { useFilterBrandsQueries } from "../../queries/use-filter-brands-queries";
import { useFilterModelsQuery } from "../../queries/use-filter-models.queies";
import { Controller } from "react-hook-form";

import { useCreateNewCar } from "../../hooks/use-create-new-car";

export default function DrawerNewCar({
  openDrawer,
  handleCloseDrawer,
  title,
}: {
  openDrawer: boolean;
  handleCloseDrawer: () => void;
  title: string;
}) {
  const {
    data: filterModels,
    isLoading: filterModelsLoading,
    error: filterModelsError,
  } = useFilterModelsQuery();

  const {
    data: filterBrands,
    isLoading: filterBrandsLoading,
    error: filterBrandsError,
  } = useFilterBrandsQueries();

  const {
    register,
    handleSubmit,
    onSubmit,
    control,
    errors,
    isPending,
    //isSuccess,
    //errorDtails,
  } = useCreateNewCar({
    handleCloseDrawer,
  });

  return (
    <DrawerRight
      title={title}
      openDrawer={openDrawer}
      handleCloseDrawer={handleCloseDrawer}
      onSubmit={handleSubmit(onSubmit)}
      loading={isPending}
      //success={isSuccess}
      //error={
      //  errorDtails
      //    ? "Erro ao criar carro. Verifique os dados e tente novamente."
      //    : null
      //}
    >
      <Box display="flex" flexDirection="column" gap={2}>
        <Controller
          name="brand"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <FormControl fullWidth error={!!errors.brand}>
              <InputLabel>Marca</InputLabel>
              <Select {...field} label="Marca">
                {filterBrands?.length ? (
                  filterBrands.map((brand) => (
                    <MenuItem key={brand.id} value={brand.name}>
                      {brand.name}
                    </MenuItem>
                  ))
                ) : filterBrandsLoading ? (
                  <MenuItem disabled>Carregando marcas...</MenuItem>
                ) : filterBrandsError ? (
                  <MenuItem disabled>Erro ao carregar marcas</MenuItem>
                ) : (
                  <MenuItem disabled>Nenhuma marca disponível</MenuItem>
                )}
              </Select>
              <FormHelperText>{errors.brand?.message}</FormHelperText>
            </FormControl>
          )}
        />

        <Controller
          name="model"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <FormControl fullWidth error={!!errors.model}>
              <InputLabel>Modelo</InputLabel>
              <Select {...field} label="Modelo">
                {filterModels?.length ? (
                  filterModels.map((model) => (
                    <MenuItem key={model.id} value={model.name}>
                      {model.name}
                    </MenuItem>
                  ))
                ) : filterModelsLoading ? (
                  <MenuItem disabled>Carregando modelos...</MenuItem>
                ) : filterModelsError ? (
                  <MenuItem disabled>Erro ao carregar modelos</MenuItem>
                ) : (
                  <MenuItem disabled>Nenhum modelo disponível</MenuItem>
                )}
              </Select>
              <FormHelperText>{errors.model?.message}</FormHelperText>
            </FormControl>
          )}
        />

        <TextField
          fullWidth
          label="Ano"
          type="number"
          {...register("year")}
          error={!!errors.year}
          helperText={errors.year?.message}
        />

        <TextField
          fullWidth
          label="Placa"
          {...register("plate")}
          error={!!errors.plate}
          helperText={errors.plate?.message}
        />

        <TextField
          fullWidth
          label="Preço diário"
          type="number"
          {...register("daily_price")}
          error={!!errors.daily_price}
          helperText={errors.daily_price?.message}
        />

        <Controller
          name="status"
          control={control}
          defaultValue="available"
          render={({ field }) => (
            <FormControl fullWidth error={!!errors.status}>
              <InputLabel>Status</InputLabel>
              <Select {...field} label="Status">
                <MenuItem value="available">Disponível</MenuItem>
                <MenuItem value="unavailable">Indisponível</MenuItem>
              </Select>
              <FormHelperText>{errors.status?.message}</FormHelperText>
            </FormControl>
          )}
        />
      </Box>
    </DrawerRight>
  );
}
