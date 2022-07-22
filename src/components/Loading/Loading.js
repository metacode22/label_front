import './Loading.css'

export default function Loading() {
    return (
      <div className='loading__background'>
        <img src={process.env.PUBLIC_URL + '/images/book.gif'}/>
      </div>
    )
}

/*
(ex. userpage copy.js)
하는 방법~~ 불려지는 곳에 

import Loading from '../Loading/Loading';

const [isLoading,setIsLoading] = useState(true);

setIsLoading(false);

를 작성, (useEffect 부분에 하면 좋은건가? loading이 되는 시점에 써야지~)
setisloading은 이제 loading이 다 되었을 때 false되면서 사라져야하니까

그리고 그 return 하는 곳

<>
이렇게 감싸진 끝에

{
    isLoading
    && <Loading />
}
이렇게 넣어주면 됨! (되는 거 확인함~^^)
</>

*/