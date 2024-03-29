import { Client } from '@notionhq/client';
import Head from 'next/head';
import Link from 'next/link';
import Date from '../../components/date';
import styles from '../../styles/blog_detail.module.css';
import { Fragment } from 'react';
import { useState, useEffect } from 'react'
import Image from 'next/image';

import { renderBlock } from '../../components/notion_renderer';
import DisqusComments from '../../components/disqus_comments';

export default function BlogPage({ blog_data }) {
  // console.log('page_response', blog_data.page_response)
  // console.log('list_of_blocks', ...blog_data.list_of_blocks);

  const [updated_blog_data, setBlogData] = useState(blog_data)
  console.log('updated_blog_data', updated_blog_data);

  let cover_image_url = "";
  let cover_image_component = null;
  if (blog_data.page_response.cover != null) {
    cover_image_url = blog_data.page_response.cover.file.url;
    cover_image_component = ( 
      <>
        <br />
        <Image src={cover_image_url} alt="blog cover image" width="512" height="512" className={styles.ImageWidthFlex} />
      </>
    );
  }
  
  const meta_tag_description = `JJ's Blog, 장준봉의 블로그, ${updated_blog_data.page_response.properties.이름.title[0].plain_text}`;
  
  // const [isLoading, setLoading] = useState(true)

  // useEffect(() => {
  //     async function fetchAndSetBlogData() {
  //       const data = await getBlogData( blog_data.blog_id );
  //       setBlogData(data);
  //     }
  //     fetchAndSetBlogData();
  //   }, []);


  return (
    <>
        
      <Head>
          <title>{updated_blog_data.page_response.properties.이름.title[0].plain_text}</title>
          <meta name="description" content={meta_tag_description} />
          <link rel="icon" href="images/favicon.ico" />
        
      </Head>
        

      <div className={styles.PostDetailContainer}>
        <div className={styles.PostDetailCard}>
          <header>
            <Link href="/blog" type="button">
              <i className="fas fa-solid fa-chevron-left"></i>
              Back
            </Link>
            {/* <a target="_blank" rel="noreferrer">
              See on Github
              <i className="fas fa-solid fa-arrow-up-right-from-square"></i>
            </a> */}
          </header>
          <div>
            
            <h1>{updated_blog_data.page_response.properties.이름.title[0].plain_text}</h1>
            
          </div>
          <footer>
            <span>
              <i className="fas fa-solid fa-calendar"></i>
              
              {/* <small>Last Edited Date: <Date dateString={blog_data.page_response.last_edited_time} /> </small> */}
              <small>Created Date: <Date dateString={updated_blog_data.page_response.created_time} /></small>
            </span>
            {/* <span>
              <i className="fas fa-solid fa-comment"></i>
              {post.comments} Comments
            </span> */}
          </footer>
        </div>

        {cover_image_component}


        <div className={styles.PostDetailContent}>
          <div>
            {blog_data.list_of_blocks.map((block) => (
              <Fragment key={block.id}>{renderBlock(block)}</Fragment>
            ))}
            {/* <Render blocks={blog_data.list_of_blocks} emptyBlocks /> */}
          </div>
        </div>

      </div>
      
      <hr></hr>
      <div className={styles.DisqusCommentBox}>
        <DisqusComments blog={blog_data} ></DisqusComments>
      </div>

    </>
  );
}

// export async function getStaticPaths() {
//     // Return a list of possible value for id
//     const notion = new Client({ auth: process.env.NOTION_API_KEY });
//     const response_blogs = await notion.databases.query({
//         database_id: process.env.NOTION_DATABSE_ID,
//     });

//     const paths = response_blogs.results.map((blog) => {
//         return {
//           params: {
//             id: blog.id
//           },
//         };
//     });  // cannot pass other properties to params

//     return {
//         paths,
//         fallback: false,
//       };
// }

// export async function getStaticProps({ params }) {
//   // Fetch necessary data for the blog post using params.id

//   const blog_data = await getBlogData( params.id );

//   return {
//       props: {
//           blog_data
//       },
//       revalidate: 1, // In seconds
//   };

// }


export async function getServerSideProps({ params }) {
    // Fetch necessary data for the blog post using params.id
  
    const blog_data = await getBlogData( params.id );

    return {
        props: {
            blog_data
        }
    };

}

async function getBlogData( blog_id ) {
  // Fetch necessary data for the blog post using params.id
    
  const notion = new Client({ auth: process.env.NOTION_API_KEY });
  const response_blog = await notion.blocks.children.list({
      block_id: blog_id,
  });


  let total_response_blog;
  if (response_blog.has_more) {  // If the response exceeds the 100 block limit of notion api 

    const response_blog2 = await notion.blocks.children.list({
      block_id: blog_id,
      start_cursor: response_blog.next_cursor
    });

    total_response_blog = response_blog.results.concat(response_blog2.results);
  } 
  else {
    total_response_blog = response_blog.results;
  }


  const page_response = await notion.pages.retrieve({ page_id: blog_id });

  const blog_data = {
    list_of_blocks: total_response_blog,
    page_response: page_response,
    blog_id: blog_id
  }
  return blog_data;
}