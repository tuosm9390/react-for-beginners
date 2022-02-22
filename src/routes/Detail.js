import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import style from "./Detail.module.css";
import { Link } from "react-router-dom";
import { IoStar, IoFilmOutline, IoFileTraySharp, IoCloudDownloadOutline, IoBookOutline } from "react-icons/io5";

function Detail() {
  const [loading, setLoading] = useState(true);
  const [movie, setMovie] = useState();
  // url에서 id의 값을 가져오고
  const { id } = useParams();
  const getMovie = async () => {
    const json = await (
      // 일치하는 id의 정보를 fetch를 통해 api에서 가져온다.
      await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
    ).json();
    setMovie(json.data.movie);
    setLoading(false);
  };

  useEffect(() => {
    getMovie();
  }, []);

  console.log(movie);
  // 상세정보 보여주기
  return (
    <div className={style.wrapper}>
      {loading ? <h1>Loading...</h1> :
        <div className={style.detail}>
          <img src={movie.large_cover_image} alt="title" />
          <h1>{movie.title_long}</h1>
          <ul>
            <li>
              <p><IoStar />  평점 : {movie.rating + (" 점")}</p>
            </li>
            <li>
              <p><IoFilmOutline /> 러닝타임 : {movie.runtime + (" 분")}</p>
            </li>
            <li>
              <p><IoFileTraySharp /> 장르 : {movie.genres.map((g) => (g + " "))}</p>
            </li>
            <li>
              <p><IoCloudDownloadOutline /> 다운로드 수 : {movie.download_count + (" 회")}</p>
            </li>
            <li>
              <p><IoBookOutline /> 줄거리</p>
              <p className={style.description}>{movie.description_full}</p>
            </li>
          </ul>
          <Link to={'/'} className={style.btn}>
            <span>back</span>
          </Link>
        </div>
      }
    </div>
  )
}

export default Detail;