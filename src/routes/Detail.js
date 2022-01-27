import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import style from "../Detail.module.css";
import { Link } from "react-router-dom";

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
  console.log(movie);

  useEffect(() => {
    getMovie();
  }, []);

  // 상세정보 보여주기
  return (
    <div className={style.contents}>
      {loading ? <h1>Loading...</h1> :
        <div>
          <img src={movie.large_cover_image} alt="title" />
          <h1>{movie.title_long}</h1>
          <p>평점 : {movie.rating + (" 점")}</p>
          <p>러닝타임 : {movie.runtime + (" 분")}</p>
          <p>장르 : {movie.genres.map((g) => (g + " "))}</p>
          <p>다운로드 수 : {movie.download_count + (" 회")}</p>
          <Link to={'/'}>
            <button>back</button>
          </Link>
        </div>
      }
    </div>
  )
}

export default Detail;