import { useState, useEffect } from "react"

import {copy, linkIcon, loader, tick} from '../assets';
import { useLazyGetSummaryQuery } from "../services/article";


const Demo = () => {
  const [article, setArticle] = useState({
    url: '', 
    summary: ''
  });

  const [allArticles, setAllArticles] = useState([]);
  const [copied, setCopied] = useState("");

  const [getSummary, {error, isFetching}] = useLazyGetSummaryQuery();

  useEffect(() => {
    // Retrieve articles from local storage on component mount
    const articlesFromLocalStorage = JSON.parse(
      localStorage.getItem('articles'));
    
    if (articlesFromLocalStorage) {
      setAllArticles(articlesFromLocalStorage);
    } 
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Call the getSummary query and retrieve the summary for the article URL
    const {data} = await getSummary({articleUrl: article.url});

    if (data?.summary) {
      const newArticle = {...article, summary: data.summary};
      const updatedAllArticles = [newArticle, ...allArticles];

      // Update the article state and save the new article to the list of all articles
      setArticle(newArticle);
      setAllArticles(updatedAllArticles);

      // Store the updated list of articles in local storage
      localStorage.setItem('articles', JSON.stringify(updatedAllArticles)) //local storage only accepts strings
    }
  }

  const handleCopy = (copyUrl) => {
    setCopied(copyUrl);
    navigator.clipboard.writeText(copyUrl);
    setTimeout(() => setCopied(faslse), 200);
  }

  return (
<section className="mt-16 w-full max-w-xl">
  {/* Search */}
  <div className="flex flex-col w-full gap-2">
    <form
      className="relative flex justify-center items-center"
      onSubmit={handleSubmit}
    >
      <img
        src={linkIcon}
        alt="link_icon"
        className="absolute left-0 my-2 ml-3 w-5"
      />

      <input
        type="url"
        placeholder="Enter a URL"
        value={article.url}
        onChange={(e) => setArticle({ ...article, url: e.target.value })}
        required
        className="url_input peer"
      />

      <button
        type="submit"
        className="submit_btn peer-focus:border-gray-700 peer-focus:text-gray-700"
      >
        ↵
      </button>
    </form>

    {/* Browse URL History*/}
    <div className="flex flex-col gap-1 max-h-60 overflow-y-auto">
      {allArticles.map((item, index) => (
        <div
          key={`link-${index}`}
          onClick={() => setArticle(item)}
          className="link_card"
        >
          <div className="copy_btn" onClick={() =>
          handleCopy(item.url)}>
            <img
              src={copied === item.url ? tick : copy}
              alt="copy_icon"
              className="w-[40%] h-[40%] object-contain"
            />
          </div>
          <p className="flex-1 font-satoshi text-blue-700 font-medium text-sm truncate">
            {item.url}
          </p>
        </div>
      ))}
    </div>
  </div>

  {/* Display Results */}
  <div className="my-10 max-w-full flex justify-center items-center">
    {isFetching ? (
      <img src={loader} alt="loader" className="w-20 h-20 object-contain" />
    ) : error ? (
      <p className="font-inter font-bold text-black text-center">
        Well, that wasn't supposed to happen...
        <br />
        <span className="font-satoshi font-normal text-gray-700">
          {error?.data?.error}
        </span>
      </p>
    ) : (
      article.summary && (
        <div className="flex flex-col gap-3">
          <h2 className="font-satoshi font-bold text-gray-600 text-xl">
            Article <span className="blue_gradient">Summary</span>
          </h2>
          <div className="summary_box">
            <p className="font-inter font-medium text-sm text-gray-700">
              {article.summary}
            </p>
          </div>
        </div>
      )
    )}
  </div>
</section>
  )
}

export default Demo