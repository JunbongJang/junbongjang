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

import { NotionAPI } from 'notion-client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import Pagination from '../components/pagination';


function formatText(text: string, limitLength = 50) {
  const textArr = text.split(" ")
  const newText = textArr.map((string, index) => {
      if (index < limitLength) return string
  }).filter(string => string !== undefined
  )
  return `${newText.toString().replaceAll(",", " ")}...`
}


export default function Blog({ blogs, record_map }) {
  
  const TOTAL_BLOG_PER_PAGE = 12
  const TOTAL_BLOGS = blogs.length

  // for getting search query and blog pagination
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  // ----------- using useEffect, filter out blogs if their title and search text match
  const [searchedBlogs, setSearchedBlogs] = useState(blogs)
  const [shownBlogs, setShownBlogs] = useState(blogs)
  const [blogCounter, setBlogCounter] = useState(blogs.length)
  let default_search_text = searchParams.get('query')?.toString()  // get search text in the url query
  if (!default_search_text) {
    default_search_text = ''
  }
  const [searchText, setSearchText] = useState(default_search_text)
  const [totalPages, setTotalPages] = useState(blogs.length)


  const handleSearch = useDebouncedCallback((input_searchText) => {  // to prevent a new database query on every keystroke
    // --------- filter blog list by search text
    let cur_searchedBlogs = blogs.filter(blog => {
      const blog_title = blog.properties.이름.title[0].plain_text;

      let visible_blog = (blog.properties.태그.multi_select[0] === undefined)
      visible_blog = visible_blog &&  blog_title.toLowerCase().includes(input_searchText.toLowerCase())

      return visible_blog
    })

    console.log('searchedBlogs after search text', cur_searchedBlogs.length);
    setTotalPages(Math.ceil(cur_searchedBlogs.length / TOTAL_BLOG_PER_PAGE));
    setSearchedBlogs(cur_searchedBlogs);
    setBlogCounter(cur_searchedBlogs.length);
    
    // ------- update url query
    const params = new URLSearchParams(searchParams);
    params.set('page', '1');
    if (input_searchText) {
      params.set('query', input_searchText);
    } else {
      params.delete('query');
    }
    replace(`${pathname}?${params.toString()}`);

    // ------- go to the first page after search
    const page = 1
    const start = (page - 1) * TOTAL_BLOG_PER_PAGE
    const end = page * TOTAL_BLOG_PER_PAGE
    const sliced_searchedBlogs = cur_searchedBlogs.slice(start, end)
    setShownBlogs(sliced_searchedBlogs);

  }, 300);
  
  useEffect(() => {
    handleSearch(searchText)
  }, [searchText])

  
  const update_blog_list_after_page_click = ( () => {
    let page = parseInt(searchParams.get('page')?.toString())  // check if page string is integer or not
    if (!page || page > Math.ceil(TOTAL_BLOGS / TOTAL_BLOG_PER_PAGE) ) {
      page = 1
    }
    const start = (page - 1) * TOTAL_BLOG_PER_PAGE
    const end = page * TOTAL_BLOG_PER_PAGE
    console.log(searchedBlogs.length, 'searchedBlogs')
    const sliced_searchedBlogs = searchedBlogs.slice(start, end)
    console.log(sliced_searchedBlogs.length, 'sliced_searchedBlogs')
    setShownBlogs(sliced_searchedBlogs);

    } ); 

  
  return (
    <>
      <Head>
        <title>JJ's Blog</title>
        <meta name="description" content="Junbong Jang's Blog, JJ's Blog about Artificial Inteligence, Amazon Web Service and Life. 장준봉의 테크 블로그" />
        <link rel="icon" href="images/favicon.ico" />
      </Head>

      {/* Create image container */}
      <div className={styles.blog_title_image_container}>
        <Image className={`mx-auto ${styles.blog_title_image}`} src={blog_title_image} alt="JJ's Blog" />
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
              defaultValue={searchText}
            />
          </div>


          <div className={styles.list_section}>
            {shownBlogs &&
              shownBlogs.map((blog) => (

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
                    <h3 className={styles.header3}>{blog.properties.이름.title[0].plain_text}</h3>
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
        
        <Pagination totalPages={totalPages} changeBlogList={update_blog_list_after_page_click} />
        
        
        
      </main>

    </>
  );
}

// export async function getStaticProps() {
//   const api = new NotionAPI({
//     activeUser: process.env.NOTION_ACTIVE_USER,
//     authToken: process.env.NOTION_TOKEN_V2
//   })
  
//   const page = await api.getPage(process.env.NOTION_DATABSE_ID)

//   // convert dict to list
//   const page_block = Object.keys(page.block).map((key) => page.block[key].value);

//   const notion = new Client({ auth: process.env.NOTION_API_KEY });
//   const response_blogs = await notion.databases.query({
//     database_id: process.env.NOTION_DATABSE_ID,
//   });

  
//   return {
//     props: {
//       blogs: page_block // response_blogs.results,
//     },
//     revalidate: 1,
//   };

// }



export async function getServerSideProps() {

  // const notion_api = new NotionAPI();
  
  // const recordMap = await notion_api.getPage('bf66126a909e4d98983f0d5eee3ef57a')

  const notion = new Client({ auth: process.env.NOTION_API_KEY });
  const response_blogs = await notion.databases.query({
    database_id: process.env.NOTION_DATABSE_ID,
  });
  
  return {
    props: {
      blogs: response_blogs.results,
      // record_map: recordMap
    }
  };
}