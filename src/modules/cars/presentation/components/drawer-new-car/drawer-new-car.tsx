import {
  Box,
  Select,
  MenuItem,
  TextField,
  FormControl,
  InputLabel,
} from "@mui/material";
import DrawerRight from "../../../../../shared/components/ui/drawer-right/drawer-right";
import type { CreateCarDTO } from "../../../domain/entities/cars";
import type { FilterModels } from "../../../../../shared/cross-features/filter-models/domain/entities/filter-models";

type DrawerNewCarProps = {
  openDrawer: boolean;
  handleCloseDrawer: () => void;
  title: string;
  createCar: (data: CreateCarDTO) => void;
  loading?: boolean;
  error?: string | null;
  success?: boolean;
  onSuccess?: () => void;
  filterModels: FilterModels[];
  filterModelsLoading: boolean;
  filterModelsError: string | null;
};

export default function DrawerNewCar({
  openDrawer,
  handleCloseDrawer,
  title,
  createCar,
  loading,
  error,
  success,
  onSuccess,
  filterModels,
  filterModelsLoading,
  filterModelsError,
}: DrawerNewCarProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = new FormData(e.currentTarget);

    const payload = {
      brand: data.get("brand"),
      model: data.get("model"),
      color: data.get("color"),
      year: Number(data.get("year")),
      plate: data.get("plate"),
      daily_price: Number(data.get("daily_price")),
      status: data.get("status"),
    };
    createCar(payload as CreateCarDTO);
    onSuccess?.();
  };

  return (
    <DrawerRight
      title={title}
      openDrawer={openDrawer}
      handleCloseDrawer={handleCloseDrawer}
      onSubmit={handleSubmit}
      loading={loading}
      error={error}
      success={success}
    >
      <Box display="flex" flexDirection="column" gap={2}>
        <FormControl fullWidth>
          <InputLabel id="brand-label">Marca</InputLabel>
          <Select
            name="brand"
            labelId="brand-label"
            label="Marca"
            defaultValue=""
          >
            <MenuItem value="toyota">Toyota</MenuItem>
            <MenuItem value="honda">Honda</MenuItem>
            <MenuItem value="vw">Volkswagen</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel id="model-label">Modelo</InputLabel>
          <Select
            name="model"
            labelId="model-label"
            label="Modelo"
            defaultValue=""
          >
            {filterModels.length > 0 ? (
              filterModels.map((model) => (
                <MenuItem key={model.id} value={model.id}>
                  {model.name}
                </MenuItem>
              ))
            ) : filterModelsLoading ? (
              <MenuItem value="" disabled>
                Carregando modelos...
              </MenuItem>
            ) : filterModelsError ? (
              <MenuItem value="" disabled>
                Erro ao carregar modelos
              </MenuItem>
            ) : (
              <MenuItem value="" disabled>
                Nenhum modelo disponível
              </MenuItem>
            )}
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel id="color-label">Cor</InputLabel>
          <Select
            name="color"
            labelId="color-label"
            label="Cor"
            defaultValue=""
          >
            <MenuItem value="Preto">Preto</MenuItem>
            <MenuItem value="Branco">Branco</MenuItem>
            <MenuItem value="Prata">Prata</MenuItem>
            <MenuItem value="Cinza">Cinza</MenuItem>
            <MenuItem value="Vermelho">Vermelho</MenuItem>
            <MenuItem value="Azul">Azul</MenuItem>
            <MenuItem value="Verde">Verde</MenuItem>
          </Select>
        </FormControl>

        <TextField fullWidth label="Ano" name="year" type="number" />
        <TextField fullWidth label="Placa" name="plate" />
        <TextField
          fullWidth
          label="Preço diário"
          name="daily_price"
          type="number"
        />

        <FormControl fullWidth>
          <InputLabel id="status-label">Status</InputLabel>
          <Select
            name="status"
            labelId="status-label"
            label="Status"
            defaultValue="available"
          >
            <MenuItem value="available">Disponível</MenuItem>
            <MenuItem value="rented">Alugado</MenuItem>
            <MenuItem value="maintenance">Manutenção</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </DrawerRight>
  );
}
