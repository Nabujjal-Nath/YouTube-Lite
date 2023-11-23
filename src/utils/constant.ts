
import { environment } from "src/environments/environment"
export const baseURL='https://youtube.googleapis.com/youtube/v3'
export const commonPart='part=snippet%2CcontentDetails%2Cstatistics&'
export const videos=`${baseURL}/videos?${commonPart}`
export const channels=`${baseURL}/channels?${commonPart}`
export const MOST_POPULAR_VIDEOS = `${videos}chart=mostPopular&maxResults=50&regionCode=US&key=${environment.GOOGLE_API_KEY}`
export const CHANNEL_BY_ID=`${channels}key=${environment.GOOGLE_API_KEY}&id=`