import splitEco from '../assets/split_eco.png';
import co2Img from '../assets/co2.png';
import rainImg from '../assets/rain.png';
import forestImg from '../assets/forest.png';

/** Decorative backgrounds — CSS gradients replace broken local file paths */

export const ASSETS = {
  split: splitEco,
  co2: co2Img,
  rain: rainImg,
  forest: forestImg,
};

export const GLASS_TEXTURE_STYLE = {
  background:
    'radial-gradient(circle at 30% 20%, rgba(16,185,129,0.25) 0%, transparent 50%), radial-gradient(circle at 70% 80%, rgba(14,165,233,0.15) 0%, transparent 45%), linear-gradient(135deg, rgba(3,15,7,0.9) 0%, rgba(6,40,20,0.95) 100%)',
};

export const POLLUTED_BG_STYLE = {
  backgroundImage: `url(${co2Img})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
};

export const GREEN_BG_STYLE = {
  backgroundImage: `url(${forestImg})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
};
