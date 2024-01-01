import {DiscussionEmbed} from "disqus-react"
const DisqusComments = ({ blog }) => {
  const disqusShortname = "jjs-blog-1"
  const disqusConfig = {
    url: "https://junbongjang.vercel.app/blog",
    identifier: blog.id, // Single post id
    title: blog.title // Single post title
  }
  return (
    <div>
      <DiscussionEmbed
        shortname={disqusShortname}
        config={disqusConfig}
      />
    </div>
  )
}
export default DisqusComments;