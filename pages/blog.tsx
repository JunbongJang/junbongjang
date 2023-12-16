import Head from 'next/head';
import { Client } from '@notionhq/client';
import Link from 'next/link';
import styles from '../styles/blog.module.css';

import { formatDistanceToNow } from "date-fns";
import { enUS } from "date-fns/locale";
import { useState, useEffect } from 'react'


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

      return blog_title.toLowerCase().includes(searchText.toLowerCase())
    })
    setFilteredBlogs(filteredBlogs);
    
    // console.log('filteredBlogs', filteredBlogs);
    // console.log('searchText', searchText);
    setBlogCounter(filteredBlogs.length);
  }, [searchText, blogs])

  

  
  return (
    <>
      <Head>
        <title>JJ's Blog</title>
        <meta name="description" content="Junbong Jang's Blog, JJ's Blog" />
        <link rel="icon" href="images/favicon.ico" />
      </Head>

      <main className={styles.blog_container}>
        <div className={styles.blog_content}>

          <p></p>

          <h1 className={styles.title}>
            Blog about Anything
          </h1>

          <div className={styles.search_section}>
            <div >
              <span>Search Blogs</span>
              <small>{blogCounter} total blogs</small>
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
                    pathname: `/blogs/${blog.id}`,
                  }}
                  className={styles.card}
                >
                  <header>
                    <h3>{blog.properties.이름.title[0].plain_text}</h3>
                    <span>{
                    formatDistanceToNow(new Date(blog.created_time), {  // blog.properties.생성일.date.start
                      locale: enUS,
                      addSuffix: true,
                    })
                    }</span>
                  </header>
                  <main>
                    {/* <p>{formatText(body, 80)}</p> */}
                  </main>
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
  
  // const response_a_blog = await notion.blocks.children.list({
  //   block_id: response_blogs.results[0].id,
  // });

  
  return {
    props: {
      blogs: response_blogs.results,
      // first_blog: response_a_blog.results
    },
    revalidate: 1,
  };

}