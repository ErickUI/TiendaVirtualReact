interface Props {
  categorias: string[];
  categoriaSeleccionada: string | null;
  onChange: (cat: string | null) => void;
}

function CategoryFilter({ categorias, categoriaSeleccionada, onChange }: Props) {
  return (
    <div className="mb-3">
      <select
        className="form-select"
        value={categoriaSeleccionada ?? ''}
        onChange={(e) => onChange(e.target.value || null)}
      >
        <option value="">Todas las categorías</option>
        {categorias.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>
    </div>
  );
}

export default CategoryFilter;
