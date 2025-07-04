import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import { selectStyles } from "./SelectStyle";

interface FilterOption {
  value: string;
  label: string;
}
interface FormValues {
  types: FilterOption[];
  habitats: FilterOption[];
  classification: FilterOption | null;
}
interface Props {
  open: boolean;
  onClose: () => void;
  filters: { types: string[]; classifications: string[]; habitats: string[] };
  onApply: (data: {
    types: string[];
    habitats: string[];
    classification: string;
  }) => void;
  initialValues: {
    types: string[];
    habitats: string[];
    classification: string;
  };
  onReset: () => void;
}

const SearchFilterDrawer = ({
  open,
  onClose,
  filters,
  onApply,
  initialValues,
  onReset,
}: Props) => {
  const { handleSubmit, control, reset } = useForm<FormValues>({
    defaultValues: { types: [], habitats: [], classification: null },
  });

  useEffect(() => {
    if (!open) return;
    reset({
      types: initialValues.types.map((t) => ({ value: t, label: t })),
      habitats: initialValues.habitats.map((h) => ({ value: h, label: h })),
      classification: initialValues.classification
        ? {
            value: initialValues.classification,
            label: initialValues.classification,
          }
        : null,
    });
  }, [open, initialValues, reset]);

  const handleApply = (values: FormValues) => {
    onApply({
      types: values.types.map((t) => t.value),
      habitats: values.habitats.map((h) => h.value),
      classification: values.classification?.value || "",
    });
    onClose();
  };

  return (
    <div
      className={`fixed top-0 right-0 h-full w-80 shadow-lg transform transition-transform duration-300 z-50 overflow-y-auto text-white  ${
        open ? "translate-x-0" : "translate-x-full"
      }`}
      style={{
        backgroundImage:
          "linear-gradient(90deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0) 100%)",
        backdropFilter: "blur(12px)",
        backgroundColor: "#050817",
      }}
    >
      <div className="p-4 flex flex-col gap-4">
        <h2 className="text-lg font-semibold">Filter Pokémon</h2>

        <Controller
          name="types"
          control={control}
          render={({ field }) => (
            <Select
              {...field}
              options={filters.types.map((t) => ({ value: t, label: t }))}
              isMulti
              placeholder="Types"
              styles={selectStyles}
            />
          )}
        />

        <Controller
          name="habitats"
          control={control}
          render={({ field }) => (
            <Select
              {...field}
              options={filters.habitats.map((h) => ({ value: h, label: h }))}
              isMulti
              placeholder="Habitats"
              styles={selectStyles}
            />
          )}
        />

        <Controller
          name="classification"
          control={control}
          render={({ field }) => (
            <Select
              {...field}
              options={filters.classifications.map((c) => ({
                value: c,
                label: c,
              }))}
              isClearable
              placeholder="Classification"
              styles={selectStyles}
            />
          )}
        />

        <div className="flex gap-2">
          <button
            type="button"
            onClick={handleSubmit(handleApply)}
            className="bg-red-500 text-white p-2 rounded hover:bg-red-600"
          >
            Apply Filters
          </button>

          <button
            type="button"
            onClick={() => {
              onReset();
              onClose();
            }}
            className="px-4 py-2 border rounded bg-white text-gray-700 hover:bg-gray-100"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchFilterDrawer;
