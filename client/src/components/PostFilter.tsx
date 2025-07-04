import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '@/store/store';
import { setFilterText, clearFilter } from '@/store/postsSlice';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function PostFilter() {
  const dispatch = useDispatch<AppDispatch>();
  const filterText = useSelector((state: RootState) => state.posts.filterText);

  const handleFilterChange = (value: string) => {
    dispatch(setFilterText(value));
  };

  const handleClearFilter = () => {
    dispatch(clearFilter());
  };

  return (
    <div className="flex items-center gap-4 mb-6">
      <Input
        type="text"
        placeholder="Filtro de Nombre"
        value={filterText}
        onChange={(e) => handleFilterChange(e.target.value)}
        className="max-w-xs"
      />
      <Button
        variant="outline"
        onClick={handleClearFilter}
      >
        Buscar
      </Button>
    </div>
  );
}
