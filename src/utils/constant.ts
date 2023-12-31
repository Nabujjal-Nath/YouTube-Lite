
import { environment } from "src/environments/environment"
export const baseURL='https://youtube.googleapis.com/youtube/v3'
export const commonPart='part=snippet%2CcontentDetails%2Cstatistics&'
export const videos=`${baseURL}/videos?${commonPart}`
export const channels=`${baseURL}/channels?${commonPart}`
export const MOST_POPULAR_VIDEOS = `${videos}chart=mostPopular&maxResults=50&regionCode=US&key=${environment.GOOGLE_API_KEY}`
export const CHANNEL_BY_ID=`${channels}key=${environment.GOOGLE_API_KEY}&id=`
export const VIDEO_BY_ID=`${videos}key=${environment.GOOGLE_API_KEY}&id=`
export const PROXY_D0MAIN='/search-suggestion'
export const SEARCH_SUGGESTION=`${PROXY_D0MAIN}/complete/search?client=firefox&ds=yt&q=`
export const SEARCH_LIST=`${baseURL}/search?part=snippet&maxResults=50&key=${environment.GOOGLE_API_KEY}&q=`
export const COMMENT_THREAD=`${baseURL}/commentThreads?part=snippet%2Creplies&order=relevance&maxResults=100&key=${environment.GOOGLE_API_KEY}&videoId=`