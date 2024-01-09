import Head from 'next/head';
import { Client } from '@notionhq/client';
import Link from 'next/link';
import styles from '../styles/blog.module.css';

import { formatDistanceToNow } from "date-fns";
import { enUS } from "date-fns/locale";
import { useState, useEffect } from 'react'
import blog_title_image from "../public/images/blog_title_image_wider.png";
import blog_default_cover_image from "../public/images/blog_default_cover_image.png";
import Image from 'next/image';


function formatText(text: string, limitLength = 50) {
  const textArr = text.split(" ")
  const newText = textArr.map((string, index) => {
      if (index < limitLength) return string
  }).filter(string => string !== undefined
  )
  return `${newText.toString().replaceAll(",", " ")}...`
}

export default function Blog({ blogs }) {

  
  // using useEffect, filter out blogs if their title and search text match
  const [filteredBlogs, setFilteredBlogs] = useState(blogs)
  const [searchText, setSearchText] = useState('')
  const [blogCounter, setBlogCounter] = useState(blogs.length)

  useEffect(() => {
    const filteredBlogs = blogs.filter(blog => {
      const blog_title = blog.properties.이름.title[0].plain_text;

      let visible_blog = (blog.properties.태그.multi_select[0] === undefined)
      visible_blog = visible_blog &&  blog_title.toLowerCase().includes(searchText.toLowerCase())

      return visible_blog
    })
    setFilteredBlogs(filteredBlogs);
    
    console.log('filteredBlogs', filteredBlogs);
    // console.log('searchText', searchText);
    setBlogCounter(filteredBlogs.length);
  }, [searchText, blogs])

  

  
  return (
    <>
      <Head>
        <title>JJ's Blog</title>
        <meta name="description" content="Junbong Jang's Blog, JJ's Blog about Artificial Inteligence, Amazon Web Service and Life. 장준봉의 테크 블로그" />
        <link rel="icon" href="images/favicon.ico" />
      </Head>

      {/* Create image container */}
      <div className={styles.blog_title_image_container}>
        <Image className={styles.blog_title_image} src={blog_title_image} alt="JJ's Blog" />
      </div>

      <main className={styles.blog_container}>
        <div className={styles.blog_content}>
          

          {/* <h1 className={styles.title}>
            JJ's Blog
          </h1> */}

          <div className={styles.search_section}>
            <div>
              <span>Search Blogs</span>
              <small >{blogCounter} total blogs</small>
            </div>
            <input
              type="text"
              onChange={(e) => setSearchText(e.target.value)}
              placeholder="Search Blogs"
            />
          </div>


          <div className={styles.list_section}>
            {filteredBlogs &&
              filteredBlogs.map((blog) => (

                <Link 
                  key={blog.id}
                  href={{
                    pathname: `/blog/${blog.id}`,
                  }}
                  className={styles.card}
                >
                  { blog.cover != null ?
                    <Image
                      src={blog.cover.file.url}
                      className={styles.card_image}
                      alt="custom blog cover image"
                      width={150}
                      height={150}
                      loading="lazy"
                    /> : 
                    <Image
                      src={blog_default_cover_image}
                      className={styles.card_image}
                      alt="default blog cover image"
                      width={150}
                      height={150}
                      loading="lazy"
                    />
                    
                  }
                  
                  <header>
                    <h3>{blog.properties.이름.title[0].plain_text}</h3>
                    <span>{
                    formatDistanceToNow(new Date(blog.created_time), {  // blog.properties.생성일.date.start
                      locale: enUS,
                      addSuffix: true,
                    })
                    }</span>

                    <main>
                      {/* <p>{formatText(body, 80)}</p> */}
                    </main>
                  </header>
                </Link>

              ))}
          </div>

        </div>
        
        
      </main>

    </>
  );
}

export async function getStaticProps() {
  const notion = new Client({ auth: process.env.NOTION_API_KEY });
  const response_blogs = await notion.databases.query({
    database_id: process.env.NOTION_DATABSE_ID,
  });

  
  return {
    props: {
      blogs: response_blogs.results,
    },
    revalidate: 1,
  };

}



// export async function getServerSideProps() {
//   const notion = new Client({ auth: process.env.NOTION_API_KEY });
//   const response_blogs = await notion.databases.query({
//     database_id: process.env.NOTION_DATABSE_ID,
//   });
  
//   return {
//     props: {
//       blogs: response_blogs.results,
//     }
//   };
// }