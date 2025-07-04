import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '@/store/store';
import { fetchPosts } from '@/store/postsSlice';
import PostFilter from '@/components/PostFilter';
import PostsList from '@/components/PostsList';
import CreatePostForm from '@/components/CreatePostForm';

export default function Posts() {
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading, error } = useSelector((state: RootState) => state.posts);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <PostFilter />
        <PostsList />
        <CreatePostForm />
      </div>
    </div>
  );
}
