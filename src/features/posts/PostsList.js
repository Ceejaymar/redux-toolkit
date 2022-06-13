import { useSelector } from "react-redux";

const PostsList = () => {
  const posts = useSelector(state => state.posts)

  const renderedPosts = posts.map(posts =>< (
    <article key={posts.id}>
      <h3>{posts.title}</h3>
      <p>{posts.content.substring(0, 100)}</p>
    </article>
  ))
  return (
    <section>
      <h2>Posts</h2>
      {renderedPosts}
    </section>
  )
}

export default PostsList;