import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '@/store/store';
import { createPost } from '@/store/postsSlice';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function CreatePostForm() {
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading } = useSelector((state: RootState) => state.posts);
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleResetForm = () => {
    setFormData({ name: '', description: '' });
  };

  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.description.trim()) {
      alert("Please fill in all required fields.");
      return;
    }

    try {
      await dispatch(createPost(formData)).unwrap();
      handleResetForm();
    } catch (error) {
      alert("Failed to create post. Please try again.");
    }
  };

  return (
    <div className="flex items-center gap-4">
      <Input
        type="text"
        placeholder="Nombre"
        value={formData.name}
        onChange={(e) => handleInputChange('name', e.target.value)}
        className="max-w-xs"
      />
      <Input
        type="text"
        placeholder="Descripción"
        value={formData.description}
        onChange={(e) => handleInputChange('description', e.target.value)}
        className="max-w-xs"
      />
      <Button
        onClick={handleCreatePost}
        disabled={isLoading}
        variant="outline"
      >
        Crear
      </Button>
    </div>
  );
}
