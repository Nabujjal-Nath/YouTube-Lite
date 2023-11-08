// const API_KEY = process.env["GOOGLE_API_KEY"];
import { environment } from "src/environments/environment"
export const MOST_POPULAR_VIDEOS = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=US&key=${environment.GOOGLE_API_KEY}`