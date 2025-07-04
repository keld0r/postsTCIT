import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '@/store/store';
import { deletePost } from '@/store/postsSlice';
import { Button } from '@/components/ui/button';

export default function PostsList() {
  const dispatch = useDispatch<AppDispatch>();
  const { filteredPosts } = useSelector((state: RootState) => state.posts);

  const handleDeletePost = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      dispatch(deletePost(id));
    }
  };

  return (
    <div className="bg-surface border border-gray-300 mb-6">
      <table className="w-full">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2 text-left border-r border-gray-300 font-normal">
              Nombre
            </th>
            <th className="px-4 py-2 text-left border-r border-gray-300 font-normal">
              Descripción
            </th>
            <th className="px-4 py-2 text-left font-normal">
              Acción
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredPosts.map((post) => (
            <tr key={post.id} className="border-t border-gray-300">
              <td className="px-4 py-2 border-r border-gray-300">
                {post.name}
              </td>
              <td className="px-4 py-2 border-r border-gray-300">
                {post.description}
              </td>
              <td className="px-4 py-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDeletePost(post.id)}
                  className="text-blue-600 hover:text-blue-800 p-0 h-auto font-normal"
                >
                  Eliminar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
