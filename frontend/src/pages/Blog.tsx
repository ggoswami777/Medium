import { useParams } from 'react-router-dom';
import { useBlog } from '../hooks'
import FullBlog from '../components/FullBlog';
import Appbar from '../components/Appbar';

import { BlogSkeleton } from '../components/BlogSkeleton';

const Blog = () => {
  const { id } = useParams();
  const {loading,blog}=useBlog({
    id: id || ""
  });

  if(loading){
    return <div>
       <BlogSkeleton />
    </div>
  }

  if (!blog) {
    return (
        <div>
            <Appbar />
            <div className="h-screen flex flex-col justify-center">
                <div className="flex justify-center text-xl font-semibold text-slate-500">
                    Blog post not found.
                </div>
            </div>
        </div>
    )
  }

  return (
    <div>
      <FullBlog blog={blog} />
    </div>
  )
}

export default Blog