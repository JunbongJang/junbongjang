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



const getDefaultTumbnail = function(date:any) {
  
  return (
    <div className="text-center flex justify-center items-center h-full">
      <div className="text-gray-700 dark:text-gray-400">
        <span className="font-extrabold text-5xl md:text-7xl">
          day
        </span>
        <br/>
        <span className="text-sm sm:text-base">
          month, year
        </span>
      </div>
    </div>
  )
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
        <meta name="description" content="Junbong Jang's Blog, JJ's Blog about Artificial Inteligence, Amazon Web Service and Life" />
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

                // <span>
                // <article
                //   key={blog.id}
                //   className="overflow-hidden my-2 sm:py-2 sm:px-4 border-b border-gray-200 dark:border-gray-700 sm:grid sm:grid-cols-5 sm:gap-4"
                // >
                //     <div className="hidden sm:block relative my-auto h-0 w-[100%] pb-[100%] sm:col-span-1 cursor-pointer border border-gray-200 dark:border-gray-800 clay-1 rounded-3xl"
                //       // onClick={() => readPost(post.slug)}
                //     >
                //     {blog.thumbnail ? (
                //       <Image
                //         src={blog.thumbnail}
                //         className={`object-cover transition-all rounded-3xl`}
                //         layout="fill"
                //         alt={post.title}
                //         loading="lazy"
                //       />
                //     ):(
                //       <div className="absolute left-0 top-0 w-full h-full ">
                //         <div className={`w-full h-full transition-all`}>
                //           {getDefaultTumbnail(blog?.date?.start_date)}
                //         </div>
                //       </div>
                //     )}

                //   </div>
                //   <div className="py-4 px-2 md:px-4 sm:col-span-4">
                //       <div className="flex gap-2">
                //         {blog.tags &&
                //           blog.tags.map((tag: string, idx: number) => (
                //             <Tag key={idx}>{tag}</Tag>
                //           ))}
                //       </div>
                //       <header className="flex flex-col justify-between md:flex-row md:items-baseline">
                //         <h2 className={`text-xl md:text-[21px] cursor-pointer font-bold transition-all`}
                //           // onClick={() => readPost(post.slug)}
                //           // onMouseEnter={() => {setHoverTitle(true)}}
                //           // onMouseLeave={() => {setHoverTitle(false)}}
                //           >
                //           {blog.title}
                //         </h2>
                //       </header>
                //       <main className="my-2 md:my-3">
                //         <p className="leading-tight md:leading-8 text-sm md:text-[15px] dark:text-gray-400 font-normal">
                //           {blog.summary}
                //         </p>
                //       </main>
                //       <div className="flex items-center gap-2 mt-6 mb-2">
                //         <div className="relative text-xs md:text-sm text-gray-500 dark:text-gray-400 w-full">
                //           {formatDistanceToNow(new Date(blog.created_time), {  // blog.properties.생성일.date.start
                //             locale: enUS,
                //             addSuffix: true,
                //           }) }
                //           <span 
                //             className="absolute top-0 right-0 cursor-pointer mr-1 mb-2 text-xs md:text-sm font-light text-sky-500 hover:text-sky-600 dark:hover:text-sky-400"
                //             // onClick={() => readPost(post.slug)}
                //             // onMouseEnter={() => {setHoverTitle(true)}}
                //             // onMouseLeave={() => {setHoverTitle(false)}}
                //           >
                //             Read more →
                //           </span>
                //       </div>
                //     </div>
                //   </div>
                // </article>
                // </span>

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