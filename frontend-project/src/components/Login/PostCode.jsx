import { useDaumPostcodePopup } from 'react-daum-postcode';
import '../../pages/CustomerService/CSStyle.css';

const Postcode = ({onComplete}) => {
  const scriptUrl = "https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
  const open = useDaumPostcodePopup(scriptUrl);

   const handleComplete = (data) => {
    const zonecode = data.zonecode; // 우편번호
    const address = data.address;

    if (onComplete) {
      onComplete({ zonecode, address });
    }

    console.log(address); // e.g. '서울 성동구 왕십리로2길 20 (성수동1가)'
  };

  const handleClick = () => {
    open({ onComplete: handleComplete });
  };

  return (
    <button type='button' className='address-search-button'style={{ alignSelf: 'flex-end' }} onClick={handleClick}>
      우편번호 검색
    </button>
  );
};

export default Postcode;