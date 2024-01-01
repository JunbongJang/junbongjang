import {DiscussionEmbed} from "disqus-react"
const DisqusComments = ({ blog }) => {
  const disqusShortname = "jjs-blog-1"
  const disqusConfig = {
    url: `https://junbongjang.vercel.app/blog/${blog.blog_id}`,
    identifier: blog.blog_id, // Single post id
    title: blog.page_response.properties.이름.title[0].plain_text // Single post title
  }

  console.log('disqusConfig', disqusConfig)

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