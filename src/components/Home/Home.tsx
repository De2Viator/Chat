import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRedditSlice, RedditUser } from '../../store/home/home.slice';
import { StoreState } from '../../store/store';
import { RedditList } from '../RedditList/RedditList';
export function Home() {
  const reddit: RedditUser[] = useSelector(
    (state: StoreState) => state.home.reddit
  );
  const img =
    'https://styles.redditmedia.com/t5_2th52/styles/communityIcon_wzrl8s0hx8a81.png?width=256&s=dcbf830170c1e8237335a3f046b36f723c5d55e7';
  const dispatch = useDispatch();
  const getNews = () => {
    dispatch<any>(getRedditSlice());
  };
  useEffect(() => {
    getNews();
  }, []);
  return (
    <>
      <h2>Home</h2>
      <h5>Top Reddit User Posts:</h5>
      <RedditList img={img} reddit={reddit}></RedditList>
    </>
  );
}
