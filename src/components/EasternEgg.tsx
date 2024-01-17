import Image, { StaticImageData } from 'next/image';
import Footer from './Footer';
interface Props {
  isEggCracked: boolean;
  crackedEgg:StaticImageData;
  egg: StaticImageData;
  openEgg: () => void;
  padding?: string
}
function EasternEgg({isEggCracked, crackedEgg, openEgg, egg, padding}: Props) {
  return (
    <div className={`flex items-center justify-center ${padding && (`${padding}`)}`}>
      {isEggCracked ? (
        <div className="flex items-center justify-center flex-col">
          <Image
            src={crackedEgg}
            alt=""
            width={40}
            height={40}
            onClick={openEgg}
          />
          <Footer />
        </div>
      ) : (
        <Image src={egg} alt="" width={30} height={30} onClick={openEgg} />
      )}
    </div>
  );
}

export default EasternEgg